import movies from '../data/mockMovies';
import patients from '../data/hospitalData';
import { DEMO_POOL_S01, DEMO_W1_REORDERED, DEMO_W2_REORDERED, DEMO_POOL_S2 } from '../data/demoMoviesData';
import { chunkIntoBlocks, createNextWindow } from '../utils/windowOps';
import { reorderBlocks, computeReorderDelta } from '../utils/reorder';
import { TOPICS } from '../constants/topics';

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function sessionReducer(state, action) {
  switch (action.type) {
    case 'SET_CONFIG': {
      return {
        ...state,
        config: { ...state.config, ...action.payload },
      };
    }

    case 'START_MONITOR': {
      // Live Kafka Stream — skip static pool setup; WebSocket drives the display
      if (state.config.topic === 'Live Kafka Stream') {
        return { ...state, phase: 'streaming' };
      }

      const isMoviesTopic = state.config.topic === 'Movies';
      const isHospitalTopic = state.config.topic === 'Hospital Admissions Data';
      const isPrimaryDiagnosis = isHospitalTopic && state.config.protectedAttribute === 'Primary Diagnosis';

      const protectedField = state.config.protectedAttributeField ?? 'genre';
      const isRatingAttribute = isMoviesTopic && protectedField === 'ratingCategory';

      let pool;
      if (isMoviesTopic && !isRatingAttribute) {
        pool = DEMO_POOL_S01;
      } else if (isMoviesTopic && isRatingAttribute) {
        pool = shuffleArray(movies.map(m => ({
          ...m,
          genre: m.rating >= 8.0 ? 'high' : m.rating >= 7.0 ? 'medium' : 'low',
        })));
      } else if (isPrimaryDiagnosis) {
        pool = shuffleArray(patients.map(p => {
          const primary = (p.diagnoses?.[0] || '').toLowerCase();
          const diagnosisGenre =
            primary.includes('acs') ? 'acs' :
            primary.includes('heart failure') ? 'heart-failure' :
            primary.includes('anaemia') ? 'anaemia' :
            'acs';
          return { ...p, genre: diagnosisGenre };
        }));
      } else {
        pool = shuffleArray(isHospitalTopic ? patients : movies);
      }

      const { windowSize, blockSize } = state.config;
      const firstMovies = pool.slice(0, windowSize);
      const blocks = chunkIntoBlocks(firstMovies, blockSize);

      return {
        ...state,
        phase: 'streaming',
        moviePool: pool,
        poolCursor: windowSize,
        currentWindowIndex: 0,
        windows: [{
          windowIndex: 0,
          movies: firstMovies,
          blocks,
          isReordered: false,
          preReorderBlocks: null,
          reorderDelta: null,
        }],
        windowHistory: [],
        landmarkCounter: 0,
        landmarkActive: false,
        activeBlockIndex: 0,
        demoScenario: 0,
      };
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
      const monitorOnly = TOPICS[state.config.topic]?.monitorOnly ?? false;
      const TOLERANCE = 10;

      if (monitorOnly) {
        const allBlocks = state.windows.flatMap(w => w.blocks);
        const constraints = state.config.constraints;
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
          windowCount: state.windows.length,
          timestamp: Date.now(),
        });
        localStorage.setItem('cofads_monitor_sessions', JSON.stringify(monitorSessions));
      } else {
        const existing = JSON.parse(localStorage.getItem('cofads_sessions') || '[]');
        const reorderedWindows = state.windows.filter(w => w.isReordered);
        const avgDelta = reorderedWindows.length > 0
          ? reorderedWindows.reduce((s, w) => s + (w.reorderDelta || 0), 0) / reorderedWindows.length
          : 0;
        const allBlocks = state.windows.flatMap(w => w.blocks);
        const constraints = state.config.constraints;
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
          windowCount: state.windows.length,
          timestamp: Date.now(),
        });
        localStorage.setItem('cofads_sessions', JSON.stringify(existing));
      }

      return { ...state, phase: 'summary' };
    }

    case 'RESTART': {
      const { initialState } = action.payload;
      return { ...initialState };
    }

    default:
      return state;
  }
}
