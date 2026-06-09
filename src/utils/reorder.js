/**
 * Reorder movies within each block to satisfy genre constraints.
 * @param {Array[]} blocks - Array of blocks, each block is an array of movies
 * @param {Object} constraints - { genre: percentage } e.g. { "light-hearted": 50, "dark-themed": 30, "neutral": 20 }
 * @returns {Array[]} New blocks with movies redistributed
 */
export function reorderBlocks(blocks, constraints) {
  const allMovies = blocks.flat();
  const genres = Object.keys(constraints);

  // Group movies by genre
  const byGenre = {};
  for (const g of genres) byGenre[g] = [];
  for (const m of allMovies) {
    if (byGenre[m.genre]) byGenre[m.genre].push(m);
    else {
      // Unknown genre, put in first bucket
      byGenre[genres[0]].push(m);
    }
  }

  const blockSize = blocks[0]?.length || 0;
  const newBlocks = [];

  // Track used movies to avoid duplicates
  const usedIds = new Set();

  for (let b = 0; b < blocks.length; b++) {
    const block = [];
    // Calculate how many of each genre for this block
    const allocations = {};
    let remaining = blockSize;

    // First pass: floor allocations
    for (const g of genres) {
      allocations[g] = Math.floor(blockSize * (constraints[g] / 100));
      remaining -= allocations[g];
    }

    // Distribute remainder by largest fractional part
    const fractions = genres.map(g => ({
      genre: g,
      frac: (blockSize * (constraints[g] / 100)) - Math.floor(blockSize * (constraints[g] / 100))
    })).sort((a, b) => b.frac - a.frac);

    for (let i = 0; i < remaining; i++) {
      allocations[fractions[i].genre]++;
    }

    // Fill block
    for (const g of genres) {
      let count = allocations[g];
      for (const m of byGenre[g]) {
        if (count <= 0) break;
        if (!usedIds.has(m.id)) {
          block.push(m);
          usedIds.add(m.id);
          count--;
        }
      }
    }

    // If block is short (not enough movies of some genre), fill with any remaining
    if (block.length < blockSize) {
      for (const g of genres) {
        for (const m of byGenre[g]) {
          if (block.length >= blockSize) break;
          if (!usedIds.has(m.id)) {
            block.push(m);
            usedIds.add(m.id);
          }
        }
      }
    }

    newBlocks.push(block);
  }

  return newBlocks;
}

/**
 * Compute how different two block arrangements are (0 to 1).
 */
export function computeReorderDelta(oldBlocks, newBlocks) {
  const oldOrder = oldBlocks.flat().map(m => m.id);
  const newOrder = newBlocks.flat().map(m => m.id);
  let mismatches = 0;
  const len = Math.min(oldOrder.length, newOrder.length);
  for (let i = 0; i < len; i++) {
    if (oldOrder[i] !== newOrder[i]) mismatches++;
  }
  return len > 0 ? mismatches / len : 0;
}
