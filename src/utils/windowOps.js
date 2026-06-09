import { reorderBlocks } from './reorder';

/**
 * Chunk an array of movies into blocks of given size.
 */
export function chunkIntoBlocks(movies, blockSize) {
  const blocks = [];
  for (let i = 0; i < movies.length; i += blockSize) {
    blocks.push(movies.slice(i, i + blockSize));
  }
  return blocks;
}

/**
 * Create the next window: remove first movie, add new movie at end.
 * If landmark is active, reorder each block to satisfy constraints.
 */
export function createNextWindow(currentMovies, newMovie, blockSize, landmarkActive, constraints) {
  const nextMovies = [...currentMovies.slice(1), newMovie];
  let blocks = chunkIntoBlocks(nextMovies, blockSize);

  if (landmarkActive) {
    blocks = reorderBlocks(blocks, constraints);
  }

  return { movies: nextMovies, blocks };
}
