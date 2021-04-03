import propTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { BsEyeFill } from 'react-icons/bs';
import { FiMoreVertical } from 'react-icons/fi';
import { useQuery } from 'react-query';
import API, { END_POINTS } from '../../api';
import CircularProgressIndicator from '../CircularProgressIndicator';
import style from './WatchItem.module.css';

const WatchItem = ({ movie }) => {
  const fetchMoviePosters = useCallback(() => API.image(
    { movieId: movie.tmdb_id },
  ),
  [movie.tmdb_id]);
  const { status, data, error } = useQuery(END_POINTS.movie + movie.tmdb_id, fetchMoviePosters);

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

  return <WatchItemListTile posters={posters} />;
};

export default WatchItem;

WatchItem.propTypes = {
  movie: propTypes.instanceOf(Object).isRequired,
};

const WatchItemListTile = ({ posters }) => {
  const [poster, setPoster] = useState(posters[0].file_path);
  const [isHover, setHover] = useState(false);
  let interval = 0;
  useEffect(() => {
    if (!isHover) clearTimeout(interval);
    else {
      interval = setTimeout(() => {
        setPoster(posters[1].file_path);
      }, 500);
    }

    return () => clearTimeout(interval);
  }, [isHover]);

  return (
    <div
      tabIndex={0}
      role="button"
      onKeyDown={() => { }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      key="value.tmdb_id"
      className="relative group rounded-lg border-4 cursor-pointer border-transparent hover:border-pink-400 bottom-0 hover:bottom-2 focus:border-pink-600"
    >
      <img alt="kong vs gojira" className="rounded transition duration-500 ease-in-out" src={`https://image.tmdb.org/t/p/w500${poster}`} />
      <div className={`${style.watchItem} absolute top-0 flex-row gap-x-2 px-2 justify-end items-center hidden w-full h-9 group-hover:flex`}>
        <BsEyeFill color="#fff" />
        <FiMoreVertical color="#fff" />
      </div>
    </div>
  );
};

WatchItemListTile.propTypes = {
  posters: propTypes.instanceOf(Array).isRequired,
};
