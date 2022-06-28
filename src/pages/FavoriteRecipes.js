import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import FavoriteCard from '../components/FavoriteCard';
import '../styles/FavoriteRecipes.css';

function FavoriteRecipes() {
  const [myFavorites, setMyFavorites] = useState([]);

  useEffect(() => {
    const getFavorites = async () => {
      const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      setMyFavorites(favorites);
    };
    getFavorites();
  }, [setMyFavorites]);

  const deleteFavoriteCard = (productId) => {
    myFavorites.splice(productId);
    setMyFavorites(myFavorites);
    localStorage.setItem('favoriteRecipes', JSON.stringify(myFavorites));
  };

  return (
    <div>
      <Header pageTitle="Favorite Recipes" />
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-food-btn">Food</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      <div className="favorite-list">
        { myFavorites.map((favorite, index) => (
          <FavoriteCard
            index={ index }
            favorite={ favorite }
            key={ favorite.name }
            deleteFavoriteCard={ deleteFavoriteCard }
          />
        ))}
      </div>
    </div>
  );
}

export default FavoriteRecipes;
