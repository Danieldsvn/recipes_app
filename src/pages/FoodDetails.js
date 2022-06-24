import React from 'react';
import RecommendedCard from '../components/RecommendedCard';
import DetailsHeader from '../components/DetailsHeader';

function FoodDetails() {
  return (
    <div>
      <DetailsHeader />
      <section className="ingredients-section">
        <h2>Ingredients</h2>
        <ul className="ingredients-list">
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
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
