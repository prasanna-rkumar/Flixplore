import { GrFormClose } from 'react-icons/gr';
import { useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';
import SearchResults from './SearchResults';

const SearchBar = () => {
  const { setInputFocus, searchTerm } = useContext(SearchContext);
  return (
    <div
      onFocus={() => setInputFocus(true)}
      onBlur={() => setTimeout(() => setInputFocus(false), 500)}
      className="relative rounded-full"
    >
      <SearchInput />
      <SearchResults searchTerm={searchTerm} />
    </div>
  );
};

export default SearchBar;

const SearchInput = () => {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  return (
    <>
      {searchTerm && <GrFormClose className="absolute right-4 top-1.5 w-6 h-6 text-gray-800 cursor-pointer" onClick={() => setSearchTerm('')} />}
      <input autoComplete="off" value={searchTerm} onChange={(e) => setSearchTerm(e.currentTarget.value)} className="transition duration-700 ease-in-out w-full bg-white rounded-full pl-4 pb-0.5 text-black h-9" type="text" name="search" placeholder="Search for Movies" />
    </>
  );
};
