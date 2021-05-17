import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { memo, useCallback, useContext } from 'react';
import { HomePageContext } from '../../context/HomePageContext';
import useMovieStore from '../../store/MovieStore';

const MovieTile = memo(({ movie }) => {
  const router = useRouter();
  const { setSelectedMovie, selectedMovieId } = useMovieStore((zState) => ({
    setSelectedMovie: zState.setSelectedMovie,
    selectedMovieId: zState.selectedMovieId,
  }));
  const { openDetails } = useContext(HomePageContext);
  const movieTileClickAction = useCallback(() => {
    setSelectedMovie(movie.id);
    router.push(`/?movieID=${movie.id}`, undefined, {
      shallow: true,
    });
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
      className={`transform box-content transition-transform relative outline-none rounded-lg border-4 cursor-pointer border-transparent hover:border-pink-400 bottom-0  focus:border-pink-600 ${selectedMovieId === movie.id ? 'active-movie' : 'hover:-translate-y-2'}`}
    >
      <img alt={movie.title} className="rounded object-cover" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
    </div>
  );
});

export default MovieTile;

const myPropTypes = {
  movie: PropTypes.instanceOf(Object).isRequired,
};

MovieTile.propTypes = myPropTypes;
