import PropTypes from 'prop-types';
import React, { useState } from 'react';
import MyContext from './context';

function Provider({ children }) {
  const [data, setData] = useState({});
  const [allFoods, setAllFoods] = useState([]);
  const [allDrinks, setAllDrinks] = useState([]);
  const [searchBar, setSearchBar] = useState(false);

  const INITIAL_STATE = {
    data,
    setData,
    allFoods,
    setAllFoods,
    allDrinks,
    setAllDrinks,
    searchBar,
    setSearchBar,
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
