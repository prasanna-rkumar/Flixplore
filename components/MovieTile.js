import PropTypes from 'prop-types';
import styles from './MovieTile.module.css';

const MovieTile = ({ movie, active, onClick }) => {
  let className = 'relative rounded-lg border-4 cursor-pointer border-transparent hover:border-pink-600 bottom-0 hover:bottom-2 focus:border-pink-600 ';

  if (active) className += styles.active;

  return (
    <div
      tabIndex={0}
      role="button"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onClick();
        }
      }}
      key={movie.id}
      className={className}
    >
      <img alt={movie.original_title} className="rounded" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
    </div>
  );
};

export default MovieTile;

const myPropTypes = {
  movie: PropTypes.instanceOf(Object).isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

MovieTile.propTypes = myPropTypes;
