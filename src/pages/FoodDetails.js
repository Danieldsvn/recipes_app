import React from 'react';

function FoodDetails() {
  return (
    <div>
      <img src="src" alt="alt" />
      <div>
        <h1>Nome da receita</h1>
        <p>categoria</p>
        <button type="button">compartilhar</button>
        <button type="button">favorito</button>
      </div>
      <div>
        <h2>Ingredients</h2>
        <ul>
          <li>ingrediente 1</li>
        </ul>
      </div>
      <div>
        <h2>Instructions</h2>
        <div>
          <p>text...</p>
        </div>
      </div>
      <div>
        <h2>Video</h2>
        <link />
      </div>
      <div>
        <h2>Recomended</h2>
        <div>
          <p>Cards de bebidas recomendadas</p>
        </div>
      </div>
    </div>
  );
}

export default FoodDetails;
