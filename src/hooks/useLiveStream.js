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
  const [apiDatasets, setApiDatasets] = useState([]);
  const [windowBuffer, setWindowBuffer] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(-1);
  const [latestMetrics, setLatestMetrics] = useState({});
  const [producedTopic, setProducedTopic] = useState(null);
  const [producedDataset, setProducedDataset] = useState(null);

  const wsRef = useRef(null);

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
          const win = buildWindow(msg);
          setLatestMetrics(msg.metrics || {});
          setWindowBuffer(prev => {
            const next = [...prev.slice(-499), win];
            // Auto-show first window only; rest are manual
            if (prev.length === 0) setCurrentIdx(0);
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
  }, []);

  const startStream = useCallback(async (config) => {
    setWindowBuffer([]);
    setCurrentIdx(-1);

    const blockSize = parseInt(config.blockSize) || 5;
    const fairnessCounts = {};
    for (const [k, pct] of Object.entries(config.constraints)) {
      fairnessCounts[k] = Math.max(0, Math.round((parseInt(pct) || 0) / 100 * blockSize));
    }

    const body = {
      topic_name: config.kafkaTopic,
      window_size: parseInt(config.windowSize) || 10,
      block_size: blockSize,
      max_windows: parseInt(config.maxWindows) || 50,
      fairness: fairnessCounts,
      attribute_column: config.attributeColumn || 'GENDER',
      delay_ms: config.delayMs ?? 0,
    };

    const r = await fetch(`${API}/api/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await r.json();
    if (data.status !== 'error') setRunning(true);
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
    setCurrentIdx(i => i + 1);
  }, []);

  const goPrev = useCallback(() => {
    setCurrentIdx(i => Math.max(i - 1, 0));
  }, []);

  const currentWindow = windowBuffer[currentIdx] ?? null;
  const canNext = currentIdx >= 0 && currentIdx < windowBuffer.length - 1;
  const canPrev = currentIdx > 0;

  return {
    connected,
    running,
    producing,
    apiDatasets,
    currentWindow,
    windowBuffer,
    currentIdx,
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
  };
}
