import React, { createContext, useState } from 'react';

export const FavoritesContext = createContext<{
  favorites: any[];
  addFavorite: (movie: any) => void;
  removeFavorite: (movieId: number) => void;
}>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {}
});

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<any[]>([]);

  const addFavorite = (movie: any) => setFavorites([...favorites, movie]);
  const removeFavorite = (movieId: number) => setFavorites(favorites.filter(m => m.id !== movieId));

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );

};
