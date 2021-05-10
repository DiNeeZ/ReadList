export class Book {
  constructor(book) {
    const { title, subtitle, author_name: author, id } = book;
    const dt = new Date();

    this.title = title;
    this.subtitle = subtitle ? subtitle : '';
    this.author = author ? author.join(', ') : 'author unknown';
    this.id = id;
    this.isRead = false;
    this.date = dt.getDate() + '/' + (dt.getMonth() + 1) + '/' + dt.getFullYear();
    this.time = dt.getHours() + ':' + dt.getMinutes();
  }
}