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
    // Com este código da linha 12 e 13, o requisito 32 quebra
  const ingredientsList = strIngredientsEntries.map((ingredient, index) => (
    `${ingredient[1]}: ${strMeasuresEntries[index][1]}`));
    // Com o código comentado abaixo no lugar do código da linha 12 e 13
    // faz o requisito 32 passar mas quebra o 33 e o 35. Na prática, o código abaixa funciona normal :/
    // const ingredientsList = strMeasuresEntries.map((measure, index) => (
    //   `${strIngredientsEntries[index][1]}: ${measure[1]}`));
  return ingredientsList;
};

export default getIngredientsAndMeasures;
