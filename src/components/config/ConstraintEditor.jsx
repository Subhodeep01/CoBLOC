import { GENRE_COLORS, GENRE_LABELS } from '../../constants/genres';

export default function ConstraintEditor({ constraints, onChange, disabled }) {
  const entries = Object.entries(constraints);
  const total = entries.reduce((s, [, v]) => s + (parseInt(v) || 0), 0);
  const allEmpty = entries.every(([, v]) => v === '');

  const updateValue = (key, val) => {
    if (val === '') { onChange({ ...constraints, [key]: '' }); return; }
    const num = Math.max(0, Math.min(100, parseInt(val)));
    if (!isNaN(num)) onChange({ ...constraints, [key]: num });
  };

  return (
    <div>
      <label className="block text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">
        Constraints
      </label>

      <div className="space-y-2.5">
        {entries.map(([key, val]) => {
          const color = GENRE_COLORS[key];
          return (
            <div key={key} className="flex items-center gap-3">
              <span
                className="w-3.5 h-3.5 rounded-full shrink-0"
                style={{ backgroundColor: color?.bg || '#94a3b8' }}
              />
              <span className="text-sm text-slate-700 w-28 truncate">{GENRE_LABELS[key] ?? key}</span>
              <input
                type="number"
                value={val}
                onChange={(e) => updateValue(key, e.target.value)}
                disabled={disabled}
                className="w-20 bg-slate-100 border border-slate-300 rounded px-2 py-1.5 text-sm text-slate-900 text-center focus:outline-none focus:border-emerald-500 disabled:opacity-50"
                min={0}
                max={100}
              />
              <span className="text-sm text-slate-400">%</span>
            </div>
          );
        })}
      </div>

      {!allEmpty && (
        <div className={`text-sm mt-2.5 ${total === 100 ? 'text-emerald-600' : 'text-amber-600'}`}>
          Total: {total}% {total !== 100 && '(must equal 100%)'}
        </div>
      )}
    </div>
  );
}
