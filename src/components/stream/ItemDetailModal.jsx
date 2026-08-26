import { useLayoutEffect, useRef, useState } from 'react';
import { getGenreColor } from '../../constants/genres';

const SKIP = new Set(['value', '_display_title']);
const EDGE_PAD = 12;

export default function ItemDetailModal({ movie, onClose }) {
  const ref = useRef(null);
  const [shiftX, setShiftX] = useState(0);
  const [above, setAbove] = useState(false);

  // Anchored under its tile and centred, so a tile near an edge would push the
  // popover off screen and clip the fields. Nudge it back inside, and flip it
  // above the tile when there is no room below.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    setShiftX(0);
    setAbove(false);
    const r = el.getBoundingClientRect();
    let dx = 0;
    if (r.left < EDGE_PAD) dx = EDGE_PAD - r.left;
    else if (r.right > window.innerWidth - EDGE_PAD) dx = window.innerWidth - EDGE_PAD - r.right;
    if (dx) setShiftX(dx);
    if (r.bottom > window.innerHeight - EDGE_PAD && r.top > r.height + EDGE_PAD) setAbove(true);
  }, [movie]);

  if (!movie) return null;
  const color = getGenreColor(movie.genre);
  const raw = movie.raw || {};
  const entries = Object.entries(raw).filter(([k]) => !SKIP.has(k) && raw[k] !== '');

  return (
    <>
      {/* invisible backdrop to catch outside clicks */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* popover anchored to the tile, kept inside the viewport */}
      <div
        ref={ref}
        style={{ transform: `translateX(calc(-50% + ${shiftX}px))` }}
        className={`absolute left-1/2 z-50 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden ${
          above ? 'bottom-full mb-2' : 'top-full mt-2'
        }`}
      >
        <div className="h-1.5 w-full" style={{ backgroundColor: color.bg }} />
        <div className="p-3">
          <div className="flex items-start justify-between mb-2">
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-900 leading-tight break-words">{movie.title}</p>
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

          <div className="space-y-1.5 max-h-56 overflow-y-auto pr-2">
            {entries.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-2 text-xs border-b border-slate-100 pb-1">
                <span className="text-slate-400 shrink-0 capitalize">{k.replace(/_/g, ' ')}</span>
                <span className="text-slate-800 text-right font-medium break-words min-w-0">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
