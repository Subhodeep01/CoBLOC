import { GENRE_COLORS, GENRE_LABELS } from '../../constants/genres';

function isPatient(item) {
  return 'mrdNo' in item;
}

function PatientTooltip({ patient }) {
  const color = GENRE_COLORS[patient.genre] || { bg: '#94a3b8' };

  return (
    <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-white border border-slate-200 rounded-lg shadow-xl p-3 pointer-events-none">
      <div className="flex items-start gap-2 mb-2">
        <span
          className="w-2 h-2 rounded-full mt-1 shrink-0"
          style={{ backgroundColor: color.bg }}
        />
        <div>
          <p className="text-sm font-semibold text-slate-900">Patient #{patient.mrdNo}</p>
          <p className="text-xs text-slate-500">
            {patient.age} yrs &middot; {patient.gender === 'M' ? 'Male' : 'Female'} &middot; {patient.rural}
          </p>
        </div>
      </div>

      <div className="space-y-1 text-xs mb-2">
        <div className="flex justify-between">
          <span className="text-slate-500">Admission</span>
          <span className="text-slate-700">{patient.admissionType} &middot; {patient.dateOfAdmission}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Stay</span>
          <span className="text-slate-700">{patient.durationOfStay} days{patient.icuStay ? ` (ICU: ${patient.icuStay}d)` : ''}</span>
        </div>
        {patient.ejectionFraction != null && (
          <div className="flex justify-between">
            <span className="text-slate-500">EF</span>
            <span className="text-slate-700">{patient.ejectionFraction}%</span>
          </div>
        )}
      </div>

      {patient.diagnoses && patient.diagnoses.length > 0 && patient.diagnoses[0] !== 'No specific diagnosis' && (
        <div className="mb-2">
          <p className="text-[10px] text-slate-400 uppercase mb-1">Diagnoses</p>
          <div className="flex flex-wrap gap-1">
            {patient.diagnoses.slice(0, 4).map((d) => (
              <span key={d} className="text-[10px] px-1.5 py-0.5 bg-slate-100 rounded text-slate-600">
                {d}
              </span>
            ))}
            {patient.diagnoses.length > 4 && (
              <span className="text-[10px] text-slate-400">+{patient.diagnoses.length - 4} more</span>
            )}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between text-xs">
        <span className="capitalize text-slate-500">{patient.outcome}</span>
        <span
          className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium ${color.badge || 'bg-slate-200 text-slate-700'}`}
        >
          {GENRE_LABELS[patient.genre] ?? patient.genre}
        </span>
      </div>

      {/* Arrow */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white" />
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-200 translate-y-px" />
    </div>
  );
}

function LiveItemTooltip({ movie }) {
  const color = GENRE_COLORS[movie.genre] || { bg: '#94a3b8' };
  const raw = movie.raw || {};
  const skip = new Set(['value']);
  const entries = Object.entries(raw).filter(([k]) => !skip.has(k) && raw[k] !== '');

  return (
    <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-white border border-slate-200 rounded-lg shadow-xl p-3 pointer-events-none">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color.bg }} />
        <p className="text-sm font-semibold text-slate-900">{movie.title}</p>
      </div>
      <div className="space-y-1 text-xs">
        {entries.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-2">
            <span className="text-slate-500 shrink-0">{k}</span>
            <span className="text-slate-700 text-right truncate max-w-32">{v}</span>
          </div>
        ))}
      </div>
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white" />
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-200 translate-y-px" />
    </div>
  );
}

export default function MovieTooltip({ movie }) {
  if (isPatient(movie)) {
    return <PatientTooltip patient={movie} />;
  }

  if (movie.liveItem) {
    return <LiveItemTooltip movie={movie} />;
  }

  const color = GENRE_COLORS[movie.genre] || { bg: '#94a3b8' };

  return (
    <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-white border border-slate-200 rounded-lg shadow-xl p-3 pointer-events-none">
      <div className="flex items-start gap-2 mb-2">
        <span
          className="w-2 h-2 rounded-full mt-1 shrink-0"
          style={{ backgroundColor: color.bg }}
        />
        <div>
          <p className="text-sm font-semibold text-slate-900">{movie.title}</p>
          <p className="text-xs text-slate-500">{movie.year} &middot; Dir. {movie.director}</p>
        </div>
      </div>
      <p className="text-xs text-slate-600 mb-2">{movie.description}</p>
      <div className="flex items-center justify-between text-xs">
        <span className="capitalize text-slate-500">{GENRE_LABELS[movie.genre] ?? movie.genre}</span>
        <span className="text-amber-500">★ {movie.rating}</span>
      </div>
      {/* Arrow */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white" />
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-200 translate-y-px" />
    </div>
  );
}
