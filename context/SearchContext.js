import propTypes from 'prop-types';
import {
  useState, createContext,
} from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isInputFocus, setInputFocus] = useState(false);
  return (
    <SearchContext.Provider value={{
      searchTerm, setSearchTerm, isInputFocus, setInputFocus,
    }}
    >
      {children}
    </SearchContext.Provider>
  );
};

SearchProvider.propTypes = {
  children: propTypes.element.isRequired,
};
