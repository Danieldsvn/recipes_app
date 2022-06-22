const getCategories = async (meal = true) => {
  let result = [];
  const limitCategories = 5;
  const categories = [];
  if (meal) {
    const categoriesApi = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    const { meals } = await fetch(categoriesApi).then((response) => response.json());
    result = meals;
  } else {
    const categoriesApi = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    const { drinks } = await fetch(categoriesApi).then((response) => response.json());
    result = drinks;
  }
  for (let i = 0; i < limitCategories; i += 1) {
    categories.push(result[i]);
  }
  return categories;
};

export default getCategories;
