import { MdWatchLater } from 'react-icons/md'
import { BsPlayFill } from 'react-icons/bs'
import { AiFillStar } from 'react-icons/ai'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import axios from 'axios'


const MovieDetails = ({ movieID, width }) => {
  const [movie, setMovie] = useState()
  useEffect(() => {
    if (movieID === undefined) return
    setMovie()
    axios.get(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`).then(({ data }) => {
      setTimeout(() => setMovie(data), 300)
    }).catch(err => alert(err))
  }, [movieID])
  if (movie == undefined) return <DetailPlaceholder />
  return <>
    <div className="top-0 w-full max-w-lg m-auto">
      <div className="pl-6">
        <Image width={1280} height={720} layout="responsive" alt="Backdrop" src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} />
      </div>
      <div className="relative bottom-1/4" style={{ maxWidth: "33.33%", minWidth: "33.33%" }}>
        <Image width={200} height={300} layout="responsive" alt="Poster" className="shadow-lg rounded" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
      </div>

    </div>
    <div className="flex flex-1 flex-col gap-1.5 text-white p-1 w-full m-auto max-w-lg relative -top-28" style={width >= 1024 ? { top: "-10%" } : {}}>
      <h2 className="text-xl font-semibold ">{movie.original_title}</h2>
      <span className="text-sm font-medium text-gray-500">Drama, Romance</span>
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

const DetailPlaceholder = () => <>
  <div className="animate-pulse" style={{ paddingTop: "56.25%" }}>
    <div className="absolute top-0">
      <img alt="Backdrop" className="pl-6 invisible" src={`https://www.themoviedb.org/t/p/original/52AfXWuXCHn3UjD17rBruA9f5qb.jpg`} />
      <div className="w-full absolute pl-6 top-0" style={{ height: "-webkit-fill-available" }}>
        <div className="rounded bg-gray-600 h-full"></div>
      </div>
      <div className="absolute shadow-lg rounded bg-gray-600" style={{ maxWidth: "33.33%", bottom: "-33.33%" }}>
        <img alt="Poster" className="invisible" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/8kNruSfhk5IoE4eZOc4UpvDn6tq.jpg`} />
      </div>
    </div>
  </div>
  <div className="animate-pulse flex flex-1 flex-col gap-1.5 text-white p-1 w-full" style={{ marginTop: "14%" }}>
    <div className="text-xl font-semibold rounded bg-gray-600">
      <span className="invisible">1</span>
    </div>
    <div className="rounded bg-gray-600">
      <span className="text-sm font-medium text-gray-500 invisible">1</span>
    </div>
    <div className="mt-4 invisible h-9">
    </div>
    <div className="flex flex-row justify-between mt-4 gap-x-4">
      <SecondaryDetail label="Year" value="">
        <div className="rounded bg-gray-600 h-5">
          <span className="invisible">2020</span>
        </div>
      </SecondaryDetail>
      <SecondaryDetail label="Rating" value="">
        <div className="flex flex-row justify-start items-center gap-1.5">
          <AiFillStar className="inline relative bottom-0.5" color="#FFD700" />
          <div className="rounded bg-gray-600 h-5 inline flex-1">
            <span className="invisible">2020</span>
          </div>
        </div>
      </SecondaryDetail>
    </div>
    <div className="mt-8 pt-6 border-t-2 border-gray-500">
      <h4 className="text-lg text-gray-500 font-semibold">Summary</h4>
      <p className="text-base mt-1 text-gray-300">

      </p>
    </div>
  </div>
</>

const SecondaryDetail = ({ label, value, children }) => {
  return <div className="flex-1">
    <h3 className="text-lg text-gray-500 font-semibold">{label}</h3>
    <div>{children} {value}</div>
  </div>
}

const Button = ({ children }) => {
  return <button className="w-full rounded-full text-center h-9 bg-pink-400 text-white font-medium hover:bg-pink-600 hover:shadow-lg">{children}</button>
}