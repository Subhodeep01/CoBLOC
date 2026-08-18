export const GENRE_COLORS = {
  // Hospital — gender
  'F':  { bg: '#ec4899', gradient: 'from-pink-500 to-rose-400',   text: '#fdf2f8', badge: 'bg-pink-500 text-pink-100' },
  'M':  { bg: '#3b82f6', gradient: 'from-blue-500 to-blue-600',   text: '#eff6ff', badge: 'bg-blue-500 text-blue-100' },
  // Hospital — outcome
  'discharged': { bg: '#10b981', gradient: 'from-emerald-500 to-green-400',  text: '#064e3b', badge: 'bg-emerald-500 text-emerald-100' },
  'expired':    { bg: '#ef4444', gradient: 'from-red-500 to-rose-600',       text: '#fef2f2', badge: 'bg-red-500 text-red-100' },
  'dama':       { bg: '#f59e0b', gradient: 'from-amber-500 to-orange-500',   text: '#78350f', badge: 'bg-amber-500 text-amber-900' },
  // Hospital — age bins
  '4-51':  { bg: '#6366f1', gradient: 'from-indigo-500 to-violet-500', text: '#eef2ff', badge: 'bg-indigo-500 text-indigo-100' },
  '51-60': { bg: '#0ea5e9', gradient: 'from-sky-500 to-cyan-400',      text: '#f0f9ff', badge: 'bg-sky-500 text-sky-100' },
  '60-65': { bg: '#10b981', gradient: 'from-emerald-500 to-teal-400',  text: '#ecfdf5', badge: 'bg-emerald-500 text-emerald-100' },
  '65-72': { bg: '#f59e0b', gradient: 'from-amber-400 to-orange-400',  text: '#fffbeb', badge: 'bg-amber-500 text-amber-100' },
  '72+':   { bg: '#ef4444', gradient: 'from-red-500 to-rose-500',      text: '#fef2f2', badge: 'bg-red-500 text-red-100' },
  // Stocks — price change
  '-11.78% to -1.51%': { bg: '#dc2626', gradient: 'from-red-600 to-rose-500',     text: '#fef2f2', badge: 'bg-red-600 text-red-100' },
  '-1.51% to -0.39%':  { bg: '#f97316', gradient: 'from-orange-500 to-amber-400', text: '#fff7ed', badge: 'bg-orange-500 text-orange-100' },
  '-0.39% to 0.34%':   { bg: '#6b7280', gradient: 'from-gray-400 to-slate-400',   text: '#f9fafb', badge: 'bg-gray-500 text-gray-100' },
  '0.34% to 1.52%':    { bg: '#22c55e', gradient: 'from-green-500 to-emerald-400', text: '#f0fdf4', badge: 'bg-green-500 text-green-100' },
  '1.52% to 19.27%':   { bg: '#16a34a', gradient: 'from-green-600 to-teal-500',   text: '#f0fdf4', badge: 'bg-green-700 text-green-100' },
  // Stocks — volume
  'Low Volume':  { bg: '#94a3b8', gradient: 'from-slate-400 to-gray-400', text: '#f8fafc', badge: 'bg-slate-400 text-white' },
  'High Volume': { bg: '#7c3aed', gradient: 'from-violet-600 to-purple-500', text: '#f5f3ff', badge: 'bg-violet-600 text-violet-100' },
  // Tweets — engagement
  'Engaged':      { bg: '#10b981', gradient: 'from-emerald-500 to-teal-400', text: '#ecfdf5', badge: 'bg-emerald-500 text-emerald-100' },
  'No Engagement':{ bg: '#94a3b8', gradient: 'from-slate-400 to-gray-400',  text: '#f8fafc', badge: 'bg-slate-400 text-white' },
  // Tweets — tweet length
  'Short Tweet':  { bg: '#06b6d4', gradient: 'from-cyan-500 to-sky-400',    text: '#ecfeff', badge: 'bg-cyan-500 text-cyan-100' },
  'Medium Tweet': { bg: '#3b82f6', gradient: 'from-blue-500 to-indigo-400', text: '#eff6ff', badge: 'bg-blue-500 text-blue-100' },
  'Long Tweet':   { bg: '#8b5cf6', gradient: 'from-violet-500 to-purple-500', text: '#f5f3ff', badge: 'bg-violet-500 text-violet-100' },
  // Tweets — sentiment
  'Very Positive': { bg: '#16a34a', gradient: 'from-green-600 to-emerald-500', text: '#f0fdf4', badge: 'bg-green-600 text-green-100' },
  'Positive':      { bg: '#22c55e', gradient: 'from-green-500 to-teal-400',   text: '#f0fdf4', badge: 'bg-green-500 text-green-100' },
  'Neutral':       { bg: '#6b7280', gradient: 'from-gray-400 to-slate-400',   text: '#f9fafb', badge: 'bg-gray-500 text-gray-100' },
  'Negative':      { bg: '#f97316', gradient: 'from-orange-500 to-red-400',   text: '#fff7ed', badge: 'bg-orange-500 text-orange-100' },
  'Very Negative': { bg: '#ef4444', gradient: 'from-red-500 to-rose-600',     text: '#fef2f2', badge: 'bg-red-500 text-red-100' },
  // Movies — audience reception
  'Fan Favorite':  { bg: '#f59e0b', gradient: 'from-amber-500 to-yellow-400', text: '#78350f', badge: 'bg-amber-500 text-amber-900' },
  'Divisive Pick': { bg: '#6b7280', gradient: 'from-gray-500 to-slate-500',   text: '#f9fafb', badge: 'bg-gray-500 text-gray-100' },
  // Movies — popularity tier
  'Blockbuster':        { bg: '#10b981', gradient: 'from-emerald-500 to-teal-400', text: '#ecfdf5', badge: 'bg-emerald-500 text-emerald-100' },
  'Word of Mouth Hit':  { bg: '#0ea5e9', gradient: 'from-sky-500 to-blue-400',    text: '#f0f9ff', badge: 'bg-sky-500 text-sky-100' },
  'Niche Title':        { bg: '#8b5cf6', gradient: 'from-violet-500 to-purple-500', text: '#f5f3ff', badge: 'bg-violet-500 text-violet-100' },
  // Movies — release era
  'Golden Age Classic':     { bg: '#d97706', gradient: 'from-amber-600 to-yellow-500', text: '#78350f', badge: 'bg-amber-600 text-amber-100' },
  'New Hollywood Era':      { bg: '#3b82f6', gradient: 'from-blue-500 to-indigo-500',  text: '#eff6ff', badge: 'bg-blue-500 text-blue-100' },
  'Turn-of-Millennium':     { bg: '#7c3aed', gradient: 'from-violet-600 to-purple-600', text: '#f5f3ff', badge: 'bg-violet-600 text-violet-100' },
  'Modern Blockbuster Age': { bg: '#0d9488', gradient: 'from-teal-600 to-emerald-500', text: '#f0fdfa', badge: 'bg-teal-600 text-teal-100' },
  'Recent Release':         { bg: '#22c55e', gradient: 'from-green-500 to-emerald-400', text: '#f0fdf4', badge: 'bg-green-500 text-green-100' },
  // Movies — genre
  'Action':      { bg: '#ef4444', gradient: 'from-red-500 to-orange-400',    text: '#fef2f2', badge: 'bg-red-500 text-red-100' },
  'Adventure':   { bg: '#f97316', gradient: 'from-orange-500 to-amber-400',  text: '#fff7ed', badge: 'bg-orange-500 text-orange-100' },
  'Animation':   { bg: '#f59e0b', gradient: 'from-amber-400 to-yellow-300',  text: '#78350f', badge: 'bg-amber-400 text-amber-900' },
  'Children':    { bg: '#84cc16', gradient: 'from-lime-500 to-green-400',    text: '#f7fee7', badge: 'bg-lime-500 text-lime-100' },
  'Comedy':      { bg: '#fbbf24', gradient: 'from-yellow-400 to-amber-300',  text: '#78350f', badge: 'bg-yellow-400 text-yellow-900' },
  'Crime':       { bg: '#6b7280', gradient: 'from-gray-500 to-slate-600',    text: '#f9fafb', badge: 'bg-gray-600 text-gray-100' },
  'Documentary': { bg: '#0ea5e9', gradient: 'from-sky-500 to-blue-400',      text: '#f0f9ff', badge: 'bg-sky-500 text-sky-100' },
  'Drama':       { bg: '#6366f1', gradient: 'from-indigo-500 to-violet-500', text: '#eef2ff', badge: 'bg-indigo-500 text-indigo-100' },
  'Fantasy':     { bg: '#a855f7', gradient: 'from-purple-500 to-violet-400', text: '#faf5ff', badge: 'bg-purple-500 text-purple-100' },
  'Film-Noir':   { bg: '#1e293b', gradient: 'from-slate-800 to-gray-700',    text: '#f1f5f9', badge: 'bg-slate-700 text-slate-100' },
  'Horror':      { bg: '#dc2626', gradient: 'from-red-600 to-rose-800',      text: '#fef2f2', badge: 'bg-red-700 text-red-100' },
  'IMAX':        { bg: '#0284c7', gradient: 'from-sky-600 to-blue-600',      text: '#f0f9ff', badge: 'bg-sky-600 text-sky-100' },
  'Musical':     { bg: '#ec4899', gradient: 'from-pink-500 to-rose-400',     text: '#fdf2f8', badge: 'bg-pink-500 text-pink-100' },
  'Mystery':     { bg: '#7c3aed', gradient: 'from-violet-600 to-purple-700', text: '#f5f3ff', badge: 'bg-violet-700 text-violet-100' },
  'No Genre Listed': { bg: '#94a3b8', gradient: 'from-slate-400 to-gray-400', text: '#f8fafc', badge: 'bg-slate-400 text-white' },
  'Romance':     { bg: '#f43f5e', gradient: 'from-rose-500 to-pink-400',     text: '#fff1f2', badge: 'bg-rose-500 text-rose-100' },
  'Sci-Fi':      { bg: '#06b6d4', gradient: 'from-cyan-500 to-sky-500',      text: '#ecfeff', badge: 'bg-cyan-500 text-cyan-100' },
  'Thriller':    { bg: '#475569', gradient: 'from-slate-600 to-gray-600',    text: '#f1f5f9', badge: 'bg-slate-600 text-slate-100' },
  'War':         { bg: '#92400e', gradient: 'from-amber-800 to-brown-700',   text: '#fffbeb', badge: 'bg-amber-800 text-amber-100' },
  'Western':     { bg: '#b45309', gradient: 'from-amber-700 to-orange-600',  text: '#fffbeb', badge: 'bg-amber-700 text-amber-100' },
  // Census — sex
  'Female': { bg: '#ec4899', gradient: 'from-pink-500 to-rose-400',   text: '#fdf2f8', badge: 'bg-pink-500 text-pink-100' },
  'Male':   { bg: '#3b82f6', gradient: 'from-blue-500 to-blue-600',   text: '#eff6ff', badge: 'bg-blue-500 text-blue-100' },
  // Census — education
  'Bachelors+':              { bg: '#10b981', gradient: 'from-emerald-500 to-teal-400', text: '#ecfdf5', badge: 'bg-emerald-500 text-emerald-100' },
  'HS Grad / Some College':  { bg: '#f59e0b', gradient: 'from-amber-500 to-yellow-400', text: '#78350f', badge: 'bg-amber-500 text-amber-900' },
  'No Grad':                 { bg: '#ef4444', gradient: 'from-red-500 to-rose-500',     text: '#fef2f2', badge: 'bg-red-500 text-red-100' },
  // Census — race
  'White':               { bg: '#0ea5e9', gradient: 'from-sky-500 to-blue-400',      text: '#f0f9ff', badge: 'bg-sky-500 text-sky-100' },
  'Black':               { bg: '#7c3aed', gradient: 'from-violet-600 to-purple-500', text: '#f5f3ff', badge: 'bg-violet-600 text-violet-100' },
  'Asian-Pac-Islander':  { bg: '#0d9488', gradient: 'from-teal-600 to-cyan-500',     text: '#f0fdfa', badge: 'bg-teal-600 text-teal-100' },
  'Amer-Indian-Eskimo':  { bg: '#f97316', gradient: 'from-orange-500 to-amber-400',  text: '#fff7ed', badge: 'bg-orange-500 text-orange-100' },
  'Other':               { bg: '#94a3b8', gradient: 'from-slate-400 to-gray-400',    text: '#f8fafc', badge: 'bg-slate-400 text-white' },
  // Census — marital status
  'Married-civ-spouse':    { bg: '#10b981', gradient: 'from-emerald-500 to-green-400', text: '#ecfdf5', badge: 'bg-emerald-500 text-emerald-100' },
  'Never-married':         { bg: '#0ea5e9', gradient: 'from-sky-500 to-blue-400',      text: '#f0f9ff', badge: 'bg-sky-500 text-sky-100' },
  'Divorced':              { bg: '#ef4444', gradient: 'from-red-500 to-rose-500',      text: '#fef2f2', badge: 'bg-red-500 text-red-100' },
  'Separated':             { bg: '#f97316', gradient: 'from-orange-500 to-amber-400',  text: '#fff7ed', badge: 'bg-orange-500 text-orange-100' },
  'Widowed':               { bg: '#6b7280', gradient: 'from-gray-500 to-slate-500',    text: '#f9fafb', badge: 'bg-gray-500 text-gray-100' },
  'Married-spouse-absent': { bg: '#a855f7', gradient: 'from-purple-500 to-violet-400', text: '#faf5ff', badge: 'bg-purple-500 text-purple-100' },
  'Married-AF-spouse':     { bg: '#8b5cf6', gradient: 'from-violet-500 to-indigo-400', text: '#f5f3ff', badge: 'bg-violet-500 text-violet-100' },
  // Legacy movie mood genres
  'light-hearted': { bg: '#fbbf24', gradient: 'from-amber-400 to-yellow-300', text: '#92400e', badge: 'bg-amber-400 text-amber-900' },
  'dark-themed':   { bg: '#6366f1', gradient: 'from-indigo-500 to-purple-600', text: '#e0e7ff', badge: 'bg-indigo-500 text-indigo-100' },
  'neutral':       { bg: '#6b7280', gradient: 'from-gray-400 to-slate-500',    text: '#f3f4f6', badge: 'bg-gray-500 text-gray-100' },
  'high':          { bg: '#10b981', gradient: 'from-emerald-500 to-green-400',  text: '#064e3b', badge: 'bg-emerald-500 text-emerald-100' },
  'medium':        { bg: '#f59e0b', gradient: 'from-amber-400 to-yellow-300',   text: '#78350f', badge: 'bg-amber-400 text-amber-900' },
  'low':           { bg: '#ef4444', gradient: 'from-red-500 to-rose-600',       text: '#fef2f2', badge: 'bg-red-500 text-red-100' },
};

