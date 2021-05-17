import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useMoviesStore from '../store/MovieStore';
import supabase from './initSupabase';

const UNAUTHORIZED_ERROR = new Error('UNAUTHORIZED');

const now = () => (new Date()).toISOString();

const loginToast = () => toast.error((
  <Link href="/login">
    <span className="underline">Click here to Login and continue</span>
  </Link>
), { autoClose: 5000 });

const user = () => supabase.auth.user();

export const deleteMovieFromPlaylist = (movieID, playlistID) => {
  if (!user()) return Promise.reject(UNAUTHORIZED_ERROR);
  return supabase.from('playlist_movies').delete().match({
    user_id: user().id,
    tmdb_id: movieID,
    playlist_id: playlistID,
  });
};

export const changePlaylistName = (playlistID, playlistName) => {
  if (!user()) return Promise.reject(UNAUTHORIZED_ERROR);
  return supabase.from('playlists').update({
    playlist_name: playlistName,
  }).match({
    id: playlistID,
  });
};

export const addMovieToPlaylist = (movieID, playlistID) => {
  if (!user()) return Promise.reject(UNAUTHORIZED_ERROR);
  return supabase.from('playlist_movies').insert({
    user_id: user().id,
    tmdb_id: movieID,
    playlist_id: playlistID,
  });
};

export const getPlaylistMovies = (playlistID) => supabase.from('playlist_movies').select().match({ playlist_id: playlistID });

export const getPlaylists = () => {
  if (!user()) return Promise.reject(UNAUTHORIZED_ERROR);
  return supabase.from('playlists').select(`
    id,
    playlist_name,
    is_public,
    playlist_movies (
      id,
      tmdb_id
    )
  `).match({ user_id: user().id });
};

export const deletePlaylist = (playlistID) => {
  if (!user()) return Promise.reject(UNAUTHORIZED_ERROR);
  return supabase.from('playlists').delete().match({
    id: playlistID,
  });
};

export const updatePlaylist = (playlistID, isPublic) => {
  if (!user()) return Promise.reject(UNAUTHORIZED_ERROR);
  return supabase.from('playlists').update({
    is_public: isPublic,
  }).match({
    id: playlistID,
  });
};

export const createPlaylist = (name, isPublic) => {
  if (!user()) return Promise.reject(UNAUTHORIZED_ERROR);
  return supabase.from('playlists').insert([
    {
      user_id: user().id,
      playlist_name: name,
      is_public: isPublic,
    },
  ]);
};

export const addMovieToWatchList = (tmdbID) => {
  if (!user()) return Promise.reject(UNAUTHORIZED_ERROR);
  return supabase.from('watch_later').upsert([
    {
      user_id: user().id,
      tmdb_id: tmdbID,
      is_seen: false,
      inserted_at: now(),
      updated_at: now(),
    },
  ]);
};

export const getMovieStatus = (tmdbID) => {
  if (!user()) return Promise.reject(UNAUTHORIZED_ERROR);
  return supabase.from('watch_later').select().match({ tmdb_id: tmdbID, user_id: user().id });
};

export const getMyWatchList = (filter) => {
  if (!user()) return Promise.reject(UNAUTHORIZED_ERROR);
  const match = { user_id: user().id };

  if (filter && filter !== 'ALL') {
    match.is_seen = filter === 'WATCHED';
  }

  return supabase.from('watch_later').select().match({ ...match }).order('inserted_at', { ascending: true });
};

export const updateMovieWatchStatus = (tmdbID, status) => {
  if (!user()) return Promise.reject(UNAUTHORIZED_ERROR);
  return supabase.from('watch_later').update({ is_seen: status, updated_at: now() }).match({ tmdb_id: tmdbID, user_id: user().id });
};

export const deleteMovieFromWatchList = (tmdbID) => {
  if (!user()) return Promise.reject(UNAUTHORIZED_ERROR);
  return supabase.from('watch_later').delete().match({ tmdb_id: tmdbID, user_id: user().id });
};

export const useSelectedMovieStatus = () => {
  const [movieData, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const selectedMovieId = useMoviesStore((state) => state.selectedMovieId);

  const fetchStatusFromSupabase = useCallback(() => {
    if (!loading) setLoading(true);
    getMovieStatus(selectedMovieId).then(({ data }) => {
      if (data && data.length > 0) setData(data[0]);
      else setData();
    }).catch((e) => {
      setError(e);
    }).finally(() => setLoading(false));
  }, [selectedMovieId]);

  const addMovie = useCallback(() => {
    addMovieToWatchList(selectedMovieId)
      .then(() => fetchStatusFromSupabase())
      .catch(() => {
        loginToast();
      });
  }, [selectedMovieId]);

  useEffect(() => {
    fetchStatusFromSupabase();
  }, [selectedMovieId]);

  return {
    movieData, error, addMovie, loading,
  };
};

export const useMyWatchList = () => {
  const [movies, setMovies] = useState();
  const [renderCount, setRenderCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [filter, setFilter] = useState('ALL');

  const handleChange = useCallback(() => {
    setRenderCount((oldCount) => oldCount + 1);
  }, [movies]);

  useEffect(() => {
    const mySubscription = supabase
      .from(`watch_later:user_id=eq.${user().uid}`)
      .on('UPDATE', handleChange)
      .on('DELETE', handleChange)
      .subscribe();

    return (() => mySubscription.unsubscribe());
  }, [movies]);

  useEffect(() => {
    setLoading(true);
    getMyWatchList(filter).then(({ data }) => {
      if (data) setMovies(data);
    }).catch((e) => {
      setError(e);
    }).finally(() => setLoading(false));
  }, [filter, renderCount]);

  return {
    movies, error, filter, setFilter, loading,
  };
};
