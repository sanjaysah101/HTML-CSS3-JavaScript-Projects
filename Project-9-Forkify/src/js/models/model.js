import { API_URL, RES_PER_PAGE, KEY } from "../config";
import { AJAX } from "../helper";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async (recipeId) => {
  // This is not a pure function because it has the side effect of manipulating state variable
  try {
    const data = await AJAX(`${API_URL}${recipeId}?key=${KEY}`);

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

    // if we load new recipe it will always be loaded from scratch i.e. from API. we will use the data store in the bookmarks array in the state to basically mark any recipe that we load as bookmarked if it is already in the bookmarks array
    if (state.bookmarks.some((bookmark) => bookmark.id === recipeId))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (error) {
    throw error;
  }
};

export const loadSearchResults = async (query) => {
  try {
    state.search.query = query;
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
    state.search.results = data.data.recipes.map((rec) => {
      const { id, title, publisher, image_url: imageUrl } = rec;
      return {
        id,
        title,
        publisher,
        imageUrl,
      };
    });

    // Reset search page
    state.search.page = 1;
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

const persistBookmarks = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

export const addBookmark = (recipe) => {
  // Add bookmark
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmarks();
};

export const deleteBookmark = (recipeId) => {
  // Delete bookmark
  const index = state.bookmarks.findIndex((el) => el.id === recipeId);
  state.bookmarks.splice(index, 1);

  // Mark current recipe as not bookmarked
  if (recipeId === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmarks();
};

const init = () => {
  const storage = localStorage.getItem("bookmarks");
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();

const clearBookmarks = () => {
  localStorage.clear("bookmarks");
};

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter((entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
      .map((ing) => {
        const ingArr = ing[1].split(",").map((el) => el.trim());
        if (ingArr.length !== 3)
          throw new Error(
            "Wrong ingredient format! Please use the correct format :)"
          );

        const [quantity, unit, description] = ingArr;

        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};
