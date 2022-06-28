import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DetailsHeader from '../components/DetailsHeader';
import RecommendedCard from '../components/RecommendedCard';
import getFoodAndDrinkById from '../hooks/getFoodAndDrinkById';
import getFoodsAndDrinks from '../hooks/getFoodsAndDrinks';
import getIngredientsAndMeasures from '../hooks/getIngredientsAndMesures';

function DrinkDetails() {
  const location = useLocation();

  const [drinkAttributes, setDrinkAttributes] = useState({
    drinks: [],
  });
  const [recommendedFoods, setRecommendedFoods] = useState({
    drinks: [],
  });
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const locationArray = location.pathname.split('s/', 2);
    const drinkId = locationArray[1];
    const getDrinkDetailsFoodRecomedation = async () => {
      const { drinks } = await getFoodAndDrinkById(drinkId);
      const { meals } = await getFoodsAndDrinks();
      setDrinkAttributes(drinks);
      setIngredients(getIngredientsAndMeasures(drinks));
      setRecommendedFoods(meals);
      setLoading(false);
    };
    getDrinkDetailsFoodRecomedation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        category={ drinkAttributes[0].strCategory }
      /> }
      { !loading && instructionsIngredientsHtml()}
      <section className="recommended-foods">
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
        <button type="button" data-testid="start-recipe-btn">Start Recipe</button>
      </footer>
    </div>
  );
}

export default DrinkDetails;
