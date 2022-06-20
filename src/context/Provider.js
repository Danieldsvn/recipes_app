import PropTypes from 'prop-types';
import React, { useState } from 'react';
import MyContext from './context';

function Provider({ children }) {
  const [data, setData] = useState({});

  const INITIAL_STATE = {
    data,
    setData,
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
