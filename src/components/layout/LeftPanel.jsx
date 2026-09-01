import { useEffect, useState } from 'react';
import ParameterInputs from '../config/ParameterInputs';
import { TOPICS } from '../../constants/topics';
import { isWindowFair } from '../../utils/reorder';

const MONITOR_ONLY_TOPICS = Object.entries(TOPICS)
  .filter(([, v]) => v.monitorOnly)
  .map(([k]) => k);

const REORDER_TOPICS = Object.entries(TOPICS)
  .filter(([, v]) => !v.monitorOnly)
  .map(([k]) => k);

// Stream until the user stops rather than cutting off at a fixed count.
const MAX_WINDOWS = 100000;

const round1 = n => Math.round(n * 10) / 10;

// Constraints are percentages, not counts, so decimals are legitimate. Strip
// anything that is not a digit or a single dot, which also blocks the minus
// sign that was letting negative shares through, and cap at 100.
const MAX_DECIMALS = 1;

function sanitizeConstraint(raw) {
  let s = String(raw).replace(/[^\d.]/g, '');
  const dot = s.indexOf('.');
  if (dot !== -1) {
    // one decimal point, and no more precision than a percentage warrants
    const frac = s.slice(dot + 1).replace(/\./g, '').slice(0, MAX_DECIMALS);
    s = s.slice(0, dot + 1) + frac;
  }
  if (s === '' || s === '.') return s;
  return parseFloat(s) > 100 ? '100' : s;
}

