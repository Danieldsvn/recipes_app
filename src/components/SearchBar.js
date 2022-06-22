import React, { useContext, useState } from 'react';
import MyContext from '../context/context';

function SearchBar() {
  const { searchBar } = useContext(MyContext);
  const [radiosControl, setRadiosControl] = useState({
    radioType: '',
  });

  const handleRadiosInputs = ({ target }) => {
    console.log(target.value);
    setRadiosControl({
      radioType: target.value,
    });
  };

  const handleSearchButton = () => {
    console.log(radiosControl.radioType);
  };

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
                name="search-radio"
                id="ingredient-search-radio"
                data-testid="ingredient-search-radio"
                type="radio"
                value="ingredient-search-radiot"
                onClick={ handleRadiosInputs }
              />
            </label>
            <label htmlFor="name-search-radio">
              Name
              <input
                name="search-radio"
                id="name-search-radio"
                data-testid="name-search-radio"
                type="radio"
                value="name-search-radio"
                onClick={ handleRadiosInputs }
              />
            </label>
            <label htmlFor="first-letter-search-radio">
              First Letter
              <input
                name="search-radio"
                id="first-letter-search-radio"
                data-testid="first-letter-search-radio"
                type="radio"
                value="first-letter-search-radio"
                onClick={ handleRadiosInputs }
              />
            </label>
            <button
              type="button"
              data-testid="exec-search-btn"
              onClick={ handleSearchButton }
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
