import { useCallback } from 'react';
import { useQuery } from 'react-query';
import Link from 'next/link';
import propTypes from 'prop-types';
import { AiFillDelete } from 'react-icons/ai';

import API, { END_POINTS } from '../../tmdb-api';

const PlaylistMovieItem = ({ movie, onDelete }) => {
  const tmdbID = movie.tmdb_id;
  const fetchMovieDetails = useCallback(() => API.movie({ movieId: tmdbID }), [
    tmdbID,
  ]);
  const { status, data, error } = useQuery(
    [END_POINTS.movie, tmdbID],
    fetchMovieDetails,
  );

  if (status === 'loading') {
    return <></>;
  }

  if (error) {
    return <>error</>;
  }

  const movieData = data.data;

  return (
    <Link href={`/?movieID=${movie.tmdb_id}`}>
      <div className="cursor-pointer grid grid-cols-12 gap-3 pb-2 mb-4 transition duration-300 ease-in-out border-2 border-transparent rounded relative">
        <div className="col-span-3 flex flex-col items-center">
          <img
            className="rounded-sm"
            alt={movieData.title}
            src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            type="button"
          >
            <AiFillDelete size={24} className="mt-2 text-red-500" />
          </button>
        </div>
        <div className="flex flex-col text-white gap-y-3 col-span-9">
          <div className="flex flex-col justify-start items-start">
            <span className="text-lg font-medium">{movieData.title}</span>
            <span className="text-sm font-medium text-gray-500">
              {movieData.genres.map(
                (genre, index) => genre.name
                  + (index === movieData.genres.length - 1 ? '' : ', '),
              )}
            </span>
            <span className="text-gray-400 text-sm font-normal">
              {movieData.release_date?.split('-')[0]}
            </span>
          </div>
          <p className="text-base line-clamp-3 md:line-clamp-6 text-gray-300 leading-tight">
            {movieData.overview}
          </p>
        </div>
        <div className="w-full absolute bottom-0 left-0 h-0.5 bg-gray-600" />
      </div>
    </Link>
  );
};

PlaylistMovieItem.propTypes = {
  movie: propTypes.instanceOf(Object).isRequired,
  onDelete: propTypes.func.isRequired,
};

export default PlaylistMovieItem;
