const getIngredientsAndMeasures = (mealOrDrink) => {
  const mealOrDrinksEntries = Object.entries(mealOrDrink[0]);
  const strIngredientsEntries = mealOrDrinksEntries
    .filter((entry) => entry[0]
      .includes('strIngredient') && entry[1] !== '')
    .filter((entry) => entry[1] !== null);
  const strMeasuresEntries = mealOrDrinksEntries
    .filter((entry) => entry[0]
      .includes('strMeasure') && entry[1] !== ' ')
    .filter((entry) => entry[1] !== null);
  const ingredientsList = strIngredientsEntries.map((ingredient, index) => (
    `${ingredient[1]}: ${strMeasuresEntries[index][1]}`));
  return ingredientsList;
};

export default getIngredientsAndMeasures;
