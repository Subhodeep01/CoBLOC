export default function BlockNavigator({ activeIndex, totalBlocks, onNavigate }) {
  return (
    <div className="flex items-center justify-center gap-5 mt-4">
      <button
        onClick={() => onNavigate(activeIndex - 1)}
        disabled={activeIndex <= 0}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-sm text-sm font-medium text-slate-700"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Prev Block
      </button>

      <div className="flex gap-2">
        {Array.from({ length: totalBlocks }, (_, i) => (
          <button
            key={i}
            onClick={() => onNavigate(i)}
            className={`w-3.5 h-3.5 rounded-full transition-colors ${
              i === activeIndex ? 'bg-emerald-500' : 'bg-slate-300 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>

      <button
        onClick={() => onNavigate(activeIndex + 1)}
        disabled={activeIndex >= totalBlocks - 1}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-sm text-sm font-medium text-slate-700"
      >
        Next Block
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
