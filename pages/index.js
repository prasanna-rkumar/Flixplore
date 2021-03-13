import { useEffect, useState } from 'react'
import axios from 'axios'
import Head from 'next/head'
import Dropdown from '../components/Dropdown'

import MovieTile from '../components/MovieTile'
import MovieDetails from '../components/MovieDetails'
import styles from '../components/CustomScroll.module.css'
import useWindowDimensions from '../utils/useWindowDimensions'
import { AiOutlineClose } from 'react-icons/ai'

export default function Home() {
  const [movies, setMovies] = useState([])
  const [activeMovieId, setActiveMovieId] = useState()
  const { width } = useWindowDimensions()

  useEffect(() => {
    console.log(process.env)
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)
      .then(({ data }) => {
        setMovies(data.results)
      })
  }, [])

  let detailsIsVisible = "hidden"
  let listIsVisible = "block"

  if (width > 1024) {
    detailsIsVisible = "block"
    listIsVisible = "block"
  } else if (activeMovieId !== undefined) {
    detailsIsVisible = "block"
    if (width <= 1023) {
      listIsVisible = "hidden"
    }
  }
  return (
    <div>
      <Head>
        <title>Flixplore - Explore Movies</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <main className="grid grid-flow-col grid-cols-6 gap-8 py-4 px-3 items-start max-w-screen-2xl m-auto xl:px-16 mt-2">
        <div className={`col-span-6 col-start-1 lg:col-span-4 lg:col-start-1 lg:col-end-5 ${listIsVisible}`}>
          <div className={`flex flex-row justify-between mb-4 px-3 sticky top-16 ${styles.bg} z-10 py-2`}>
            <h3 className="text-2xl font-semibold text-white tracking-normal sm:text-3xl">Movies</h3>
            <div>
              <Dropdown label="Genre" />
              <Dropdown label="Language" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2.5 gap-y-4 sm:grid-cols-4">
            {movies.map((movie, index) => {
              return <MovieTile
                key={movie.id}
                movie={movie}
                onClick={() => setActiveMovieId(movie.id)}
                active={activeMovieId === movie.id}
              />
            })}
          </div>
        </div>
        <div className={`col-span-6 col-start-1 fixed top-0 left-0 flex flex-col gap-2 justify-start items-start p-2 mx-auto w-full ${styles.detailScroll} ${styles.bg}  h-screen z-50 overflow-y-scroll lg:col-span-2 lg:col-start-5 lg:col-end-7 lg:sticky lg:h-3/4 lg:max-w-lg ${detailsIsVisible}`} style={width >= 1024 ? { top: "12.5%", height: "75vh" } : {}}>
          <AiOutlineClose size={24} className=" font-extrabold fixed top-4 right-6 z-50 text-white" onClick={() => setActiveMovieId()} />
          <MovieDetails movieID={activeMovieId} width={width} />
        </div>
      </main>
      <footer>

      </footer>
    </div>
  )
}