export default function LeftPanel({ session, width }) {
  const { state, liveStream, setConfig, startMonitor, endSession } = session;
  const { config, phase } = state;
  const [logoOk, setLogoOk] = useState(true);

  const topicConfig = TOPICS[config.topic];
  const isMonitorOnly = topicConfig?.monitorOnly ?? true;
  const attrOptions = topicConfig?.protectedAttributes ?? [];

  const apiDataset = liveStream.apiDatasets.find(d => d.name === config.topic);
  const apiAttr = apiDataset?.attributes.find(a => a.column === config.protectedAttributeColumn);
  const uniqueValues = apiAttr?.unique_values ?? [];
  const suggested = apiAttr?.suggested_constraints ?? {};


  // Compute proportions from constraints for landmark reorder
  const proportions = (() => {
    const totalPct = Object.values(config.constraints || {}).reduce((s, v) => s + (parseFloat(v) || 0), 0);
    if (!totalPct) return {};
    const p = {};
    for (const [k, pct] of Object.entries(config.constraints || {})) {
      p[k] = (parseFloat(pct) || 0) / totalPct;
    }
    return p;
  })();

  // Prefill with each value's real share of the dataset, falling back to an
  // equal split if the backend did not report shares. Rounding leftovers go
  // to the largest value so the boxes still add up to 100.
  const defaultConstraints = () => {
    const n = uniqueValues.length;
    const out = {};
    if (n > 0 && Object.keys(suggested).length === n) {
      // keep the reported share as-is; rounding 3.9 to 4 loses information
      let total = 0;
      uniqueValues.forEach(v => {
        out[v] = round1(Math.max(0, suggested[v]));
        total += out[v];
      });
      const biggest = uniqueValues.reduce((a, b) => (out[a] >= out[b] ? a : b));
      out[biggest] = round1(out[biggest] + (100 - total));
      return out;
    }
    const equal = Math.floor(100 / n);
    uniqueValues.forEach((v, i) => {
      out[v] = i === 0 ? 100 - equal * (n - 1) : equal;
    });
    return out;
  };

  useEffect(() => {
    if (phase !== 'config') return;
    if (uniqueValues.length === 0) return;
    if (Object.keys(config.constraints).length > 0) return;
    setConfig({ constraints: defaultConstraints() });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uniqueValues.join(','), config.topic, config.protectedAttributeColumn, phase]);

  const constraintTotal = round1(
    uniqueValues.reduce((s, v) => s + (parseFloat(config.constraints[v]) || 0), 0)
  );
  const constraintsOk = uniqueValues.length === 0 || Math.abs(constraintTotal - 100) < 0.05;

  // Spread the shortfall or excess evenly across the values until they total
  // exactly 100. Values are never driven below zero, so an excess that one
  // value cannot absorb rolls onto the others rather than going negative.
  const autoFixConstraints = () => {
    const n = uniqueValues.length;
    if (!n) return config.constraints;
    const out = {};
    uniqueValues.forEach(v => { out[v] = Math.max(0, parseFloat(config.constraints[v]) || 0); });
    const sum = () => uniqueValues.reduce((s, v) => s + out[v], 0);

    for (let guard = 0; guard < 50 && Math.abs(100 - sum()) > 0.05; guard++) {
      const diff = 100 - sum();
      // when trimming, only values with something left can give any back
      const active = uniqueValues.filter(v => diff > 0 || out[v] > 0);
      if (!active.length) break;
      const share = diff / active.length;
      active.forEach(v => { out[v] = Math.max(0, round1(out[v] + share)); });
    }
    // rounding drift lands on the largest value so the total is exactly 100
    const drift = round1(100 - sum());
    if (Math.abs(drift) > 0.05) {
      const biggest = uniqueValues.reduce((a, b) => (out[a] >= out[b] ? a : b));
      out[biggest] = Math.max(0, round1(out[biggest] + drift));
    }
    uniqueValues.forEach(v => { out[v] = round1(out[v]); });
    return out;
  };

  const handleTopicChange = (topic) => {
    const preset = TOPICS[topic];
    if (!preset) return;
    const firstAttr = preset.protectedAttributes?.[0];
    setConfig({
      topic,
      protectedAttribute: firstAttr?.label ?? '',
      protectedAttributeColumn: firstAttr?.column ?? '',
      kafkaTopic: preset.topic,
      constraints: {},
    });
  };

  const handleAttributeChange = (label) => {
    const match = attrOptions.find(a => a.label === label);
    if (!match) return;
    setConfig({
      protectedAttribute: match.label,
      protectedAttributeColumn: match.column,
      constraints: {},
    });
  };

  const handleMonitor = () => {
    let constraintsToUse = config.constraints;
    if (uniqueValues.length > 0 && Object.keys(constraintsToUse).length === 0) {
      constraintsToUse = defaultConstraints();
      setConfig({ constraints: constraintsToUse });
    }
    startMonitor();
    liveStream.startStream({
      kafkaTopic: liveStream.producedTopic,
      windowSize: config.windowSize || 10,
      blockSize: config.blockSize || 5,
      landmarkSize: config.landmarkSize || 5,
      maxWindows: MAX_WINDOWS,
      delayMs: 0,
      constraints: constraintsToUse,
      attributeColumn: config.protectedAttributeColumn || 'GENDER',
    });
  };

  const currentWindow = liveStream.currentWindow;
  const reorderStatus = liveStream.reorderStatus;
  const needsLandmark = reorderStatus?.phase === 'needs_landmark';
  const isLoading = reorderStatus?.phase === 'loading';
  const activeBlocks = liveStream.reordered
    ? (currentWindow?.reorderedBlocks || currentWindow?.blocks || [])
    : (currentWindow?.blocks || []);
  const windowCurrentlyFair = currentWindow
    ? isWindowFair(activeBlocks, config.constraints || {}, currentWindow.blockSize)
    : true;
  const isLandmarkAffected = liveStream.landmarkLoadedIndices.has(liveStream.currentIdx);
  const canReorder = phase === 'streaming'
    && !isMonitorOnly
    && currentWindow
    && !windowCurrentlyFair
    && !currentWindow.isReordered
    && !isLandmarkAffected;

  const landmarkEnabled = needsLandmark;

  return (
    <aside
      style={width ? { width, minWidth: width } : undefined}
      className="w-96 min-w-96 shrink-0 bg-white border-r border-slate-200 flex flex-col h-screen overflow-y-auto"
    >
      {/* Header */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            {/* The wordmark is the logo when the image is present, and falls
                back to text if it is missing so the header never renders
                empty. */}
            {logoOk ? (
              <img
                src="/cobloc-logo.png"
                alt="CoBLOC"
                className="h-16 w-auto max-w-full object-contain object-left"
                onError={() => setLogoOk(false)}
              />
            ) : (
              <h1 className="text-4xl font-bold text-slate-900 tracking-tight">CoBLOC</h1>
            )}
          </div>
          <span className={`shrink-0 whitespace-nowrap flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
            liveStream.connected
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-slate-100 text-slate-400'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${liveStream.connected ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
            {liveStream.connected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
        {/* Full width, below the badge. Sharing a row with it squeezed the
            subtitle into two cramped lines that ran into the badge. */}
        <p className="text-base text-slate-500 mt-2">Continuous Block Level Fairness on Data Streams</p>
      </div>

      {/* Config */}
      <div className="p-6 space-y-6 flex-1">

        {/* Dataset selector — grouped */}
        <div>
          <label className="block text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">
            Topic of Exploration
          </label>
          <div className="relative">
            <select
              value={config.topic}
              onChange={e => handleTopicChange(e.target.value)}
              disabled={phase !== 'config'}
              className="w-full appearance-none bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-base text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:opacity-50 pr-10"
            >
              {MONITOR_ONLY_TOPICS.length > 0 && (
                <optgroup label="Monitor Only">
                  {MONITOR_ONLY_TOPICS.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </optgroup>
              )}
              {REORDER_TOPICS.length > 0 && (
                <optgroup label="Reorder Available">
                  {REORDER_TOPICS.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </optgroup>
              )}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">▾</span>
          </div>
        </div>

        {/* Protected attribute selector */}
        <div>
          <label className="block text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">
            Protected Attribute
          </label>
          <div className="relative">
            <select
              value={config.protectedAttribute}
              onChange={e => handleAttributeChange(e.target.value)}
              disabled={phase !== 'config'}
              className="w-full appearance-none bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-base text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:opacity-50 pr-10"
            >
              {attrOptions.map(a => (
                <option key={a.label} value={a.label}>{a.label}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">▾</span>
          </div>
        </div>

        {/* Suggested constraints — each value's actual share of the dataset */}
        {uniqueValues.length > 0 && (
          <div className="bg-slate-50 rounded-lg p-3 text-sm text-slate-600 border border-slate-200">
            <span className="font-medium">Suggested constraints:</span>{' '}
            {uniqueValues
              .map(v => (suggested[v] != null ? `${v} (${suggested[v]}%)` : v))
              .join(', ')}
          </div>
        )}

        {/* Constraints */}
        {uniqueValues.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">
              Constraints
            </label>
            <div className="space-y-2">
              {uniqueValues.map(v => (
                <div key={v} className="flex items-center gap-3">
                  <span className="text-sm text-slate-700 w-36 truncate">{v}</span>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={config.constraints[v] ?? ''}
                    onChange={e => setConfig({ constraints: { ...config.constraints, [v]: sanitizeConstraint(e.target.value) } })}
                    disabled={phase !== 'config'}
                    className="w-20 bg-slate-100 border border-slate-300 rounded-lg px-3 py-1.5 text-sm text-slate-900 focus:outline-none focus:border-emerald-500 disabled:opacity-50"
                  />
                  <span className="text-sm text-slate-400">%</span>
                </div>
              ))}
            </div>

            <div className="mt-3 flex items-center justify-between gap-3">
              <span className={`text-sm font-medium ${constraintsOk ? 'text-emerald-600' : 'text-amber-600'}`}>
                Total: {constraintTotal}%
              </span>
              {!constraintsOk && phase === 'config' && (
                <button
                  onClick={() => setConfig({ constraints: autoFixConstraints() })}
                  className="text-sm font-semibold px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-white transition-colors"
                >
                  Auto-fix
                </button>
              )}
            </div>

            {!constraintsOk && (
              <p className="mt-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                Constraints must add up to 100%. They currently total {constraintTotal}%
                {constraintTotal < 100
                  ? `, ${100 - constraintTotal}% short.`
                  : `, ${constraintTotal - 100}% over.`}
                {' '}Auto-fix spreads the difference evenly.
              </p>
            )}
          </div>
        )}

        {/* Produce button */}
        {phase === 'config' && (
          <button
            onClick={() => liveStream.produceData(config.topic)}
            disabled={liveStream.producing || !liveStream.connected}
            className="w-full py-2 px-4 bg-sky-50 hover:bg-sky-100 disabled:opacity-40 border border-sky-200 text-sky-700 font-medium rounded-lg text-sm transition-colors"
          >
            {liveStream.producing ? 'Producing...' : 'Produce data to Kafka first'}
          </button>
        )}

        {/* Window / Block / Landmark size */}
        <ParameterInputs
          config={config}
          onChange={setConfig}
          disabled={phase !== 'config'}
          monitorOnly={isMonitorOnly}
          landmarkEnabled={landmarkEnabled}
        />
      </div>

      {/* Actions */}
      <div className="p-6 border-t border-slate-200 space-y-3">
        {phase === 'streaming' && liveStream.running && (
          <button
            onClick={() => { liveStream.stopStream(); endSession(liveStream.visitedWindows); }}
            className="w-full py-3 px-4 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg text-base transition-colors"
          >
            Stop Stream
          </button>
        )}

        {!(phase === 'streaming' && liveStream.running) && (
          <button
            onClick={handleMonitor}
            disabled={phase === 'streaming' || !liveStream.producedTopic || liveStream.producedDataset !== config.topic || !constraintsOk}
            title={!constraintsOk ? `Constraints total ${constraintTotal}%, they must add up to 100%` : undefined}
            className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-semibold rounded-lg text-base transition-colors"
          >
            Monitor
          </button>
        )}

        {/* Reorder — only for unfair, non-monitor-only, not yet reordered */}
        {canReorder && !liveStream.reordered && !needsLandmark && (
          <button
            onClick={() => liveStream.triggerInternalReorder(currentWindow, liveStream.currentIdx, config.constraints)}
            className="w-full py-3 px-4 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-lg text-base transition-colors"
          >
            Reorder
          </button>
        )}

        {/* Loading indicator */}
        {isLoading && (
          <div className="rounded-lg px-4 py-3 text-sm border bg-amber-50 border-amber-200 text-amber-700 flex items-center gap-2">
            <span className="animate-spin text-base">⏳</span>
            <p className="font-medium">{reorderStatus.message}</p>
          </div>
        )}

        {/* Status message. Tied to the streaming phase: it describes the
            window being looked at, so it has no meaning once the session ends
            and it was still on screen during the next session's setup. */}
        {reorderStatus && !isLoading && phase === 'streaming' && (
          <div className={`rounded-lg px-4 py-3 text-sm border ${
            reorderStatus.phase === 'done'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
              : reorderStatus.phase === 'error'
              ? 'bg-red-50 border-red-200 text-red-700'
              : 'bg-amber-50 border-amber-200 text-amber-700'
          }`}>
            <p className="font-medium">{reorderStatus.message}</p>
          </div>
        )}

        {/* Landmark reorder button — shown after internal reorder fails */}
        {needsLandmark && (
          <button
            onClick={() => liveStream.triggerLandmarkReorder(
              currentWindow,
              liveStream.currentIdx,
              parseInt(config.landmarkSize) || 5,
              proportions,
              config.protectedAttributeColumn || 'GENDER'
            )}
            disabled={!config.landmarkSize || parseInt(config.landmarkSize) < 1}
            className="w-full py-3 px-4 bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white font-semibold rounded-lg text-base transition-colors"
          >
            Reorder with Landmark
          </button>
        )}
      </div>
    </aside>
  );
}
