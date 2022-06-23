import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
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

  useEffect(() => {
    const getDrinks = async () => {
      const { drinks } = await getFoodsAndDrinks();
      setActualDrinks(drinks.slice(0, limitDrinks));
      setAllDrinks(drinks);
    };
    getDrinks();
  }, [setAllDrinks]);

  useEffect(() => {
    const getDrinksCategories = async () => {
      const drinksCategories = await getCategories(false);
      const limitCategories = 5;
      setCategories(drinksCategories.slice(0, limitCategories));
    };
    getDrinksCategories();
  }, [setCategories]);

  const applyFilter = async (filter) => {
    if (actualFilter === filter || filter === 'all') {
      setActualDrinks(allDrinks.slice(0, limitDrinks));
    } else {
      setActualFilter(filter);
      const newDrinks = await getFoodOrDrinkByCategory(false, filter);
      setActualDrinks(newDrinks.slice(0, limitDrinks));
    }
  };

  const redirectToDetails = (id) => {
    console.log(id);
  };

  return (
    <div>
      <Header pageTitle="Drinks" search />
      <SearchBar />
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
