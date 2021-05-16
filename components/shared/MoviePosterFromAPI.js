import propTypes from 'prop-types';
import { useCallback } from 'react';
import { useQuery } from 'react-query';
import API, { END_POINTS } from '../../tmdb-api';
import CircularProgressIndicator from './CircularProgressIndicator';

const MoviePosterFromAPI = ({ tmdbId }) => {
  const fetchMoviePosters = useCallback(() => API.image({
    movieId: tmdbId,
  }), [tmdbId]);
  const { status, data, error } = useQuery([END_POINTS.image, tmdbId], fetchMoviePosters);

  if (status === 'loading') {
    return <CircularProgressIndicator size={20} />;
  }

  if (status === 'error') {
    return (
      <span>
        Error:
        {error.message}
      </span>
    );
  }

  const { posters } = data.data;
  const poster = posters[0]?.file_path;

  return (
    <img
      alt={` ${poster}`}
      src={`https://image.tmdb.org/t/p/w500${poster}`}
    />
  );
};

MoviePosterFromAPI.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  tmdbId: propTypes.any.isRequired,
};

export default MoviePosterFromAPI;
