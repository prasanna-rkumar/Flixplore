import { useEffect, useState } from 'react';
import useMoviesStore from '../store/MoviesStore';
import supabase from './initSupabase';

const now = () => (new Date()).toISOString();

const user = () => supabase.auth.user();

export const addMovieToWatchList = async (tmdbID) => {
  await supabase.from('watch_later').insert([
    {
      user_id: user().id,
      tmdb_id: tmdbID,
      is_seen: false,
      inserted_at: now,
      updated_at: now,
    },
  ], { upsert: true });
};

export const getMovieStatus = (tmdbID) => {
  if (!user()) return Promise.reject(new Error(undefined));
  return supabase.from('watch_later').select().match({ tmdb_id: tmdbID, user_id: user().id });
};

export const getMyWatchList = (filter) => {
  if (!user()) return Promise.reject(new Error(undefined));
  const match = { user_id: user().id };

  if (filter && filter !== 'ALL') {
    match.is_seen = filter === 'WATCHED';
  }

  return supabase.from('watch_later').select().match({ ...match });
};

export const updateMovieWatchStatus = (tmdbID, status) => {
  if (!user()) return Promise.reject(new Error(undefined));
  return supabase.from('watch_later').update({ is_seen: status }).match({ tmdb_id: tmdbID, user_id: user().id });
};

export const deleteMovieFromWatchList = (tmdbID) => {
  if (!user()) return Promise.reject(new Error(undefined));
  return supabase.from('watch_later').delete().match({ tmdb_id: tmdbID, user_id: user().id });
};

export const useSelectedMovieStatus = () => {
  const [movieData, setData] = useState();
  const [error, setError] = useState();

  const selectedMovieId = useMoviesStore((state) => state.selectedMovieId);

  useEffect(() => {
    getMovieStatus(selectedMovieId).then(({ data }) => {
      if (data && data.length > 0) setData(data[0]);
    }).catch((e) => {
      setError(e);
    });
  }, [selectedMovieId]);

  return { movieData, error };
};

export const useMyWatchList = () => {
  const [movies, setMovies] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    setLoading(true);
    getMyWatchList(filter).then(({ data }) => {
      if (data) setMovies(data);
    }).catch((e) => {
      setError(e);
    }).finally(() => setLoading(false));
  }, [filter]);

  return {
    movies, error, filter, setFilter, loading,
  };
};
