import { useState, useEffect, useCallback } from 'react';
import propTypes from 'prop-types';
import { useQuery } from 'react-query';
import { getPlaylistMovies } from '../../../utils/dbHelper';
import { SearchTile } from '../../../components/SearchBar/SearchResults';
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
        <div className="mt-8 px-0 md:px-4">
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

const Wrapper = (props) => {
  const { movie } = props;
  const fetchMovieDetails = useCallback(
    () => API.movie({ movieId: movie.tmdb_id }),
    [movie.tmdb_id],
  );
  const { status, data, error } = useQuery([END_POINTS.movie, movie.tmdb_id], fetchMovieDetails);

  if (status === 'loading') {
    return <>loading</>;
  }

  if (error) {
    return <>error</>;
  }

  return (
    <SearchTile movie={data.data} />
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
