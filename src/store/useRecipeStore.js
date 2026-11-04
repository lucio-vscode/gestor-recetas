import { create } from "zustand";
import { persist } from "zustand/middleware";

const useRecipeStore = create(
  persist(
    (set) => ({
      favorites: [],
      myRecipes: [],

      toggleFavorite: (recipe) =>
        set((state) =>
          state.favorites.some((r) => r.id === recipe.id)
            ? { favorites: state.favorites.filter((r) => r.id !== recipe.id) }
            : { favorites: [...state.favorites, recipe] },
        ),

      addRecipe: (recipe) =>
        set((state) => ({
          myRecipes: [
            ...state.myRecipes,
            { ...recipe, id: `mia-${Date.now()}` },
          ],
        })),

      removeRecipe: (id) =>
        set((state) => ({
          myRecipes: state.myRecipes.filter((r) => r.id !== id),
        })),
    }),
    { name: "recipe-storage" },
  ),
);

export default useRecipeStore;
