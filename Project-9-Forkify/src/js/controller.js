import * as model from "./model";
import recipeView from "./views/recipeView";

// Add Polyfills for es6 features | so that most real old browser are still being supported our app
import "core-js/stable";
import "regenerator-runtime/runtime";

const recipeContainer = document.querySelector(".recipe");

//////////////////////////////////////////////////////////

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
    console.log(error);
  }
};

const init = () => {
  // A Pub/Sub Message Broker 
  recipeView.addHandlerRender(controlRecipes);
};

init();
