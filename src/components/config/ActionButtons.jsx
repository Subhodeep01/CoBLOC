export default function ActionButtons({ phase, onMonitor, onReorder, monitorOnly, isReordering, reorderStatus, currentWindowReordered }) {
  return (
    <div className="space-y-3">
      {monitorOnly && (
        <div className="text-center py-2 px-3 bg-slate-100 border border-slate-200 rounded-lg">
          <span className="text-sm font-medium text-amber-600 uppercase tracking-wider">Monitor-Only Dataset</span>
        </div>
      )}
      <button
        onClick={onMonitor}
        disabled={phase !== 'config'}
        className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-100 disabled:text-slate-400 text-white font-semibold rounded-lg text-base transition-colors"
      >
        Monitor
      </button>
      {!monitorOnly && (
        <>
          <button
            onClick={onReorder}
            disabled={phase !== 'streaming' || isReordering || currentWindowReordered}
            className="w-full py-3 px-4 bg-violet-600 hover:bg-violet-500 disabled:bg-slate-100 disabled:text-slate-400 text-white font-semibold rounded-lg text-base transition-colors flex items-center justify-center gap-2"
          >
            {isReordering && (
              <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            )}
            {isReordering ? 'Reordering…' : 'Reorder'}
          </button>

          {reorderStatus && (
            <div className={`rounded-lg px-4 py-3 text-sm space-y-1 border ${
              reorderStatus.phase === 'reordering'
                ? 'bg-amber-50 border-amber-200 text-amber-700'
                : 'bg-emerald-50 border-emerald-200 text-emerald-700'
            }`}>
              <p className="font-medium">{reorderStatus.message}</p>
              {reorderStatus.sub && (
                <p className="text-slate-500">{reorderStatus.sub}</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
