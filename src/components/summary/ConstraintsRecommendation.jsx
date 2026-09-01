import { useMemo } from 'react';
import { getGenreColor, GENRE_COLORS, GENRE_LABELS } from '../../constants/genres';

export default function ConstraintsRecommendation({ topic }) {
  const sessions = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('cofads_monitor_sessions_v2') || '[]')
        .filter(s => s.topic === topic && s.fairBlockCount != null);
    } catch {
      return [];
    }
  }, [topic]);

  const byConstraints = useMemo(() => {
    const map = new Map();
    for (const s of sessions) {
      const key = JSON.stringify(
        Object.entries(s.constraints).sort(([a], [b]) => a.localeCompare(b))
      );
      if (!map.has(key)) {
        map.set(key, { constraints: s.constraints, fairBlockCounts: [] });
      }
      map.get(key).fairBlockCounts.push(s.fairBlockCount ?? 0);
    }
    return [...map.values()].map(entry => ({
      constraints: entry.constraints,
      avgFairBlocks: Math.round(entry.fairBlockCounts.reduce((a, b) => a + b, 0) / entry.fairBlockCounts.length),
      sessionCount: entry.fairBlockCounts.length,
    }));
  }, [sessions]);

  const uniqueCount = byConstraints.length;
  const needed = Math.max(0, 3 - uniqueCount);

  if (uniqueCount < 3) {
    return (
      <div className="mt-6 p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-xl font-semibold text-slate-900 mb-2">Constraints Recommendation</h3>
        <p className="text-base text-slate-500">
          Try {needed} more session{needed !== 1 ? 's' : ''} with different constraints to unlock a recommendation.
        </p>
        <p className="text-sm text-slate-400 mt-1">
          Unique constraint sets tried so far: {uniqueCount}
        </p>
      </div>
    );
  }

  const ranked = [...byConstraints].sort((a, b) => b.avgFairBlocks - a.avgFairBlocks);
  const best = ranked[0];

  return (
    <div className="mt-6 p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
      <h3 className="text-xl font-semibold text-slate-900 mb-4">Constraints Recommendation</h3>
      <p className="text-sm text-slate-400 mb-5">
        Based on {sessions.length} session{sessions.length !== 1 ? 's' : ''} across {uniqueCount} different constraint sets
      </p>

      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-5">
        <p className="text-base text-emerald-700 mb-1">
          Recommended constraints for highest fairness
          <span className="ml-2 text-emerald-800 font-bold">({best.avgFairBlocks} fair block{best.avgFairBlocks !== 1 ? 's' : ''} achieved)</span>
        </p>
        <div className="flex flex-wrap gap-4 mt-3">
          {Object.entries(best.constraints).map(([genre, pct]) => (
            <span key={genre} className="flex items-center gap-2 text-base text-slate-700">
              <span
                className="inline-block w-3.5 h-3.5 rounded-sm shrink-0"
                style={{ backgroundColor: getGenreColor(genre).bg }}
              />
              <span>{GENRE_LABELS[genre] ?? genre}:</span>
              <span className="font-bold text-slate-900">{pct}%</span>
            </span>
          ))}
        </div>
      </div>

      {ranked.length > 1 && (
        <div>
          <p className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-3">All constraint sets ranked by fairness</p>
          <div className="space-y-3">
            {ranked.map((entry, i) => {
              const isTop = i === 0;
              return (
                <div
                  key={i}
                  className={`flex items-center justify-between p-4 rounded-xl border text-sm ${
                    isTop ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3 flex-wrap">
                    {isTop && <span className="text-emerald-600 font-bold text-base">★</span>}
                    {Object.entries(entry.constraints).map(([genre, pct]) => (
                      <span key={genre} className="flex items-center gap-1.5 text-slate-600">
                        <span
                          className="inline-block w-2.5 h-2.5 rounded-sm"
                          style={{ backgroundColor: getGenreColor(genre).bg }}
                        />
                        {GENRE_LABELS[genre] ?? genre} {pct}%
                      </span>
                    ))}
                  </div>
                  <span className={`font-semibold shrink-0 ml-4 ${isTop ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {entry.avgFairBlocks} fair block{entry.avgFairBlocks !== 1 ? 's' : ''}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
