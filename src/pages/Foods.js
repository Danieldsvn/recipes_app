import React, { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import MyContext from '../context/context';
import getFoodsAndDrinks from '../hooks/getFoodsAndDrinks';
import Card from '../components/Card';
import '../styles/Foods.css';
import Filters from '../components/Filters';
import getCategories from '../hooks/getCategories';
import getFoodOrDrinkByCategory from '../hooks/getFoodByCategory';

function Foods() {
  const { allFoods, setAllFoods } = useContext(MyContext);
  const [categories, setCategories] = useState([]);
  const [actualFoods, setActualFoods] = useState([]);
  const [actualFilter, setActualFilter] = useState('');
  const limitFoods = 12;

  const limitArray = (limit, array) => {
    const result = [];
    for (let i = 0; i < limit; i += 1) {
      result.push(array[i]);
    }
    return result;
  };

  useEffect(() => {
    const getFoods = async () => {
      const { meals } = await getFoodsAndDrinks();
      setActualFoods(limitArray(limitFoods, meals));
      setAllFoods(meals);
    };
    getFoods();
  }, [setAllFoods]);

  useEffect(() => {
    const getMealsCategories = async () => {
      const mealsCategories = await getCategories();
      const limitCategories = 5;
      setCategories(limitArray(limitCategories, mealsCategories));
    };
    getMealsCategories();
  }, [setCategories]);

  const applyFilter = async (filter) => {
    if (actualFilter === filter || filter === 'all') {
      setActualFoods(limitArray(limitFoods, allFoods));
    } else {
      setActualFilter(filter);
      const newFoods = await getFoodOrDrinkByCategory(true, filter);
      setActualFoods(limitArray(limitFoods, newFoods));
    }
  };

  const redirectToDetails = (id) => {
    console.log(id);
  };

  return (
    <div>
      <h1>Foods</h1>
      <Filters categories={ categories } callback={ applyFilter } />
      { actualFoods.length < 1 || !actualFoods ? <h1>Loading...</h1>
        : (
          <div className="recipes-list">
            { actualFoods.map((food, index) => (
              <Card
                key={ food.strMeal }
                id={ index }
                name={ food.strMeal }
                image={ food.strMealThumb }
                onClick={ () => redirectToDetails(food.idMeal) }
              />
            ))}
          </div>
        )}
      <Footer />
    </div>
  );
}

export default Foods;
