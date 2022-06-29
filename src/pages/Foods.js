import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
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

function Foods() {
  const { allFoods, setAllFoods } = useContext(MyContext);
  const [categories, setCategories] = useState([]);
  const [actualFoods, setActualFoods] = useState([]);
  const [actualFilter, setActualFilter] = useState('');
  const history = useHistory();
  const limitFoods = 12;

  useEffect(() => {
    const getFoods = async () => {
      const { meals } = await getFoodsAndDrinks();
      setActualFoods(meals.slice(0, limitFoods));
      setAllFoods(meals);
    };
    getFoods();
  }, [setAllFoods]);

  useEffect(() => {
    const getMealsCategories = async () => {
      const mealsCategories = await getCategories();
      const limitCategories = 5;
      setCategories(mealsCategories.slice(0, limitCategories));
    };
    getMealsCategories();
  }, [setCategories]);

  const applyFilter = async (filter) => {
    if (actualFilter === filter || filter === 'all') {
      setActualFoods(allFoods.slice(0, limitFoods));
    } else {
      setActualFilter(filter);
      const newFoods = await getFoodOrDrinkByCategory(true, filter);
      setActualFoods(newFoods.slice(0, limitFoods));
    }
  };

  const redirectToDetails = (id) => {
    history.push(`/foods/${id}`);
  };

  return (
    <div>
      <Header pageTitle="Foods" search />
      <SearchBar />
      <hr />
      <Filters categories={ categories } callback={ applyFilter } />
      { actualFoods.length < 1 || !actualFoods ? <h1>Loading...</h1>
        : (
          <div className="recipes-list">
            { actualFoods.map((food, index) => (
              <Card
                key={ food.strMeal }
                id={ index }
                identity={ food.idMeal }
                name={ food.strMeal }
                image={ food.strMealThumb }
                redirectToDetails={ redirectToDetails }
              />
            ))}
          </div>
        )}
      <Footer />
    </div>
  );
}

export default Foods;
