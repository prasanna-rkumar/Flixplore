import { useEffect } from 'react';
import Head from 'next/head';
import { AiOutlineClose } from 'react-icons/ai';
import { useImmerReducer } from 'use-immer';
import { useQuery } from 'react-query';

import Dropdown from '../components/Dropdown';
import MovieTile from '../components/MovieTile';
import MovieDetails from '../components/MovieDetails';
import styles from '../components/CustomScroll.module.css';

import useWindowDimensions from '../utils/useWindowDimensions';
import API, { END_POINTS } from '../api';

const initialState = {
  details: 'hidden',
  list: 'block',
  displayMedia: 'desktop',
};

const reducer = (state, action) => {
  const { type, movieId } = action;
  switch (type) {
    case 'desktop':
      state.displayMedia = 'desktop';
      return;
    case 'mobile':
      state.displayMedia = 'mobile';
      return;
    case 'showDetails':
      state.details = 'block';
      state.activeMovieId = movieId;
      if (state.displayMedia === 'mobile') {
        state.list = 'hidden';
      }
      return;
    case 'hideDetails':
      state.activeMovieId = movieId;
      state.details = 'hidden';
      state.list = 'block';
      return;
    default:
      throw new Error();
  }
};

export default function Home() {
  const { width } = useWindowDimensions();
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  const { status, data, error } = useQuery(END_POINTS.discover, API.discover);

  useEffect(() => {
    if (width >= 1024) {
      dispatch({ type: 'desktop' });
    } else {
      dispatch({ type: 'mobile' });
    }
  }, [width]);

  if (status === 'loading') {
    return <span>Loading...</span>;
  }

  if (status === 'error') {
    return (
      <span>
        Error:
        {error.message}
      </span>
    );
  }

  const movies = data.data.results;

  return (
    <div>
      <Head>
        <title>Flixplore - Explore Movies</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <main className="grid grid-flow-col grid-cols-6 gap-8 relative py-4 px-3 items-start max-w-screen-2xl m-auto xl:px-16 mt-2">
        <div className={`col-span-6 col-start-1 lg:col-span-4 lg:col-start-1 lg:col-end-5 ${state.list}`}>
          <div className={`flex flex-row justify-between mb-4 px-3 sticky top-16 ${styles.bg} z-10 py-2`}>
            <h3 className="text-2xl font-semibold text-white tracking-normal sm:text-3xl">Movies</h3>
            <div>
              <Dropdown label="Genre" />
              <Dropdown label="Language" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2.5 gap-y-4 sm:grid-cols-4">
            {movies.map((movie, index) => (
              <MovieTile
                key={movie.id}
                movie={movie}
                onClick={() => dispatch({ type: 'showDetails', movieId: movie.id })}
                onTab={() => dispatch({ type: 'showDetails', movieId: movies[index].id })}
                active={state.activeMovieId === movie.id}
              />
            ))}
          </div>
        </div>
        <div className={`col-span-6 col-start-1 absolute top-0 left-0 flex flex-col gap-2 justify-start items-start mx-auto w-full ${styles.detailScroll} ${styles.bg}  z-20 overflow-y-scroll lg:col-span-2 lg:col-start-5 lg:col-end-7 lg:sticky lg:h-3/4 lg:max-w-lg  ${state.details}`} style={width >= 1024 ? { top: '12.5%', height: '80vh' } : {}}>
          <AiOutlineClose size={24} className="cursor-pointer font-extrabold absolute top-4 right-6 z-20 text-white visible lg:invisible" onClick={() => dispatch({ type: 'hideDetails' })} />
          <MovieDetails movieId={state.activeMovieId} width={width} />
        </div>
      </main>
      <footer />
    </div>
  );
}
