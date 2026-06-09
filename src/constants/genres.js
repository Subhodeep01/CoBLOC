export const GENRE_COLORS = {
  // Movie genres
  'light-hearted': { bg: '#fbbf24', gradient: 'from-amber-400 to-yellow-300', text: '#92400e', badge: 'bg-amber-400 text-amber-900' },
  'dark-themed':   { bg: '#6366f1', gradient: 'from-indigo-500 to-purple-600', text: '#e0e7ff', badge: 'bg-indigo-500 text-indigo-100' },
  'neutral':       { bg: '#6b7280', gradient: 'from-gray-400 to-slate-500',    text: '#f3f4f6', badge: 'bg-gray-500 text-gray-100' },
  // Hospital outcome categories
  'discharged':    { bg: '#10b981', gradient: 'from-emerald-500 to-green-400',  text: '#064e3b', badge: 'bg-emerald-500 text-emerald-100' },
  'expired':       { bg: '#ef4444', gradient: 'from-red-500 to-rose-600',      text: '#fef2f2', badge: 'bg-red-500 text-red-100' },
  'dama':          { bg: '#f59e0b', gradient: 'from-amber-500 to-orange-500',  text: '#78350f', badge: 'bg-amber-500 text-amber-900' },
  // Rating categories
  'high':           { bg: '#10b981', gradient: 'from-emerald-500 to-green-400',  text: '#064e3b', badge: 'bg-emerald-500 text-emerald-100' },
  'medium':         { bg: '#f59e0b', gradient: 'from-amber-400 to-yellow-300',   text: '#78350f', badge: 'bg-amber-400 text-amber-900' },
  'low':            { bg: '#ef4444', gradient: 'from-red-500 to-rose-600',       text: '#fef2f2', badge: 'bg-red-500 text-red-100' },
  // Primary diagnosis categories
  'acs':           { bg: '#dc2626', gradient: 'from-red-600 to-rose-500',       text: '#fef2f2', badge: 'bg-red-600 text-red-100' },
  'heart-failure': { bg: '#7c3aed', gradient: 'from-violet-600 to-purple-500',  text: '#f5f3ff', badge: 'bg-violet-600 text-violet-100' },
  'anaemia':       { bg: '#0284c7', gradient: 'from-sky-600 to-blue-500',       text: '#f0f9ff', badge: 'bg-sky-600 text-sky-100' },
};

export const GENRE_LABELS = {
  'discharged': 'Discharged',
  'expired': 'Expired',
  'dama': 'Discharged Against Medical Advice',
  'light-hearted': 'Light-Hearted',
  'dark-themed': 'Dark-Themed',
  'neutral': 'Neutral',
  'high': 'High (≥8.0)',
  'medium': 'Medium (7.0–7.9)',
  'low': 'Low (<7.0)',
  'acs': 'Acute Coronary Syndrome',
  'heart-failure': 'Heart Failure',
  'anaemia': 'Anaemia',
};

export const GENRE_VALUES = Object.keys(GENRE_COLORS);

export const DEFAULT_CONSTRAINTS = {
  'light-hearted': '',
  'dark-themed': '',
  'neutral': '',
};
