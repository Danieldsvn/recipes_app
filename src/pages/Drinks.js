import React from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';

function Drinks() {
  return (
    <div>
      <Header pageTitle="Drinks" search />
      <SearchBar />
      <h1>Drinks</h1>
      <Footer />
    </div>
  );
}

export default Drinks;
