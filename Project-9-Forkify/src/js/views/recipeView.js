import { Fraction } from "fractional";

// import icons from "../img/icons.svg"; //parcel v.1
import icons from "url:../../img/icons.svg"; //parcel v.2f
import View from "./View";

class RecipeView extends View {
  _parentElement = document.querySelector(".recipe");
  _errorMessage = "No recipes found for your query. Please try again!";
  _message = "";

  // We are using PUBLISHER-SUBSCRIBER PATTERN.
  // PUbLISHER that knows when to react. components that create and send messages
  // SUBSCRIBER that wants to react. Components that receive and consume messages

  addHandlerRender(handler) {
    // This function act as a PUBLISHER who listens for events, and receives controlRecipes from controller as callback function
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  addHandlerUpdateServing(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn--tiny");
      if (!btn) return;
      const { updateTo } = btn.dataset;
      +updateTo && handler(+updateTo);
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn--bookmark");
      if (!btn) return;
      handler();
    });
  }

  _generateMarkup() {
    const {
      imageUrl,
      title,
      cookingTime,
      servings,
      ingredients,
      publisher,
      sourceUrl,
      key, //FIXME: key is not finding
    } = this._data;

    return `
      <figure class="recipe__fig">
        <img src="${imageUrl}" alt="${title}" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${cookingTime}</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${servings}</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--increase-servings" data-update-to="${
              servings - 1
            }">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--increase-servings" data-update-to="${
              servings + 1
            }">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated ${key ? "" : "hidden"}">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round btn--bookmark">
          <svg class="">
            <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? "-fill" : ""
    }"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${ingredients.map(this.#generateMarkupIngredient).join("")}         
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${publisher}</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `;
  }

  #generateMarkupIngredient(ingredient) {
    const { quantity, unit, description } = ingredient;
    return `
        <li class="recipe__ingredient">
            <svg class="recipe__icon">
            <use href="${icons}#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${
              quantity ? new Fraction(quantity).toString() : ""
            }</div>
            <div class="recipe__description">
            <span class="recipe__unit">${unit}</span>
            ${description}
            </div>
        </li>
    `;
  }
}

export default new RecipeView();
