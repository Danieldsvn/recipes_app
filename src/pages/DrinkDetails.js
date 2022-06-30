import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import DetailsHeader from '../components/DetailsHeader';
import RecommendedCard from '../components/RecommendedCard';
import { getDrinkById } from '../hooks/getFoodAndDrinkById';
import getFoodsAndDrinks from '../hooks/getFoodsAndDrinks';
import getIngredientsAndMeasures from '../hooks/getIngredientsAndMesures';
import '../styles/FoodDrinkDetails.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { getDoneLocalStorage, getFavoriteLocalStorage,
  getCocktailInProgressLocalStorage } from '../hooks/getLocalStorage';

function DrinkDetails() {
  const location = useLocation();
  const history = useHistory();

  const [drinkAttributes, setDrinkAttributes] = useState({
    drinks: [],
  });
  const [recommendedFoods, setRecommendedFoods] = useState({
    meals: [],
  });
  const [pageId, setPageId] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(whiteHeartIcon);
  const [allFavorites, setAllFavorites] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [isInProgress, setIsInProgress] = useState(false);

  const getIdFromLocation = () => {
    const locationArray = location.pathname.split('s/', 2);
    const drinkId = locationArray[1];
    setPageId(drinkId);
    return drinkId;
  };

  useEffect(() => {
    const drinkId = getIdFromLocation();
    getFavoriteLocalStorage(drinkId, setAllFavorites, setIsFavorite, blackHeartIcon);
    getCocktailInProgressLocalStorage(drinkId, setIsInProgress);
    getDoneLocalStorage(drinkId, setIsDone);
    const getDrinkDetailsFoodRecomedation = async () => {
      const { drinks } = await getDrinkById(drinkId);
      const { meals } = await getFoodsAndDrinks();
      setDrinkAttributes(drinks);
      setIngredients(getIngredientsAndMeasures(drinks));
      setRecommendedFoods(meals);
      setLoading(false);
    };
    getDrinkDetailsFoodRecomedation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStartButtonClick = () => {
    history.push(`/drinks/${pageId}/in-progress`);
  };

  const handleFavoriteButton = () => {
    if (isFavorite === whiteHeartIcon) {
      setIsFavorite(blackHeartIcon);
      localStorage.setItem('favoriteRecipes', JSON.stringify(
        [
          ...allFavorites,
          {
            id: drinkAttributes[0].idDrink,
            type: 'drink',
            nationality: drinkAttributes[0].strArea,
            category: drinkAttributes[0].strCategory,
            alcoholicOrNot: drinkAttributes[0].strAlcoholic,
            name: drinkAttributes[0].strDrink,
            image: drinkAttributes[0].strDrinkThumb,
          },
        ],
      ));
    }
    if (isFavorite === blackHeartIcon) {
      setIsFavorite(whiteHeartIcon);
      const allFavoritesAfterRemoveThis = allFavorites
        .filter((favorite) => favorite.id !== pageId);
      localStorage
        .setItem('favoriteRecipes', JSON.stringify(allFavoritesAfterRemoveThis));
    }
  };

  const copyToClipboard = () => {
    setCopied(true);
    const url = `http://localhost:3000${location.pathname}`;
    copy(url);
  };

  const cardsNumber = 6;

  const instructionsIngredientsHtml = () => (
    <section>
      <div className="ingredients-section">
        <h2>Ingredients</h2>
        <ul className="ingredients-list">
          { ingredients.map((ingredient, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { ingredient }
            </li>
          ))}
        </ul>
      </div>
      <div
        className="instructions"
      >
        <h2>Instructions</h2>
        <p data-testid="instructions">{drinkAttributes[0].strInstructions}</p>
      </div>
    </section>
  );

  const startRecipeButton = () => (
    <button
      className="start-recipe"
      type="button"
      data-testid="start-recipe-btn"
      onClick={ handleStartButtonClick }
    >
      { !isInProgress ? 'Start Recipe' : 'Continue Recipe'}
    </button>
  );

  return (
    <div>
      { !loading && <DetailsHeader
        title={ drinkAttributes[0].strDrink }
        photo={ drinkAttributes[0].strDrinkThumb }
        category={ drinkAttributes[0].strAlcoholic }
        shareSrc={ shareIcon }
        favSrc={ isFavorite }
        handleFavoriteButton={ handleFavoriteButton }
        clipboardCopy={ copyToClipboard }
      /> }
      { copied && <p>Link copied!</p>}
      { !loading && instructionsIngredientsHtml()}
      <section className="recommended-list">
        { !loading && recommendedFoods
          .filter((_food, index) => index < cardsNumber)
          .map((food, index) => (
            <RecommendedCard
              key={ index }
              index={ index }
              photo={ food.strMealThumb }
              title={ food.strMeal }
              category={ food.strCategory }
            />
          ))}
      </section>
      <footer>
        { !loading && !isDone && startRecipeButton() }
      </footer>
    </div>
  );
}

export default DrinkDetails;
