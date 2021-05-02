export class SearchBooks {
  $searchResult = document.querySelector('.search__results');
  $shownBooks = document.querySelector('.search-info__shown-books');
  $totalBooks = document.querySelector('.search-info__total-books');

  constructor(state) {
    this.books = state.booksFound;
    this.total = state.totalPages;
  }

  static getHTML(books) {
    return books.reduce((acc, book) => {
      return acc + `<li class='search__results-item' id=${book.id}>${book.title}</li>`;
    }, '');
  }

  renderSearchResult() {
    this.$searchResult.innerHTML = SearchBooks.getHTML(this.books);
    this.$totalBooks.innerText = this.total;
  }

  addToResult() {
    const newBooks = SearchBooks.getHTML(this.books);
    this.$searchResult.insertAdjacentHTML('beforeend', newBooks);
  }
}