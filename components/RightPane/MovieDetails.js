import { BsPlayFill } from 'react-icons/bs';
import { AiFillStar } from 'react-icons/ai';
import Image from 'next/image';
import { useQuery } from 'react-query';
import { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import API, { END_POINTS } from '../../api';
import CircularProgressIndicator from '../CircularProgressIndicator';
import WatchBadge from './WatchBadge';
import WatchLaterButton from './WatchLaterButton';
import Button from '../Button';

const MovieDetails = memo(({ movieId }) => {
  const fetchMovieDetails = useCallback(() => API.movie({ movieId }), [movieId]);
  const { status, data, error } = useQuery(END_POINTS.movie + movieId, fetchMovieDetails);

  if (status === 'loading') {
    return <CircularProgressIndicator size={10} />;
  }

  if (status === 'error') {
    return (
      <span>
        Error:
        {error.message}
      </span>
    );
  }

  const movie = data.data;

  return (
    <>
      <div className="top-0 w-full max-w-lg m-auto pr-1">
        <div className="pl-6 relative">
          <WatchBadge />
          <Image width={1280} height={720} layout="responsive" alt="Backdrop" src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} />
        </div>
        <div className="relative bottom-1/4 p-2" style={{ maxWidth: '33.33%', minWidth: '33.33%' }}>
          <Image width={200} height={300} layout="responsive" alt="Poster" className="shadow-lg rounded" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
        </div>

      </div>
      <div className="flex flex-1 flex-col gap-1.5 text-white w-full m-auto max-w-lg relative p-3" style={{ top: '-15%' }}>
        <h2 className="text-xl font-semibold ">{movie.original_title}</h2>
        <span className="text-sm font-medium text-gray-500">Drama, Romance</span>
        <div className="flex flex-row justify-between text-center gap-6 mt-4">
          <Button>
            <>
              {' '}
              <BsPlayFill size={20} className="inline relative right-0.5" style={{ top: -1 }} />
              {' '}
              Watch now
              {' '}
            </>
          </Button>
          <WatchLaterButton movieId={movieId} />
        </div>
        <div className="flex flex-row justify-between mt-4">
          <SecondaryDetail label="Year" value={movie.release_date.substring(0, 4)} />
          <SecondaryDetail label="Rating" value={movie.vote_average}>
            <AiFillStar className="inline relative bottom-0.5" color="#FFD700" />
          </SecondaryDetail>
        </div>
        <div className="mt-8 pt-6 border-t-2 border-gray-500">
          <h4 className="text-lg text-gray-500 font-semibold">Summary</h4>
          <p className="text-base mt-1 text-gray-300">
            {movie.overview}
          </p>
        </div>
      </div>
    </>
  );
});

export default MovieDetails;

MovieDetails.propTypes = {
  movieId: PropTypes.number,
};

MovieDetails.defaultProps = {
  movieId: 0,
};

const SecondaryDetail = ({ label, value, children }) => (
  <div className="flex-1">
    <h3 className="text-lg text-gray-500 font-semibold">{label}</h3>
    <div>
      {children}
      {' '}
      {value}
    </div>
  </div>
);

SecondaryDetail.propTypes = {
  label: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.any,
  children: PropTypes.element,
};

SecondaryDetail.defaultProps = {
  label: '',
  value: '',
  children: <></>,
};
