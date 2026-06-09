/**
 * Calculate genre distribution for a block.
 * @returns {{ [genre: string]: number }} percentages summing to ~100
 */
export function genreDistribution(movies) {
  const counts = {};
  for (const m of movies) {
    counts[m.genre] = (counts[m.genre] || 0) + 1;
  }
  const total = movies.length || 1;
  const dist = {};
  for (const [g, c] of Object.entries(counts)) {
    dist[g] = Math.round((c / total) * 100);
  }
  return dist;
}

/**
 * Compute fairness score: average absolute deviation from target constraints across all blocks.
 * Lower is better. 0 = perfect.
 */
export function fairnessScore(blocks, constraints) {
  const genres = Object.keys(constraints);
  let totalDeviation = 0;
  let count = 0;

  for (const block of blocks) {
    const dist = genreDistribution(block);
    for (const g of genres) {
      totalDeviation += Math.abs((dist[g] || 0) - constraints[g]);
      count++;
    }
  }

  return count > 0 ? totalDeviation / count : 0;
}
