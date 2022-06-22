import React, { useContext } from 'react';
import MyContext from '../context/context';

function SearchBar() {
  const { searchBar } = useContext(MyContext);

  return (
    <div>
      {searchBar && (
        <input
          type="text"
          data-testid="search-input"
        />

      )}
    </div>
  );
}

export default SearchBar;
