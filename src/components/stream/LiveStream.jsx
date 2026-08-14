import Block from './Block';
import BlockNavigator from './BlockNavigator';
import { genreDistribution } from '../../utils/metrics';
import { getGenreColor, GENRE_LABELS } from '../../constants/genres';
import { useState, useEffect } from 'react';

function isBlockFair(block, constraints, blockSize) {
  const counts = {};
  for (const item of block) counts[item.genre] = (counts[item.genre] || 0) + 1;
  return Object.entries(constraints).every(([g, pct]) => {
    if (!pct) return true;
    const p = (parseInt(pct) || 0) / 100;
    const floor = Math.floor(p * blockSize);
    const ceil = Math.ceil(p * blockSize);
    const c = counts[g] || 0;
    return c >= floor && c <= ceil;
  });
}

export default function LiveStream({ liveStream, config, onEnd }) {
  const {
    connected, running, currentWindow, canNext, canPrev,
    latestMetrics, goNext, goPrev, goToIdx, windowBuffer, currentIdx, maxReachedIdx,
    landmarkLoadedIndices, reordered,
  } = liveStream;

  const [activeBlockIndex, setActiveBlockIndex] = useState(0);
  useEffect(() => { setActiveBlockIndex(0); }, [currentIdx]);

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

  const { windowNumber, blocks, reorderedBlocks, isFair, fairText, preprocessingMs, queryMs, attribute } = currentWindow;
  const activeBlocks = reordered ? (reorderedBlocks || blocks) : blocks;
  const safeIdx = Math.min(activeBlockIndex, activeBlocks.length - 1);
  const activeBlock = activeBlocks[safeIdx] || [];
  const origBlock = blocks[safeIdx] || [];

  const dist = genreDistribution(activeBlock);
  const origDist = genreDistribution(origBlock);
  const blockFair = isBlockFair(activeBlock, constraints, currentWindow.blockSize);
  const uniqueGenres = [...new Set(activeBlocks.flat().map(i => i.genre))].sort();

  return (
    <div className="h-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              Window {windowNumber}
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                isFair ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'
              }`}>
                {isFair ? '✓ window fair' : '✗ window unfair'}
              </span>
              {reordered && (
                <span className="text-sm font-semibold text-violet-600 bg-violet-50 border border-violet-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  🔄 Reordered
                </span>
              )}
            </h2>
          </div>
          <p className="text-base text-slate-500 mt-1 flex items-center gap-3">
            {currentWindow.items.length} items · {blocks.length} block{blocks.length !== 1 ? 's' : ''}
            {attribute && <span className="text-slate-400">· {attribute}</span>}
            {landmarkLoadedIndices.has(currentIdx) && (
              <span className="flex items-center gap-1 text-amber-500 font-semibold text-sm">
                🔄 Landmark Affected
              </span>
            )}
          </p>
        </div>

        <div className="flex gap-3 text-xs text-slate-500">
          {preprocessingMs != null && (
            <span className="bg-slate-100 rounded-full px-3 py-1">
              Bitrate: <strong className="text-slate-700">{preprocessingMs.toFixed(3)} ms</strong>
            </span>
          )}
          {queryMs != null && (
            <span className="bg-slate-100 rounded-full px-3 py-1">
              Processing: <strong className="text-slate-700">{queryMs.toFixed(3)} ms</strong>
            </span>
          )}
        </div>
      </div>

      {/* Block distribution panel */}
      <div className="flex items-stretch gap-6 p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="flex-1 flex flex-col gap-3">
          <span className="text-base font-semibold text-slate-600 uppercase tracking-wide">
            Block {safeIdx + 1} Distribution{reordered ? ' (Reordered)' : ''}
          </span>
          <div className="flex h-10 w-full rounded-lg overflow-hidden border border-slate-200">
            {uniqueGenres.map(genre => {
              const pct = dist[genre] || 0;
              const color = getGenreColor(genre);
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
              const color = getGenreColor(genre);
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

          {/* Before/after comparison when reordered */}
          {reordered && (
            <div className="mt-1 pt-3 border-t border-slate-100">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Original</span>
              <div className="flex flex-wrap gap-3 mt-1">
                {uniqueGenres.map(genre => {
                  const pct = origDist[genre] || 0;
                  const color = getGenreColor(genre);
                  return (
                    <span key={genre} className="flex items-center gap-1.5 text-sm text-slate-500">
                      <span className="inline-block w-2.5 h-2.5 rounded-sm opacity-60" style={{ backgroundColor: color?.bg || '#94a3b8' }} />
                      {GENRE_LABELS[genre] ?? genre}: <span className="font-medium">{pct}%</span>
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="w-px bg-slate-200 self-stretch" />

        {/* Block-level fairness badge */}
        <div className={`flex flex-col items-center justify-center gap-2 px-8 rounded-lg min-w-36 ${
          blockFair ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'
        }`}>
          <span className={`text-4xl font-bold ${blockFair ? 'text-emerald-600' : 'text-red-500'}`}>
            {blockFair ? '✓' : '✗'}
          </span>
          <span className={`text-sm font-semibold tracking-wide text-center ${blockFair ? 'text-emerald-600' : 'text-red-500'}`}>
            {blockFair ? 'Fair' : 'Not Fair'}
          </span>
        </div>
      </div>

      {/* Active block */}
      <div className="flex-1">
        <Block movies={activeBlock} blockIndex={safeIdx} totalBlocks={activeBlocks.length} />
      </div>

      {/* Block navigator */}
      <BlockNavigator
        activeIndex={safeIdx}
        totalBlocks={activeBlocks.length}
        onNavigate={setActiveBlockIndex}
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

        {/* Paginated window dots — groups of 5 */}
        {(() => {
          const PAGE_SIZE = 5;
          const page = Math.floor(currentIdx / PAGE_SIZE);
          const pageStart = page * PAGE_SIZE;
          const indices = Array.from({ length: PAGE_SIZE }, (_, i) => pageStart + i);
          return (
            <div className="flex gap-2">
              {indices.map(i => {
                const isActive = i === currentIdx;
                const inBuffer = i < windowBuffer.length;
                // clickable if manually reached OR unlocked by landmark reorder
                const isAccessible = inBuffer && (i <= maxReachedIdx || landmarkLoadedIndices.has(i));
                const winNum = windowBuffer[i]?.windowNumber ?? i + 1;
                return (
                  <button
                    key={i}
                    onClick={() => isAccessible && goToIdx(i)}
                    disabled={!isAccessible}
                    className={`w-7 h-7 rounded-full text-[11px] font-semibold transition-colors flex items-center justify-center
                      ${isActive
                        ? 'bg-emerald-500 text-white shadow'
                        : isAccessible
                        ? 'bg-slate-300 hover:bg-slate-400 text-slate-700'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                  >
                    {winNum}
                  </button>
                );
              })}
            </div>
          );
        })()}

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
