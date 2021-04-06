import { memo, useCallback, useContext } from 'react';
import { useQuery } from 'react-query';
import propTypes from 'prop-types';
import API, { END_POINTS } from '../../tmdb-api';
import { SearchContext } from '../../context/SearchContext';
import styles from './SearchBar.module.css';
import useMoviesStore from '../../store/MovieStore';
import { HomePageContext } from '../../context/HomePageContext';

const SearchResults = memo(({ searchTerm }) => {
  const { isInputFocus } = useContext(SearchContext);
  const fetchSearchResults = () => API.search(searchTerm);
  const { data, error } = useQuery([END_POINTS.search, searchTerm], fetchSearchResults);
  if (error || !data) return (<></>);
  const movies = data.data.results;
  return (
    searchTerm && (
      <div
        style={{
          width: '110%',
          left: '-5%',
          top: '110%',
          background: '#354353',
        }}
        className={`custom-scroll w-full absolute top-full bg-white z-30 max-h-96 overflow-y-scroll rounded-md px-2 pt-2 ${isInputFocus ? 'block' : 'hidden'}`}
      >
        {movies.map((movie) => (
          <SearchTile key={movie.id} movie={movie} />
        ))}
      </div>
    )
  );
});

SearchResults.propTypes = {
  searchTerm: propTypes.string.isRequired,
};

export default SearchResults;

const SearchTile = memo(({ movie }) => {
  const setSelectedMovie = useMoviesStore((zState) => zState.setSelectedMovie);
  const { openDetails } = useContext(HomePageContext);
  const movieTileClickAction = useCallback(() => {
    setSelectedMovie(movie.id);
    openDetails();
  }, [movie.id]);
  return (
    <div
      key={movie.id}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          movieTileClickAction();
        }
      }}
      onClick={movieTileClickAction}
      className="grid grid-cols-12 gap-2 mb-2 transition duration-300 ease-in-out border-2 border-transparent hover:border-pink-600 rounded"
    >
      <img width={100} height={150} alt="poster" className="col-span-3 rounded-sm" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
      <div className="flex flex-col text-white gap-y-3 col-span-9">
        <div className="flex flex-col justify-start items-start">
          <span className="text-lg font-medium">{movie.original_title}</span>
          <span className="text-gray-400 text-sm font-normal">{movie.release_date}</span>
        </div>
        <div className={`text-base text-gray-300 leading-tight  ${styles['truncate-3-lines']}`}>{movie.overview}</div>
      </div>
    </div>
  );
});

SearchTile.propTypes = {
  movie: propTypes.instanceOf(Object).isRequired,
};
