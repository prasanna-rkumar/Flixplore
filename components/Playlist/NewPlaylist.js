/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { motion } from 'framer-motion';
import propTypes from 'prop-types';
import { useState } from 'react';
import Switch from 'react-switch';
import { toast } from 'react-toastify';
import { createPlaylist } from '../../utils/dbHelper';

const NewPlaylistForm = ({ closeModal }) => {
  const [playlistName, setPlaylistName] = useState('');
  const [isPublic, setPublic] = useState(true);

  const onSubmit = (e) => {
    e.preventDefault();
    createPlaylist(playlistName, isPublic).then(({ error }) => {
      setPlaylistName('');
      if (error) {
        if (error.message.contains('playlists_playlist_name_check')) {
          toast.error('Playlist name must be more than 3 characters');
        } else {
          toast.error('Something went wrong!!');
        }
      } else {
        toast.success('Playlist created');
        closeModal();
      }
    });
  };

  return (
    <motion.div
      animate={{
        opacity: 1.0,
      }}
      transition={{
        duration: 0.3,
      }}
      initial={{
        opacity: 0,
      }}
      exit={{
        opacity: 0,
      }}
      onClick={closeModal}
      className="fixed z-50 left-o top-0 w-full h-full bg-black bg-opacity-90 flex justify-center items-center"
    >
      <div onClick={(e) => e.stopPropagation()} className="bg-white w-full max-w-md flex flex-col items-center rounded-lg pt-4">
        <h1 className="text-3xl font-bold mb-4">Create new Playlist</h1>
        <form onSubmit={onSubmit} className="w-full h-full">
          <div className="px-4">
            <div className="flex flex-col gap-1">
              <span className="text-gray-500 font-medium text-xs uppercase tracking-wide">Public Playlist</span>
              <Switch checked={isPublic} onChange={(checked) => setPublic(checked)} />
            </div>
            <label className="text-gray-500 font-medium text-xs uppercase tracking-wide" htmlFor="playlistname">
              Playlist name
              <input
                className="pl-3 border-2 border-pink-400 rounded-md w-full text-lg text-black font-normal"
                value={playlistName}
                onChange={(e) => {
                  setPlaylistName(e.target.value);
                }}
                id="playlistname"
                name="playlistname"
                type="text"
                placeholder="My Awesome Playlist"
              />
            </label>
          </div>
          <div className="flex justify-end gap-4 mt-2 p-2 bg-gray-50 rounded-b-lg">
            <button onClick={closeModal} className="bg-gray-300 rounded text-gray-800 p-2" type="button">Cancel</button>
            <button disabled={!playlistName || playlistName.length < 3} className="disabled:bg-opacity-50 bg-green-500 font-medium rounded text-white p-2" type="submit">Create</button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

NewPlaylistForm.propTypes = {
  closeModal: propTypes.func.isRequired,
};

export default NewPlaylistForm;
