import React, { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import MyContext from '../context/context';
import getFoodsAndDrinks from '../hooks/getFoodsAndDrinks';
import Card from '../components/Card';
import '../styles/Foods.css';
import Filters from '../components/Filters';
import getCategories from '../hooks/getCategories';
import getFoodOrDrinkByCategory from '../hooks/getFoodByCategory';

function Drinks() {
  const { allDrinks, setAllDrinks } = useContext(MyContext);
  const [categories, setCategories] = useState([]);
  const [actualDrinks, setActualDrinks] = useState([]);
  const [actualFilter, setActualFilter] = useState('');
  const limitDrinks = 12;

  const limitArray = (limit, array) => {
    const result = [];
    for (let i = 0; i < limit; i += 1) {
      result.push(array[i]);
    }
    return result;
  };

  useEffect(() => {
    const getDrinks = async () => {
      const { drinks } = await getFoodsAndDrinks();
      setActualDrinks(limitArray(limitDrinks, drinks));
      setAllDrinks(drinks);
    };
    getDrinks();
  }, [setAllDrinks]);

  useEffect(() => {
    const getDrinksCategories = async () => {
      const drinksCategories = await getCategories(false);
      const limitCategories = 5;
      setCategories(limitArray(limitCategories, drinksCategories));
    };
    getDrinksCategories();
  }, [setCategories]);

  const applyFilter = async (filter) => {
    if (actualFilter === filter || filter === 'all') {
      setActualDrinks(limitArray(limitDrinks, allDrinks));
    } else {
      setActualFilter(filter);
      const newDrinks = await getFoodOrDrinkByCategory(false, filter);
      setActualDrinks(newDrinks);
    }
  };

  const redirectToDetails = (id) => {
    console.log(id);
  };

  return (
    <div>
      <h1>Drinks</h1>
      <Filters categories={ categories } callback={ applyFilter } />
      <div className="recipes-list">
        { actualDrinks.map((drink, index) => (
          <Card
            key={ drink.strDrink }
            id={ index }
            name={ drink.strDrink }
            image={ drink.strDrinkThumb }
            onClick={ () => redirectToDetails(drink.idDrink) }
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Drinks;
