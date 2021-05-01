export class BookInfo {
  $bookInfo = document.querySelector('.book-info');

  constructor(book) {
    this.title = book.title;
    this.subtitle = book.subtitle;
    this.author = book.author_name;
  }

  render() {
    this.$bookInfo.innerHTML = `
    <h2>${this.title}</h2>
    <p>${this.subtitle ? this.subtitle : ''}</p>
    <p>${this.author ? this.author : 'author unknown'}</p>
    `;
  }
}