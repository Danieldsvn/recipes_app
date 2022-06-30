import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/context';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../styles/Header.css';

function Header({ pageTitle, search }) {
  const history = useHistory();
  const { searchBar, setSearchBar } = useContext(MyContext);

  const handleClick = () => {
    setSearchBar(!searchBar);
  };

  return (
    <header>
      <button
        type="button"
        data-testid="profile-top-btn"
        onClick={ () => history.push('/profile') }
        src={ profileIcon }
        alt="profile"
      >
        <img src={ profileIcon } alt="profile" />
      </button>

      <h3
        data-testid="page-title"
      >
        {pageTitle}
      </h3>

      { search ? (
        <button
          type="button"
          data-testid="search-top-btn"
          onClick={ handleClick }
          src={ searchIcon }
          alt="search"
        >
          <img src={ searchIcon } alt="search" />
        </button>
      ) : (
        <div className="fixTitlePosition" />
      )}

    </header>
  );
}

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  search: PropTypes.bool.isRequired,
};

export default Header;
