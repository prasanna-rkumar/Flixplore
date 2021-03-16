import { MdWatchLater } from 'react-icons/md';
import { BsPlayFill } from 'react-icons/bs';
import { AiFillStar } from 'react-icons/ai';
import Image from 'next/image';
import { useQuery } from 'react-query';
import { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import API, { END_POINTS } from '../api';

const MovieDetails = memo(({ movieId }) => {
  const fetchMovieDetails = useCallback(() => API.movie({ movieId }), [movieId]);
  const { status, data, error } = useQuery(END_POINTS.movie + movieId, fetchMovieDetails);
  if (status === 'loading') {
    return <DetailPlaceholder />;
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
        <div className="pl-6">
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
          <Button>
            <>
              <MdWatchLater className="inline relative right-1.5" style={{ top: -1 }} />
              Watch later
            </>
          </Button>
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

const DetailPlaceholder = () => (
  <>
    <div className="animate-pulse pr-1" style={{ paddingTop: '56.25%' }}>
      <div className="absolute top-0">
        <img alt="Backdrop" className="pl-6 invisible" src="https://www.themoviedb.org/t/p/original/52AfXWuXCHn3UjD17rBruA9f5qb.jpg" />
        <div className="w-full absolute pl-6 top-0" style={{ height: '-webkit-fill-available' }}>
          <div className="rounded bg-gray-600 h-full" />
        </div>
        <div className="absolute shadow-lg rounded bg-gray-600" style={{ maxWidth: '33.33%', bottom: '-33.33%' }}>
          <img alt="Poster" className="invisible" src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/8kNruSfhk5IoE4eZOc4UpvDn6tq.jpg" />
        </div>
      </div>
    </div>
    <div className="animate-pulse flex flex-1 flex-col gap-1.5 text-white p-1 w-full" style={{ marginTop: '14%' }}>
      <div className="text-xl font-semibold rounded bg-gray-600">
        <span className="invisible">1</span>
      </div>
      <div className="rounded bg-gray-600">
        <span className="text-sm font-medium text-gray-500 invisible">1</span>
      </div>
      <div className="mt-4 invisible h-9" />
      <div className="flex flex-row justify-between mt-4 gap-x-4">
        <SecondaryDetail label="Year" value="">
          <div className="rounded bg-gray-600 h-5">
            <span className="invisible">2020</span>
          </div>
        </SecondaryDetail>
        <SecondaryDetail label="Rating" value="">
          <div className="flex flex-row justify-start items-center gap-1.5">
            <AiFillStar className="inline relative bottom-0.5" color="#FFD700" />
            <div className="rounded bg-gray-600 h-5 inline flex-1">
              <span className="invisible">2020</span>
            </div>
          </div>
        </SecondaryDetail>
      </div>
      <div className="mt-8 pt-6 border-t-2 border-gray-500">
        <h4 className="text-lg text-gray-500 font-semibold">Summary</h4>
        <p className="text-base mt-1 text-gray-300" />
      </div>
    </div>
  </>
);

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

const Button = ({ children }) => <button type="button" className="w-full rounded-full text-center h-9 bg-pink-400 text-white font-medium hover:bg-pink-600 hover:shadow-lg">{children}</button>;

Button.propTypes = {
  children: PropTypes.element.isRequired,
};
