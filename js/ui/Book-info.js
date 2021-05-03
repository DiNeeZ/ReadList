export class BookInfo {
  $bookInfoContent = document.querySelector('.book-info__content');

  constructor(book) {
    this.title = book.title;
    this.subtitle = book.subtitle;
    this.author = book.author_name;
    this.coverId = book.cover_i;
  }

  static getImageURL(id) {
    const IMAGE_URL = 'http://covers.openlibrary.org/b/';
    let cover = id ? cover = id : false;

    let imageURL = cover ? `${IMAGE_URL}id/${cover}-L.jpg` : `https://images-na.ssl-images-amazon.com/images/I/615DhAjN7sL.jpg`;
    return imageURL;
  }

  render() {
    BookInfo.getImageURL();
    this.$bookInfoContent.innerHTML = `
    <h2>${this.title}</h2>
    <p>${this.subtitle ? this.subtitle : ''}</p>
    <p>${this.author ? this.author : 'author unknown'}</p>
    <img src=${BookInfo.getImageURL(this.coverId)} alt='book cover'></img>
    `;

  }
}