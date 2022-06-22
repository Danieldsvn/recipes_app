import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  const history = useHistory();
  return (
    <div
      className="footer"
      data-testid="footer"
    >
      {/* trying stuff */}
      <button
        type="button"
        data-testid="drinks-bottom-btn"
        onClick={ () => history.push('/drinks') }
        src={ drinkIcon }
        alt="drink"
      >
        <img src={ drinkIcon } alt="drink" />
      </button>
      <button
        type="button"
        data-testid="explore-bottom-btn"
        onClick={ () => history.push('/explore') }
        src={ exploreIcon }
        alt="compass"
      >
        <img src={ exploreIcon } alt="compass" />
      </button>
      <button
        type="button"
        data-testid="food-bottom-btn"
        onClick={ () => history.push('/foods') }
        src={ mealIcon }
        alt="SpoonCrossFork"
      >
        <img src={ mealIcon } alt="SpoonCrossFork" />
      </button>
    </div>
  );
}

export default Footer;
