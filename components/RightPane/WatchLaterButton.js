import { MdWatchLater } from 'react-icons/md';
import { useSelectedMovieStatus } from '../../utils/dbHelper';
import Button from '../Button';

const WatchLaterButton = () => {
  const { movieData, error, addMovie } = useSelectedMovieStatus();

  if (!movieData || error) {
    return (
      <Button onClick={addMovie}>
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
