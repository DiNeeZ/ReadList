export class SearchBooks {
  $searchResult = document.querySelector('.search__results');

  constructor(state) {
    this.books = state.docs;
  }

  render() {
    this.$searchResult.innerHTML = this.books.reduce((acc, curr) => {
      return acc + `<li class='search__results-item' id=${curr.id}>${curr.title}</li>`;
    }, '');
  }

}