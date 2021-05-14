import propTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPlaylists } from '../../utils/dbHelper';
import MoviePosterFromAPI from '../shared/MoviePosterFromAPI';

const PlaylistList = ({ refreshCounter }) => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    getPlaylists().then(({ data }) => {
      setPlaylists([...data]);
    });
  }, [refreshCounter]);

  return (
    <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-6">
      {playlists.map((playlist) => (
        <Link key={playlist.id} href={`/playlist/${playlist.playlist_name}/${playlist.id}`}>
          <div className="transform group transition-transform cursor-pointer hover:-translate-y-3 col-span-1 relative rounded-lg overflow-hidden flex flex-col items-center justify-between bg-pink-600">
            <div style={{ paddingTop: '150%' }} className="w-full group-hover:opacity-80">
              <div className="w-full absolute inset-0">
                {
                    playlist.playlist_movies.length > 0
                      ? <MoviePosterFromAPI tmdbId={playlist.playlist_movies[0].tmdb_id} />
                      : <img className="object-cover w-full" alt="poster" src="/poster-placeholder.png" />
                  }
              </div>
            </div>

            <h3 className="w-full text-lg px-1 text-white text-center absolute font-medium bottom-0 pb-2 pt-6 bg-opacity-50 bg-gradient-to-t from-gray-900">
              {playlist.playlist_name}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
};

PlaylistList.propTypes = {
  refreshCounter: propTypes.number.isRequired,
};

export default PlaylistList;
