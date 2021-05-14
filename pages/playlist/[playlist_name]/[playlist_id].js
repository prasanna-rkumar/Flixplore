import { useState, useEffect, useCallback } from 'react';
import propTypes from 'prop-types';
import { useQuery } from 'react-query';
import Link from 'next/link';
import { getPlaylistMovies } from '../../../utils/dbHelper';
import API, { END_POINTS } from '../../../tmdb-api';
import SEO from '../../../components/SEO';
import serverSupabase from '../../../utils/initSecretSupabase';

const PlaylistMovies = ({ id, playlistName }) => {
  const [playlistMovies, setPlaylistMovies] = useState([]);

  useEffect(() => {
    getPlaylistMovies(id).then(({ data }) => {
      setPlaylistMovies(data);
    });
  }, []);

  return (
    <>
      <SEO
        title={playlistName}
      />
      <main className="relative py-4 px-3 items-start max-w-screen-2xl m-auto xl:px-16 mt-2">
        <h1 className="text-3xl text-white font-bold ">{playlistName}</h1>
        <div className="mt-8 max-w-5xl mx-auto px-0 md:px-4">
          {playlistMovies.map((movie) => (
            <Wrapper movie={movie} />
          ))}
        </div>
      </main>
    </>
  );
};

PlaylistMovies.propTypes = {
  id: propTypes.number.isRequired,
  playlistName: propTypes.string.isRequired,
};

export default PlaylistMovies;

const Wrapper = ({ movie }) => {
  const tmdbID = movie.tmdb_id;
  const fetchMovieDetails = useCallback(
    () => API.movie({ movieId: tmdbID }),
    [tmdbID],
  );
  const { status, data, error } = useQuery([END_POINTS.movie, tmdbID], fetchMovieDetails);

  if (status === 'loading') {
    return <>loading</>;
  }

  if (error) {
    return <>error</>;
  }

  const movieData = data.data;

  return (
    <Link href={`/?movieID=${movie.tmdb_id}`}>
      <div className="cursor-pointer grid grid-cols-12 gap-3 pb-4 mb-4 transition duration-300 ease-in-out border-2 border-transparent hover:border-pink-600 rounded relative">
        <img className="col-span-3 rounded-sm max-h-80" alt={movieData.title} src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`} />
        <div className="flex flex-col text-white gap-y-3 col-span-9">
          <div className="flex flex-col justify-start items-start">
            <span className="text-lg font-medium">{movieData.title}</span>
            <span className="text-sm font-medium text-gray-500">{movieData.genres.map((genre, index) => genre.name + ((index === movieData.genres.length - 1) ? '' : ', '))}</span>
            <span className="text-gray-400 text-sm font-normal">{movieData.release_date?.split('-')[0]}</span>
          </div>
          <div className="text-base text-gray-300 leading-tight">{movieData.overview}</div>
        </div>
        <div className="w-full absolute bottom-0 left-0 h-0.5 bg-gray-600" />
      </div>
    </Link>
  );
};

Wrapper.propTypes = {
  movie: propTypes.instanceOf(Object).isRequired,
};

export async function getServerSideProps({ req, res, params }) {
  const { playlist_id: playlistID } = params;
  const { user } = await serverSupabase.auth.api.getUserByCookie(req);
  const { error, data } = await serverSupabase.from('playlists')
    .select()
    .match({ id: playlistID })
    .or(`is_public.eq.true,user_id.eq.${user?.id}`)
    .single();

  if (error || !data || !data.id) {
    res.statusCode = 302;
    res.setHeader('Location', '/');
  }

  return {
    props: {
      id: data.id,
      playlistName: data.playlist_name,
    },
  };
}
