import React from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';

function ExploreFoodsByNationalities() {
  return (
    <div>
      <Header pageTitle="Explore Nationalities" search />
      <SearchBar />
      <Footer />
    </div>
  );
}

export default ExploreFoodsByNationalities;
