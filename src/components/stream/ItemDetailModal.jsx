import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { getGenreColor } from '../../constants/genres';

const SKIP = new Set(['value', '_display_title']);
// The stream is a shuffle of the archive, so a record's date says nothing
// about when it arrived and reading an order into it would be misleading.
const isDateField = k => /(^|[^a-z])(date|time|timestamp|doa|d_o_a)([^a-z]|$)/i.test(String(k));
const PAD = 12;
const GAP = 8;

export default function ItemDetailModal({ movie, onClose }) {
  const anchorRef = useRef(null);
  const popRef = useRef(null);
  const [pos, setPos] = useState(null);

  // Rendered into <body> rather than inside the tile: <main> scrolls, which
  // makes it clip horizontally, so an in-flow popover gets cut off at the
  // panel edge however it is positioned. Fixed coordinates measured off the
  // tile keep it anchored while escaping that clipping.
  useLayoutEffect(() => {
    const anchor = anchorRef.current?.parentElement;
    const pop = popRef.current;
    if (!anchor || !pop) return;

    const place = () => {
      const a = anchor.getBoundingClientRect();
      const w = pop.offsetWidth;
      const h = pop.offsetHeight;
      let left = a.left + a.width / 2 - w / 2;
      left = Math.max(PAD, Math.min(left, window.innerWidth - w - PAD));
      let top = a.bottom + GAP;
      if (top + h > window.innerHeight - PAD) {
        top = a.top - h - GAP > PAD ? a.top - h - GAP : Math.max(PAD, window.innerHeight - h - PAD);
      }
      setPos({ left, top });
    };

    place();
    window.addEventListener('resize', place);
    window.addEventListener('scroll', place, true);
    return () => {
      window.removeEventListener('resize', place);
      window.removeEventListener('scroll', place, true);
    };
  }, [movie]);

  if (!movie) return null;
  const color = getGenreColor(movie.genre);
  const raw = movie.raw || {};
  const entries = Object.entries(raw).filter(([k]) => !SKIP.has(k) && !isDateField(k) && raw[k] !== '');

  return (
    <>
      <span ref={anchorRef} className="hidden" />
      {createPortal(
        <>
          <div className="fixed inset-0 z-[60]" onClick={onClose} />
          <div
            ref={popRef}
            style={{
              position: 'fixed',
              left: pos ? pos.left : -9999,
              top: pos ? pos.top : -9999,
              visibility: pos ? 'visible' : 'hidden',
            }}
            className="z-[61] w-80 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden"
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
                  <div key={k} className="flex justify-between gap-3 text-xs border-b border-slate-100 pb-1">
                    <span className="text-slate-400 shrink-0 capitalize">{k.replace(/_/g, ' ')}</span>
                    <span className="text-slate-800 text-right font-medium break-words min-w-0">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>,
        document.body
      )}
    </>
  );
}
