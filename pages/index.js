import { useEffect, useState } from 'react'
import axios from 'axios'
import Head from 'next/head'
import Dropdown from '../components/Dropdown'
import { MdWatchLater } from 'react-icons/md'
import { BsPlayFill } from 'react-icons/bs'
import { AiFillStar } from 'react-icons/ai'

export default function Home() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    axios.get("https://api.themoviedb.org/3/discover/movie?api_key=153a66d08fc228eda1cc5221118cc475&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1")
      .then(({ data }) => {
        setMovies(data.results)
      })
  }, [])

  return (
    <div>
      <Head>
        <title>Flixplore - Explore Movies</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <main className="grid grid-flow-col grid-cols-6 gap-8 py-4 px-3 items-start max-w-screen-2xl m-auto xl:px-16  mt-2">
        <div className="col-span-4">
          <div className="flex flex-row justify-between mb-4 px-3">
            <h3 className="text-3xl font-semibold text-white tracking-normal">Movies</h3>
            <div>
              <Dropdown label="Genre" />
              <Dropdown label="Language" />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {movies.map((movie, index) => {
              return <div key={movie.id} className={index == 0 ? "rounded-lg  border-4 cursor-pointer border-transparent border-pink-600" : "rounded-lg  border-4 cursor-pointer border-transparent hover:border-pink-600"}>
                <img className="rounded" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
              </div>
            })}
          </div>
        </div>
        <div className="col-span-2 sticky movie-details flex flex-col gap-2 justify-start items-start h-full p-2">
          <div style={{ paddingTop: "56.25%" }}>
            <div className="absolute top-0">
              <img className="pl-6" src="https://image.tmdb.org/t/p/original/rcUcYzGGicDvhDs58uM44tJKB9F.jpg" />
              <img className="absolute shadow-lg rounded" style={{ maxWidth: "33.33%", bottom: "-33.33%" }} src="https://image.tmdb.org/t/p/w500/lPsD10PP4rgUGiGR4CCXA6iY0QQ.jpg" />
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-1 text-white p-1 w-full" style={{ marginTop: "12%" }}>
            <h2 className="text-xl font-semibold ">Raya and the Last Dragon</h2>
            <span className="text-sm font-medium text-gray-500">Drama, Sci-fi</span>
            <div className="flex flex-row justify-between text-center gap-6 mt-4">
              <Button> <BsPlayFill size={20} className="inline relative right-0.5" style={{ top: -1 }} /> Watch now </Button>
              <Button><MdWatchLater className="inline relative right-1.5" style={{ top: -1 }} />Watch later</Button>
            </div>
            <div className="flex flex-row justify-between mt-4">
              <SecondaryDetail label="Year" value="2020" />
              <SecondaryDetail label="Rating" value="8.6">
                <AiFillStar className="inline relative bottom-0.5" color="yellow" />
              </SecondaryDetail>
            </div>
            <div className="mt-8 pt-6 border-t-2 border-gray-500">
              <h4 className="text-lg text-gray-500 font-semibold">Summary</h4>
              <p className="text-base mt-1 text-gray-300">
                Long ago, in the fantasy world of Kumandra, humans and dragons lived together in harmony. But when an evil force threatened the land, the dragons sacrificed themselves to save humanity. Now, 500 years later, that same evil has returned and it’s up to a lone warrior, Raya, to track down the legendary last dragon to restore the fractured land and its divided people.
              </p>
            </div>
          </div>
        </div>
      </main>
      <footer>

      </footer>
    </div>
  )
}

const SecondaryDetail = ({ label, value, children }) => {
  return <div className="flex-1">
    <h3 className="text-lg text-gray-500 font-semibold">{label}</h3>
    <p>{children} {value}</p>
  </div>
}

const Button = ({ children }) => {
  return <button className="w-full rounded-full text-center h-9 bg-pink-400 text-white font-medium hover:bg-pink-600 hover:shadow-lg">{children}</button>
}