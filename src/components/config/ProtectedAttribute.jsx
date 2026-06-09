export default function ProtectedAttribute({ value, onChange, disabled, options }) {
  const sharedClass = "w-full bg-slate-100 border border-slate-300 rounded-lg px-4 py-2.5 text-base text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:opacity-50";

  return (
    <div>
      <label className="block text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">
        Protected Attribute
      </label>
      {options?.length > 0 ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={sharedClass}
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={sharedClass}
          placeholder="e.g., Genre"
        />
      )}
    </div>
  );
}
