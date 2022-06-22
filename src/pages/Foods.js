import React from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

function Foods() {
  return (
    <div>
      <Header pageTitle="Foods" search />
      <SearchBar />
      <div>Foods</div>
    </div>
  );
}

export default Foods;
