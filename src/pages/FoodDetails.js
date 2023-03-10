import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import RecommendedCard from '../components/RecommendedCard';
import DetailsHeader from '../components/DetailsHeader';
import { getFoodById } from '../hooks/getFoodAndDrinkById';
import getFoodsAndDrinks from '../hooks/getFoodsAndDrinks';
import getIngredientsAndMeasures from '../hooks/getIngredientsAndMesures';
import '../styles/FoodDrinkDetails.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { getFavoriteLocalStorage, getDoneLocalStorage,
  getMealInProgressLocalStorage } from '../hooks/getLocalStorage';

function FoodDetails() {
  const location = useLocation();
  const history = useHistory();

  const [foodAttributes, setFoodAttributes] = useState({
    meals: [],
  });
  const [recommendedDrinks, setRecommendedDrinks] = useState({
    drinks: [],
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
    const foodId = locationArray[1];
    setPageId(foodId);
    return foodId;
  };

  useEffect(() => {
    const foodId = getIdFromLocation();
    getFavoriteLocalStorage(foodId, setAllFavorites, setIsFavorite, blackHeartIcon);
    getMealInProgressLocalStorage(foodId, setIsInProgress);
    getDoneLocalStorage(foodId, setIsDone);
    const getFoodDetailsDrinkRecommendation = async () => {
      const { meals } = await getFoodById(foodId);
      const { drinks } = await getFoodsAndDrinks();
      setFoodAttributes(meals);
      setIngredients(getIngredientsAndMeasures(meals));
      setRecommendedDrinks(drinks);
      setLoading(false);
    };
    getFoodDetailsDrinkRecommendation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStartButtonClick = () => {
    history.push(`/foods/${pageId}/in-progress`);
  };

  const handleFavoriteButton = () => {
    if (isFavorite === whiteHeartIcon) {
      setIsFavorite(blackHeartIcon);
      const favorites = [
        ...allFavorites,
        {
          id: foodAttributes[0].idMeal,
          type: 'food',
          nationality: foodAttributes[0].strArea,
          category: foodAttributes[0].strCategory,
          alcoholicOrNot: '',
          name: foodAttributes[0].strMeal,
          image: foodAttributes[0].strMealThumb,
        },
      ];
      localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
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

  const instructionsIngredientsVideoHtml = () => (
    (
      <section>
        <div className="ingredients-section">
          <h3>Ingredients</h3>
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
        <div className="instructions">
          <h3>Instructions</h3>
          <div>
            <p data-testid="instructions">{foodAttributes[0].strInstructions}</p>
          </div>
        </div>
        <div className="Video">
          <h3>Video</h3>
          <iframe
            data-testid="video"
            width="240"
            height="240"
            // a linha abaixo foi corrigida utilizando como base o site Stack Overflow, dispon??vel em https://stackoverflow.com/questions/25661182/embed-youtube-video-refused-to-display-in-a-frame-because-it-set-x-frame-opti
            src={ foodAttributes[0].strYoutube.replace('watch?v=', 'embed/') }
            title="How to Make Homemade Italian Lasagna Bolognese"
            allowFullScreen
          />
        </div>
      </section>)
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
        title={ foodAttributes[0].strMeal }
        photo={ foodAttributes[0].strMealThumb }
        category={ foodAttributes[0].strCategory }
        shareSrc={ shareIcon }
        favSrc={ isFavorite }
        handleFavoriteButton={ handleFavoriteButton }
        clipboardCopy={ copyToClipboard }
      />}
      { copied && <p>Link copied!</p>}
      { !loading && instructionsIngredientsVideoHtml() }
      <section className="recommended-list">
        { !loading && recommendedDrinks
          .filter((_drink, index) => index < cardsNumber)
          .map((drink, index) => (
            <RecommendedCard
              key={ index }
              index={ index }
              photo={ drink.strDrinkThumb }
              title={ drink.strDrink }
              category={ drink.strAlcoholic }
            />
          ))}
      </section>
      <footer>
        { !loading && !isDone && startRecipeButton() }
      </footer>
    </div>
  );
}

export default FoodDetails;
