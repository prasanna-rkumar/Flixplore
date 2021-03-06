import propTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { MdPlaylistAdd } from 'react-icons/md';
import { toast } from 'react-toastify';
import { addMovieToPlaylist, getPlaylists } from '../../utils/dbHelper';
import supabase from '../../utils/initSupabase';
import Menu from '../shared/Menu';

const PlaylistsDropdown = ({ movieID }) => {
  const [playlists, setPlaylists] = useState([]);
  const user = supabase.auth.user();

  useEffect(() => {
    if (!user) return;
    getPlaylists().then(({ data }) => {
      setPlaylists(data);
    });
  }, [user]);

  if (!user) return <></>;

  return (
    <Menu
      title={<MdPlaylistAdd className="cursor-pointer" size={32} />}
      menuItems={
        playlists.map((playlist) => (
          <button
            key={playlist.id}
            className="w-full px-2 focus:outline-none text-left text-xs leading-5 font-semibold whitespace-nowrap overflow-ellipsis overflow-hidden"
            type="button"
            onClick={() => {
              addMovieToPlaylist(movieID, playlist.id).then(({ error }) => {
                if (error && error.code === '23505') toast.error('Movie already in the playlist!!');
                else toast.success('Movie added to the playlist!!');
              });
            }}
          >
            {playlist.playlist_name}
          </button>
        ))
      }
    />
  );
};

PlaylistsDropdown.propTypes = {
  movieID: propTypes.number.isRequired,
};

export default PlaylistsDropdown;
