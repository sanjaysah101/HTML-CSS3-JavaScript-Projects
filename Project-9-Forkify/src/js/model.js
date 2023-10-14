import { API_URL } from "./config";
import { getJSON } from "./helper";

export const state = {
  recipe: {},
};

export const loadRecipe = async (id) => {
  // This is not a pure function because it has the side effect of manipulating state variable
  try {
    const data = await getJSON(`${API_URL}/${id}`);
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      imageUrl: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (error) {
    console.log("error", error);
  }
};
