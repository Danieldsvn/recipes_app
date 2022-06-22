import React, { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import MyContext from '../context/context';
import getFoodsAndDrinks from '../hooks/getFoodsAndDrinks';
import Card from '../components/Card';
import '../styles/Foods.css';
import Filters from '../components/Filters';
import getCategories from '../hooks/getCategories';

function Drinks() {
  const { allDrinks, setAllDrinks } = useContext(MyContext);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getDrinks = async () => {
      const drinks = await getFoodsAndDrinks(false);
      setAllDrinks(drinks);
    };
    getDrinks();
  }, [setAllDrinks]);

  useEffect(() => {
    const getDrinksCategories = async () => {
      const drinksCategories = await getCategories(false);
      setCategories(drinksCategories);
    };
    getDrinksCategories();
  }, [setCategories]);

  return (
    <div>
      <h1>Drinks</h1>
      <Filters categories={ categories } />
      <div className="recipes-list">
        { allDrinks.map((drink, index) => (
          <Card
            key={ drink.strDrink }
            id={ index }
            name={ drink.strDrink }
            image={ drink.strDrinkThumb }
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Drinks;
