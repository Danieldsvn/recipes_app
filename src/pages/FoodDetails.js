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

  // const getIngredientsAndMeasures = (meal) => {
  //   const mealsEntries = Object.entries(meal[0]);
  //   const strIngredientsEntries = mealsEntries
  //     .filter((entry) => entry[0]
  //       .includes('strIngredient') && entry[1] !== '');
  //   const strMeasuresEntries = mealsEntries
  //     .filter((entry) => entry[0]
  //       .includes('strMeasures') && entry[1] !== ' ');
  //   const ingredientsAndMeasures = [];
  //   for (let index = 0; index < mealsEntries.length;) {
  //     ingredientsAndMeasures
  //       .push(`${strIngredientsEntries[index]}: ${strMeasuresEntries[index]}`);
  //   }
  //   console.log(ingredientsAndMeasures);
  // };

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
      console.log(meals[0].strIngredient1);
      // function getIngredients/Measures
      const mealsEntries = Object.entries(meals[0]);
      const strIngredientsEntries = mealsEntries
        .filter((entry) => entry[0]
          .includes('strIngredient') && entry[1] !== '');
      console.log(strIngredientsEntries);
      const strMeasuresEntries = mealsEntries
        .filter((entry) => entry[0]
          .includes('strMeasure') && entry[1] !== ' ');
      console.log(strMeasuresEntries);
      const ingredientsList = strIngredientsEntries.map((ingredient, index) => (
        `${ingredient}: ${strMeasuresEntries[index][1]}`);
      let ingredientsAndMeasures = [];
      for (let index = 0; index < strIngredientsEntries.length; index += 1) {
        ingredientsAndMeasures
          .push(`${strIngredientsEntries[index]}: ${strMeasuresEntries[index]}`);
      }
      console.log(ingredients);
    };
    getFoodDetailsDrinkRecommendation();
    // console.log(foodAttributes[0].strIngredient1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cardsNumber = 6;

  const instructionsIngredientsVideoHtml = () => (
    (
      <section>
        <div className="ingredients-section">
          <h2>Ingredients</h2>
          <ul className="ingredients-list">
            <li
              data-testid={ `${foodAttributes[0].strIngredient1}
            -ingredient-name-and-measure` }
            >
              {`${foodAttributes[0].strIngredient1}: ${foodAttributes[0].strMeasure1} `}
            </li>
          </ul>
        </div>
        <div className="instructions">
          <h2>Instructions</h2>
          <div>
            <p data-testid="instructions">{foodAttributes[0].strInstructions}</p>
          </div>
        </div>
        <div className="Video">
          <h2>Video</h2>
          <iframe
            data-testid="video"
            width="360"
            height="360"
            src={ foodAttributes[0].strYoutube }
            title="How to Make Homemade Italian Lasagna Bolognese"
            allowFullScreen
          />
        </div>
      </section>)
  );

  return (
    <div>
      { !loading && <DetailsHeader
        title={ foodAttributes[0].strMeal }
        photo={ foodAttributes[0].strMealThumb }
        category={ foodAttributes[0].strCategory }
      />}
      { !loading && instructionsIngredientsVideoHtml() }
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
