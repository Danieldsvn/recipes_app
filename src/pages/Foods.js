import React from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';

function Foods() {
  return (
    <div>
      <Header pageTitle="Foods" search />
      <SearchBar />
      <Footer />
    </div>
  );
}

export default Foods;
