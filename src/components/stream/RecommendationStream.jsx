import Block from './Block';
import BlockNavigator from './BlockNavigator';
import WindowControls from './WindowControls';
import { genreDistribution } from '../../utils/metrics';
import { getGenreColor, GENRE_COLORS, GENRE_LABELS } from '../../constants/genres';

const FAIRNESS_TOLERANCE = 10;

function isBlockFair(dist, constraints) {
  for (const [genre, target] of Object.entries(constraints)) {
    if (Math.abs((dist[genre] || 0) - target) > FAIRNESS_TOLERANCE) return false;
  }
  return true;
}

export default function RecommendationStream({ session }) {
  const { state, nextWindow, prevWindow, setActiveBlock, endSession } = session;
  const currentWindow = state.windows[state.currentWindowIndex];

  if (!currentWindow) return null;

  const { blocks } = currentWindow;
  const activeBlock = blocks[state.activeBlockIndex] || blocks[0] || [];
  const dist = genreDistribution(activeBlock);
  const constraints = state.config?.constraints || {};
  const fair = isBlockFair(dist, constraints);

  return (
    <div className="h-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Window {state.currentWindowIndex + 1}
          </h2>
          <p className="text-base text-slate-500 mt-1">
            {currentWindow.movies.length} {state.config.topic === 'Hospital Admissions Data' ? 'patients' : 'movies'} &middot; {blocks.length} block{blocks.length !== 1 ? 's' : ''}
            {currentWindow.isReordered && (
              <span className="ml-2 text-violet-600 font-medium">⟳ Reordered</span>
            )}
            {!currentWindow.isReordered && currentWindow.isLandmarkAffected && (
              <span className="ml-2 text-amber-600 font-medium">⟳ Landmark Affected</span>
            )}
            {state.landmarkActive && (
              <span className="ml-2 text-amber-600 font-medium">
                Landmark: {state.landmarkCounter} windows remaining
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Distribution + Fairness Panel */}
      <div className="flex items-stretch gap-6 p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="flex-1 flex flex-col gap-3">
          <span className="text-base font-semibold text-slate-600 uppercase tracking-wide">Block Distribution</span>
          <div className="flex h-10 w-full rounded-lg overflow-hidden border border-slate-200">
            {Object.entries(dist).map(([genre, pct]) => (
              <div
                key={genre}
                style={{ width: `${pct}%`, backgroundColor: getGenreColor(genre).bg }}
                title={`${GENRE_LABELS[genre] ?? genre}: ${pct}% (target: ${constraints[genre] ?? '?'}%)`}
                className="relative flex items-center justify-center"
              >
                {pct >= 10 && (
                  <span className="text-sm font-bold text-white drop-shadow">{pct}%</span>
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            {Object.entries(dist).map(([genre, pct]) => (
              <span key={genre} className="flex items-center gap-2 text-sm text-slate-600">
                <span
                  className="inline-block w-3 h-3 rounded-sm"
                  style={{ backgroundColor: getGenreColor(genre).bg }}
                />
                {GENRE_LABELS[genre] ?? genre}: <span className="text-slate-900 font-semibold">{pct}%</span>
                <span className="text-slate-400">(target {constraints[genre] ?? '?'}%)</span>
              </span>
            ))}
          </div>
        </div>

        <div className="w-px bg-slate-200 self-stretch" />

        <div
          className={`flex flex-col items-center justify-center gap-2 px-8 rounded-lg min-w-32 ${
            fair ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'
          }`}
        >
          <span className={`text-4xl font-bold ${fair ? 'text-emerald-600' : 'text-red-500'}`}>
            {fair ? '✓' : '✗'}
          </span>
          <span className={`text-base font-semibold tracking-wide ${fair ? 'text-emerald-600' : 'text-red-500'}`}>
            {fair ? 'Fair' : 'Unfair'}
          </span>
        </div>
      </div>

      {/* Active Block */}
      <div className="flex-1">
        <Block
          movies={activeBlock}
          blockIndex={state.activeBlockIndex}
          totalBlocks={blocks.length}
        />
      </div>

      {/* Block Navigator */}
      <BlockNavigator
        activeIndex={state.activeBlockIndex}
        totalBlocks={blocks.length}
        onNavigate={setActiveBlock}
      />

      {/* Window Controls */}
      <WindowControls
        onNext={nextWindow}
        onPrev={prevWindow}
        onEnd={endSession}
        canPrev={state.windowHistory.length > 0}
        canNext={state.poolCursor < state.moviePool.length}
      />
    </div>
  );
}
