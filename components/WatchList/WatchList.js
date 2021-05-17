import propTypes from 'prop-types';
import CircularProgressIndicator from '../shared/CircularProgressIndicator';
import WatchItem from './WatchItem';

const WatchList = ({ data }) => {
  const {
    movies, error, loading, handleChange,
  } = data;
  if (loading) return <CircularProgressIndicator size={50} />;
  if (error || movies.length === 0) return <div className="text-lg font-medium text-white text-center text-opacity-70">No movies</div>;
  return (
    <section className="px-1 mt-4 grid grid-cols-2 gap-2.5 gap-y-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {movies.map((movie, index) => (
        <WatchItem key={movie.tmdb_id} movie={movie} onChange={() => handleChange(index)} />
      ))}
    </section>
  );
};

export default WatchList;

WatchList.propTypes = {
  data: propTypes.instanceOf(Object).isRequired,
};
