import Link from 'next/link';
import propTypes from 'prop-types';
import { memo, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { GrFormClose } from 'react-icons/gr';
import { useQuery } from 'react-query';
import API, { END_POINTS } from '../api';

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
  const [isInputFocus, setInputFocus] = useState(false);
  return (
    <div tabIndex={0} role="button" onClick={() => { }} onKeyDown={() => { }} className="relative group rounded-full">
      <GrFormClose className="absolute right-4 top-1.5 w-6 h-6 text-gray-800 cursor-pointer" />
      <input autoComplete="off" value={searchTerm} onFocus={() => setInputFocus(true)} onBlur={() => setInputFocus(false)} onChange={(e) => setSearchTerm(e.currentTarget.value)} className="transition duration-700 ease-in-out w-full bg-white rounded-full pl-4 pb-0.5 text-black h-9 group-focus:rounded-none" type="text" name="search" placeholder="Search for Movies" />
      <div className={`w-full absolute top-full bg-white z-30 max-h-96 overflow-y-scroll ${isInputFocus ? 'block' : 'hidden'}`}>
        {searchTerm && <SearchResults searchTerm={searchTerm} />}
      </div>
    </div>
  );
};

const SearchResults = memo(({ searchTerm }) => {
  console.log('searchTerm', searchTerm);
  const fetchSearchResults = () => API.search(searchTerm);
  const { data, error } = useQuery([END_POINTS.search, searchTerm], fetchSearchResults);
  if (error || !data) return (<></>);
  const movies = data.data.results;
  return (
    <>
      {movies.map((movie) => (
        <div key={movie.id} className="flex flex-row justify-start">
          <img width={100} height={150} alt="poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
          <div className="flex flex-col justify-around">
            <span>{movie.original_title}</span>
            <span>{movie.release_date}</span>
          </div>
        </div>
      ))}
    </>
  );
});

SearchResults.propTypes = {
  searchTerm: propTypes.string,
};

SearchResults.defaultProps = {
  searchTerm: '',
};
