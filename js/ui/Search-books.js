export class SearchBooks {
  $searchResult = document.querySelector('.search__results');
  $shownBooks = document.querySelector('.search-info__shown-books');
  $totalBooks = document.querySelector('.search-info__total-books');

  constructor(state, moreBooks) {
    this.books = state.booksFound;
    this.numFound = state.numFound;
    this.shownBooks = state.pageNum >= state.totalPages ? state.numFound : state.pageNum * 100;
    this.moreBooks = moreBooks;
  }

  static getSearchResultMurkup(books) {
    return books.reduce((acc, book) => {
      return acc + `
      <li class='search__results-item results-item' id=${book.id}>
        <h3 class='results-item__title'>${book.title}</h3>
        <p class='results-item__author'>${book.author_name ? book.author_name : 'author unknown'}</p>
      </li>`;
    }, '');
  }

  renderSearchResult() {
    this.$searchResult.innerHTML = SearchBooks.getSearchResultMurkup(this.books);
    this.$shownBooks.innerText = this.shownBooks;
    this.$totalBooks.innerText = this.numFound;
  }

  addToResult() {
    const newBooks = SearchBooks.getSearchResultMurkup(this.moreBooks);
    this.$searchResult.insertAdjacentHTML('beforeend', newBooks);
    this.$shownBooks.innerText = this.shownBooks;
  }
}