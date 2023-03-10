import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import MyContext from '../context/context';
import '../styles/Foods.css';

function SearchBar() {
  const { searchBar, setSingleSearchResult } = useContext(MyContext);
  const [searchBarData, setSearchBarData] = useState({
    inputText: '',
    radioType: '',
    searchResult: {},
    cards: [],
    cardType: '',
  });
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;
    setSearchBarData({
      ...searchBarData,
      cardType: pathname,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  const FIRST_LETTER_SEARCH_RADIO = 'first-letter-search-radio';
  const foodSearch = async (radioType, inputText) => {
    let data = [];
    if (radioType === 'ingredient-search-radio') {
      const ingredientSearch = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputText}`);
      data = await ingredientSearch.json();
    }
    if (radioType === 'name-search-radio') {
      const nameSearch = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`);
      data = await nameSearch.json();
    }
    if (radioType === FIRST_LETTER_SEARCH_RADIO) {
      const firstLetterSearch = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputText}`);
      data = await firstLetterSearch.json();
    }
    if (data.meals === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else {
      if (data.meals.length > 1) {
        setSearchBarData({
          ...searchBarData,
          cards: data.meals,
        });
      }
      if (data.meals.length === 1) {
        setSingleSearchResult(data.meals[0]); // Provavelmente ser?? ??til na p??gina de detalhes
        history.push(`/foods/${data.meals[0].idMeal}`);
      }
    }
  };

  const drinkSearch = async (radioType, inputText) => {
    let data = [];
    if (radioType === 'ingredient-search-radio') {
      const ingredientEndPoint = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
      const ingredientSearch = await fetch(`${ingredientEndPoint}${inputText}`);
      data = await ingredientSearch.json();
    }
    if (radioType === 'name-search-radio') {
      const nameEndPoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const nameSearch = await fetch(`${nameEndPoint}${inputText}`);
      data = await nameSearch.json();
    }
    if (radioType === FIRST_LETTER_SEARCH_RADIO) {
      const firstLetterEndPoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';
      const firstLetterSearch = await fetch(`${firstLetterEndPoint}${inputText}`);
      data = await firstLetterSearch.json();
    }
    if (data.drinks === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else {
      if (data.drinks.length > 1) {
        setSearchBarData({
          ...searchBarData,
          cards: data.drinks,
        });
      }
      if (data.drinks.length === 1) {
        setSingleSearchResult(data.drinks[0]); // Provavelmente ser?? ??til na p??gina de detalhes
        history.push(`/drinks/${data.drinks[0].idDrink}`);
      }
    }
  };

  const handleSearchButton = () => {
    const { pathname } = location;
    const { radioType, inputText } = searchBarData;
    if (inputText.length > 1 && radioType === FIRST_LETTER_SEARCH_RADIO) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      if (pathname === '/foods') foodSearch(radioType, inputText);
      if (pathname === '/drinks') drinkSearch(radioType, inputText);
    }
  };

  const cardsNumber = 12;

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
      <div className="recipes-list">
        { searchBarData.cardType === '/foods' && searchBarData.cards
          .filter((_card, index) => (index < cardsNumber))
          .map((card, index) => (
            <div
              key={ index }
              data-testid={ `${index}-recipe-card` }
              className="recipe-card"
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ card.strMealThumb }
                alt={ card.strMeal }
              />
              <p data-testid={ `${index}-card-name` }>{ card.strMeal }</p>
            </div>
          ))}
      </div>
      <div className="recipes-list">
        { searchBarData.cardType === '/drinks' && searchBarData.cards
          .filter((_card, index) => (index < cardsNumber))
          .map((card, index) => (
            <div
              key={ index }
              data-testid={ `${index}-recipe-card` }
              className="recipe-card"
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ card.strDrinkThumb }
                alt={ card.strDrink }
              />
              <p data-testid={ `${index}-card-name` }>{ card.strDrink }</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default SearchBar;
