/* eslint-disable react/forbid-prop-types */
import propTypes from 'prop-types';
import { MdWatchLater } from 'react-icons/md';
import Button from '../shared/Button';

const WatchLaterButton = ({ movieData, error, addMovie }) => {
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

WatchLaterButton.propTypes = {
  movieData: propTypes.any,
  error: propTypes.any,
  addMovie: propTypes.func.isRequired,
};

WatchLaterButton.defaultProps = {
  movieData: undefined,
  error: undefined,
};
