import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RecommendedCard from '../components/RecommendedCard';
import DetailsHeader from '../components/DetailsHeader';
import getFoodAndDrinkById from '../hooks/getFoodAndDrinkById';

function FoodDetails() {
  const location = useLocation();
  const [foodAttributes, setFoodAttributes] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const locationArray = location.pathname.split('s/', 2);
    const foodId = locationArray[1];
    const fetchFoodById = async () => {
      const { meals } = getFoodAndDrinkById(foodId);
      setFoodAttributes(meals);
    };
    fetchFoodById();
    setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            data-testid="index-ingredient-name-and-measure"
          >
            ingrediente
          </li>
        </ul>
      </section>
      <section className="instructions">
        <h2>Instructions</h2>
        <div>
          <p data-testid="instructions">text...</p>
        </div>
      </section>
      <section className="Video">
        <h2>Video</h2>
        <link data-testid="video" />
      </section>
      <section id="Recommended">
        <h2>Recomended drinks...</h2>
        <RecommendedCard />
        <RecommendedCard />
        <RecommendedCard />
      </section>
      <footer>
        <button type="button" data-testid="start-recipe-btn">Start Recipe</button>
      </footer>
    </div>
  );
}

export default FoodDetails;
