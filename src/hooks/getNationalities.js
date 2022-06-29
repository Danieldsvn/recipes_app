const getNationalities = async () => {
  const nationalitiesApi = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const response = await fetch(nationalitiesApi);
  const data = await response.json();

  return data.meals;
};

export default getNationalities;
