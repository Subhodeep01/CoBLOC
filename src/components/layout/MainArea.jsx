import LiveStream from '../stream/LiveStream';
import SummaryPage from '../summary/SummaryPage';

export default function MainArea({ session }) {
  const { state, liveStream, endSession } = session;

  return (
    <main className="flex-1 overflow-y-auto bg-slate-50 p-6">
      {state.phase === 'config' && (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-slate-700 mb-2">Welcome to CoBLOC</h2>
            <p className="text-slate-500 max-w-md">
              Configure your parameters in the left panel, then click{' '}
              <span className="text-emerald-600 font-medium">Monitor</span> to start exploring.
            </p>
          </div>
        </div>
      )}

      {state.phase === 'streaming' && (
        <LiveStream
          liveStream={liveStream}
          config={state.config}
          onEnd={() => {
            // The stream no longer stops itself after a fixed window count, so
            // ending the session has to stop it. Otherwise the consumer keeps
            // running and competes with the ablation sweep for CPU.
            liveStream.stopStream();
            endSession(liveStream.visitedWindows);
          }}
        />
      )}

      {state.phase === 'summary' && (
        <SummaryPage session={session} />
      )}
    </main>
  );
}
