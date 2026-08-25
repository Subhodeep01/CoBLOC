import { useEffect, useRef, useState } from 'react';
import { genreDistribution } from '../../utils/metrics';
import { GENRE_COLORS, GENRE_LABELS } from '../../constants/genres';

function computeSerendipitousBlock(windows) {
  const allBlocks = [];
  windows.forEach((win, wi) => {
    win.blocks.forEach((block, bi) => {
      allBlocks.push({ dist: genreDistribution(block), wi, bi });
    });
  });

  if (allBlocks.length === 0) return null;

  const genres = [...new Set(allBlocks.flatMap(b => Object.keys(b.dist)))];
  const avg = {};
  for (const g of genres) {
    avg[g] = allBlocks.reduce((s, b) => s + (b.dist[g] || 0), 0) / allBlocks.length;
  }

  let maxDev = -1;
  let best = null;
  for (const { dist, wi, bi } of allBlocks) {
    const dev = genres.reduce((s, g) => s + Math.abs((dist[g] || 0) - (avg[g] || 0)), 0);
    if (dev > maxDev) { maxDev = dev; best = { wi, bi, dist, dev }; }
  }
  return best;
}

function DistBar({ blocks, label }) {
  const allItems = blocks.flat();
  const dist = genreDistribution(allItems);
  const genres = Object.keys(dist).sort();
  return (
    <div className="space-y-1.5">
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</span>
      <div className="flex h-5 w-full rounded overflow-hidden border border-slate-200">
        {genres.map(g => {
          const pct = dist[g] || 0;
          const color = GENRE_COLORS[g]?.bg || '#94a3b8';
          return (
            <div
              key={g}
              style={{ width: `${pct}%`, backgroundColor: color }}
              title={`${GENRE_LABELS[g] ?? g}: ${pct}%`}
              className="flex items-center justify-center"
            >
              {pct >= 12 && (
                <span className="text-[10px] font-bold text-white drop-shadow">{pct}%</span>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-3">
        {genres.map(g => {
          const pct = dist[g] || 0;
          const color = GENRE_COLORS[g]?.bg || '#94a3b8';
          return (
            <span key={g} className="flex items-center gap-1.5 text-xs text-slate-600">
              <span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: color }} />
              {GENRE_LABELS[g] ?? g}: <span className="font-semibold text-slate-800">{pct}%</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default function HighlightedWindows({ windows, monitorOnly }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeDotRef = useRef(null);

  useEffect(() => {
    activeDotRef.current?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }, [activeIdx]);

  const serendipitous = computeSerendipitousBlock(windows);

  const serendipitousPanel = serendipitous && (
    <div className="mt-6">
      <h3 className="text-xl font-semibold text-slate-900 mb-2">Serendipitous Moment</h3>
      <p className="text-sm text-slate-400 mb-3">
        The block with the most unique distribution compared to the rest of the session.
      </p>
      <div className="p-5 bg-amber-50 border border-amber-200 rounded-xl">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-amber-500 text-xl">✦</span>
          <span className="text-slate-900 font-semibold text-lg">
            Window {serendipitous.wi + 1}, Block {serendipitous.bi + 1}
          </span>
          <span className="text-sm text-amber-600 ml-1">Most distinctive</span>
        </div>
        <div className="flex flex-wrap gap-4">
          {Object.entries(serendipitous.dist).map(([genre, pct]) => (
            <span key={genre} className="flex items-center gap-2 text-sm text-slate-600">
              <span
                className="inline-block w-3 h-3 rounded-sm"
                style={{ backgroundColor: GENRE_COLORS[genre]?.bg || '#94a3b8' }}
              />
              {GENRE_LABELS[genre] ?? genre}: <span className="text-slate-900 font-semibold ml-0.5">{pct}%</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  if (monitorOnly) {
    return serendipitousPanel || null;
  }

  const reordered = windows
    .map((w, i) => ({ ...w, originalIndex: i }))
    .filter(w => w.isReordered && w.reorderedBlocks != null);

  if (reordered.length === 0) {
    return (
      <>
        {serendipitousPanel}
        <div className="mt-6 p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
          <p className="text-base text-slate-400">No reorders were performed during this session.</p>
        </div>
      </>
    );
  }

  const safeIdx = Math.min(activeIdx, reordered.length - 1);
  const active = reordered[safeIdx];

  return (
    <>
    {serendipitousPanel}
    <div className="mt-6">
      <h3 className="text-2xl font-bold text-slate-900 mb-4">Reordered Windows: Before &amp; After</h3>

      {/* Dot navigator */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
        {reordered.map((w, i) => (
          <button
            key={w.originalIndex}
            onClick={() => setActiveIdx(i)}
            ref={i === safeIdx ? activeDotRef : null}
            className={`flex flex-col items-center gap-1 group shrink-0`}
          >
            <span className={`w-8 h-8 rounded-full text-xs font-semibold flex items-center justify-center transition-colors ${
              i === safeIdx
                ? 'bg-violet-600 text-white shadow'
                : 'bg-slate-200 text-slate-600 hover:bg-violet-200'
            }`}>
              {w.originalIndex + 1}
            </span>
          </button>
        ))}
      </div>

      {/* Active window before/after */}
      <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-slate-900">Window {active.originalIndex + 1}</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-violet-100 text-violet-700">Reordered</span>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <DistBar blocks={active.blocks} label="Before" />
          <DistBar blocks={active.reorderedBlocks} label="After" />
        </div>
      </div>

      {reordered.length > 1 && (
        <div className="flex justify-between mt-3">
          <button
            onClick={() => setActiveIdx(i => Math.max(0, i - 1))}
            disabled={safeIdx === 0}
            className="px-4 py-1.5 text-sm bg-slate-100 hover:bg-slate-200 disabled:opacity-30 rounded-lg font-medium text-slate-700"
          >
            ← Prev
          </button>
          <span className="text-sm text-slate-400">{safeIdx + 1} of {reordered.length}</span>
          <button
            onClick={() => setActiveIdx(i => Math.min(reordered.length - 1, i + 1))}
            disabled={safeIdx === reordered.length - 1}
            className="px-4 py-1.5 text-sm bg-slate-100 hover:bg-slate-200 disabled:opacity-30 rounded-lg font-medium text-slate-700"
          >
            Next →
          </button>
        </div>
      )}
    </div>
    </>
  );
}
