import View from "./View.js";
import icons from "url:../../img/icons.svg";

class PreviewView extends View {
  _parentElement = "";

  _generateMarkup() {
    const { id, title, imageUrl, publisher, key } = this._data;
    const currURIHashID = window.location.hash.slice(1);
    return `
      <li class="preview">
        <a class="preview__link ${
          id === currURIHashID ? "preview__link--active" : ""
        }" href="#${id}">
          <figure class="preview__fig">
            <img src="${imageUrl}" alt="${title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${title}</h4>
            <p class="preview__publisher">${publisher}</p>            
            <div class="preview__user-generated ${key ? "" : "hidden"}">
              <svg>
              <use href="${icons}#icon-user"></use>
              </svg>
            </div>
          </div>
          
          
        </a>
      </li>
    `;
  }
}

export default new PreviewView();
