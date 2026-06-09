import TopicSelector from '../config/TopicSelector';
import ProtectedAttribute from '../config/ProtectedAttribute';
import ConstraintEditor from '../config/ConstraintEditor';
import ParameterInputs from '../config/ParameterInputs';
import ActionButtons from '../config/ActionButtons';
import { TOPICS } from '../../constants/topics';

export default function LeftPanel({ session }) {
  const { state, reorderStatus, landmarkPending, setConfig, startMonitor, reorder } = session;
  const { config, phase } = state;

  const topicConfig = TOPICS[config.topic];
  const monitorOnly = topicConfig?.monitorOnly ?? false;

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

  return (
    <aside className="w-96 min-w-96 bg-white border-r border-slate-200 flex flex-col h-screen overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-slate-200">
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
          CoBLOC
        </h1>
        <p className="text-base text-slate-500 mt-1">Continuous Block Level Fairness on Data Streams</p>
      </div>

      {/* Config */}
      <div className="p-6 space-y-6 flex-1">
        <TopicSelector value={config.topic} onChange={handleTopicChange} disabled={phase !== 'config'} />
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
        <ConstraintEditor constraints={config.constraints} onChange={(v) => setConfig({ constraints: v })} disabled={phase !== 'config'} />
        <ParameterInputs config={config} onChange={setConfig} disabled={phase !== 'config'} monitorOnly={monitorOnly} landmarkEnabled={landmarkPending} />
      </div>

      {/* Actions */}
      <div className="p-6 border-t border-slate-200">
        <ActionButtons
          phase={phase}
          onMonitor={startMonitor}
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
      </div>
    </aside>
  );
}
