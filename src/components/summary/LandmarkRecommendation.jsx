import { useEffect, useState } from 'react';

const API = 'http://127.0.0.1:8000';

export default function LandmarkRecommendation({ session }) {
  const { state } = session;
  const [status, setStatus] = useState('loading');
  const [pareto, setPareto] = useState([]);
  const [pick, setPick] = useState(0);
  const [message, setMessage] = useState('');

  const config = state.config;
  const xMax = parseInt(config.landmarkSize) || 5;

  const windowCount = state.windows.length;

  useEffect(() => {
    // No cancel guard: under StrictMode the effect runs twice and cancelling
    // the first run's response was discarding the only result that arrived,
    // leaving the panel spinning forever. A late response just writes the same
    // data twice, which is harmless.

    // The sweep runs on the stream as it arrived, before any reorder, so the
    // recommendation reflects the raw data rather than a stream the user has
    // already improved.
    // Windows overlap by all but one item, so concatenating them would send
    // the same rows hundreds of times. The stream is the first window plus the
    // one new item each later window brought in.
    const stream = [];
    state.windows.forEach((w, i) => {
      const items = (w.movies || []).map(m => m.raw).filter(Boolean);
      if (i === 0) stream.push(...items);
      else if (items.length) stream.push(items[items.length - 1]);
    });
    const totalPct = Object.values(config.constraints || {}).reduce((s, v) => s + (parseFloat(v) || 0), 0);
    const proportions = {};
    for (const [k, pct] of Object.entries(config.constraints || {})) {
      proportions[k] = totalPct ? (parseFloat(pct) || 0) / totalPct : 0;
    }

    if (stream.length < (parseInt(config.windowSize) || 10)) {
      setStatus('empty');
      return;
    }

    fetch(`${API}/api/ablation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        stream_items: stream,
        window_size: parseInt(config.windowSize) || 10,
        block_size: parseInt(config.blockSize) || 5,
        proportions,
        attribute_column: config.protectedAttributeColumn || 'GENDER',
        x_max: xMax,
      }),
    })
      .then(r => r.json())
      .then(d => {
        if (d.status !== 'ok' || !d.pareto?.length) {
          setMessage(d.message || 'No landmark sizes could be compared for this session.');
          setStatus('empty');
          return;
        }
        setPareto(d.pareto);
        setPick(0);
        setStatus('ready');
      })
      .catch(e => {
        setMessage(e.message);
        setStatus('empty');
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowCount]);

  if (status === 'loading') {
    return (
      <div className="mt-6 p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">Landmark Recommendation</h3>
        <div className="flex items-center gap-3 text-slate-500">
          <span className="inline-block w-5 h-5 border-2 border-slate-300 border-t-emerald-500 rounded-full animate-spin" />
          <span className="text-base">Loading the recommendations…</span>
        </div>
        <p className="text-sm text-slate-400 mt-2">
          Sweeping landmark 1 to {xMax} over the original stream.
        </p>
      </div>
    );
  }

  if (status === 'empty') {
    return (
      <div className="mt-6 p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Landmark Recommendation</h3>
        <p className="text-base text-slate-400">
          {message || 'Explore more windows to unlock a recommendation.'}
        </p>
      </div>
    );
  }

  const chosen = pareto[Math.min(pick, pareto.length - 1)];
  const maxLatency = Math.max(...pareto.map(p => p.latency_ms));
  const minLatency = Math.min(...pareto.map(p => p.latency_ms));

  return (
    <div className="mt-6 p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
      <h3 className="text-2xl font-bold text-slate-900 mb-5">Landmark Recommendation</h3>

      {pareto.length > 1 ? (
        <div className="mb-6">
          <input
            type="range"
            min={0}
            max={pareto.length - 1}
            step={1}
            value={Math.min(pick, pareto.length - 1)}
            onChange={e => setPick(parseInt(e.target.value))}
            className="w-full accent-emerald-600"
          />
          <div className="flex justify-between text-sm text-slate-500 mt-1">
            <span>Minimum latency</span>
            <span>Maximum fairness</span>
          </div>
        </div>
      ) : (
        // With a single point on the front there is nothing to trade off, and
        // a slider pinned to one end reads as broken rather than as decided.
        <p className="mb-6 text-base text-slate-500">
          One landmark size wins outright here, so there is no latency to trade
          against fairness and nothing to drag.
        </p>
      )}

      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
        <p className="text-lg text-emerald-700">
          Recommended landmark size:
          <span className="font-bold text-slate-900 text-4xl ml-2">{chosen.landmark}</span>
        </p>
        <p className="text-base text-emerald-600 mt-3">
          The pareto front between fairness achieved ({chosen.pct_fair}% of blocks fair) and
          reordering latency ({chosen.latency_ms} ms) is analyzed and best landmark size
          is {chosen.landmark}.
        </p>
      </div>

      <p className="text-sm text-slate-400 mt-4">
        {pareto.length > 1
          ? `${pareto.length} landmark sizes sit on the pareto front, from ${minLatency} ms up to `
            + `${maxLatency} ms. Drag the slider to trade latency for fairness.`
          : `Landmark ${chosen.landmark} was both the fairest and the fastest of the sizes swept, `
            + `so every other size is dominated and the front holds one point.`}
      </p>
    </div>
  );
}
