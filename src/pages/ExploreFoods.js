import React from 'react';
import { useHistory } from 'react-router-dom';

import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreFoods() {
  const history = useHistory();

  return (
    <div>
      <Header pageTitle="Explore Foods" />
      <Footer />

      <button
        data-testid="explore-by-ingredient"
        type="submit"
        onClick={ () => history.push('/explore/foods/ingredients') }
      >
        By Ingredient
      </button>
      <button
        data-testid="explore-by-nationality"
        type="submit"
        onClick={ () => history.push('/explore/foods/nationalities') }

      >
        By Nationality
      </button>

      <button
        data-testid="explore-surprise"
        type="submit"
      >
        Surprise me!
      </button>
    </div>
  );
}

export default ExploreFoods;
