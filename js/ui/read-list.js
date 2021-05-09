export class ReadList {
  $readList = document.querySelector('.read-list__items');

  constructor(book) {
    const { title, subtitle, author_name: author, id } = book;
    this.title = title;
    this.subtitle = subtitle ? subtitle : '';
    this.author = author ? author.join(', ') : 'author unknown';
    this.id = id;
    this.isRead = false;
  }

  static getReadListItem(book) {
    const bookItem = document.createElement('li');
    bookItem.classList.add('read-list__item');
    bookItem.innerHTML = `
      <h3>${book.title}</h3>
      <p>${book.subtitle}</p>
      <p>${book.author}</p>
    `;

    return bookItem;
  }

  showBook() {
    const book = {
      title: this.title,
      subtitle: this.subtitle,
      author: this.author,
      id: this.id,
      isRead: this.isRead
    }

    this.$readList.appendChild(ReadList.getReadListItem(book));

    return book;
  }
}
