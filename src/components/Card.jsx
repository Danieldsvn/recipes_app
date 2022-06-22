import React from 'react';
import PropTypes from 'prop-types';

function Card({ id, name, image }) {
  return (
    <div className="recipe-card" data-testid={ `${id}-recipe-card` }>
      <img data-testid={ `${id}-card-img` } src={ image } alt={ name } />
      <p data-testid={ `${id}-card-name` }>{ name }</p>
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default Card;
