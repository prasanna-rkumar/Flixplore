import { MdWatchLater } from 'react-icons/md';
import useMoviesStore from '../../store/MoviesStore';
import { addMovieToWatchList, useSelectedMovieStatus } from '../../utils/dbHelper';
import Button from '../Button';

const WatchLaterButton = () => {
  const { movieData, error } = useSelectedMovieStatus();
  const movieId = useMoviesStore((state) => state.selectedMovieId);

  if (!movieData || error) {
    return (
      <Button onClick={() => addMovieToWatchList(movieId)}>
        <>
          <MdWatchLater className="inline relative right-1.5" style={{ top: -1 }} />
          Watch later
        </>
      </Button>
    );
  }

  return <></>;
};

export default WatchLaterButton;
