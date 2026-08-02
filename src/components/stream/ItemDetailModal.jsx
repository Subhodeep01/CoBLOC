import { getGenreColor } from '../../constants/genres';

const SKIP = new Set(['value', '_display_title']);

export default function ItemDetailModal({ movie, onClose }) {
  if (!movie) return null;
  const color = getGenreColor(movie.genre);
  const raw = movie.raw || {};
  const entries = Object.entries(raw).filter(([k]) => !SKIP.has(k) && raw[k] !== '');

  return (
    <>
      {/* invisible backdrop to catch outside clicks */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* popover anchored below the tile */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="h-1.5 w-full" style={{ backgroundColor: color.bg }} />
        <div className="p-3">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-sm font-bold text-slate-900 leading-tight">{movie.title}</p>
              <span
                className="inline-block mt-0.5 text-[10px] font-semibold px-2 py-0.5 rounded-full text-white"
                style={{ backgroundColor: color.bg }}
              >
                {movie.genre}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 text-lg font-bold leading-none ml-2 shrink-0"
            >
              ×
            </button>
          </div>

          <div className="space-y-1.5 max-h-56 overflow-y-auto">
            {entries.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-2 text-xs border-b border-slate-100 pb-1">
                <span className="text-slate-400 shrink-0 capitalize">{k.replace(/_/g, ' ')}</span>
                <span className="text-slate-800 text-right font-medium break-words max-w-36">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
