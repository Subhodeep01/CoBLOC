import { useState, useEffect, useRef, useCallback } from 'react';
import { chunkIntoBlocks } from '../utils/windowOps';

const API = 'http://127.0.0.1:8000';
const WS_URL = 'ws://127.0.0.1:8000/ws/metrics';

function makeItem(item, index, windowNumber) {
  const value = typeof item === 'object' ? item.value : item;
  const raw = typeof item === 'object' ? item : {};
  const displayTitle = raw._display_title || `#${index + 1}`;
  return {
    id: `live-${windowNumber}-${index}`,
    genre: String(value),
    title: displayTitle,
    year: String(value),
    liveItem: true,
    raw,
  };
}

function buildWindow(msg) {
  const items = (msg.window_items || []).map((v, i) => makeItem(v, i, msg.window_number));
  const blockSize = msg.block_size || 5;
  const blocks = chunkIntoBlocks(items, blockSize);
  const reorderedItems = (msg.reordered_items || msg.window_items || []).map((v, i) => makeItem(v, i, msg.window_number));
  const reorderedBlocks = chunkIntoBlocks(reorderedItems, blockSize);
  return {
    windowNumber: msg.window_number,
    items,
    blocks,
    reorderedBlocks,
    isFair: msg.is_fair,
    fairText: msg.fair_text || '',
    preprocessingMs: msg.preprocessing_ms,
    queryMs: msg.query_ms,
    metrics: msg.metrics || {},
    attribute: msg.attribute || '',
    blockSize,
    isReordered: false,
    fairBlocksBefore: msg.fair_blocks_before,
    fairBlocksAfter: msg.fair_blocks_after,
    blocksPerWindow: msg.blocks_per_window,
  };
}

function checkAllBlocksFair(blocks, constraints, blockSize) {
  return blocks.every(block => {
    const counts = {};
    for (const item of block) counts[item.genre] = (counts[item.genre] || 0) + 1;
    return Object.entries(constraints).every(([g, pct]) => {
      if (!pct) return true;
      const p = (parseFloat(pct) || 0) / 100;
      const floor = Math.floor(p * blockSize);
      const ceil = Math.ceil(p * blockSize);
      const c = counts[g] || 0;
      return c >= floor && c <= ceil;
    });
  });
}

