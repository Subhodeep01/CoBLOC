import { DEFAULT_CONSTRAINTS } from '../constants/genres';

export const initialState = {
  config: {
    topic: 'Movies',
    protectedAttribute: 'Genre',
    protectedAttributeField: 'genre',
    constraints: { ...DEFAULT_CONSTRAINTS },
    windowSize: '',
    blockSize: '',
    landmarkSize: '',
    kafkaTopic: 'fairness-stream',
  },
  phase: 'config', // 'config' | 'streaming' | 'summary'
  currentWindowIndex: 0,
  windows: [],           // Array of WindowState
  moviePool: [],         // Remaining movies not yet shown
  poolCursor: 0,
  landmarkCounter: 0,
  landmarkActive: false,
  windowHistory: [],     // Stack for previous window navigation
  activeBlockIndex: 0,   // Which block is currently visible
  demoScenario: 0,       // 0 = no reorder, 1 = after W1 reorder, 2 = after W2 reorder
  pendingLandmarkAffected: 0, // windows remaining that should be marked isLandmarkAffected without reordering
};
