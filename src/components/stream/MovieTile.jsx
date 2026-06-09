import { useState } from 'react';
import { GENRE_COLORS, GENRE_LABELS } from '../../constants/genres';
import MovieTooltip from './MovieTooltip';

function isPatient(item) {
  return 'mrdNo' in item;
}

export default function MovieTile({ movie }) {
  const [hovered, setHovered] = useState(false);
  const color = GENRE_COLORS[movie.genre] || { bg: '#94a3b8', badge: 'bg-slate-400 text-white' };
  const patient = isPatient(movie);

  const posterGradient = patient
    ? `linear-gradient(135deg, ${color.bg}aa, ${color.bg}44)`
    : movie.genre === 'light-hearted'
    ? `linear-gradient(135deg, ${color.bg}aa, #fde68a88)`
    : movie.genre === 'dark-themed'
    ? `linear-gradient(135deg, ${color.bg}aa, #312e81aa)`
    : `linear-gradient(135deg, ${color.bg}aa, #cbd5e188)`;

  const icon = patient
    ? (movie.genre === 'discharged' ? '🏥' : movie.genre === 'expired' ? '⚕️' : movie.genre === 'acs' ? '🫀' : movie.genre === 'heart-failure' ? '💔' : movie.genre === 'anaemia' ? '🩸' : '🚶')
    : movie.genre === 'high' ? '⭐'
    : movie.genre === 'medium' ? '★'
    : movie.genre === 'low' ? '☆'
    : (movie.genre === 'light-hearted' ? '☀️' : movie.genre === 'dark-themed' ? '🌑' : '◐');

  const label = patient ? `${movie.age}${movie.gender === 'M' ? 'M' : 'F'}` : movie.title;
  const sublabel = patient ? movie.outcome : movie.year;

  return (
    <div
      className="relative group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="w-36 rounded-xl overflow-hidden bg-white border border-slate-200 hover:border-slate-400 transition-all hover:scale-105 hover:shadow-lg shadow-sm">
        <div
          className="h-44 flex items-center justify-center text-4xl"
          style={{ background: posterGradient }}
        >
          <span className="opacity-70">{icon}</span>
        </div>
        <div className="p-3">
          <p className="text-sm font-semibold text-slate-900 truncate">{label}</p>
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-xs text-slate-500">{sublabel}</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${color.badge}`}>
              {GENRE_LABELS[movie.genre] ?? movie.genre}
            </span>
          </div>
        </div>
      </div>
      {hovered && <MovieTooltip movie={movie} />}
    </div>
  );
}
