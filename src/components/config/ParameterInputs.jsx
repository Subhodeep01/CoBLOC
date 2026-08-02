const LANDMARK_OPTIONS = [5, 10, 15, 20];

function getDivisors(n) {
  const divs = [];
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) divs.push(i);
  }
  return divs;
}

export default function ParameterInputs({ config, onChange, disabled, monitorOnly, landmarkEnabled }) {
  const windowSize = parseInt(config.windowSize) || 0;
  const divisors = windowSize >= 2 ? getDivisors(windowSize) : [];

  function handleWindowChange(raw) {
    if (raw === '') { onChange({ windowSize: '' }); return; }
    const n = parseInt(raw);
    if (isNaN(n)) return;
    const divs = getDivisors(n);
    const blockValid = divs.includes(parseInt(config.blockSize));
    onChange({ windowSize: n, ...(blockValid ? {} : { blockSize: '' }) });
  }

  return (
    <div className="space-y-4">
      {/* Window Size */}
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
            if (!isNaN(n)) handleWindowChange(String(Math.max(2, Math.min(50, n))));
          }}
          disabled={disabled}
          min={2}
          max={50}
          className="w-full bg-slate-100 border border-slate-300 rounded-lg px-4 py-2.5 text-base text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:opacity-50"
        />
      </div>

      {/* Block Size — dropdown once window size is known */}
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
          <label className={`block text-sm font-medium uppercase tracking-wider mb-2 ${landmarkEnabled ? 'text-slate-700' : 'text-slate-300'}`}>
            Landmark Size
          </label>
          <select
            value={config.landmarkSize}
            onChange={(e) => onChange({ landmarkSize: parseInt(e.target.value) })}
            disabled={!landmarkEnabled}
            className="w-full bg-slate-100 border border-slate-300 rounded-lg px-4 py-2.5 text-base text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:opacity-50 disabled:text-slate-300"
          >
            <option value="" disabled>Select…</option>
            {LANDMARK_OPTIONS.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
