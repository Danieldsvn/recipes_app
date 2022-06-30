import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreDrinks() {
  const history = useHistory();
  const [randomDrink, setRandomDrink] = useState('');

  useEffect(() => {
    async function getIdDrink() {
      const endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
      const response = await fetch(endPoint);
      const data = await response.json();
      const values = Object.values(data);
      const id = Object.values(values[0]);
      const idReturn = Object.values(id[0]);
      setRandomDrink(`/drinks/${idReturn[0]}`);
    }
    getIdDrink();
  }, []);

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

      <Link to={ randomDrink }>
        <button
          type="button"
          data-testid="explore-surprise"
        >
          Surprise me!
        </button>
      </Link>
    </div>
  );
}

export default ExploreDrinks;
