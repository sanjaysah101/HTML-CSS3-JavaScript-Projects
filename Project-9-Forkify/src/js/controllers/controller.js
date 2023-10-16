// Add Polyfills for es6 features | so that most real old browser are still being supported our app
import "core-js/stable";
import "regenerator-runtime/runtime";

import * as model from "../models/model";
import recipeView from "../views/recipeView";
import searchView from "../views/searchView";
import resultsView from "../views/resultsView";
import paginationView from "../views/paginationView";

// Enable hot reload from parcel
if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async () => {
  // SUBSCRIBER function
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 1) Loading Recipe
    await model.loadRecipe(id);

    // 2) Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearchResults = async () => {
  try {
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    resultsView.renderSpinner();

    // 2) Load Search Results
    await model.loadSearchResults(query);

    // 3) Render results
    resultsView.render(model.getSearchResultsPage());

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (error) {
    recipeView.renderError();
  }
};

const controlPagination = (goToPage) => {
  // 1) Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2) Render NEW pagination buttons
  paginationView.render(model.state.search);
};

const init = () => {
  // A Pub/Sub Message Broker
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

init();
