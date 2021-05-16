import Link from 'next/link';
import propTypes from 'prop-types';
import { useContext } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { AuthContext } from '../../context/AuthContext';
import { SearchProvider } from '../../context/SearchContext';
import SearchBar from '../SearchBar';
import Menu from './Menu';

const Header = ({ search }) => (
  <div className="sticky top-0 z-40 text-white px-4 border-b-2 border-gray-500 border-opacity-50 appbar py-1">
    <div className="grid grid-flow-row grid-cols-12 p-2 max-w-screen-2xl w-full m-auto gap-x-1">
      <div className="col-span-3">
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
      </div>
      <div className="col-span-6 m-auto w-full max-w-md">
        {
          search && (
            <SearchProvider>
              <SearchBar />
            </SearchProvider>
          )
        }
      </div>
      <div className="col-span-3 flex flex-row justify-end items-center">
        <ProfileButton />
      </div>
    </div>
  </div>
);

export default Header;

Header.propTypes = {
  search: propTypes.bool,
};

Header.defaultProps = {
  search: false,
};

const ProfileButton = () => {
  const { loggedIn, signOut } = useContext(AuthContext);
  return (
    loggedIn ? (
      <Menu
        title={<FaUserCircle size="1.75rem" />}
        direction="right"
        menuItems={[
          (
            <div className="w-full h-full px-2 flex flex-col justify-center items-stretch">
              <Link href="/playlists"><a>Playlists</a></Link>
            </div>
          ),
          (
            <div className="w-full h-full px-2 flex flex-col justify-center items-stretch">
              <Link href="/watch-list"><a>Watch list</a></Link>
            </div>
          ),
          <button className="w-full h-full bg-gray-400 hover:bg-red-500 hover:text-white cursor-pointer text-red-600" type="button" onClick={signOut}>
            Logout
            <RiLogoutCircleRLine className="inline ml-1" />
          </button>,
        ]}
      />
    ) : (
      <Link href="/login">
        <span className="font-medium cursor-pointer hover:text-pink-400">Login</span>
      </Link>
    )
  );
};
