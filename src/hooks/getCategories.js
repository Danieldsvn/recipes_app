const getCategories = async (meal = true) => {
  let result = [];
  if (meal) {
    const categoriesApi = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    const { meals } = await fetch(categoriesApi).then((response) => response.json());
    result = meals;
  } else {
    const categoriesApi = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    const { drinks } = await fetch(categoriesApi).then((response) => response.json());
    result = drinks;
  }
  return result;
};

export default getCategories;
