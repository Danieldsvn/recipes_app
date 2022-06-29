import React from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreDrinks() {
  const history = useHistory();

  return (

    <div>
      <Header pageTitle="Explore Drinks" />
      <Footer />

      <button
        data-testid="explore-by-ingredient"
        type="submit"
        onClick={ () => history.push('/explore/drinks/ingredients') }
      >
        By Ingredient
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

export default ExploreDrinks;
