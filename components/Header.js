import Link from 'next/link';
import { FaUserCircle } from 'react-icons/fa';
import { SearchProvider } from '../context/SearchContext';
import SearchBar from './SearchBar';

const Header = () => (
  <div className="sticky top-0 z-40 text-white px-2 border-b-2 border-gray-500 border-opacity-50 appbar py-1">
    <div className="flex flex-row justify-between items-center p-2 max-w-screen-2xl w-full m-auto gap-x-1">
      <Link href="/">
        <a className="text-2xl font-bold">
          <div className="flex flex-row justify-start gap-2 items-center">
            <picture>
              <source srcSet="/logo.png" />
              <img className="max-w-xs max-h-10" alt="" />
            </picture>
            <span className="hidden sm:block">Flixplore</span>
          </div>
        </a>
      </Link>
      <div className="flex-1 max-w-md">
        <SearchProvider>
          <SearchBar />
        </SearchProvider>
      </div>
      <div className="flex flex-row gap-3 justify-end">
        <Link href="/login">
          <button type="button">
            <FaUserCircle size="1.75rem" />
          </button>
        </Link>
      </div>
    </div>
  </div>
);

export default Header;
