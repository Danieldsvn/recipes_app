async function getFoodsAndDrinks() {
  const foodsApi = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const drinksApi = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const { meals } = await fetch(foodsApi).then((response) => response.json());
  const { drinks } = await fetch(drinksApi).then((response) => response.json());
  return { meals, drinks };
}

export default getFoodsAndDrinks;
