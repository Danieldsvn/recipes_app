const getFoodOrDrinkByCategory = async (meal, category) => {
  let result = [];
  if (meal) {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    const { meals } = await fetch(url).then((response) => response.json());
    result = meals;
  } else {
    const categoriesApi = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
    const { drinks } = await fetch(categoriesApi).then((response) => response.json());
    result = drinks;
  }
  return result;
};

export default getFoodOrDrinkByCategory;
