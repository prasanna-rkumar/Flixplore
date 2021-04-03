import PropTypes from 'prop-types';
import { memo, useCallback, useContext } from 'react';
import { AppContext } from '../../context/HomePageContext';
import useMovieStore from '../../store/MoviesStore';

const MovieTile = memo(({ movie }) => {
  const setSelectedMovie = useMovieStore((zState) => zState.setSelectedMovie);
  const { openDetails } = useContext(AppContext);
  const movieTileClickAction = useCallback(() => {
    setSelectedMovie(movie.id);
    openDetails();
  }, [movie.id]);

  return (
    <div
      tabIndex={0}
      role="button"
      onClick={movieTileClickAction}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          movieTileClickAction();
        }
      }}
      key={movie.id}
      className="relative rounded-lg border-4 cursor-pointer border-transparent hover:border-pink-400 bottom-0 hover:bottom-2 focus:border-pink-600"
    >
      <img alt={movie.original_title} className="rounded" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
    </div>
  );
});

export default MovieTile;

const myPropTypes = {
  movie: PropTypes.instanceOf(Object).isRequired,
};

MovieTile.propTypes = myPropTypes;
