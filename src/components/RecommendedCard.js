import React from 'react';
import PropTypes from 'prop-types';

function RecommendedCard({ key, index, photo, title, category }) {
  return (
    <div
      key={ key }
      className="Recommended-card"
      data-testid={ `${index}-recomendation-card` }
    >
      <img src={ photo } alt={ title } />
      <h3
        data-testid={ `${title}-recomendation-title` }
      >
        { title }
      </h3>
      <h6>{ category }</h6>
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
