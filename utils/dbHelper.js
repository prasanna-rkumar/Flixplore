import supabase from './initSupabase';

const now = () => (new Date()).toISOString();

export const addMovieToWatchList = async (tmdbID) => {
  const { data, error } = await supabase.from('watch_later').insert([
    {
      user_id: supabase.auth.user().id,
      tmdb_id: tmdbID,
      is_seen: false,
      inserted_at: now,
      updated_at: now,
    },
  ], { upsert: true });
  console.log(data, error);
};

export const selectMovieStatus = (tmdbID) => {
  const user = supabase.auth.user();
  if (!user) return Promise.reject(new Error(undefined));
  return supabase.from('watch_later').select('is_seen').match({ tmdb_id: tmdbID, user_id: supabase.auth.user().id }).then((value) => value);
};

export const updateMovieWatchStatus = (tmdbID, status) => {

};

export const deleteMovieFromWatchList = (tmdbID) => {

};
