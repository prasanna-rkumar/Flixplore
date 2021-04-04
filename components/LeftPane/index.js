import { useQuery } from 'react-query';
import { useContext } from 'react';
import Dropdown from './Dropdown';
import MovieTile from './MovieTile';
import API, { END_POINTS } from '../../tmdb-api';
import { HomePageContext } from '../../context/HomePageContext';
import CircularProgressIndicator from '../CircularProgressIndicator';

const LeftPane = () => {
  const { listVisibility } = useContext(HomePageContext);
  return (
    <div className={`col-span-6 col-start-1 lg:col-span-4 lg:col-start-1 lg:col-end-5 ${listVisibility}`}>
      <PaneHeader />
      <MoviesList />
    </div>
  );
};

const PaneHeader = () => (
  <div className="flex flex-row justify-between mb-4 px-3 sticky top-16 bg-primary z-10 py-2">
    <h3 className="text-2xl font-semibold text-white tracking-normal sm:text-3xl">Movies</h3>
    <div>
      <Dropdown label="Genre" />
      <Dropdown label="Language" />
    </div>
  </div>
);

const MoviesList = () => {
  const query = useQuery(END_POINTS.discover, API.discover);
  const { data, error, status } = query;

  if (status === 'loading') return <CircularProgressIndicator size={50} />;

  if (status === 'error') {
    return (
      <span>
        Error:
        {error.message}
      </span>
    );
  }

  const movies = data.data.results;
  return (
    <div className="grid grid-cols-2 gap-2.5 gap-y-4 sm:grid-cols-4">
      {movies.map((movie) => (
        <MovieTile
          key={movie.id}
          movie={movie}
        />
      ))}
    </div>
  );
};

export default LeftPane;
