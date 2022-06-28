import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function FavoriteCard({ index, favorite, deleteFavoriteCard }) {
  const { id, type, category, name, image,
    alcoholicOrNot, nationality } = favorite;
  const [copyText, setCopyText] = useState('');

  useEffect(() => {

  }, [setCopyText]);

  const notifyCopy = (productId) => {
    const TIMED_OUT = 5000;
    copy(`http://localhost:3000/foods/${productId}`);
    setCopyText('Link copied!');
    setTimeout(() => {
      setCopyText('');
    }, TIMED_OUT);
  };

  return (
    <>
      { copyText ? <h3 id="copyText">{copyText}</h3> : '' }
      <div
        className="favorite-card"
      >
        <div className="card-content">
          <img data-testid={ `${index}-horizontal-image` } src={ image } alt={ name } />
        </div>
        <div className="card-content" data-testid={ `${index}-horizontal-top-text` }>
          { type === 'drink' ? `${alcoholicOrNot}` : `${nationality} - ${category}` }
          <div data-testid={ `${index}-horizontal-name` }>{ name }</div>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ () => notifyCopy(id) }
            src={ shareIcon }
          >
            <img src={ shareIcon } alt="search" />
          </button>
          <button
            type="button"
            data-testid={ `${index}-horizontal-favorite-btn` }
            onClick={ () => deleteFavoriteCard(index) }
            src={ blackHeartIcon }
          >
            <img src={ blackHeartIcon } alt="search" />
          </button>
        </div>
      </div>
    </>
  );
}

FavoriteCard.propTypes = {
  favorite: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  deleteFavoriteCard: PropTypes.func.isRequired,
};

export default FavoriteCard;
