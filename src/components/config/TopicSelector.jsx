import { TOPIC_NAMES } from '../../constants/topics';

export default function TopicSelector({ value, onChange, disabled }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">
        Topic of Exploration
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full bg-slate-100 border border-slate-300 rounded-lg px-4 py-2.5 text-base text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:opacity-50"
      >
        {TOPIC_NAMES.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}
