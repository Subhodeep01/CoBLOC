const LANDMARK_OPTIONS = [5, 10, 15, 20];

export default function ParameterInputs({ config, onChange, disabled, monitorOnly, landmarkEnabled }) {
  const numericParams = [
    { key: 'windowSize', label: 'Window Size', min: 2, max: 50 },
    { key: 'blockSize', label: 'Block Size', min: 1, max: 25 },
  ];

  return (
    <div className="space-y-4">
      {numericParams.map(({ key, label, min, max }) => (
        <div key={key}>
          <label className="block text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">
            {label}
          </label>
          <input
            type="number"
            value={config[key]}
            onChange={(e) => {
              const raw = e.target.value;
              if (raw === '') { onChange({ [key]: '' }); return; }
              const n = parseInt(raw);
              if (!isNaN(n)) onChange({ [key]: n });
            }}
            onBlur={(e) => {
              const n = parseInt(e.target.value);
              if (!isNaN(n)) onChange({ [key]: Math.max(min, Math.min(max, n)) });
            }}
            disabled={disabled}
            min={min}
            max={max}
            className="w-full bg-slate-100 border border-slate-300 rounded-lg px-4 py-2.5 text-base text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:opacity-50"
          />
        </div>
      ))}

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
