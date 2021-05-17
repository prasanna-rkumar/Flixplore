import { memo, useContext } from 'react';
import { useQuery } from 'react-query';
import propTypes from 'prop-types';
import { useRouter } from 'next/router';
import API, { END_POINTS } from '../../tmdb-api';
import { SearchContext } from '../../context/SearchContext';
import useMoviesStore from '../../store/MovieStore';
import { HomePageContext } from '../../context/HomePageContext';

const SearchResults = memo(({ searchTerm }) => {
  const { isInputFocus } = useContext(SearchContext);
  const router = useRouter();
  const setSelectedMovie = useMoviesStore((zState) => zState.setSelectedMovie);
  const { openDetails } = useContext(HomePageContext);
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
          <SearchTile
            onClick={() => {
              setSelectedMovie(movie.id);
              router.push(`/?movieID=${movie.id}`, undefined, { shallow: true });
              openDetails();
            }}
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>
    )
  );
});

SearchResults.propTypes = {
  searchTerm: propTypes.string.isRequired,
};

export default SearchResults;

export const SearchTile = memo(({ movie, onClick }) => (
  <div
    key={movie.id}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === 'Enter') {
        onClick();
      }
    }}
    onClick={onClick}
    className="grid grid-cols-12 gap-3 mb-2 transition duration-300 ease-in-out border-2 border-transparent hover:border-pink-600 rounded"
  >
    <img width={200} height={300} alt="poster" className="col-span-3 rounded-sm" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
    <div className="flex flex-col text-white gap-y-3 col-span-9">
      <div className="flex flex-col justify-start items-start">
        <span className="text-lg font-medium">{movie.title}</span>
        <span className="text-gray-400 text-sm font-normal">{movie.release_date}</span>
      </div>
      <div className="text-base text-gray-300 leading-tight line-clamp-3">{movie.overview}</div>
    </div>
  </div>
));

SearchTile.propTypes = {
  movie: propTypes.instanceOf(Object).isRequired,
  onClick: propTypes.func,
};

SearchTile.defaultProps = {
  onClick: () => { },
};
