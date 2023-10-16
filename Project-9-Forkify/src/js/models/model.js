import { API_URL, RES_PER_PAGE } from "../config";
import { getJSON } from "../helper";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
};

export const loadRecipe = async (recipeId) => {
  // This is not a pure function because it has the side effect of manipulating state variable
  try {
    const data = await getJSON(`${API_URL}${recipeId}`);

    const {
      data: {
        recipe: {
          id,
          title,
          publisher,
          source_url: sourceUrl,
          image_url: imageUrl,
          servings,
          cooking_time: cookingTime,
          ingredients,
        },
      },
    } = data;

    state.recipe = {
      id,
      title,
      publisher,
      sourceUrl,
      imageUrl,
      servings,
      cookingTime,
      ingredients,
    };
  } catch (error) {
    throw error;
  }
};

export const loadSearchResults = async (query) => {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map((rec) => {
      const { id, title, publisher, image_url: imageUrl } = rec;
      return {
        id,
        title,
        publisher,
        imageUrl,
      };
    });
  } catch (error) {
    throw error;
  }
};

export const getSearchResultsPage = (page = state.search.page) => {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

export const updateServings = (newServings) => {
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    // newQt = oldQt * newServings / oldServings ====>>> 2 * 8 / 4 = 4
  });

  state.recipe.servings = newServings;
};
