export class BookStorage {
  static getBooks() {
    let books;
    if (localStorage.getItem('readList') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('readList'));
    }

    return books;
  }

  static addBook(books) {
    localStorage.setItem('readList', JSON.stringify(books));
  }
}