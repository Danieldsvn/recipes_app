import React, { useContext, useState } from 'react';
import MyContext from '../context/context';

function SearchBar() {
  const { searchBar } = useContext(MyContext);
  const [searchBarData, setSearchBarData] = useState({
    inputText: '',
    radioType: '',
    searchResult: {},
  });

  const handleTextInput = ({ target }) => {
    setSearchBarData({
      ...searchBarData,
      inputText: target.value,
    });
  };

  const handleRadiosInputs = ({ target }) => {
    setSearchBarData({
      ...searchBarData,
      radioType: target.value,
    });
  };

  const handleSearchButton = async () => {
    const { radioType, inputText } = searchBarData;
    if (radioType === 'ingredient-search-radio') {
      const ingredientSearch = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputText}`);
      const data = await ingredientSearch.json();
      setSearchBarData({
        ...searchBarData,
        searchResult: data,
      });
    }
    if (radioType === 'name-search-radio') {
      const nameSearch = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`);
      const data = await nameSearch.json();
      setSearchBarData({
        ...searchBarData,
        searchResult: data,
      });
    }
    if (radioType === 'first-letter-search-radio') {
      if (inputText.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        const firstLetterSearch = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputText}`);
        const data = await firstLetterSearch.json();
        setSearchBarData({
          ...searchBarData,
          searchResult: data,
        });
      }
    }
  };

  return (
    <div>
      {searchBar && (
        <div>
          <input
            type="text"
            data-testid="search-input"
            onChange={ handleTextInput }
          />
          <div>
            <label htmlFor="ingredient-search-radio">
              Ingredient
              <input
                name="search-radio"
                id="ingredient-search-radio"
                data-testid="ingredient-search-radio"
                type="radio"
                value="ingredient-search-radio"
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
          </div>
          <button
            type="button"
            data-testid="exec-search-btn"
            onClick={ handleSearchButton }
          >
            Search
          </button>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
