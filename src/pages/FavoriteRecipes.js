import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import FavoriteCard from '../components/FavoriteCard';
import '../styles/FavoriteRecipes.css';
import MyContext from '../context/context';

function FavoriteRecipes() {
  const { myFavorites, setMyFavorites } = useContext(MyContext);
  const [actualFavorites, setActualFavorites] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const getFavorites = () => {
      const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      setMyFavorites(favorites);
      setActualFavorites(favorites);
    };
    getFavorites();
  }, [setMyFavorites, setActualFavorites]);

  const filterFavorites = (type) => {
    if (type === 'all') {
      setActualFavorites(myFavorites);
    } else {
      setActualFavorites(myFavorites.filter((favorite) => favorite.type === type));
    }
  };

  const deleteFavoriteCard = (productId) => {
    myFavorites.splice(productId, 1);
    localStorage.setItem('favoriteRecipes', JSON.stringify(myFavorites));
    setMyFavorites(myFavorites);
    setActualFavorites(myFavorites);
    history.push('/favorite-recipes');
  };

  const redirectDetails = (id, type) => {
    history.push(`/${type}s/${id}`);
  };

  return (
    <div>
      <Header pageTitle="Favorite Recipes" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => filterFavorites('all') }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => filterFavorites('food') }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => filterFavorites('drink') }
      >
        Drinks
      </button>
      <div className="favorite-list">
        { actualFavorites.map((favorite, index) => (
          <FavoriteCard
            index={ index }
            favorite={ favorite }
            key={ favorite.name }
            deleteFavoriteCard={ deleteFavoriteCard }
            callback={ redirectDetails }
          />
        ))}
      </div>
    </div>
  );
}

export default FavoriteRecipes;
