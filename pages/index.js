import { useEffect, useState } from 'react'
import axios from 'axios'
import Head from 'next/head'
import Dropdown from '../components/Dropdown'

import MovieTile from '../components/MovieTile'
import MovieDetails from '../components/MovieDetails'

export default function Home() {
  const [movies, setMovies] = useState([])
  const [activeMovie, setActiveMovie] = useState("")

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
          <div className="grid grid-cols-4 gap-2.5 gap-y-4">
            {movies.map((movie, index) => {
              return <MovieTile
                key={movie.id}
                movie={movie}
                onClick={() => setActiveMovie(movie)}
                active={activeMovie.id === movie.id}
              />
            })}
          </div>
        </div>
        <div className="col-span-2 sticky h-screen top-24 flex flex-col gap-2 justify-start items-start p-2">
          <MovieDetails movie={activeMovie} />
        </div>
      </main>
      <footer>

      </footer>
    </div>
  )
}

