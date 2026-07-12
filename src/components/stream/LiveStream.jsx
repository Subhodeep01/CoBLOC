import Block from './Block';
import BlockNavigator from './BlockNavigator';
import { genreDistribution } from '../../utils/metrics';
import { GENRE_COLORS, GENRE_LABELS } from '../../constants/genres';
import { useState } from 'react';

const FAIRNESS_TOLERANCE = 10;

function isBlockFair(dist, constraints) {
  for (const [genre, target] of Object.entries(constraints)) {
    if (!target) continue;
    if (Math.abs((dist[genre] || 0) - target) > FAIRNESS_TOLERANCE) return false;
  }
  return true;
}

export default function LiveStream({ liveStream, config, onEnd }) {
  const [activeBlockIndex, setActiveBlockIndex] = useState(0);

  const {
    connected, running, currentWindow, canNext, canPrev,
    latestMetrics, goNext, goPrev,
  } = liveStream;

  const constraints = config.constraints || {};

  if (!currentWindow) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="text-5xl">
            {connected ? (running ? '⏳' : '▶') : '🔌'}
          </div>
          <p className="text-slate-500 text-base">
            {!connected
              ? 'Connecting to backend…'
              : !running
              ? 'Click Monitor to start streaming'
              : 'Waiting for first window…'}
          </p>
        </div>
      </div>
    );
  }

  const { windowNumber, blocks, isFair, fairText, preprocessingMs, queryMs, attribute } = currentWindow;
  const safeIdx = Math.min(activeBlockIndex, blocks.length - 1);
  const activeBlock = blocks[safeIdx] || [];
  const dist = genreDistribution(activeBlock);
  const blockFair = isBlockFair(dist, constraints);

  const uniqueGenres = [...new Set(currentWindow.items.map(i => i.genre))].sort();

  return (
    <div className="h-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-slate-900">
              Window {windowNumber}
            </h2>
          </div>
          <p className="text-base text-slate-500 mt-1">
            {currentWindow.items.length} items · {blocks.length} block{blocks.length !== 1 ? 's' : ''}
            {attribute && <span className="ml-2 text-slate-400">· {attribute}</span>}
          </p>
        </div>

        {/* Latency chips */}
        <div className="flex gap-3 text-xs text-slate-500">
          {preprocessingMs != null && (
            <span className="bg-slate-100 rounded-full px-3 py-1">
              Pre: <strong className="text-slate-700">{preprocessingMs.toFixed(3)} ms</strong>
            </span>
          )}
          {queryMs != null && (
            <span className="bg-slate-100 rounded-full px-3 py-1">
              Query: <strong className="text-slate-700">{queryMs.toFixed(3)} ms</strong>
            </span>
          )}
        </div>
      </div>

      {/* Window fairness + distribution panel */}
      <div className="flex items-stretch gap-6 p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="flex-1 flex flex-col gap-3">
          <span className="text-base font-semibold text-slate-600 uppercase tracking-wide">
            Block {safeIdx + 1} Distribution
          </span>
          <div className="flex h-10 w-full rounded-lg overflow-hidden border border-slate-200">
            {uniqueGenres.map(genre => {
              const pct = dist[genre] || 0;
              const color = GENRE_COLORS[genre];
              return (
                <div
                  key={genre}
                  style={{ width: `${pct}%`, backgroundColor: color?.bg || '#94a3b8' }}
                  title={`${GENRE_LABELS[genre] ?? genre}: ${pct}%`}
                  className="relative flex items-center justify-center"
                >
                  {pct >= 10 && (
                    <span className="text-sm font-bold text-white drop-shadow">{pct}%</span>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-4">
            {uniqueGenres.map(genre => {
              const pct = dist[genre] || 0;
              const color = GENRE_COLORS[genre];
              const target = constraints[genre];
              return (
                <span key={genre} className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: color?.bg || '#94a3b8' }} />
                  {GENRE_LABELS[genre] ?? genre}:{' '}
                  <span className="text-slate-900 font-semibold">{pct}%</span>
                  {target ? <span className="text-slate-400">(target {target}%)</span> : null}
                </span>
              );
            })}
          </div>
        </div>

        <div className="w-px bg-slate-200 self-stretch" />

        {/* Window-level fairness verdict */}
        <div className={`flex flex-col items-center justify-center gap-2 px-8 rounded-lg min-w-36 ${
          isFair ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'
        }`}>
          <span className={`text-4xl font-bold ${isFair ? 'text-emerald-600' : 'text-red-500'}`}>
            {isFair ? '✓' : '✗'}
          </span>
          <span className={`text-sm font-semibold tracking-wide text-center ${isFair ? 'text-emerald-600' : 'text-red-500'}`}>
            {isFair ? 'Fair' : 'Not Fair'}
          </span>
        </div>
      </div>

      {/* Active block */}
      <div className="flex-1">
        <Block movies={activeBlock} blockIndex={safeIdx} totalBlocks={blocks.length} />
      </div>

      {/* Block navigator */}
      <BlockNavigator
        activeIndex={safeIdx}
        totalBlocks={blocks.length}
        onNavigate={(i) => setActiveBlockIndex(i)}
      />

      {/* Window navigator */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-200">
        <button
          onClick={goPrev}
          disabled={!canPrev}
          className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-700 font-medium rounded-lg text-sm transition-colors"
        >
          ← Prev Window
        </button>

        <button
          onClick={onEnd}
          className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium rounded-lg text-sm transition-colors"
        >
          End Session
        </button>

        <button
          onClick={goNext}
          disabled={!canNext}
          className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-700 font-medium rounded-lg text-sm transition-colors"
        >
          Next Window →
        </button>
      </div>
    </div>
  );
}
