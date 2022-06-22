import React, { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import MyContext from '../context/context';
import getFoodsAndDrinks from '../hooks/getFoodsAndDrinks';
import Card from '../components/Card';
import '../styles/Foods.css';
import Filters from '../components/Filters';
import getCategories from '../hooks/getCategories';

function Foods() {
  const { allFoods, setAllFoods } = useContext(MyContext);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getFoods = async () => {
      const meals = await getFoodsAndDrinks();
      setAllFoods(meals);
    };
    getFoods();
  }, [setAllFoods]);

  useEffect(() => {
    const getMealsCategories = async () => {
      const mealsCategories = await getCategories();
      setCategories(mealsCategories);
    };
    getMealsCategories();
  }, [setCategories]);

  return (
    <div>
      <h1>Foods</h1>
      <Filters categories={ categories } />
      <div className="recipes-list">
        { allFoods.map((food, index) => (
          <Card
            key={ food.strMeal }
            id={ index }
            name={ food.strMeal }
            image={ food.strMealThumb }
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Foods;
