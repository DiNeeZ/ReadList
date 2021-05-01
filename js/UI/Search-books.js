export class SearchBooks {
  $searchResult = document.querySelector('.search__results');
  $shownBooks = document.querySelector('.search-info__shown-books');
  $totalBooks = document.querySelector('.search-info__total-books');

  constructor(state) {
    this.books = state.docs;
    this.total = state.numFound;
    this.start = state.start;
  }

  render() {
    this.$searchResult.innerHTML = this.books.reduce((acc, curr) => {
      return acc + `<li class='search__results-item' id=${curr.id}>${curr.title}</li>`;
    }, '');
    this.$totalBooks.innerText = this.total;
    console.log(this.start);
  }


}