import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RecommendedCard from '../components/RecommendedCard';
import DetailsHeader from '../components/DetailsHeader';
import getFoodAndDrinkById from '../hooks/getFoodAndDrinkById';
import getFoodsAndDrinks from '../hooks/getFoodsAndDrinks';

function FoodDetails() {
  const location = useLocation();
  const [foodAttributes, setFoodAttributes] = useState({
    meals: [],
  });
  const [recommendedDrinks, setRecommendedDrinks] = useState({
    drinks: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const locationArray = location.pathname.split('s/', 2);
    const foodId = locationArray[1];
    const getFoodDetailsDrinkRecommendation = async () => {
      const { meals } = await getFoodAndDrinkById(foodId);
      const { drinks } = await getFoodsAndDrinks();
      setFoodAttributes(meals);
      setRecommendedDrinks(drinks);
      setLoading(false);
      console.log(meals);
    };
    getFoodDetailsDrinkRecommendation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cardsNumber = 6;

  return (
    <div>
      { !loading && <DetailsHeader
        title={ foodAttributes[0].strMeal }
        photo={ foodAttributes[0].strMealThumb }
        category={ foodAttributes[0].strCategory }
      />}
      <section className="ingredients-section">
        <h2>Ingredients</h2>
        <ul className="ingredients-list">
          <li
            data-testid={ `${drinkAttributes[0].strIngredient1}
          -ingredient-name-and-measure` }
          >
            {`${drinkAttributes[0].strIngredient1}: ${drinkAttributes[0].strMeasure1} `}
          </li>
        </ul>
      </section>
      <section className="instructions">
        <h2>Instructions</h2>
        <div>
          <p data-testid="instructions">{drinkAttributes[0].strInstructions}</p>
        </div>
      </section>
      <section className="Video">
        <h2>Video</h2>
        <iframe
          data-testid="video"
          width="360"
          height="360"
          src="https://www.youtube.com/embed/gfhfsBPt46s"
          title="How to Make Homemade Italian Lasagna Bolognese"
          frameBorder="0"
          allow="accelerometer;
           clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </section>
      <section className="recommended-drinks">
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
        <button type="button" data-testid="start-recipe-btn">Start Recipe</button>
      </footer>
    </div>
  );
}

export default FoodDetails;