// Hash-based color for values not explicitly listed (e.g. tweet topics, census occupations)
const _PALETTE = [
  '#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6',
  '#06b6d4','#ec4899','#f97316','#6366f1','#14b8a6',
  '#84cc16','#a855f7','#0ea5e9','#d946ef','#22c55e',
  '#dc2626','#7c3aed','#0284c7','#f43f5e','#d97706',
];

function _hashColor(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = ((h << 5) + h) ^ str.charCodeAt(i);
  const bg = _PALETTE[Math.abs(h) % _PALETTE.length];
  return { bg, gradient: '', text: '#fff', badge: `bg-[${bg}] text-white` };
}

export function getGenreColor(key) {
  return GENRE_COLORS[key] || _hashColor(String(key));
}

export const GENRE_LABELS = {
  'F': 'Female', 'M': 'Male',
  'discharged': 'Discharged',
  'expired': 'Expired',
  'dama': 'Discharged Against Medical Advice',
  'light-hearted': 'Light-Hearted',
  'dark-themed': 'Dark-Themed',
  'neutral': 'Neutral',
  'high': 'High (≥8.0)',
  'medium': 'Medium (7.0–7.9)',
  'low': 'Low (<7.0)',
};

export const GENRE_VALUES = Object.keys(GENRE_COLORS);

export const DEFAULT_CONSTRAINTS = {
  'light-hearted': '',
  'dark-themed': '',
  'neutral': '',
};
