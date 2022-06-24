import React from 'react';

function RecommendedCard() {
  return (
    <div className="Recommended-cards">
      <div className="Recommended-card" data-testid={ `${index}-recomendation-card` }>
        <h3
          data-testid={ `${index}-recomendation-title` }
        >
          Cards de bebidas recomendadas
        </h3>
      </div>
    </div>
  );
}

export default RecommendedCard;
