import { useState, useEffect, useCallback } from 'react';
import propTypes from 'prop-types';
import { useQuery } from 'react-query';
import Link from 'next/link';
import { FiShare2 } from 'react-icons/fi';
import { IoLogoTwitter } from 'react-icons/io';
import { getPlaylistMovies } from '../../../utils/dbHelper';
import API, { END_POINTS } from '../../../tmdb-api';
import SEO from '../../../components/SEO';
import serverSupabase from '../../../utils/initSecretSupabase';
import Header from '../../../components/shared/Header';

const PlaylistMovies = ({ id, playlistName }) => {
  const [playlistMovies, setPlaylistMovies] = useState([]);
  const [shareableURL, setURL] = useState('');

  useEffect(() => {
    if (window) setURL(decodeURIComponent(window.location.href).replaceAll(' ', '-'));
    if (id === 0) return;
    getPlaylistMovies(id).then(({ data }) => {
      setPlaylistMovies(data);
    });
  }, []);

  if (id === 0) return null;

  return (
    <>
      <SEO
        title={playlistName}
      />
      <Header search={false} />
      <main className="relative py-4 px-3 items-start max-w-screen-2xl m-auto xl:px-16 mt-2">
        <h1 className="text-3xl text-white font-bold text-center">{playlistName}</h1>
        <div className="flex gap-3 justify-center items-center mt-2">
          <a target="_blank" rel="noreferrer noopener" href={`https://twitter.com/intent/tweet?url=${shareableURL}&text=Check out this curated list of ${playlistName}`}>
            <IoLogoTwitter size={24} color="#00acee" />
          </a>
          <button
            type="button"
            onClick={() => navigator.share({
              title: 'Flixplore',
              text: playlistName,
              url: shareableURL,
            })}
          >
            <FiShare2 size={24} className="text-gray-200" />
          </button>
        </div>
        <div className="mt-8 max-w-5xl mx-auto px-0 md:px-4">
          {playlistMovies.map((movie) => (
            <Wrapper key={movie.tmdb_id} movie={movie} />
          ))}
        </div>
      </main>
    </>
  );
};

PlaylistMovies.propTypes = {
  id: propTypes.number,
  playlistName: propTypes.string,
};

PlaylistMovies.defaultProps = {
  id: 0,
  playlistName: '',
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
    return <></>;
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

  let query = serverSupabase.from('playlists').select().match({ id: playlistID });

  if (user === null) {
    query = query.match({
      is_public: true,
    });
  } else {
    query = query.match({
      user_id: user.id,
    });
  }

  const { error, data } = await query.single();

  console.log(error, data);

  if (error || !data || !data.id) {
    res.statusCode = 302;
    res.setHeader('Location', '/login');
    return {
      props: {},
    };
  }
  return {
    props: {
      id: data.id,
      playlistName: data.playlist_name,
    },
  };
}
