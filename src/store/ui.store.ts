import { create } from "zustand";

type UIStore = {
  isCreateRecipeModalOpen: boolean;

  openCreateRecipe: () => void;
  closeCreateRecipe: () => void;
};

export const useUIStore = create<UIStore>((set) => ({
  isCreateRecipeModalOpen: false,

  openCreateRecipe: () =>
    set({
      isCreateRecipeModalOpen: true,
    }),

  closeCreateRecipe: () =>
    set({
      isCreateRecipeModalOpen: false,
    }),
}));