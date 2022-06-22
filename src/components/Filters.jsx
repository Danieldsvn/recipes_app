import React from 'react';
import PropTypes from 'prop-types';

function Filters({ categories }) {
  return (
    <div>
      { [...categories].map((category) => (
        <button
          key={ category.strCategory }
          type="button"
          data-testid={ `${category.strCategory}-category-filter` }
        >
          {category.strCategory}
        </button>
      )) }
    </div>
  );
}

Filters.propTypes = {
  categories: PropTypes.string.isRequired,
};

export default Filters;
