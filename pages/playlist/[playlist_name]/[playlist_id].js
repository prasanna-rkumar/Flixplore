import { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { FiShare2 } from 'react-icons/fi';
import { IoLogoTwitter } from 'react-icons/io';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { deleteMovieFromPlaylist, getPlaylistMovies } from '../../../utils/dbHelper';
import SEO from '../../../components/SEO';
import serverSupabase from '../../../utils/initSecretSupabase';
import Header from '../../../components/shared/Header';
import PlaylistMovieItem from '../../../components/Playlist/PlaylistMovieItem';
import supabase from '../../../utils/initSupabase';

const PlaylistMovies = ({ id, playlistName, isPublic }) => {
  const [playlistMovies, setPlaylistMovies] = useState([]);
  const [shareableURL, setURL] = useState('');
  const user = supabase.auth.user();

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
          <a
            target="_blank"
            onClick={(e) => {
              if (!isPublic) {
                e.preventDefault();
                toast.error('Cannot share your private playlists');
              }
            }}
            rel="noreferrer noopener"
            href={`https://twitter.com/intent/tweet?url=${shareableURL}&text=Check out this curated list of ${playlistName}`}
          >
            <IoLogoTwitter
              size={24}
              color="#00acee"
            />
          </a>
          <button
            type="button"
            onClick={() => {
              if (!isPublic) {
                toast.error('Cannot share your private playlits');
              } else {
                navigator.share({
                  title: 'Flixplore',
                  text: playlistName,
                  url: shareableURL,
                });
              }
            }}
          >
            <FiShare2 size={24} className="text-gray-200" />
          </button>
        </div>
        <div className="mt-8 max-w-5xl mx-auto px-0 md:px-4">
          {playlistMovies.map((movie, index) => (
            <PlaylistMovieItem
              key={movie.tmdb_id}
              movie={movie}
              onDelete={() => {
                // eslint-disable-next-line no-alert
                if (window.confirm('Are you sure want to delete')) {
                  deleteMovieFromPlaylist(movie.tmdb_id, id).then((value) => {
                    setPlaylistMovies((prevList) => {
                      prevList.splice(index, 1);
                      console.log(prevList);
                      return [...prevList];
                    });
                    console.log(value);
                  });
                  toast.dark('Movie deleted from playlist');
                }
              }}
            />
          ))}
        </div>
        {playlistMovies.length === 0 && (
          <div className="flex flex-col justify-center items-center gap-3">
            <h3 className="text-2xl font-semibold mt-16 p-0.5 text-gray-400 text-center">😞 No movies in this playlist </h3>
            {
              user && (
              <Link href="/">
                <button className="mx-auto p-2 bg-pink-600 text-gray-100 px-4 rounded" type="button">Add Movies</button>
              </Link>
              )
            }
          </div>
        )}
      </main>
    </>
  );
};

PlaylistMovies.propTypes = {
  id: propTypes.number,
  playlistName: propTypes.string,
  isPublic: propTypes.bool,
};

PlaylistMovies.defaultProps = {
  id: 0,
  playlistName: '',
  isPublic: false,
};

export default PlaylistMovies;

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
      isPublic: data.is_public,
    },
  };
}
