import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DetailsHeader from '../components/DetailsHeader';
import RecommendedCard from '../components/RecommendedCard';
import getFoodAndDrinkById from '../hooks/getFoodAndDrinkById';

function DrinkDetails() {
  const location = useLocation();

  const [drinkAttributes, setDrinkAttributes] = useState({
    drinks: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const locationArray = location.pathname.split('s/', 2);
    const drinkId = locationArray[1];
    const fetchDrinkById = async () => {
      const { drinks } = await getFoodAndDrinkById(drinkId);
      setDrinkAttributes(drinks);
      setLoading(false);
    };
    fetchDrinkById();
    console.log(drinkAttributes);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      { !loading && <DetailsHeader
        title={ drinkAttributes[0].strDrink }
        photo={ drinkAttributes[0].strDrinkThumb }
        category={ drinkAttributes[0].strCategory }
      /> }
      <section className="ingredients-section">
        <h2>Ingredients</h2>
        <ul className="ingredients-list">
          <li
            data-testid={ `${location.pathname}-ingredient-name-and-measure` }
          >
            ingrediente
          </li>
        </ul>
      </section>
      <section className="instructions">
        <h2>Instructions</h2>
        <div>
          <p data-testid="instructions">drink...</p>
        </div>
      </section>
      <section className="Recommended">
        <h2>Recomended foods...</h2>
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

export default DrinkDetails;
