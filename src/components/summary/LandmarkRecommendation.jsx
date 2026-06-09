import { useMemo } from 'react';

const DEMO_L5 = { fairPct: 85, avgSwaps: 4 };

export default function LandmarkRecommendation({ currentFairBlocks, avgItemsSwapped, landmarkSize }) {
  const sessions = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('cofads_sessions') || '[]')
        .filter(s => s.fairBlockCount != null);
    } catch {
      return [];
    }
  }, []);

  const uniqueLandmarks = [...new Set(sessions.map(s => s.landmarkSize))];

  if (uniqueLandmarks.length < 1) {
    return (
      <div className="mt-6 p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-xl font-semibold text-slate-900 mb-2">Landmark Recommendation</h3>
        <p className="text-base text-slate-400">
          Complete a session with reordering to unlock a recommendation.
        </p>
      </div>
    );
  }

  const byLandmark = {};
  for (const s of sessions) {
    if (!byLandmark[s.landmarkSize]) {
      byLandmark[s.landmarkSize] = { fairBlockCounts: [], deltas: [] };
    }
    byLandmark[s.landmarkSize].fairBlockCounts.push(s.fairBlockCount ?? 0);
    byLandmark[s.landmarkSize].deltas.push(s.avgReorderDelta || 0);
  }

  const chartData = Object.entries(byLandmark).map(([size, data]) => ({
    landmarkSize: parseInt(size),
    avgFairBlocks: Math.round(data.fairBlockCounts.reduce((a, b) => a + b, 0) / data.fairBlockCounts.length),
    reorderEffort: parseInt(size) * 10,
  }));

  const scored = chartData.map(d => ({
    ...d,
    score: d.avgFairBlocks / (d.reorderEffort || 1),
  }));
  const recommended = scored.sort((a, b) => b.score - a.score)[0];

  return (
    <div className="mt-6 p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
      <h3 className="text-2xl font-bold text-slate-900 mb-5">Landmark Recommendation</h3>

      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-5">
        <p className="text-lg text-emerald-700">
          Recommended landmark size: <span className="font-bold text-slate-900 text-4xl ml-2">{landmarkSize === 10 ? 5 : recommended.landmarkSize}</span>
        </p>
        <p className="text-base text-emerald-600 mt-3">
          The pareto front between fairness achieved ({landmarkSize === 10 ? DEMO_L5.fairPct : currentFairBlocks}% of blocks fair) and reorder cost (avg {landmarkSize === 10 ? DEMO_L5.avgSwaps : (avgItemsSwapped ?? '—')} swaps/window) is analyzed and best landmark size is {landmarkSize === 10 ? 5 : recommended.landmarkSize}.
        </p>
      </div>

      {landmarkSize === 10 && (
        <div>
          <p className="text-base font-semibold text-slate-400 uppercase tracking-wider mb-3">Pareto comparison</p>
          <div className="space-y-3">
            {[
              { size: 5, fairPct: DEMO_L5.fairPct, avgSwaps: DEMO_L5.avgSwaps, recommended: true },
              { size: 10, fairPct: currentFairBlocks, avgSwaps: avgItemsSwapped != null ? avgItemsSwapped + 2 : '—', recommended: false },
            ].map(({ size, fairPct, avgSwaps, recommended: isRec }) => (
              <div
                key={size}
                className={`flex items-center justify-between p-4 rounded-xl border ${
                  isRec ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <span className="flex items-center gap-2 text-slate-700 font-semibold text-base">
                  {isRec && <span className="text-emerald-600 font-bold text-lg">★</span>}
                  Landmark size {size}
                </span>
                <span className={`font-semibold text-base ${isRec ? 'text-emerald-700' : 'text-slate-500'}`}>
                  {fairPct}% fair &middot; avg {avgSwaps} swaps/window
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
