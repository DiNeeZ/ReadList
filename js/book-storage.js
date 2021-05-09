export class BookStorage {
  static addBook(books) {
    localStorage.setItem('readList', JSON.stringify(books));
  }
}