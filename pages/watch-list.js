import Header from '../components/Header';
import SEO from '../components/SEO';
import { useMyWatchList } from '../utils/dbHelper';
import FilterOptions from '../components/WatchList/FilterOptions';
import WatchList from '../components/WatchList/WatchList';

export default function WatchListHome() {
  const {
    movies, error, filter, setFilter, loading,
  } = useMyWatchList();

  return (
    <>
      <Header />
      <div>
        <SEO />
        <main className="relative py-4 px-3 items-start max-w-screen-2xl m-auto xl:px-16 mt-2">
          <FilterOptions filter={filter} setFilter={setFilter} />
          <WatchList data={{ movies, error, loading }} />
        </main>
        <footer />
      </div>
    </>
  );
}
