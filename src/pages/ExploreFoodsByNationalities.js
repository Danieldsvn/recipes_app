import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import getNationalities from '../hooks/getNationalities';
import getFoodsByNationalitie from '../hooks/getFoodsByNationalitie';
import Card from '../components/Card';

function ExploreFoodsByNationalities() {
  const [loading, setLoading] = useState(true);
  const [nationalities, setNationalities] = useState([]);
  const [selectedNationalitie, setSelectedNationalitie] = useState('All');
  const [actualFoods, setActualFoods] = useState([]);
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    const fetchNationalities = async () => {
      const nationalitiesData = await getNationalities();
      setNationalities(nationalitiesData);
    };
    fetchNationalities();
    setLoading(false);
  }, []);

  useEffect(() => {
    const limitFoods = 12;
    const fetchFoods = async () => {
      const foodsData = await getFoodsByNationalitie(selectedNationalitie);
      setActualFoods(foodsData.slice(0, limitFoods));
    };
    fetchFoods();
  }, [selectedNationalitie]);

  const handleChange = ({ target: { value } }) => {
    setSelectedNationalitie(value);
  };

  const redirectToDetails = (id) => {
    history.push(`/foods/${id}`);
  };

  return (
    <div>
      <Header pageTitle="Explore Nationalities" search />
      <SearchBar />

      {!loading && (
        <select
          data-testid="explore-by-nationality-dropdown"
          onChange={ handleChange }
          value={ selectedNationalitie }
        >
          <option
            data-testid="All-option"
          >
            All
          </option>

          {nationalities.map((nationalitie) => (
            <option
              key={ nationalitie.strArea }
              data-testid={ `${nationalitie.strArea}-option` }
            >
              {nationalitie.strArea}
            </option>
          ))}
        </select>
      )}

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

export default ExploreFoodsByNationalities;
