import React from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

function Drinks() {
  return (
    <div>
      <Header pageTitle="Drinks" search />
      <SearchBar />
      <div>Drinks</div>
    </div>
  );
}

export default Drinks;
