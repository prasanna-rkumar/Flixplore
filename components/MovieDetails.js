import { MdWatchLater } from 'react-icons/md'
import { BsPlayFill } from 'react-icons/bs'
import { AiFillStar } from 'react-icons/ai'

const MovieDetails = ({ movie }) => {
  return <>
    <div style={{ paddingTop: "56.25%" }}>
      <div className="absolute top-0">
        <img className="pl-6" src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} />
        <img className="absolute shadow-lg rounded" style={{ maxWidth: "33.33%", bottom: "-33.33%" }} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
      </div>
    </div>
    <div className="flex flex-1 flex-col gap-1.5 text-white p-1 w-full" style={{ marginTop: "14%" }}>
      <h2 className="text-xl font-semibold ">{movie.original_title}</h2>
      <div className="animate-pulse rounded bg-white bg-opacity-20">
        <span className="text-sm font-medium text-gray-500 invisible">Drama, Romance</span>
      </div>
      <div className="flex flex-row justify-between text-center gap-6 mt-4">
        <Button> <BsPlayFill size={20} className="inline relative right-0.5" style={{ top: -1 }} /> Watch now </Button>
        <Button><MdWatchLater className="inline relative right-1.5" style={{ top: -1 }} />Watch later</Button>
      </div>
      <div className="flex flex-row justify-between mt-4">
        <SecondaryDetail label="Year" value={movie.release_date.substring(0, 4)} />
        <SecondaryDetail label="Rating" value={movie.vote_average}>
          <AiFillStar className="inline relative bottom-0.5" color="#FFD700" />
        </SecondaryDetail>
      </div>
      <div className="mt-8 pt-6 border-t-2 border-gray-500">
        <h4 className="text-lg text-gray-500 font-semibold">Summary</h4>
        <p className="text-base mt-1 text-gray-300">
          {movie.overview}
        </p>
      </div>
    </div>
  </>
}

export default MovieDetails

const SecondaryDetail = ({ label, value, children }) => {
  return <div className="flex-1">
    <h3 className="text-lg text-gray-500 font-semibold">{label}</h3>
    <p>{children} {value}</p>
  </div>
}

const Button = ({ children }) => {
  return <button className="w-full rounded-full text-center h-9 bg-pink-400 text-white font-medium hover:bg-pink-600 hover:shadow-lg">{children}</button>
}