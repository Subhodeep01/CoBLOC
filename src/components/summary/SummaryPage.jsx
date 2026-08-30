import TimelineChart from './TimelineChart';
import HighlightedWindows from './HighlightedWindows';
import LandmarkRecommendation from './LandmarkRecommendation';
import ConstraintsRecommendation from './ConstraintsRecommendation';
import { TOPICS } from '../../constants/topics';
import { isBlockFair } from '../../utils/reorder';

// The blocks a window ended up with: its reordered contents if it was
// reordered, otherwise the originals. Counting w.blocks meant the headline
// fairness figure ignored every reorder.
function shownBlocks(w) {
  return (w.isReordered && w.reorderedBlocks) ? w.reorderedBlocks : w.blocks;
}

function countFairBlocks(windows, constraints) {
  return windows
    .flatMap(shownBlocks)
    .filter(block => isBlockFair(block, constraints, block.length || 1))
    .length;
}

export default function SummaryPage({ session }) {
  const { state, restart } = session;
  const monitorOnly = TOPICS[state.config.topic]?.monitorOnly ?? false;
  const fairBlocks = countFairBlocks(state.windows, state.config.constraints);
  const totalBlocks = state.windows.flatMap(shownBlocks).length;
  const fairPct = totalBlocks > 0 ? Math.round(fairBlocks / totalBlocks * 100) : 0;

  const landmarkReorderedWindows = state.windows.filter(
    (w) => w.isReordered && w.windowIndex >= 1 && w.windowIndex <= 6 && w.reorderDelta != null
  );
  const avgItemsSwapped = landmarkReorderedWindows.length > 0
    ? Math.round(
        landmarkReorderedWindows.reduce((sum, w) => sum + w.reorderDelta * w.movies.length, 0)
        / landmarkReorderedWindows.length
      )
    : null;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-slate-900">Session Summary</h2>
        <p className="text-lg text-slate-500 mt-1">
          {state.windows.length} windows explored
          {!monitorOnly && (
            <>
              {' '}&middot; {state.windows.filter(w => w.isReordered).length} reordered
              {' '}&middot; Landmark size: {state.config.landmarkSize}
            </>
          )}
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-4 gap-5 mb-8">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <p className="text-base font-semibold text-slate-400 uppercase tracking-wider">Total Windows</p>
          <p className="text-5xl font-bold text-slate-900 mt-2">{state.windows.length}</p>
        </div>
        {/* Monitor-only datasets cannot be reordered at all, so a "Reorders 0"
            card reads as a failed session rather than as a mode without the
            feature. */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <p className="text-base font-semibold text-slate-400 uppercase tracking-wider">Reorders</p>
          {monitorOnly ? (
            <p className="text-lg font-semibold text-slate-400 mt-3">
              Not available on this dataset
            </p>
          ) : (
            <p className="text-5xl font-bold text-violet-600 mt-2">
              {state.windows.filter(w => w.isReordered).length}
            </p>
          )}
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <p className="text-base font-semibold text-slate-400 uppercase tracking-wider">
            {(TOPICS[state.config.topic]?.itemLabel ?? 'items')} Seen
          </p>
          <p className="text-5xl font-bold text-emerald-600 mt-2">
            {state.windows.length > 0 ? state.config.windowSize + (state.windows.length - 1) : 0}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <p className="text-base font-semibold text-slate-400 uppercase tracking-wider">Fairness Achieved</p>
          <p className="text-5xl font-bold text-sky-600 mt-2">{fairPct}%</p>
          <p className="text-base text-slate-400 mt-1">{fairBlocks} of {totalBlocks} blocks</p>
        </div>
      </div>

      {/* Timeline chart */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm mb-6">
        <TimelineChart windows={state.windows} config={state.config} />
      </div>

      {/* Highlighted windows */}
      <HighlightedWindows windows={state.windows} monitorOnly={monitorOnly} constraints={state.config.constraints} />

      {/* Recommendation */}
      {monitorOnly
        ? <ConstraintsRecommendation topic={state.config.topic} />
        : <LandmarkRecommendation session={session} />
      }

      {/* Restart */}
      <div className="mt-10 flex justify-center">
        <button
          onClick={restart}
          className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-base rounded-lg transition-colors"
        >
          Restart Session
        </button>
      </div>
    </div>
  );
}
