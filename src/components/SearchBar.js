import React, { useContext } from 'react';
import MyContext from '../context/context';

function SearchBar() {
  const { searchBar } = useContext(MyContext);

  return (
    <div>
      {searchBar && (
        <div>
          <input
            type="text"
            data-testid="search-input"
          />
          <div>
            <label htmlFor="ingredient-search-radio">
              Ingredient
              <input
                id="ingredient-search-radio"
                data-testid="ingredient-search-radio"
                type="radio"
              />
            </label>
            <label htmlFor="name-search-radio">
              Name
              <input
                id="name-search-radio"
                data-testid="name-search-radio"
                type="radio"
              />
            </label>
            <label htmlFor="first-letter-search-radio">
              First Letter
              <input
                id="first-letter-search-radio"
                data-testid="first-letter-search-radio"
                type="radio"
              />
            </label>
            <button
              type="button"
              data-testid="exec-search-btn"
            >
              Search
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
