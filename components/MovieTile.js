import styles from './MovieTile.module.css'

const MovieTile = ({ movie, active, onClick }) => {
  let className = `relative rounded-lg border-4 cursor-pointer border-transparent hover:border-pink-600  bottom-0 hover:bottom-2 `

  if (active) className += styles.active

  return <div onClick={onClick} key={movie.id} className={className} style={{
    transition: "/* bottom 0.1s linear */"
  }}>
    <img className="rounded" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
  </div>
}

export default MovieTile