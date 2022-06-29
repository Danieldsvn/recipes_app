import React from 'react';
import PropTypes from 'prop-types';
import '../styles/FoodDrinkDetails.css';

function DetailsHeader({ title, photo, category, shareSrc, clipboardCopy }) {
  return (
    <header className="details-header">
      <img
        className="details-recipe-image"
        data-testid="recipe-photo"
        src={ photo }
        alt={ title }
      />
      <h3 data-testid="recipe-title">{title}</h3>
      <div className="share-favorite-buttons">
        <button
          data-testid="share-btn"
          type="button"
          onClick={ () => clipboardCopy() }
        >
          <img src={ shareSrc } alt="share-button" />
        </button>
        <button data-testid="favorite-btn" type="button">favorito</button>
      </div>
      <p data-testid="recipe-category">{ category }</p>
    </header>
  );
}

DetailsHeader.propTypes = {
  title: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  shareSrc: PropTypes.string.isRequired,
  clipboardCopy: PropTypes.func.isRequired,
};

export default DetailsHeader;
