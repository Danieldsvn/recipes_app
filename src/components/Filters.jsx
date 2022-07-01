import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Filters.css';

function Filters({ categories, callback }) {
  return (
    <div>
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => callback('all') }
      >
        All
      </button>
      { [...categories].map((category) => (
        <button
          key={ category.strCategory }
          type="button"
          data-testid={ `${category.strCategory}-category-filter` }
          onClick={ () => callback(category.strCategory) }
        >
          {category.strCategory}
        </button>
      )) }
    </div>
  );
}

Filters.propTypes = {
  categories: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
};

export default Filters;
