import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { render } from '@testing-library/react';
import App from '../../App';
import Provider from '../../context/Provider';

const renderPath = (path) => {
  const history = createBrowserHistory();
  history.push(path);
  const { ...resources } = render(
    <Router history={ history }>
      <Provider>
        <App />
      </Provider>
    </Router>,
  );
  return { ...resources, history };
};

export default renderPath;
