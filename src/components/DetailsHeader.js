import React from 'react';

function DetailsHeader() {
  return (
    <header className="details-foods-header">
      <h1 data-testid="recipe-title">Nome da receita</h1>
      <img data-testid="recipe-photo" src="src" alt="alt" />
      <p data-testid="recipe-category">categoria</p>
      <button data-testid="share-btn" type="button">compartilhar</button>
      <button data-testid="favorite-btn" type="button">favorito</button>
    </header>
  );
}

export default DetailsHeader;
