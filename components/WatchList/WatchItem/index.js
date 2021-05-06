import propTypes from 'prop-types';
import {
  useCallback, cloneElement,
} from 'react';
import { BsEyeFill } from 'react-icons/bs';
import { AiFillDelete } from 'react-icons/ai';
import { toast } from 'react-toastify';
import style from './WatchItem.module.css';
import { deleteMovieFromWatchList, updateMovieWatchStatus } from '../../../utils/dbHelper';
import MoviePosterFromAPI from '../../shared/MoviePosterFromAPI';

const WatchItem = ({ movie }) => {
  const updateStatus = useCallback(
    () => {
      updateMovieWatchStatus(movie.tmdb_id, !movie.is_seen)
        .then(() => {
          toast.success('Watch status changed successfully!');
        })
        .catch(() => toast.error('Something went wrong!'));
    },
    [movie.is_seen],
  );

  const deleteMovie = useCallback(() => {
    deleteMovieFromWatchList(movie.tmdb_id)
      .then(() => toast.dark('Deleted from Watch List!'))
      .catch(() => toast.error('Something went wrong!'));
  }, []);

  return (
    <>
      <WatchItemListTile
        movie={movie}
        updateStatus={updateStatus}
        deleteMovie={deleteMovie}
      />
    </>
  );
};

export default WatchItem;

WatchItem.propTypes = {
  movie: propTypes.instanceOf(Object).isRequired,
};

const WatchItemListTile = ({
  movie, updateStatus, deleteMovie,
}) => (
  <div
    tabIndex={0}
    role="button"
    onKeyDown={() => { }}
    className="relative group rounded-lg border-4 cursor-pointer border-transparent hover:border-pink-400 bottom-0 hover:bottom-2 focus:border-pink-600"
  >
    <div className={`rounded transition duration-500 ease-in-out ${movie.is_seen && 'filter-grayscale'}`}>
      <MoviePosterFromAPI tmdbId={movie.tmdb_id} />
    </div>
    {/* <img alt={` ${poster}`} className={`rounded transition duration-500 ease-in-out ${movie.is_seen && 'filter-grayscale'}`} src={`https://image.tmdb.org/t/p/w500${poster}`} /> */}
    <div className={`${style.watchItem} absolute top-0 hidden w-full rounded group-hover:block`}>
      <div className="flex flex-row gap-x-4 px-4 justify-end items-center rounded h-9">
        <IconWithTWClass onClick={updateStatus}>
          <BsEyeFill />
        </IconWithTWClass>
        <IconWithTWClass onClick={deleteMovie}>
          <AiFillDelete />
        </IconWithTWClass>
      </div>
    </div>
  </div>
);

WatchItemListTile.propTypes = {
  movie: propTypes.instanceOf(Object).isRequired,
  updateStatus: propTypes.func.isRequired,
  deleteMovie: propTypes.func.isRequired,
};

const IconWithTWClass = ({ children: child, onClick }) => (
  <div role="button" tabIndex={0} onKeyDown={() => { }} onClick={onClick} className="transform text-white transition duration-200 ease-in-out hover:scale-125">{cloneElement(child, { size: 20 })}</div>
);

IconWithTWClass.propTypes = {
  children: propTypes.element.isRequired,
  onClick: propTypes.func,
};

IconWithTWClass.defaultProps = {
  onClick: () => { },
};
