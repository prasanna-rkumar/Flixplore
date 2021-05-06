import { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Button from '../components/Button';
import Header from '../components/Header';
import SEO from '../components/SEO';
import supabase from '../utils/initSupabase';
import NewPlaylistForm from '../components/Playlist/NewPlaylist';
import PlaylistList from '../components/Playlist/Playlist';

export default function PlaylistHome() {
  const [isNewPlaylistFormVisible, setNewPlaylistFormVisible] = useState(false);
  const refreshCounter = useRef(1);

  useEffect(() => {
    refreshCounter.current += 1;
  }, [isNewPlaylistFormVisible]);

  return (
    <>
      <Header />
      <div>
        <SEO />
        <AnimatePresence>
          {
            isNewPlaylistFormVisible
            && <NewPlaylistForm closeModal={() => setNewPlaylistFormVisible(false)} />
          }
        </AnimatePresence>
        <main className="relative py-4 px-3 items-start max-w-screen-2xl m-auto xl:px-16 mt-2">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-semibold text-white mb-6 mt-2">Playlists</h2>
            <div
              style={{
                maxWidth: 196,
              }}
              className="w-full"
            >
              <Button onClick={() => setNewPlaylistFormVisible((prev) => !prev)}>
                <>New Playlist</>
              </Button>
            </div>
          </div>
          <PlaylistList refreshCounter={refreshCounter.current} />
        </main>
        <footer />
      </div>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return { props: {}, redirect: { destination: '/login', permanent: false } };
  }

  return { props: {} };
}
