async function getFoodsAndDrinks(meal = true) {
  const myFoods = [];
  const limitFoods = 12;
  let allFoods = [];
  if (meal) {
    const foodsApi = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const { meals } = await fetch(foodsApi).then((response) => response.json());
    allFoods = meals;
  } else {
    const drinksApi = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const { drinks } = await fetch(drinksApi).then((response) => response.json());
    allFoods = drinks;
  }

  for (let i = 0; i < limitFoods; i += 1) {
    myFoods.push(allFoods[i]);
  }
  return myFoods;
}

export default getFoodsAndDrinks;
