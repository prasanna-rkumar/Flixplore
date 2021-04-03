import { useEffect } from 'react';
/* import supabase from '../utils/initSupabase';
 */import Header from '../components/Header';
import SEO from '../components/SEO';
import { useMyWatchList } from '../utils/dbHelper';
import WatchItem from '../components/WatchItem';

export default function Home() {
  const { movies } = useMyWatchList();

  useEffect(() => {
    /* const mySubscription = supabase
      .from('watch_later')
      .on('*', (payload) => {

      })
      .subscribe();
    return () => supabase.removeSubscription(mySubscription); */
  }, []);

  if (movies === undefined || movies.length === 0) return <></>;

  return (
    <>
      <Header />
      <div>
        <SEO />
        <main className="relative py-4 px-3 items-start max-w-screen-2xl m-auto xl:px-16 mt-2">
          <section className="flex flex-row gap-8 mb-4 mx-1 pb-1 border-b-2 border-gray-500">
            {['ALL', 'TO WATCH', 'WATCHED'].map((value) => (
              <div className="text-lg relative text-white text-opacity-70 group cursor-pointer" key={value}>
                <span className="group-hover:text-pink-600">{value}</span>
                <div className="border-b-2 border-transparent group-hover:border-pink-600 absolute w-full -bottom-1.5" />
              </div>
            ))}
          </section>
          <section className="grid grid-cols-2 gap-2.5 gap-y-4 sm:grid-cols-4 lg:grid-cols-6">
            {movies.map((movie) => (
              <WatchItem movie={movie} />
            ))}
          </section>
        </main>
        <footer />
      </div>
    </>
  );
}
