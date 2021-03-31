import { useEffect, useState } from 'react';
import useMoviesStore from '../store/MoviesStore';
import supabase from './initSupabase';

const now = () => (new Date()).toISOString();

export const addMovieToWatchList = async (tmdbID) => {
  await supabase.from('watch_later').insert([
    {
      user_id: supabase.auth.user().id,
      tmdb_id: tmdbID,
      is_seen: false,
      inserted_at: now,
      updated_at: now,
    },
  ], { upsert: true });
};

export const getMovieStatus = (tmdbID) => {
  const user = supabase.auth.user();
  if (!user) return Promise.reject(new Error(undefined));
  return supabase.from('watch_later').select().match({ tmdb_id: tmdbID, user_id: supabase.auth.user().id });
};

export const useSelectedMovieStatus = () => {
  const [movieData, setData] = useState();
  const [error, setError] = useState();

  const selectedMovieId = useMoviesStore((state) => state.selectedMovieId);

  useEffect(() => {
    getMovieStatus(selectedMovieId).then(({ data }) => {
      if (data || data.length === 0) setData(data[0]);
    }).catch((e) => {
      setError(e);
    });
  }, [selectedMovieId]);

  return { movieData, error };
};

/* export const updateMovieWatchStatus = (tmdbID, status) => {

};

export const deleteMovieFromWatchList = (tmdbID) => {

};
 */
