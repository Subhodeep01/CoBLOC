import MovieTile from './MovieTile';

export default function Block({ movies, blockIndex, totalBlocks }) {
  const isPatientData = movies.length > 0 && 'mrdNo' in movies[0];
  const itemLabel = isPatientData ? 'patient' : 'movie';
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-slate-600">
          Block {blockIndex + 1} of {totalBlocks}
        </h3>
        <span className="text-sm text-slate-400">
          {movies.length} {itemLabel}{movies.length !== 1 ? 's' : ''}
        </span>
      </div>
      <div className="flex flex-wrap gap-4 justify-center">
        {movies.map((movie) => (
          <MovieTile key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
