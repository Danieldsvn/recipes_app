import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import FavoriteCard from '../components/FavoriteCard';
import '../styles/FavoriteRecipes.css';
import MyContext from '../context/context';
import FillsButtons from '../components/FillsButtons';

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
      <FillsButtons filter={ filterFavorites } />
      <div className="favorite-list">
        { actualFavorites.map((favorite, index) => (
          <FavoriteCard
            index={ index }
            infos={ favorite }
            key={ favorite.name }
            deleteCard={ deleteFavoriteCard }
            callback={ redirectDetails }
          />
        ))}
      </div>
    </div>
  );
}

export default FavoriteRecipes;
