import PropTypes from 'prop-types';
import React, { useState } from 'react';
import MyContext from './context';

function Provider({ children }) {
  const [data, setData] = useState({});
  const [allFoods, setAllFoods] = useState([]);
  const [allDrinks, setAllDrinks] = useState([]);
  const [searchBar, setSearchBar] = useState(false);
  const [singleSearchResult, setSingleSearchResult] = useState(['SearchBarResult']); // Armazena as informações da receita quando a pesquisa tiver um resultado

  const INITIAL_STATE = {
    data,
    setData,
    allFoods,
    setAllFoods,
    allDrinks,
    setAllDrinks,
    searchBar,
    setSearchBar,
    singleSearchResult,
    setSingleSearchResult,
  };

  return (
    <MyContext.Provider value={ INITIAL_STATE }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
