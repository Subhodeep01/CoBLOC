// Upper bounds so a huge value cannot wedge the app. Every window is held in
// memory, shipped over the socket and drawn as tiles, so a six-digit window
// size means an unusable page rather than a slow one. getDivisors also walks
// 1..n on each keystroke, which is its own stall at that scale.
const MAX_WINDOW = 1000;
const MAX_LANDMARK = 5000;

function getDivisors(n) {
  const divs = [];
  const limit = Math.min(n, MAX_WINDOW);
  for (let i = 1; i <= limit; i++) {
    if (n % i === 0) divs.push(i);
  }
  return divs;
}

const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));

export default function ParameterInputs({ config, onChange, disabled, monitorOnly, landmarkEnabled }) {
  const windowSize = parseInt(config.windowSize) || 0;
  const divisors = windowSize >= 2 ? getDivisors(windowSize) : [];

  function handleWindowChange(raw) {
    if (raw === '') { onChange({ windowSize: '' }); return; }
    const n = parseInt(raw);
    if (isNaN(n)) return;
    const capped = clamp(n, 1, MAX_WINDOW);
    const divs = getDivisors(capped);
    const blockValid = divs.includes(parseInt(config.blockSize));
    onChange({ windowSize: capped, ...(blockValid ? {} : { blockSize: '' }) });
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">
          Window Size
        </label>
        <input
          type="number"
          value={config.windowSize}
          onChange={(e) => handleWindowChange(e.target.value)}
          onBlur={(e) => {
            const n = parseInt(e.target.value);
            if (!isNaN(n)) handleWindowChange(String(clamp(n, 2, MAX_WINDOW)));
          }}
          disabled={disabled}
          min={2}
          max={MAX_WINDOW}
          className="w-full bg-slate-100 border border-slate-300 rounded-lg px-4 py-2.5 text-base text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:opacity-50"
        />
        <p className="mt-1 text-xs text-slate-400">Maximum {MAX_WINDOW}.</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">
          Block Size
        </label>
        {divisors.length > 0 ? (
          <select
            value={config.blockSize}
            onChange={(e) => onChange({ blockSize: parseInt(e.target.value) })}
            disabled={disabled}
            className="w-full bg-slate-100 border border-slate-300 rounded-lg px-4 py-2.5 text-base text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:opacity-50"
          >
            <option value="" disabled>Select…</option>
            {divisors.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        ) : (
          <input
            type="number"
            value={config.blockSize}
            disabled
            placeholder="Set window size first"
            className="w-full bg-slate-100 border border-slate-300 rounded-lg px-4 py-2.5 text-base text-slate-400 disabled:opacity-50"
          />
        )}
      </div>

      {!monitorOnly && (
        <div>
          <label className={`block text-sm font-medium uppercase tracking-wider mb-2 ${landmarkEnabled ? 'text-slate-700' : 'text-slate-400'}`}>
            Landmark Size
          </label>
          <input
            type="number"
            min={1}
            max={MAX_LANDMARK}
            value={config.landmarkSize ?? ''}
            onChange={(e) => {
              const v = e.target.value;
              if (v === '') { onChange({ landmarkSize: '' }); return; }
              const n = parseInt(v);
              onChange({ landmarkSize: isNaN(n) ? '' : clamp(n, 1, MAX_LANDMARK) });
            }}
            disabled={!landmarkEnabled}
            placeholder="Enter a number"
            className="w-full bg-slate-100 border border-slate-300 rounded-lg px-4 py-2.5 text-base text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:opacity-50 disabled:text-slate-400"
          />
        </div>
      )}
    </div>
  );
}
