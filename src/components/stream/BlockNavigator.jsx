import { useEffect, useRef } from 'react';

const VISIBLE_BLOCKS = 20;

export default function BlockNavigator({ activeIndex, totalBlocks, onNavigate }) {
  const activeRef = useRef(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }, [activeIndex]);

  const indices = Array.from({ length: totalBlocks }, (_, i) => i);

  return (
    <div className="flex items-center justify-center gap-5 mt-4">
      <button
        onClick={() => onNavigate(activeIndex - 1)}
        disabled={activeIndex <= 0}
        className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-sm text-sm font-medium text-slate-700"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Prev Block
      </button>

      <div
        className="flex gap-2 overflow-x-auto py-1"
        style={{ maxWidth: `${VISIBLE_BLOCKS * 36}px` }}
      >
        {indices.map(i => (
          <button
            key={i}
            ref={i === activeIndex ? activeRef : null}
            onClick={() => onNavigate(i)}
            className={`shrink-0 w-7 h-7 rounded-full text-[11px] font-semibold transition-colors flex items-center justify-center
              ${i === activeIndex
                ? 'bg-emerald-500 text-white shadow'
                : 'bg-slate-300 hover:bg-slate-400 text-slate-700'
              }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <button
        onClick={() => onNavigate(activeIndex + 1)}
        disabled={activeIndex >= totalBlocks - 1}
        className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-sm text-sm font-medium text-slate-700"
      >
        Next Block
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
