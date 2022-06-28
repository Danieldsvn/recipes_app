export async function getFoodById(id) {
  const endPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(endPoint);
  const data = await response.json();
  return data;
}

export async function getDrinkById(id) {
  const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(endPoint);
  const data = await response.json();
  return data;
}
