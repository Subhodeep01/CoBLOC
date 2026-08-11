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

export default function HighlightedWindows({ windows, monitorOnly }) {
  if (monitorOnly) {
    const serendipitous = computeSerendipitousBlock(windows);
    if (!serendipitous) return null;
    const { wi, bi, dist } = serendipitous;
    return (
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-slate-900 mb-2">Serendipitous Moment</h3>
        <p className="text-sm text-slate-400 mb-3">
          The block with the most unique distribution compared to the rest of the session.
        </p>
        <div className="p-5 bg-amber-50 border border-amber-200 rounded-xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-amber-500 text-xl">✦</span>
            <span className="text-slate-900 font-semibold text-lg">
              Window {wi + 1}, Block {bi + 1}
            </span>
            <span className="text-sm text-amber-600 ml-1">Most distinctive</span>
          </div>
          <div className="flex flex-wrap gap-4">
            {Object.entries(dist).map(([genre, pct]) => (
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
  }

  function computeDistDelta(preBlocks, postBlocks) {
    const len = Math.min(preBlocks.length, postBlocks.length);
    if (len === 0) return 0;
    let total = 0;
    for (let i = 0; i < len; i++) {
      const pre = genreDistribution(preBlocks[i]);
      const post = genreDistribution(postBlocks[i]);
      const genres = [...new Set([...Object.keys(pre), ...Object.keys(post)])];
      for (const g of genres) {
        total += Math.abs((post[g] || 0) - (pre[g] || 0));
      }
    }
    return total / (len * 200);
  }

  const reordered = windows
    .map((w, i) => ({ ...w, originalIndex: i }))
    .filter(w => w.isReordered && w.reorderedBlocks != null)
    .map(w => ({ ...w, distDelta: computeDistDelta(w.blocks, w.reorderedBlocks) }))
    .sort((a, b) => b.distDelta - a.distDelta);

  if (reordered.length === 0) {
    return (
      <div className="mt-6 p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
        <p className="text-base text-slate-400">No reorders were performed during this session.</p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h3 className="text-2xl font-bold text-slate-900 mb-4">Most Serendipitous Moment</h3>
      <div className="space-y-3">
        {reordered.map((w) => {
          const pct = Math.round(w.distDelta * 100);
          const isHighImpact = pct > 50;
          return (
            <div
              key={w.originalIndex}
              className={`flex items-center justify-between p-4 rounded-xl border ${
                isHighImpact ? 'bg-amber-50 border-amber-200' : 'bg-white border-slate-200'
              }`}
            >
              <div>
                <span className="text-lg text-slate-900 font-semibold">
                  Window {w.originalIndex + 1}
                </span>
                {isHighImpact && (
                  <span className="ml-2 text-base text-amber-600 font-semibold">HIGH IMPACT</span>
                )}
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32 bg-slate-100 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${isHighImpact ? 'bg-amber-400' : 'bg-violet-400'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-base text-slate-500 w-12 text-right">{pct}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
