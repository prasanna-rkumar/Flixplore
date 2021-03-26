import { MdWatchLater } from 'react-icons/md';
import { BsPlayFill } from 'react-icons/bs';
import { AiFillStar } from 'react-icons/ai';
import { FaRegEye } from 'react-icons/fa';
import Image from 'next/image';
import { useQuery } from 'react-query';
import {
  memo, useCallback, useEffect, useState,
} from 'react';
import PropTypes from 'prop-types';
import API, { END_POINTS } from '../../api';
import { addMovieToWatchList, selectMovieStatus } from '../../utils/dbHelper';
import CircularProgressIndicator from '../CircularProgressIndicator';

const WatchLaterButton = ({ movieId }) => {
  const [isSeen, setSeen] = useState();
  useEffect(() => {
    selectMovieStatus(movieId).then(({ data }) => {
      if (data && data.length > 0) setSeen(data[0].is_seen);
    }).catch((e) => setSeen(undefined));
  }, [movieId]);

  if (isSeen === undefined) {
    return (
      <Button onClick={() => addMovieToWatchList(movieId)}>
        <>
          <FaRegEye className="inline relative right-1.5" style={{ top: -1 }} />
        </>
      </Button>
    );
  }

  return (
    isSeen
      ? (
        <Button onClick={() => addMovieToWatchList(movieId)}>
          <>
            <FaRegEye className="inline relative right-1.5" style={{ top: -1 }} />
          </>
        </Button>
      ) : (
        <Button onClick={() => addMovieToWatchList(movieId)}>
          <>
            <MdWatchLater className="inline relative right-1.5" style={{ top: -1 }} />
            Watch later
          </>
        </Button>
      )
  );
};

WatchLaterButton.propTypes = {
  movieId: PropTypes.number.isRequired,
};

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
          <div className="bg-pink-200 rounded-sm text-pink-700 absolute bottom-4 right-0 font-bold text-xs px-0.5 z-10">In Watch Later</div>
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

const Button = ({ children, onClick }) => <button onClick={onClick} type="button" className="w-full rounded-full text-center h-9 bg-pink-400 text-white font-medium hover:bg-pink-600 hover:shadow-lg">{children}</button>;

Button.propTypes = {
  children: PropTypes.element.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  onClick: () => { },
};
