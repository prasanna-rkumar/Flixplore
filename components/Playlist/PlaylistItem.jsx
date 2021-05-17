import propTypes from 'prop-types';
import { useState } from 'react';
import Link from 'next/link';
import { AiFillDelete } from 'react-icons/ai';
import { FiMoreVertical } from 'react-icons/fi';
import { MdContentCopy } from 'react-icons/md';
import Switch from 'react-switch';
import { toast } from 'react-toastify';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import MoviePosterFromAPI from '../shared/MoviePosterFromAPI';
import Menu from '../shared/Menu';
import { updatePlaylist, deletePlaylist } from '../../utils/dbHelper';

const PlaylistItem = ({ playlist, onDelete }) => {
  const [isPublic, setIsPublic] = useState(playlist.is_public);
  const url = `/playlist/${playlist.playlist_name}/${playlist.id}`.replaceAll(' ', '-');

  return (
    <Link
      key={playlist.id}
      href={url}
    >
      <div className="transform group transition-transform cursor-pointer hover:-translate-y-3 col-span-1 relative rounded-lg overflow-hidden flex flex-col items-center justify-between bg-pink-600">
        <div
          style={{ paddingTop: '150%' }}
          className="w-full group-hover:opacity-80"
        >
          <div className="w-full absolute inset-0">
            {playlist.playlist_movies.length > 0 ? (
              <MoviePosterFromAPI
                tmdbId={playlist.playlist_movies[0].tmdb_id}
              />
            ) : (
              <img
                className="object-cover w-full"
                alt="poster"
                src="/poster-placeholder.png"
              />
            )}
          </div>
        </div>

        <div
          tabIndex={0}
          role="button"
          onKeyDown={() => {}}
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="absolute top-0 right-0 bg-gradient-to-b from-gray-900 w-full p-1 py-1.5 text-white flex justify-end"
        >
          <Menu
            direction="left"
            left={-140}
            title={<FiMoreVertical size={24} />}
            menuItems={[
              <div className="flex flex-row justify-start items-center">
                <Switch
                  className="transform scale-75"
                  checked={isPublic}
                  onChange={(checked) => {
                    setIsPublic(checked);
                    updatePlaylist(playlist.id, checked).then(() => {
                      toast.success(
                        `Playlist visibility changed to ${
                          checked ? 'Public' : 'Private'
                        }`,
                      );
                    });
                  }}
                />
                {isPublic ? 'Public' : 'Private'}
              </div>,
              <CopyToClipboard
                onCopy={() => toast.dark('Playlist link copied to Clipboard!')}
                text={`${window.location.origin}${url}`}
              >
                <div className="flex items-center px-2">
                  <MdContentCopy size={22} />
                  Copy link
                </div>
              </CopyToClipboard>,
              <div className="flex items-center px-2">
                <AiFillDelete
                  className="text-red-500"
                  size={24}
                  onClick={() => {
                    deletePlaylist(playlist.id).then(() => {
                      onDelete();
                      toast.dark('Playlist deleted');
                    });
                  }}
                />
                Delete
              </div>,
            ]}
          />
        </div>
        <h3 className="w-full text-lg px-1 text-white text-center absolute font-medium bottom-0 pb-2 pt-6 bg-opacity-50 bg-gradient-to-t from-gray-900">
          {playlist.playlist_name}
        </h3>
      </div>
    </Link>
  );
};

PlaylistItem.propTypes = {
  playlist: propTypes.instanceOf(Object).isRequired,
  onDelete: propTypes.func.isRequired,
};

export default PlaylistItem;
