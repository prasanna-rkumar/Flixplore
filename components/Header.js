import Link from 'next/link';
import { useContext } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
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
        <ProfileButton />
      </div>
    </div>
  </div>
);

export default Header;

const ProfileButton = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  return (
    isLoggedIn ? (
      <div className="relative group">
        <button type="button">
          <FaUserCircle size="1.75rem" />
        </button>
        <div
          className="absolute top-10 hidden group-hover:block rounded shadow-lg"
          style={{
            background: '#354353',
          }}
        >
          <div className="w-60" />
          <ul>
            <li><button type="button">Watch list</button></li>
            <li><button type="button" onClick={() => setIsLoggedIn(false)}>Logout</button></li>
          </ul>
        </div>
      </div>
    ) : (
      <Link href="/login">
        <button type="button">
          <FaUserCircle size="1.75rem" />
        </button>
      </Link>
    )
  );
};
