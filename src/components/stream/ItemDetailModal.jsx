import { getGenreColor } from '../../constants/genres';

const SKIP = new Set(['value', '_display_title']);

export default function ItemDetailModal({ movie, onClose }) {
  if (!movie) return null;
  const color = getGenreColor(movie.genre);
  const raw = movie.raw || {};
  const entries = Object.entries(raw).filter(([k]) => !SKIP.has(k) && raw[k] !== '');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header strip */}
        <div
          className="h-2 w-full"
          style={{ backgroundColor: color.bg }}
        />
        <div className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-lg font-bold text-slate-900 leading-tight">{movie.title}</p>
              <span
                className="inline-block mt-1 text-xs font-semibold px-2 py-0.5 rounded-full text-white"
                style={{ backgroundColor: color.bg }}
              >
                {movie.genre}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 text-xl font-bold leading-none ml-4"
            >
              ×
            </button>
          </div>

          <div className="space-y-2 max-h-72 overflow-y-auto">
            {entries.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-3 text-sm border-b border-slate-100 pb-1.5">
                <span className="text-slate-500 shrink-0 capitalize">{k.replace(/_/g, ' ')}</span>
                <span className="text-slate-800 text-right font-medium break-words max-w-48">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
