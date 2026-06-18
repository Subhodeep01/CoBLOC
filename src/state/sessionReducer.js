import { chunkIntoBlocks } from '../utils/windowOps';
import { TOPICS } from '../constants/topics';

export function sessionReducer(state, action) {
  switch (action.type) {
    case 'SET_CONFIG': {
      return {
        ...state,
        config: { ...state.config, ...action.payload },
      };
    }

    case 'START_MONITOR': {
      return { ...state, phase: 'streaming' };
    }

    case 'NEXT_WINDOW': {
      const { poolCursor, moviePool, windows, currentWindowIndex, config, landmarkActive, landmarkCounter, pendingLandmarkAffected } = state;

      if (poolCursor >= moviePool.length) return state;

      const currentWindow = windows[currentWindowIndex];
      const newMovie = moviePool[poolCursor];
      const { movies: nextMovies, blocks: nextBlocks } = createNextWindow(
        currentWindow.movies, newMovie, config.blockSize, landmarkActive, config.constraints
      );

      const newLandmarkCounter = landmarkActive ? landmarkCounter - 1 : 0;
      const newPendingLandmarkAffected = pendingLandmarkAffected > 0 ? pendingLandmarkAffected - 1 : 0;

      return {
        ...state,
        poolCursor: poolCursor + 1,
        currentWindowIndex: currentWindowIndex + 1,
        windows: [...windows, {
          windowIndex: currentWindowIndex + 1,
          movies: nextMovies,
          blocks: nextBlocks,
          isReordered: false,
          isLandmarkAffected: landmarkActive || pendingLandmarkAffected > 0,
          preReorderBlocks: null,
          reorderDelta: null,
        }],
        windowHistory: [...state.windowHistory, currentWindowIndex],
        landmarkCounter: newLandmarkCounter,
        landmarkActive: landmarkActive && newLandmarkCounter > 0,
        pendingLandmarkAffected: newPendingLandmarkAffected,
        activeBlockIndex: 0,
      };
    }

    case 'PREV_WINDOW': {
      const { windowHistory } = state;
      if (windowHistory.length === 0) return state;

      const prevIndex = windowHistory[windowHistory.length - 1];
      return {
        ...state,
        currentWindowIndex: prevIndex,
        windowHistory: windowHistory.slice(0, -1),
        activeBlockIndex: 0,
      };
    }

    case 'REORDER': {
      const { windows, currentWindowIndex, config } = state;
      const currentWindow = windows[currentWindowIndex];
      const isMoviesTopic = state.config.topic === 'Movies';
      const isGenreAttribute = (state.config.protectedAttributeField ?? 'genre') === 'genre';

      // ── Movies demo: hardcoded reorder results (Genre attribute only) ────────
      if (isMoviesTopic && isGenreAttribute && currentWindowIndex === 0) {
        // Scenario 1: W1 reorder — use exact seed, no landmark on future slides
        const newBlocks = chunkIntoBlocks(DEMO_W1_REORDERED, config.blockSize);
        const updatedWindows = [...windows];
        updatedWindows[0] = {
          ...currentWindow,
          movies: DEMO_W1_REORDERED,
          blocks: newBlocks,
          isReordered: true,
          preReorderBlocks: currentWindow.blocks.map(b => [...b]),
          reorderDelta: computeReorderDelta(currentWindow.blocks, newBlocks),
        };
        return {
          ...state,
          windows: updatedWindows,
          landmarkActive: false,
          landmarkCounter: 0,
          demoScenario: 1,
        };
      }

      if (isMoviesTopic && isGenreAttribute && currentWindowIndex === 1 && state.demoScenario === 1) {
        // Scenario 2: W2 reorder — use exact seed, switch to S2 pool
        const newBlocks = chunkIntoBlocks(DEMO_W2_REORDERED, config.blockSize);
        const updatedWindows = [...windows];
        updatedWindows[1] = {
          ...currentWindow,
          movies: DEMO_W2_REORDERED,
          blocks: newBlocks,
          isReordered: true,
          preReorderBlocks: currentWindow.blocks.map(b => [...b]),
          reorderDelta: computeReorderDelta(currentWindow.blocks, newBlocks),
        };
        return {
          ...state,
          windows: updatedWindows,
          moviePool: DEMO_POOL_S2,
          poolCursor: 0,
          landmarkActive: false,
          landmarkCounter: 0,
          pendingLandmarkAffected: config.landmarkSize,
          demoScenario: 2,
        };
      }

      // ── Default reorder (non-Movies or windows beyond demo cases) ──────────
      const preReorderBlocks = currentWindow.blocks.map(b => [...b]);
      const newBlocks = reorderBlocks(currentWindow.blocks, config.constraints);
      const delta = computeReorderDelta(preReorderBlocks, newBlocks);
      const newMovies = newBlocks.flat();

      const updatedWindows = [...windows];
      updatedWindows[currentWindowIndex] = {
        ...currentWindow,
        movies: newMovies,
        blocks: newBlocks,
        isReordered: true,
        preReorderBlocks,
        reorderDelta: delta,
      };

      return {
        ...state,
        windows: updatedWindows,
        landmarkActive: true,
        landmarkCounter: config.landmarkSize,
      };
    }

    case 'SET_ACTIVE_BLOCK': {
      return { ...state, activeBlockIndex: action.payload };
    }

    case 'END_SESSION': {
      const liveWindows = action.payload?.liveWindows;
      const resolvedWindows = liveWindows?.length > 0
        ? liveWindows.map((w, i) => ({
            windowIndex: i,
            movies: w.items,
            blocks: w.blocks,
            isReordered: false,
            preReorderBlocks: null,
            reorderDelta: null,
            isLandmarkAffected: false,
          }))
        : state.windows;

      const monitorOnly = TOPICS[state.config.topic]?.monitorOnly ?? false;
      const TOLERANCE = 10;
      const constraints = state.config.constraints;

      if (monitorOnly) {
        const allBlocks = resolvedWindows.flatMap(w => w.blocks);
        const fairBlockCount = allBlocks.filter(block => {
          const counts = {};
          for (const m of block) counts[m.genre] = (counts[m.genre] || 0) + 1;
          const total = block.length || 1;
          return Object.entries(constraints).every(([g, target]) =>
            Math.abs(Math.round((counts[g] || 0) / total * 100) - target) <= TOLERANCE
          );
        }).length;
        const monitorSessions = JSON.parse(localStorage.getItem('cofads_monitor_sessions') || '[]');
        monitorSessions.push({
          topic: state.config.topic,
          constraints: { ...state.config.constraints },
          fairBlockCount,
          totalBlockCount: allBlocks.length,
          windowCount: resolvedWindows.length,
          timestamp: Date.now(),
        });
        localStorage.setItem('cofads_monitor_sessions', JSON.stringify(monitorSessions));
      } else {
        const existing = JSON.parse(localStorage.getItem('cofads_sessions') || '[]');
        const reorderedWindows = resolvedWindows.filter(w => w.isReordered);
        const avgDelta = reorderedWindows.length > 0
          ? reorderedWindows.reduce((s, w) => s + (w.reorderDelta || 0), 0) / reorderedWindows.length
          : 0;
        const allBlocks = resolvedWindows.flatMap(w => w.blocks);
        const fairBlockCount = allBlocks.filter(block => {
          const counts = {};
          for (const m of block) counts[m.genre] = (counts[m.genre] || 0) + 1;
          const total = block.length || 1;
          return Object.entries(constraints).every(([g, target]) =>
            Math.abs(Math.round((counts[g] || 0) / total * 100) - target) <= TOLERANCE
          );
        }).length;
        existing.push({
          landmarkSize: state.config.landmarkSize,
          avgReorderDelta: avgDelta,
          fairBlockCount,
          totalBlockCount: allBlocks.length,
          windowCount: resolvedWindows.length,
          timestamp: Date.now(),
        });
        localStorage.setItem('cofads_sessions', JSON.stringify(existing));
      }

      return { ...state, windows: resolvedWindows, phase: 'summary' };
    }

    case 'RESTART': {
      const { initialState } = action.payload;
      return { ...initialState };
    }

    default:
      return state;
  }
}
