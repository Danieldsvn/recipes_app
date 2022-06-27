import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DetailsHeader from '../components/DetailsHeader';
import RecommendedCard from '../components/RecommendedCard';
import getFoodAndDrinkById from '../hooks/getFoodAndDrinkById';
import getFoodsAndDrinks from '../hooks/getFoodsAndDrinks';

function DrinkDetails() {
  const location = useLocation();

  const [drinkAttributes, setDrinkAttributes] = useState({
    drinks: [],
  });
  const [recommendedFoods, setRecommendedFoods] = useState({
    drinks: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const locationArray = location.pathname.split('s/', 2);
    const drinkId = locationArray[1];
    const getDrinkDetailsFoodRecomedation = async () => {
      const { drinks } = await getFoodAndDrinkById(drinkId);
      const { meals } = await getFoodsAndDrinks();
      setDrinkAttributes(drinks);
      setRecommendedFoods(meals);
      console.log(meals);
      setLoading(false);
    };
    getDrinkDetailsFoodRecomedation();
    console.log(drinkAttributes);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cardsNumber = 6;

  const instructionsIngredientsHtml = () => (
    <section>
      <sections className="ingredients-section">
        <h2>Ingredients</h2>
        <ul className="ingredients-list">
          <li
            data-testid={ `${drinkAttributes[0].strIngredient1}
            -ingredient-name-and-measure` }
          >
            {`${drinkAttributes[0].strIngredient1}: ${drinkAttributes[0].strMeasure1} `}
          </li>
        </ul>
      </sections>
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
