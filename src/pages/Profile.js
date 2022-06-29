import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const history = useHistory();
  const [myEmail, setMyEmail] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) setMyEmail(user.email);
  }, [setMyEmail]);

  const logoutUser = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header pageTitle="Profile" />
      <div
        type="email"
        data-testid="profile-email"
      >
        { `Email: ${myEmail}` }
      </div>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ () => logoutUser() }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
