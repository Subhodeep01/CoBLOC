export default function WindowControls({ onNext, onPrev, onEnd, canPrev, canNext }) {
  return (
    <div className="flex items-center justify-center gap-4 pt-6 border-t border-slate-200">
      <button
        onClick={onPrev}
        disabled={!canPrev}
        className="px-6 py-3 bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed text-base font-medium text-slate-700 rounded-lg transition-colors shadow-sm"
      >
        ← Previous Window
      </button>
      <button
        onClick={onNext}
        disabled={!canNext}
        className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-30 disabled:cursor-not-allowed text-base text-white rounded-lg transition-colors font-semibold"
      >
        Next Window →
      </button>
      <button
        onClick={onEnd}
        className="px-6 py-3 bg-red-500 hover:bg-red-400 text-base text-white rounded-lg transition-colors font-medium"
      >
        End Session
      </button>
    </div>
  );
}
