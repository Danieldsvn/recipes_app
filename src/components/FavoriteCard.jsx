import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function FavoriteCard({ index, infos, deleteCard, callback }) {
  const { id, type, category, name, image,
    alcoholicOrNot, nationality, doneDate, tags } = infos;
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
        <div
          className="card-content"
          onClick={ () => callback(id, type) }
          role="button"
          tabIndex={ 0 }
          onKeyPress={ () => {} }
        >
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ image }
            alt={ name }
          />
        </div>
        <div className="card-content" data-testid={ `${index}-horizontal-top-text` }>
          { type === 'drink' ? `${alcoholicOrNot}` : `${nationality} - ${category}` }
          <div>
            { doneDate ? (
              <span data-testid={ `${index}-horizontal-done-date` }>
                {doneDate}
              </span>
            ) : '' }
            { tags && tags.length > 0 ? (tags.map((tag) => (
              <span
                key={ tag }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}
              </span>
            ))) : '' }
          </div>
          <div
            data-testid={ `${index}-horizontal-name` }
            onClick={ () => callback(id, type) }
            role="button"
            tabIndex={ 0 }
            onKeyPress={ () => {} }
          >
            { name }
          </div>
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
            onClick={ () => deleteCard(index) }
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
  infos: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  deleteCard: PropTypes.func.isRequired,
  callback: PropTypes.func.isRequired,
};

export default FavoriteCard;
