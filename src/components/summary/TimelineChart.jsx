import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { GENRE_COLORS, GENRE_LABELS } from '../../constants/genres';
import { genreDistribution } from '../../utils/metrics';

const FAIRNESS_TOLERANCE = 10;

function isBlockFair(dist, constraints) {
  for (const [genre, target] of Object.entries(constraints)) {
    if (Math.abs((dist[genre] || 0) - target) > FAIRNESS_TOLERANCE) return false;
  }
  return true;
}

function CustomXAxisTick({ x, y, payload, data, showLabel }) {
  const entry = data.find(d => d.name === payload.value);
  const fair = entry?.isFair;
  return (
    <g transform={`translate(${x},${y})`}>
      <circle cx={0} cy={6} r={showLabel ? 7 : 4} fill={fair ? '#10b981' : '#ef4444'} opacity={0.9} />
      {showLabel && (
        <>
          <text x={0} y={6} textAnchor="middle" dominantBaseline="central" fontSize={9} fill="white" fontWeight="bold">
            {fair ? '✓' : '✗'}
          </text>
          <text
            x={0} y={20} dy={4}
            textAnchor="end"
            transform="rotate(-45, 0, 24)"
            fill="#334155"
            fontSize={13}
            fontWeight="600"
          >
            {payload.value}
          </text>
        </>
      )}
    </g>
  );
}

export default function TimelineChart({ windows, config }) {
  const constraints = config.constraints || {};

  const data = [];
  windows.forEach((win, wi) => {
    win.blocks.forEach((block, bi) => {
      const dist = genreDistribution(block);
      const entry = {
        name: `W${wi + 1}-B${bi + 1}`,
        windowIndex: wi,
        blockIndex: bi,
        isReordered: win.isReordered,
        reorderDelta: win.reorderDelta,
        preReorderBlocks: win.preReorderBlocks,
        isFair: isBlockFair(dist, constraints),
      };
      for (const g of Object.keys(constraints)) {
        entry[g] = dist[g] || 0;
      }
      data.push(entry);
    });
  });

  const reorderedDeltas = windows
    .filter(w => w.isReordered && w.reorderDelta != null)
    .map(w => w.reorderDelta)
    .sort((a, b) => b - a);
  const highlightThreshold = reorderedDeltas.length > 0
    ? reorderedDeltas[Math.floor(reorderedDeltas.length * 0.25)] || 0
    : Infinity;

  const allGenres = Object.keys(constraints);

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    const entry = payload[0]?.payload;
    const win = windows[entry?.windowIndex];
    const fair = entry?.isFair;

    let preDist = null;
    let preFair = null;
    if (win?.isReordered && win.preReorderBlocks) {
      const preBlock = win.preReorderBlocks[entry.blockIndex];
      if (preBlock) {
        preDist = genreDistribution(preBlock);
        preFair = isBlockFair(preDist, constraints);
      }
    }

    return (
      <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xl min-w-48">
        <div className="flex items-center gap-2 mb-2">
          <p className="text-base font-semibold text-slate-900">
            Window {(entry?.windowIndex || 0) + 1}, Block {(entry?.blockIndex || 0) + 1}
          </p>
          <span className={`text-sm font-semibold px-2 py-0.5 rounded ${fair ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
            {fair ? '✓ Fair' : '✗ Unfair'}
          </span>
          {win?.isReordered && <span className="text-violet-600 text-sm">⟳ Reordered</span>}
        </div>

        <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">{preDist ? 'After reorder' : 'Distribution'}</p>
        {payload.map((p) => p.value > 0 && (
          <p key={p.dataKey} className="text-sm" style={{ color: p.fill }}>
            {p.dataKey}: {p.value}%
          </p>
        ))}

        {preDist && (
          <>
            <div className="border-t border-slate-200 my-2" />
            <div className="flex items-center gap-2 mb-1">
              <p className="text-xs text-slate-400 uppercase tracking-wide">Before reorder</p>
              <span className={`text-xs font-semibold px-1 py-0.5 rounded ${preFair ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
                {preFair ? '✓ Fair' : '✗ Unfair'}
              </span>
            </div>
            {Object.entries(preDist).map(([genre, pct]) => (
              <p key={genre} className="text-sm" style={{ color: GENRE_COLORS[genre]?.bg || '#94a3b8' }}>
                {GENRE_LABELS[genre] ?? genre}: {pct}%
              </p>
            ))}
          </>
        )}
      </div>
    );
  };

  // Give every block a fixed slot so bars stay readable, show roughly 20 at a
  // time and scroll for the rest. Squeezing 100 blocks into one screen width
  // made them unreadable.
  const VISIBLE_BLOCKS = 20;
  const BAR_SLOT = 48;
  const chartWidth = Math.max(data.length, 1) * BAR_SLOT;
  const showLabels = true;
  const bottomMargin = 60;
  const xAxisHeight = 80;

  return (
    <div>
      <h3 className="text-2xl font-bold text-slate-900 mb-4">Session Timeline</h3>
      <div className="flex items-center gap-4 mb-4">
        <p className="text-base text-slate-400">
          Distribution per block across all windows.
          {reorderedDeltas.length > 0 && ' Highlighted bars indicate windows with largest reorder changes.'}
        </p>
        <div className="flex items-center gap-4 shrink-0">
          <span className="flex items-center gap-2 text-base text-slate-600 font-medium">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 text-white font-bold text-xs">✓</span>
            Fair block
          </span>
          <span className="flex items-center gap-2 text-base text-slate-600 font-medium">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white font-bold text-xs">✗</span>
            Unfair block
          </span>
        </div>
      </div>

      <div className="overflow-x-auto pb-2" style={{ maxWidth: `${VISIBLE_BLOCKS * BAR_SLOT}px` }}>
      <div style={{ width: `${chartWidth}px`, minWidth: '100%' }}>
      <ResponsiveContainer width="100%" height={420}>
        <BarChart data={data} margin={{ top: 10, right: 20, bottom: bottomMargin, left: 0 }} barCategoryGap="25%">
          <XAxis
            dataKey="name"
            tick={(props) => <CustomXAxisTick {...props} data={data} showLabel={showLabels} />}
            axisLine={{ stroke: '#e2e8f0' }}
            tickLine={false}
            height={xAxisHeight}
            interval={0}
          />
          <YAxis hide domain={[0, 100]} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: 16, color: '#334155', fontWeight: '600' }} />
          {allGenres.map((genre) => (
            <Bar
              key={genre}
              dataKey={genre}
              name={GENRE_LABELS[genre] ?? genre}
              stackId="a"
              fill={GENRE_COLORS[genre]?.bg || '#94a3b8'}
              stroke={(entry) => (entry.isReordered && entry.reorderDelta >= highlightThreshold ? '#f59e0b' : 'none')}
              strokeWidth={(entry) => (entry.isReordered && entry.reorderDelta >= highlightThreshold ? 2 : 0)}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
      </div>
      </div>
      {data.length > VISIBLE_BLOCKS && (
        <p className="text-sm text-slate-400 mt-1">
          Showing {VISIBLE_BLOCKS} of {data.length} blocks, scroll sideways for the rest.
        </p>
      )}
    </div>
  );
}
