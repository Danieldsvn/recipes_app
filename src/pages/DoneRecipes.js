import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import FavoriteCard from '../components/FavoriteCard';
import FillsButtons from '../components/FillsButtons';
import Header from '../components/Header';
import MyContext from '../context/context';

function DoneRecipes() {
  const { myRecipes, setMyRecipes } = useContext(MyContext);
  const [actualRecipes, setActualRecipes] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const getRecipes = () => {
      const recipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
      setMyRecipes(recipes);
      setActualRecipes(recipes);
    };
    getRecipes();
  }, [setMyRecipes, setActualRecipes]);

  const filterRecipes = (type) => {
    if (type === 'all') {
      setActualRecipes(myRecipes);
    } else {
      setActualRecipes(myRecipes.filter((favorite) => favorite.type === type));
    }
  };

  const redirectDetails = (id, type) => {
    history.push(`/${type}s/${id}`);
  };

  return (
    <div>
      <Header pageTitle="Done Recipes" />
      <FillsButtons filter={ filterRecipes } />
      <div className="favorite-list">
        { actualRecipes.map((recipe, index) => (
          <FavoriteCard
            index={ index }
            infos={ recipe }
            key={ recipe.name }
            deleteCard={ () => {} }
            callback={ redirectDetails }
          />
        ))}
      </div>
    </div>
  );
}

/* [{
  id: id-da-receita,
  type: comida-ou-bebida,
  nationality: nacionalidade-da-receita-ou-texto-vazio,
  category: categoria-da-receita-ou-texto-vazio,
  alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
  name: nome-da-receita,
  image: imagem-da-receita,
  doneDate: quando-a-receita-foi-concluida,
  tags: array-de-tags-da-receita-ou-array-vazio
}] */

export default DoneRecipes;
