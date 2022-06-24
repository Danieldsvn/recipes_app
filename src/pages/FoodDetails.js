import React from 'react';
import RecommendedCard from '../components/RecommendedCard';

function FoodDetails() {
  return (
    <div>
      <header className="details-foods-header">
        <h1 data-testid="recipe-title">Nome da receita</h1>
        <img data-testid="recipe-photo" src="src" alt="alt" />
        <p data-testid="recipe-category">categoria</p>
        <button data-testid="share-btn" type="button">compartilhar</button>
        <button data-testid="favorite-btn" type="button">favorito</button>
      </header>
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
