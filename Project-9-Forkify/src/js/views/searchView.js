class SearchView {
  #parentElement = document.querySelector(".search");

  getQuery() {
    const query = this.#parentElement.querySelector(".search__field").value;
    this.#clearInput();
    return query;
  }

  addHandlerSearch(handler) {
    this.#parentElement.addEventListener("submit", (e) => {
      e.preventDefault();
      handler();
    });
  }

  #clearInput() {
    this.#parentElement.querySelector(".search__field").value = "";
  }
}

export default new SearchView();
