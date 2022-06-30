export const getFavoriteLocalStorage = (id, setAllFavorites, setIsFavorite,
  blackHeartIcon) => {
  if (localStorage.getItem('favoriteRecipes') !== null) {
    const appFavoritesString = localStorage.getItem('favoriteRecipes');
    const appFavorites = JSON.parse(appFavoritesString);
    setAllFavorites(appFavorites);
    const isThisRecipeFavorite = appFavorites.some((favorite) => favorite.id === id);
    if (isThisRecipeFavorite) setIsFavorite(blackHeartIcon);
  } else localStorage.setItem('favoriteRecipes', JSON.stringify([]));
};

export const getDoneLocalStorage = (id, setIsDone) => {
  if (localStorage.getItem('doneRecipes') !== null) {
    const appAllDoneString = localStorage.getItem('doneRecipes');
    const appAllDone = JSON.parse(appAllDoneString);
    const isThisRecipeDone = appAllDone.some((done) => done.id === id);
    if (isThisRecipeDone) setIsDone(true);
  } else localStorage.setItem('doneRecipes', JSON.stringify([]));
};
