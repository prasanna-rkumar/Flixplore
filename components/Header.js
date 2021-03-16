import Link from 'next/link';
import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { GrFormClose } from 'react-icons/gr';

const Header = () => (
  <div className="sticky top-0 z-40 text-white px-2 border-b-2 border-gray-500 border-opacity-50 appbar py-1">
    <div className="flex flex-row justify-between items-center p-2 max-w-screen-2xl w-full m-auto">
      <Link href="/">
        <a className="text-2xl font-bold">
          <div className="flex flex-row justify-start gap-2 items-center">
            <picture>
              <source srcSet="/logo.png" />
              <img className="max-w-xs max-h-10" alt="" />
            </picture>
            <span>Flixplore</span>
          </div>
        </a>
      </Link>
      <div className="flex-1 max-w-md">
        <Search />
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

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className="relative">
      <GrFormClose className="absolute right-4 top-1.5 w-6 h-6 text-gray-800 cursor-pointer" />
      <input autoComplete="off" value={searchTerm} onChange={(e) => setSearchTerm(e.currentTarget.value)} className="transition duration-700 ease-in-out w-full bg-white rounded-full pl-4 pb-0.5 text-black h-9 focus:rounded-sm" type="text" name="search" placeholder="Search for Movies" />
      <div className="w-full absolute top-full bg-white border-white border-2 z-30 hidden group-focus:visible">
        <div className="flex flex-row justify-start">
          <img width={50} height={75} alt="poster" src="https://image.tmdb.org/t/p/w500//nWBPLkqNApY5pgrJFMiI9joSI30.jpg" />
          <div className="flex flex-col justify-around">
            <span>Coming 2 America</span>
            <span>Coming 2 America</span>
          </div>
        </div>
        <div className="flex flex-row justify-start">
          <img width={50} height={75} alt="poster" src="https://image.tmdb.org/t/p/w500//nWBPLkqNApY5pgrJFMiI9joSI30.jpg" />
          <div className="flex flex-col justify-around">
            <span>Coming 2 America</span>
            <span>Coming 2 America</span>
          </div>
        </div>
      </div>
    </div>
  );
};
