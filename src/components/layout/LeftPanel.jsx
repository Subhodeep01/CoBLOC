import { useEffect } from 'react';
import ParameterInputs from '../config/ParameterInputs';
import { TOPICS } from '../../constants/topics';

export default function LeftPanel({ session }) {
  const { state, liveStream, setConfig, startMonitor, endSession } = session;
  const { config, phase } = state;

  const topicConfig = TOPICS[config.topic];
  const attrOptions = topicConfig?.protectedAttributes ?? [];

  // Find the dataset info from backend for the current topic
  const apiDataset = liveStream.apiDatasets.find(d => d.name === config.topic);
  const apiAttr = apiDataset?.attributes.find(a => a.column === config.protectedAttributeColumn);
  const uniqueValues = apiAttr?.unique_values ?? [];

  // Auto-populate constraints from backend unique values when attribute changes
  useEffect(() => {
    if (phase !== 'config') return;
    if (uniqueValues.length === 0) return;
    if (Object.keys(config.constraints).length > 0) return;

    const n = uniqueValues.length;
    const equal = Math.floor(100 / n);
    const newConstraints = {};
    uniqueValues.forEach((v, i) => {
      newConstraints[v] = i === 0 ? 100 - equal * (n - 1) : equal;
    });
    setConfig({ constraints: newConstraints });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uniqueValues.join(','), config.topic, config.protectedAttributeColumn, phase]);

  const handleTopicChange = (topic) => {
    const preset = TOPICS[topic];
    if (!preset) return;
    const firstAttr = preset.protectedAttributes?.[0];
    setConfig({
      topic,
      protectedAttribute: firstAttr?.label ?? '',
      protectedAttributeColumn: firstAttr?.column ?? '',
      kafkaTopic: preset.topic,
      constraints: {},
    });
  };

  const handleAttributeChange = (label) => {
    const match = attrOptions.find(a => a.label === label);
    if (!match) return;
    setConfig({
      protectedAttribute: match.label,
      protectedAttributeColumn: match.column,
      constraints: {},
    });
  };

  const handleMonitor = () => {
    let constraintsToUse = config.constraints;

    if (uniqueValues.length > 0 && Object.keys(constraintsToUse).length === 0) {
      const n = uniqueValues.length;
      const equal = Math.floor(100 / n);
      const newConstraints = {};
      uniqueValues.forEach((v, i) => {
        newConstraints[v] = i === 0 ? 100 - equal * (n - 1) : equal;
      });
      setConfig({ constraints: newConstraints });
      constraintsToUse = newConstraints;
    }

    startMonitor();
    liveStream.startStream({
      kafkaTopic: liveStream.producedTopic,
      windowSize: config.windowSize || 10,
      blockSize: config.blockSize || 5,
      maxWindows: 50,
      delayMs: 0,
      constraints: constraintsToUse,
      attributeColumn: config.protectedAttributeColumn || 'GENDER',
    });
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
          <span className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
            liveStream.connected
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-slate-100 text-slate-400'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${liveStream.connected ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
            {liveStream.connected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>

      {/* Config */}
      <div className="p-6 space-y-6 flex-1">

        {/* Dataset selector */}
        <div>
          <label className="block text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">
            Topic of Exploration
          </label>
          <div className="relative">
            <select
              value={config.topic}
              onChange={e => handleTopicChange(e.target.value)}
              disabled={phase !== 'config'}
              className="w-full appearance-none bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-base text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:opacity-50 pr-10"
            >
              {Object.keys(TOPICS).map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">▾</span>
          </div>
        </div>

        {/* Protected attribute selector */}
        <div>
          <label className="block text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">
            Protected Attribute
          </label>
          <div className="relative">
            <select
              value={config.protectedAttribute}
              onChange={e => handleAttributeChange(e.target.value)}
              disabled={phase !== 'config'}
              className="w-full appearance-none bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-base text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:opacity-50 pr-10"
            >
              {attrOptions.map(a => (
                <option key={a.label} value={a.label}>{a.label}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">▾</span>
          </div>
        </div>

        {/* Attribute values info */}
        {uniqueValues.length > 0 && (
          <div className="bg-slate-50 rounded-lg p-3 text-sm text-slate-600 border border-slate-200">
            <span className="font-medium">Values:</span> {uniqueValues.join(', ')}
          </div>
        )}

        {/* Constraints */}
        {uniqueValues.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">
              Constraints
            </label>
            <div className="space-y-2">
              {uniqueValues.map(v => (
                <div key={v} className="flex items-center gap-3">
                  <span className="text-sm text-slate-700 w-36 truncate">{v}</span>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={config.constraints[v] ?? ''}
                    onChange={e => setConfig({ constraints: { ...config.constraints, [v]: Number(e.target.value) } })}
                    disabled={phase !== 'config'}
                    className="w-20 bg-slate-100 border border-slate-300 rounded-lg px-3 py-1.5 text-sm text-slate-900 focus:outline-none focus:border-emerald-500 disabled:opacity-50"
                  />
                  <span className="text-sm text-slate-400">%</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Produce button */}
        {phase === 'config' && (
          <button
            onClick={() => liveStream.produceData(config.topic)}
            disabled={liveStream.producing || !liveStream.connected}
            className="w-full py-2 px-4 bg-sky-50 hover:bg-sky-100 disabled:opacity-40 border border-sky-200 text-sky-700 font-medium rounded-lg text-sm transition-colors"
          >
            {liveStream.producing ? 'Producing...' : 'Produce data to Kafka first'}
          </button>
        )}

        {/* Window / Block size */}
        <ParameterInputs
          config={config}
          onChange={setConfig}
          disabled={phase !== 'config'}
          monitorOnly={true}
          landmarkEnabled={false}
        />
      </div>

      {/* Actions */}
      <div className="p-6 border-t border-slate-200 space-y-3">
        {phase === 'streaming' && liveStream.running && (
          <button
            onClick={() => { liveStream.stopStream(); endSession(liveStream.windowBuffer); }}
            className="w-full py-3 px-4 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg text-base transition-colors"
          >
            Stop Stream
          </button>
        )}

        {!(phase === 'streaming' && liveStream.running) && (
          <button
            onClick={handleMonitor}
            disabled={phase === 'streaming' || !liveStream.producedTopic || liveStream.producedDataset !== config.topic}
            className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-semibold rounded-lg text-base transition-colors"
          >
            Monitor
          </button>
        )}
      </div>
    </aside>
  );
}
