const getFavoriteLocalStorage = (id, setAllFavorites, setIsFavorite) => {
  if (localStorage.getItem('favoriteRecipes') !== null) {
    const appFavoritesString = localStorage.getItem('favoriteRecipes');
    const appFavorites = JSON.parse(appFavoritesString);
    setAllFavorites(appFavorites);
    const isThisRecipeFavorite = appFavorites.some((favorite) => favorite.id === id);
    if (isThisRecipeFavorite) setIsFavorite(blackHeartIcon);
  } else localStorage.setItem('favoriteRecipes', JSON.stringify([]));
};

export default getFavoriteLocalStorage;
