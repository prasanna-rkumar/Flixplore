import PropTypes from 'prop-types';
import { memo, useCallback, useContext } from 'react';
import { HomePageContext } from '../../context/HomePageContext';
import useMovieStore from '../../store/MovieStore';

const MovieTile = memo(({ movie }) => {
  const { setSelectedMovie, selectedMovieId } = useMovieStore((zState) => ({
    setSelectedMovie: zState.setSelectedMovie,
    selectedMovieId: zState.selectedMovieId,
  }));
  const { openDetails } = useContext(HomePageContext);
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
      className={`relative outline-none rounded-lg border-4 cursor-pointer border-transparent hover:border-pink-400 bottom-0 hover:bottom-2 focus:border-pink-600 ${selectedMovieId === movie.id && 'active-movie'}`}
    >
      <img alt={movie.title} className="rounded" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
    </div>
  );
});

export default MovieTile;

const myPropTypes = {
  movie: PropTypes.instanceOf(Object).isRequired,
};

MovieTile.propTypes = myPropTypes;
