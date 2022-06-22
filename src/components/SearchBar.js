import React, { useContext } from 'react';
import MyContext from '../context/context';

function SearchBar() {
  const { searchBar } = useContext(MyContext);

  return (
    <div>
      {searchBar && (
        <p> Search Bar</p>
      )}
    </div>
  );
}

export default SearchBar;
