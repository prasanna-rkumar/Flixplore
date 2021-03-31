import { useEffect } from 'react';
import supabase from '../utils/initSupabase';
import Header from '../components/Header';
import SEO from '../components/SEO';

export default function Home() {
  useEffect(() => {
    const mySubscription = supabase
      .from('watch_later')
      .on('*', (payload) => {

      })
      .subscribe();
    return () => supabase.removeSubscription(mySubscription);
  }, []);

  return (
    <>
      <Header />
      <div>
        <SEO />
        <main className="relative py-4 px-3 items-start max-w-screen-2xl m-auto xl:px-16 mt-2">
          <section className="grid grid-cols-2 gap-2.5 gap-y-4 sm:grid-cols-4 lg:grid-cols-6">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => (
              <div
                tabIndex={0}
                role="button"
                onKeyDown={() => { }}
                key={value}
                className="relative rounded-lg border-4 cursor-pointer border-transparent hover:border-pink-400 bottom-0 hover:bottom-2 focus:border-pink-600"
              >
                <img alt="kong vs gojira" className="rounded" src="https://image.tmdb.org/t/p/w500//pgqgaUx1cJb5oZQQ5v0tNARCeBp.jpg" />
              </div>
            ))}
          </section>
        </main>
        <footer />
      </div>
    </>
  );
}
