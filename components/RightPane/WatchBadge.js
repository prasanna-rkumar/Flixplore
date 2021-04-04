/* eslint-disable react/forbid-prop-types */
import propTypes from 'prop-types';

const WatchBadge = ({ movieData, error }) => {
  if (!movieData || error) return <></>;
  return (
    <div className="bg-pink-200 rounded-sm text-pink-700 absolute top-4 right-0 font-bold text-xs z-10 py-0.5 px-1" style={{ borderRadius: '4px 0 0 4px' }}>
      {movieData.is_seen ? 'Seen' : 'In Watch Queue'}
    </div>
  );
};

export default WatchBadge;

WatchBadge.propTypes = {
  movieData: propTypes.any,
  error: propTypes.any,
};

WatchBadge.defaultProps = {
  movieData: undefined,
  error: undefined,
};
