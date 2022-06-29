const getFoodsByNationalitie = async (nationalitie) => {
  if (nationalitie === 'All') {
    const AllFoodsApi = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(AllFoodsApi);
    const data = await response.json();
    return data.meals;
  }

  const foodsByNationalitieApi = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${nationalitie}`;
  const response = await fetch(foodsByNationalitieApi);
  const data = await response.json();
  return data.meals;
};

export default getFoodsByNationalitie;
