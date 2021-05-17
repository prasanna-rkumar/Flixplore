import Header from '../components/shared/Header';
import SEO from '../components/SEO';
import { useMyWatchList } from '../utils/dbHelper';
import FilterOptions from '../components/WatchList/FilterOptions';
import WatchList from '../components/WatchList/WatchList';
import supabase from '../utils/initSupabase';

export default function WatchListHome() {
  const {
    movies, error, filter, setFilter, loading, handleChange,
  } = useMyWatchList();

  return (
    <>
      <Header />
      <div>
        <SEO />
        <main className="relative py-4 px-3 items-start max-w-screen-2xl m-auto xl:px-16 mt-2">
          <h2 className="text-3xl font-semibold text-white mb-6 mt-2">Watch List</h2>
          <FilterOptions filter={filter} setFilter={setFilter} />
          <WatchList data={{
            movies, error, loading, handleChange,
          }}
          />
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
