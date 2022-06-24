import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DetailsHeader from '../components/DetailsHeader';
import RecommendedCard from '../components/RecommendedCard';

function DrinkDetails() {
  const location = useLocation();

  useEffect(() => {
    const locationArray = location.pathname.split('s/', 2);
    const drinkId = locationArray[1];
    console.log(drinkId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <DetailsHeader />
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
      <section id="Recommended">
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
