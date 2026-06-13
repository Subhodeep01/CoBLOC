import TopicSelector from '../config/TopicSelector';
import ProtectedAttribute from '../config/ProtectedAttribute';
import ConstraintEditor from '../config/ConstraintEditor';
import ParameterInputs from '../config/ParameterInputs';
import ActionButtons from '../config/ActionButtons';
import { TOPICS } from '../../constants/topics';

export default function LeftPanel({ session }) {
  const { state, reorderStatus, landmarkPending, liveStream, setConfig, startMonitor, reorder, endSession } = session;
  const { config, phase } = state;

  const topicConfig = TOPICS[config.topic];
  const monitorOnly = topicConfig?.monitorOnly ?? false;
  const isLive = topicConfig?.live ?? false;

  const handleTopicChange = (topic) => {
    const preset = TOPICS[topic];
    if (preset) {
      const firstAttr = preset.protectedAttributes?.[0];
      setConfig({
        topic,
        protectedAttribute: preset.protectedAttribute,
        protectedAttributeField: firstAttr?.field ?? 'genre',
        constraints: { ...preset.constraints },
      });
    } else {
      setConfig({ topic });
    }
  };

  // When Live Kafka Stream is selected, populate constraints from the backend attributes
  const liveAttrs = liveStream.apiAttributes;
  const liveConstraints = config.constraints;

  const handleMonitor = () => {
    if (isLive) {
      // Build constraint keys from what the backend reports
      if (liveAttrs.unique_values.length > 0 && Object.keys(liveConstraints).length === 0) {
        const equal = Math.floor(100 / liveAttrs.unique_values.length);
        const newConstraints = {};
        liveAttrs.unique_values.forEach((v, i) => {
          newConstraints[v] = i === 0 ? 100 - equal * (liveAttrs.unique_values.length - 1) : equal;
        });
        setConfig({ constraints: newConstraints });
      }
      startMonitor();
      liveStream.startStream({
        kafkaTopic: config.kafkaTopic || 'fairness-stream',
        windowSize: config.windowSize || 20,
        blockSize: config.blockSize || 5,
        maxWindows: 500,
        constraints: liveConstraints,
      });
    } else {
      startMonitor();
    }
  };

  return (
    <aside className="w-96 min-w-96 bg-white border-r border-slate-200 flex flex-col h-screen overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight">CoBLOC</h1>
            <p className="text-base text-slate-500 mt-1">Continuous Block Level Fairness on Data Streams</p>
          </div>
          {isLive && (
            <span className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
              liveStream.connected
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-slate-100 text-slate-400'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${liveStream.connected ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
              {liveStream.connected ? 'Connected' : 'Disconnected'}
            </span>
          )}
        </div>
      </div>

      {/* Config */}
      <div className="p-6 space-y-6 flex-1">
        <TopicSelector value={config.topic} onChange={handleTopicChange} disabled={phase !== 'config'} />

        {/* Live-specific controls */}
        {isLive && (
          <div className="space-y-4">
            {/* Kafka topic input */}
            <div>
              <label className="block text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">
                Kafka Topic
              </label>
              <input
                type="text"
                value={config.kafkaTopic || ''}
                onChange={e => setConfig({ kafkaTopic: e.target.value })}
                disabled={phase !== 'config'}
                placeholder="fairness-stream"
                className="w-full bg-slate-100 border border-slate-300 rounded-lg px-4 py-2.5 text-base text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:opacity-50"
              />
            </div>

            {/* Produce data button */}
            {phase === 'config' && (
              <button
                onClick={() => liveStream.produceData(config.kafkaTopic || 'fairness-stream')}
                disabled={liveStream.producing || !liveStream.connected}
                className="w-full py-2 px-4 bg-sky-50 hover:bg-sky-100 disabled:opacity-40 border border-sky-200 text-sky-700 font-medium rounded-lg text-sm transition-colors"
              >
                {liveStream.producing ? '⏳ Producing…' : '⬆ Produce data to Kafka first'}
              </button>
            )}

            {/* Backend attribute info */}
            {liveAttrs.column && (
              <div className="bg-slate-50 rounded-lg p-3 text-sm text-slate-600 border border-slate-200">
                <span className="font-medium">Attribute:</span> {liveAttrs.column}
                {' · '}
                <span className="font-medium">Values:</span> {liveAttrs.unique_values.join(', ')}
              </div>
            )}

            {/* Auto-populate constraints from backend when Live topic selected */}
            {liveAttrs.unique_values.length > 0 &&
             Object.keys(liveConstraints).length === 0 &&
             phase === 'config' && (() => {
              const equal = Math.floor(100 / liveAttrs.unique_values.length);
              const newConstraints = {};
              liveAttrs.unique_values.forEach((v, i) => {
                newConstraints[v] = i === 0 ? 100 - equal * (liveAttrs.unique_values.length - 1) : equal;
              });
              // Side-effect in render — schedule it to avoid
              setTimeout(() => setConfig({ constraints: newConstraints }), 0);
              return null;
            })()}
          </div>
        )}

        {!isLive && (
          <ProtectedAttribute
            value={config.protectedAttribute}
            onChange={(v) => {
              const match = topicConfig?.protectedAttributes?.find(a => a.label === v);
              setConfig({
                protectedAttribute: v,
                ...(match ? { constraints: { ...match.constraints }, protectedAttributeField: match.field } : {}),
              });
            }}
            disabled={phase !== 'config'}
            options={topicConfig?.protectedAttributes?.map(a => a.label)}
          />
        )}

        <ConstraintEditor
          constraints={config.constraints}
          onChange={(v) => setConfig({ constraints: v })}
          disabled={phase !== 'config'}
        />

        <ParameterInputs
          config={config}
          onChange={setConfig}
          disabled={phase !== 'config'}
          monitorOnly={monitorOnly}
          landmarkEnabled={landmarkPending}
        />
      </div>

      {/* Actions */}
      <div className="p-6 border-t border-slate-200 space-y-3">
        {/* Live stream stop button */}
        {isLive && phase === 'streaming' && liveStream.running && (
          <button
            onClick={() => { liveStream.stopStream(); endSession(); }}
            className="w-full py-3 px-4 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg text-base transition-colors"
          >
            ■ Stop Stream
          </button>
        )}

        {!(isLive && phase === 'streaming' && liveStream.running) && (
          <ActionButtons
            phase={phase}
            onMonitor={handleMonitor}
            onReorder={() => reorder(state.currentWindowIndex, state.demoScenario)}
            monitorOnly={monitorOnly}
            isReordering={reorderStatus?.phase === 'reordering' && !landmarkPending}
            reorderStatus={reorderStatus}
            currentWindowReordered={
              phase === 'streaming' &&
              !!(state.windows[state.currentWindowIndex]?.isReordered ||
                 state.windows[state.currentWindowIndex]?.isLandmarkAffected)
            }
          />
        )}
      </div>
    </aside>
  );
}