export function useLiveStream() {
  const [connected, setConnected] = useState(false);
  const [running, setRunning] = useState(false);
  const [producing, setProducing] = useState(false);
  const [apiDatasets, setApiDatasets] = useState([]);
  const [windowBuffer, setWindowBuffer] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(-1);
  const [maxReachedIdx, setMaxReachedIdx] = useState(-1);
  const [reordered, setReordered] = useState(false);
  const [reorderStatus, setReorderStatus] = useState(null);
  const [landmarkLoadedIndices, setLandmarkLoadedIndices] = useState(new Set());
  const [latestMetrics, setLatestMetrics] = useState({});
  const [producedTopic, setProducedTopic] = useState(null);
  const [producedDataset, setProducedDataset] = useState(null);

  const wsRef = useRef(null);
  const windowBufferRef = useRef([]);
  const pendingLandmarkRef = useRef(null);
  // Which consumer run this session is watching. A restart leaves the previous
  // run's updates in flight, and adopting them made a fresh session open on
  // whatever window the old one had reached.
  const runIdRef = useRef(null);

  useEffect(() => {
    fetch(`${API}/api/datasets`)
      .then(r => r.json())
      .then(setApiDatasets)
      .catch(() => {});
  }, []);

  useEffect(() => {
    let reconnectTimer;

    function connect() {
      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;
      ws.onopen = () => setConnected(true);
      ws.onclose = () => {
        setConnected(false);
        reconnectTimer = setTimeout(connect, 3000);
      };
      ws.onerror = () => ws.close();
      ws.onmessage = ({ data }) => {
        let msg;
        try { msg = JSON.parse(data); } catch { return; }

        if (msg.type === 'window_update') {
          if (runIdRef.current != null && msg.run_id != null && msg.run_id !== runIdRef.current) return;
          let win = buildWindow(msg);
          setLatestMetrics(msg.metrics || {});
          setWindowBuffer(prev => {
            if (prev.some(w => w.windowNumber === win.windowNumber)) return prev;
            const newIdx = prev.length;
            const pl = pendingLandmarkRef.current;
            if (pl && newIdx > pl.baseIdx && newIdx <= pl.baseIdx + pl.totalWindows) {
              const offset = newIdx - pl.baseIdx;
              const slice = pl.allReordered.slice(offset, offset + pl.winSize);
              if (slice.length > 0) {
                const newItems = slice.map((v, i) => makeItem(v, i, win.windowNumber));
                win = { ...win, reorderedBlocks: chunkIntoBlocks(newItems, pl.blockSize), isReordered: true };
              }
              if (newIdx === pl.baseIdx + pl.totalWindows) {
                pendingLandmarkRef.current = null;
              }
            }
            const next = [...prev.slice(-499), win];
            windowBufferRef.current = next;
            if (prev.length === 0) {
              setCurrentIdx(0);
              setMaxReachedIdx(0);
            }
            return next;
          });
        } else if (msg.type === 'done') {
          setRunning(false);
        } else if (msg.type === 'produce_done') {
          setProducing(false);
        } else if (msg.type === 'produce_error') {
          setProducing(false);
          setReorderStatus({ phase: 'error', message: `Could not produce data: ${msg.message}` });
        } else if (msg.type === 'error') {
          setRunning(false);
        }
      };
    }

    connect();
    return () => {
      clearTimeout(reconnectTimer);
      wsRef.current?.close();
    };
  }, []);

  const triggerInternalReorder = useCallback((currentWindow, idx, constraints) => {
    if (!currentWindow) return;
    const reordBlocks = currentWindow.reorderedBlocks || currentWindow.blocks;
    const allFair = checkAllBlocksFair(reordBlocks, constraints, currentWindow.blockSize);

    const { fairBlocksBefore: before, fairBlocksAfter: after } = currentWindow;
    if (before != null && after != null && after <= before) {
      setReorderStatus({
        phase: 'needs_landmark',
        message: 'Reordering within this window cannot improve fairness, so the original order was kept.'
          + ' Enter a landmark size to try with look-ahead.',
      });
      return;
    }

    setReordered(true);
    setWindowBuffer(prev => {
      const next = prev.map((w, i) => i === idx ? { ...w, isReordered: true } : w);
      windowBufferRef.current = next;
      return next;
    });

    if (allFair) {
      setReorderStatus({ phase: 'done', message: 'Window reordered successfully.' });
    } else {
      setReorderStatus({
        phase: 'needs_landmark',
        message: 'Internal reordering could not achieve full fairness. Enter a landmark size to try with look-ahead.',
      });
    }
  }, []);

  const triggerLandmarkReorder = useCallback(async (currentWindow, idx, landmarkSize, proportions, attributeColumn) => {
    if (!currentWindow || !landmarkSize) return;
    setReorderStatus({ phase: 'loading', message: 'Reordering with landmark… Please wait.' });

    // The reorder returns almost instantly, which reads as though nothing
    // happened. Hold the spinner long enough to see, scaled by how much work
    // was asked for, and capped so it never feels sluggish.
    const startedAt = Date.now();
    const minSpinMs = Math.min(2500, 400 + landmarkSize * 12);

    try {
      const windowItems = currentWindow.items.map(i => i.raw);
      const winSize = windowItems.length;
      const buf = windowBufferRef.current;

      const intendedIndices = [];
      for (let ni = idx + 1; ni <= idx + landmarkSize; ni++) {
        intendedIndices.push(ni);
      }
      setLandmarkLoadedIndices(prev => new Set([...prev, ...intendedIndices]));

      const landmarkItems = [];
      const bufferedLandmarkIndices = [];
      for (const ni of intendedIndices) {
        if (ni < buf.length) {
          bufferedLandmarkIndices.push(ni);
          const items = buf[ni].items;
          if (items.length > 0) landmarkItems.push(items[items.length - 1].raw);
        }
      }

      const combined = [...windowItems, ...landmarkItems];

      const r = await fetch(`${API}/api/reorder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          window_items: combined,
          window_size: winSize,
          block_size: currentWindow.blockSize,
          proportions,
          attribute_column: attributeColumn,
        }),
      });

      const data = await r.json();

      const elapsed = Date.now() - startedAt;
      if (elapsed < minSpinMs) {
        await new Promise(res => setTimeout(res, minSpinMs - elapsed));
      }

      if (data.status === 'ok') {
        const { fair_blocks_before: before, fair_blocks_after: after, blocks_per_window: bpw } = data;

        if (after <= before) {
          setReorderStatus({
            phase: 'infeasible',
            message: `These constraints cannot be met by this data, so the original order was kept`
              + (bpw ? ` (${before} of ${bpw} blocks fair).` : '.')
              + ' Some attribute values may not appear often enough in this stretch of the stream.',
          });
          return;
        }

        const allReordered = data.reordered_items;
        setWindowBuffer(prev => {
          const next = prev.map((w, i) => {
            if (i === idx) {
              const slice = allReordered.slice(0, winSize).map((v, j) => makeItem(v, j, w.windowNumber));
              return { ...w, reorderedBlocks: chunkIntoBlocks(slice, w.blockSize), isReordered: true };
            }
            const lPos = bufferedLandmarkIndices.indexOf(i);
            if (lPos !== -1) {
              const start = lPos + 1;
              const slice = allReordered.slice(start, start + winSize).map((v, j) => makeItem(v, j, w.windowNumber));
              if (slice.length > 0) {
                return { ...w, reorderedBlocks: chunkIntoBlocks(slice, w.blockSize), isReordered: true };
              }
            }
            return w;
          });
          windowBufferRef.current = next;
          return next;
        });
        const lastBufferedLandmark = bufferedLandmarkIndices.length > 0
          ? bufferedLandmarkIndices[bufferedLandmarkIndices.length - 1]
          : idx;
        if (lastBufferedLandmark < idx + landmarkSize) {
          pendingLandmarkRef.current = {
            baseIdx: idx,
            winSize,
            blockSize: currentWindow.blockSize,
            allReordered,
            totalWindows: landmarkSize,
          };
        }
        setReordered(true);
        const counts = bpw ? `, ${before} to ${after} of ${bpw} blocks fair.` : '.';
        if (data.reorder_feasible === false) {
          setReorderStatus({
            phase: 'infeasible',
            message: `Reordered as far as this data allows${counts}`
              + ' Items that cannot fit a fair block are grouped at the end of the window.',
          });
        } else {
          setReorderStatus({ phase: 'done', message: `Reordered using landmark size ${landmarkSize}${counts}` });
        }
      } else {
        setReorderStatus({ phase: 'error', message: data.message || 'Reorder failed.' });
      }
    } catch (e) {
      setReorderStatus({ phase: 'error', message: e.message });
    }
  }, []);

  const startStream = useCallback(async (config) => {
    setWindowBuffer([]);
    windowBufferRef.current = [];
    pendingLandmarkRef.current = null;
    setCurrentIdx(-1);
    setMaxReachedIdx(-1);
    setReordered(false);
    setReorderStatus(null);
    setLandmarkLoadedIndices(new Set());

    const blockSize = parseInt(config.blockSize) || 5;
    const fairnessCounts = {};
    for (const [k, pct] of Object.entries(config.constraints)) {
      fairnessCounts[k] = Math.max(0, Math.floor((parseFloat(pct) || 0) / 100 * blockSize));
    }

    const rawProportions = {};
    const totalPct = Object.values(config.constraints || {}).reduce((s, v) => s + (parseFloat(v) || 0), 0);
    if (totalPct > 0) {
      for (const [k, pct] of Object.entries(config.constraints || {})) {
        rawProportions[k] = (parseFloat(pct) || 0) / totalPct;
      }
    }

    const body = {
      topic_name: config.kafkaTopic,
      window_size: parseInt(config.windowSize) || 10,
      block_size: blockSize,
      max_windows: parseInt(config.maxWindows) || 50,
      fairness: fairnessCounts,
      proportions: rawProportions,
      landmark_size: parseInt(config.landmarkSize) || 5,
      attribute_column: config.attributeColumn || 'GENDER',
      delay_ms: config.delayMs ?? 0,
    };

    const r = await fetch(`${API}/api/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await r.json();
    if (data.status !== 'error') {
      runIdRef.current = data.run_id ?? null;
      setRunning(true);
    }
  }, []);

  const stopStream = useCallback(() => {
    fetch(`${API}/api/stop`, { method: 'POST' });
    setRunning(false);
  }, []);

  const produceData = useCallback(async (datasetName) => {
    setProducing(true);
    setProducedTopic(null);
    setProducedDataset(null);
    const r = await fetch(`${API}/api/produce`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dataset_name: datasetName }),
    });
    const data = await r.json();
    if (data.status === 'started' && data.topic) {
      setProducedTopic(data.topic);
      setProducedDataset(datasetName);
    } else {
      setProducing(false);
    }
  }, []);

  const goNext = useCallback(() => {
    setReorderStatus(null);
    setCurrentIdx(i => {
      const next = i + 1;
      setMaxReachedIdx(m => Math.max(m, next));
      const win = windowBufferRef.current[next];
      setReordered(win?.isReordered ?? false);
      return next;
    });
  }, []);

  const goPrev = useCallback(() => {
    setReorderStatus(null);
    setCurrentIdx(i => {
      const prev = Math.max(i - 1, 0);
      const win = windowBufferRef.current[prev];
      setReordered(win?.isReordered ?? false);
      return prev;
    });
  }, []);

  const goToIdx = useCallback((idx) => {
    setReorderStatus(null);
    const win = windowBufferRef.current[idx];
    setReordered(win?.isReordered ?? false);
    setCurrentIdx(idx);
  }, []);

  const currentWindow = windowBuffer[currentIdx] ?? null;
  const canNext = currentIdx >= 0 && currentIdx < windowBuffer.length - 1;
  const canPrev = currentIdx > 0;

  // Windows the user actually reached. The buffer keeps every window the
  // stream delivered, so summarising all of it reports windows that were
  // never opened.
  const lastVisited = Math.max(maxReachedIdx, ...landmarkLoadedIndices, -1);
  const visitedWindows = windowBuffer.slice(0, lastVisited + 1);

  return {
    connected,
    running,
    producing,
    apiDatasets,
    currentWindow,
    windowBuffer,
    currentIdx,
    maxReachedIdx,
    landmarkLoadedIndices,
    visitedWindows,
    canNext,
    canPrev,
    latestMetrics,
    producedTopic,
    producedDataset,
    startStream,
    stopStream,
    produceData,
    goNext,
    goPrev,
    goToIdx,
    triggerInternalReorder,
    triggerLandmarkReorder,
    reordered,
    reorderStatus,
  };
}
