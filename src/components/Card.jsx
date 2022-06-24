import React from 'react';
import PropTypes from 'prop-types';

function Card({ id, name, image, identity, redirectToDetails }) {
  return (
    <div
      className="recipe-card"
      data-testid={ `${id}-recipe-card` }
      onClick={ () => redirectToDetails(identity) }
      role="button"
      tabIndex={ 0 }
      onKeyPress={ () => {} }
    >
      <img data-testid={ `${id}-card-img` } src={ image } alt={ name } />
      <p data-testid={ `${id}-card-name` }>{ name }</p>
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  identity: PropTypes.number.isRequired,
  redirectToDetails: PropTypes.func.isRequired,
};

export default Card;
