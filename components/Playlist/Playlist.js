import propTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { getPlaylists } from '../../utils/dbHelper';
import PlaylistItem from './PlaylistItem';

const PlaylistList = ({ refreshCounter }) => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    getPlaylists().then(({ data }) => {
      setPlaylists([...data]);
    });
  }, [refreshCounter]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-6">
      {playlists.map((playlist) => (
        <PlaylistItem key={playlist.id} playlist={playlist} />
      ))}
    </div>
  );
};

PlaylistList.propTypes = {
  refreshCounter: propTypes.number.isRequired,
};

export default PlaylistList;
