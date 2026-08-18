import { useReducer, useCallback, useState, useRef } from 'react';
import { sessionReducer } from '../state/sessionReducer';
import { initialState } from '../state/initialState';
import { useLiveStream } from './useLiveStream';

export function useSession() {
  const [state, dispatch] = useReducer(sessionReducer, initialState);
  const liveStream = useLiveStream();
  const [reorderStatus, setReorderStatus] = useState(null);
  const [landmarkPending, setLandmarkPendingState] = useState(false);
  const landmarkPendingRef = useRef(false);
  // reorderStatus: null | { phase: 'reordering' | 'done', message: string, sub?: string }

  const setLandmarkPending = (v) => {
    landmarkPendingRef.current = v;
    setLandmarkPendingState(v);
  };

  const setConfig = useCallback((updates) => {
    dispatch({ type: 'SET_CONFIG', payload: updates });
  }, []);

  const startMonitor = useCallback(() => {
    dispatch({ type: 'START_MONITOR' });
  }, []);

  const nextWindow = useCallback(() => {
    dispatch({ type: 'NEXT_WINDOW' });
  }, []);

  const prevWindow = useCallback(() => {
    dispatch({ type: 'PREV_WINDOW' });
  }, []);

  const reorder = useCallback(async (currentWindowIndex, demoScenario) => {
    if (currentWindowIndex === 0) {
      dispatch({ type: 'REORDER' });
      setReorderStatus({ phase: 'done', message: 'Reorder done internally', sub: 'No landmark involved' });
      setTimeout(() => setReorderStatus(null), 4000);
    } else if (currentWindowIndex === 1 && demoScenario === 1) {
      if (!landmarkPendingRef.current) {
        // First reorder at W2: prompt for landmark
        setLandmarkPending(true);
        setReorderStatus({
          phase: 'reordering',
          message: 'Insufficient items to achieve fairness with internal reordering. Please specify landmark.',
        });
      } else {
        // Second reorder at W2: landmark selected, apply reorder
        setLandmarkPending(false);
        dispatch({ type: 'REORDER' });
        setReorderStatus({ phase: 'done', message: 'Window reordered using landmarks' });
        setTimeout(() => setReorderStatus(null), 4000);
      }
    } else if (currentWindowIndex >= 1 && currentWindowIndex <= 6) {
      setReorderStatus({ phase: 'reordering', message: 'Internal Reorder not possible, utilizing landmark items' });
      await new Promise(resolve => setTimeout(resolve, 8000));
      dispatch({ type: 'REORDER' });
      setReorderStatus({ phase: 'done', message: 'Window reordered using landmarks' });
      setTimeout(() => setReorderStatus(null), 4000);
    } else {
      dispatch({ type: 'REORDER' });
    }
  }, []);

  const setActiveBlock = useCallback((index) => {
    dispatch({ type: 'SET_ACTIVE_BLOCK', payload: index });
  }, []);

  const endSession = useCallback((liveWindows) => {
    dispatch({ type: 'END_SESSION', payload: { liveWindows } });
  }, []);

  const restart = useCallback(() => {
    dispatch({ type: 'RESTART', payload: { initialState } });
  }, []);

  return {
    state,
    reorderStatus,
    landmarkPending,
    liveStream,
    setConfig,
    startMonitor,
    nextWindow,
    prevWindow,
    reorder,
    setActiveBlock,
    endSession,
    restart,
  };
}
