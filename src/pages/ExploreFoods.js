import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreFoods() {
  const history = useHistory();
  const [randomFood, setRandomFood] = useState('');

  useEffect(() => {
    async function getIdFood() {
      const endPoint = 'https://www.themealdb.com/api/json/v1/1/random.php';
      const response = await fetch(endPoint);
      const data = await response.json();
      const values = Object.values(data);
      const id = Object.values(values[0]);
      const idReturn = Object.values(id[0]);
      setRandomFood(`/foods/${idReturn[0]}`);
    }

    getIdFood();
  }, []);

  console.log(randomFood);

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

      <Link to={ randomFood }>
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

export default ExploreFoods;
