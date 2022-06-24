async function getFoodAndDrinkById(id) {
  const foodApi = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const drinkApi = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const { meals } = await fetch(foodApi).then((response) => response.json());
  const { drinks } = await fetch(drinkApi).then((response) => response.json());
  return { meals, drinks };
}

export default getFoodAndDrinkById;
