import React from 'react';
import PropTypes from 'prop-types';

function DetailsHeader({ title, photo, category }) {
  return (
    <header className="details-foods-header">
      <h1 data-testid="recipe-title">{title}</h1>
      <img data-testid="recipe-photo" width="360" src={ photo } alt={ title } />
      <p data-testid="recipe-category">{ category }</p>
      <button data-testid="share-btn" type="button">compartilhar</button>
      <button data-testid="favorite-btn" type="button">favorito</button>
    </header>
  );
}

DetailsHeader.propTypes = {
  title: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default DetailsHeader;
