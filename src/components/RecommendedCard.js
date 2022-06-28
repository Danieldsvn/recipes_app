import React from 'react';
import PropTypes from 'prop-types';
import '../styles/FoodDrinkDetails.css';

function RecommendedCard({ key, index, photo, title, category }) {
  return (
    <div
      key={ key }
      className="recommended-card"
      data-testid={ `${index}-recomendation-card` }
    >
      <img src={ photo } alt={ title } />
      <h3
        data-testid={ `${title}-recomendation-title` }
      >
        { title }
      </h3>
      <h7>{ category }</h7>
    </div>
  );
}

RecommendedCard.propTypes = {
  key: PropTypes.number.isRequired,
  index: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};
export default RecommendedCard;
