import { useState, useEffect, useRef, useCallback } from 'react';
import { chunkIntoBlocks } from '../utils/windowOps';

const API = 'http://localhost:8000';
const WS_URL = 'ws://localhost:8000/ws/metrics';

function makeItem(value, index, windowNumber) {
  return {
    id: `live-${windowNumber}-${index}`,
    genre: String(value),
    title: `#${index + 1}`,
    year: String(value),
    liveItem: true,
  };
}

function buildWindow(msg) {
  const items = (msg.window_items || []).map((v, i) => makeItem(v, i, msg.window_number));
  const blockSize = msg.block_size || 5;
  const blocks = chunkIntoBlocks(items, blockSize);
  return {
    windowNumber: msg.window_number,
    items,
    blocks,
    isFair: msg.is_fair,
    fairText: msg.fair_text || '',
    preprocessingMs: msg.preprocessing_ms,
    queryMs: msg.query_ms,
    metrics: msg.metrics || {},
    attribute: msg.attribute || '',
    blockSize,
  };
}

export function useLiveStream() {
  const [connected, setConnected] = useState(false);
  const [running, setRunning] = useState(false);
  const [producing, setProducing] = useState(false);
  const [apiAttributes, setApiAttributes] = useState({ column: '', unique_values: [], summary: [] });
  const [windowBuffer, setWindowBuffer] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(-1);
  const [autoFollow, _setAutoFollow] = useState(true);
  const [latestMetrics, setLatestMetrics] = useState({});

  // Ref mirrors autoFollow state so the stable WS onmessage closure
  // always reads the latest value without triggering reconnects.
  const autoFollowRef = useRef(true);
  const setAutoFollow = useCallback((v) => {
    autoFollowRef.current = v;
    _setAutoFollow(v);
  }, []);

  const wsRef = useRef(null);

  useEffect(() => {
    fetch(`${API}/api/attributes`)
      .then(r => r.json())
      .then(setApiAttributes)
      .catch(() => {});
  }, []);

  // Single stable WebSocket connection — never re-run due to autoFollow changes.
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
          const win = buildWindow(msg);
          setLatestMetrics(msg.metrics || {});
          setWindowBuffer(prev => {
            const next = [...prev.slice(-199), win];
            if (autoFollowRef.current) setCurrentIdx(next.length - 1);
            return next;
          });
        } else if (msg.type === 'done') {
          setRunning(false);
        } else if (msg.type === 'produce_done') {
          setProducing(false);
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
  }, []); // stable — no deps

  const startStream = useCallback(async (config) => {
    setWindowBuffer([]);
    setCurrentIdx(-1);
    setAutoFollow(true);

    const blockSize = parseInt(config.blockSize) || 5;
    const fairnessCounts = {};
    for (const [k, pct] of Object.entries(config.constraints)) {
      fairnessCounts[k] = Math.max(0, Math.round((parseInt(pct) || 0) / 100 * blockSize));
    }

    const body = {
      topic_name: config.kafkaTopic,
      window_size: parseInt(config.windowSize) || 20,
      block_size: blockSize,
      max_windows: parseInt(config.maxWindows) || 500,
      fairness: fairnessCounts,
      delay_ms: config.delayMs ?? 150,
    };

    const r = await fetch(`${API}/api/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await r.json();
    if (data.status !== 'error') setRunning(true);
  }, [setAutoFollow]);

  const stopStream = useCallback(() => {
    fetch(`${API}/api/stop`, { method: 'POST' });
    setRunning(false);
  }, []);

  const produceData = useCallback(async (kafkaTopic) => {
    setProducing(true);
    const r = await fetch(`${API}/api/produce`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic_name: kafkaTopic }),
    });
    const data = await r.json();
    if (data.status !== 'started') setProducing(false);
  }, []);

  const goNext = useCallback(() => {
    setAutoFollow(false);
    setCurrentIdx(i => i + 1);
  }, [setAutoFollow]);

  const goPrev = useCallback(() => {
    setAutoFollow(false);
    setCurrentIdx(i => Math.max(i - 1, 0));
  }, [setAutoFollow]);

  const resumeLive = useCallback(() => {
    setAutoFollow(true);
    setWindowBuffer(buf => {
      setCurrentIdx(buf.length - 1);
      return buf;
    });
  }, [setAutoFollow]);

  const currentWindow = windowBuffer[currentIdx] ?? null;
  const canNext = currentIdx >= 0 && currentIdx < windowBuffer.length - 1;
  const canPrev = currentIdx > 0;
  const isLive = autoFollow;

  return {
    connected,
    running,
    producing,
    apiAttributes,
    currentWindow,
    windowBuffer,
    currentIdx,
    canNext,
    canPrev,
    isLive,
    latestMetrics,
    startStream,
    stopStream,
    produceData,
    goNext,
    goPrev,
    resumeLive,
  };
}
