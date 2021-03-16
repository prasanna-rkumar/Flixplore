import PropTypes from 'prop-types';
import styles from './MovieTile.module.css';

const MovieTile = ({ movie, active, onClick }) => {
  let className = 'relative rounded-lg border-4 cursor-pointer border-transparent hover:border-pink-600 bottom-0 hover:bottom-2 ';

  if (active) className += styles.active;

  return (
    <div
      tabIndex={0}
      role="link"
      onClick={onClick}
      onKeyDown={onClick}
      key={movie.id}
      className={className}
    >
      <img alt={movie.name} className="rounded" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
    </div>
  );
};

MovieTile.propTypes = {
  movie: PropTypes.objectOf(PropTypes.object()).isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MovieTile;
