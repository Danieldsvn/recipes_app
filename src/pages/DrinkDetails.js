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

function DrinkDetails() {
  const location = useLocation();
  const history = useHistory();

  const [drinkAttributes, setDrinkAttributes] = useState({
    drinks: [],
  });
  const [recommendedFoods, setRecommendedFoods] = useState({
    meals: [],
  });
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(whiteHeartIcon);

  const getIdFromLocation = () => {
    const locationArray = location.pathname.split('s/', 2);
    const drinkId = locationArray[1];
    return drinkId;
  };

  useEffect(() => {
    const drinkId = getIdFromLocation();
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
    console.log('handleStartButtonClick foi chamada');
    const drinkId = getIdFromLocation();
    history.push(`/drinks/${drinkId}/in-progress`);
  };

  const handleFavoriteButton = () => {
    if (isFavorite === whiteHeartIcon) setIsFavorite(blackHeartIcon);
    if (isFavorite === blackHeartIcon) setIsFavorite(whiteHeartIcon);
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
        <button
          className="start-recipe"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ handleStartButtonClick }
        >
          Start Recipe
        </button>
      </footer>
    </div>
  );
}

export default DrinkDetails;
