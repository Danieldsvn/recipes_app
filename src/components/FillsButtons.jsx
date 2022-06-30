import React from 'react';
import PropTypes from 'prop-types';

function FillsButtons({ filter }) {
  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => filter('all') }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => filter('food') }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => filter('drink') }
      >
        Drinks
      </button>
    </div>
  );
}

FillsButtons.propTypes = {
  filter: PropTypes.func.isRequired,
};

export default FillsButtons;
