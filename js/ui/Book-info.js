const coverBook = require('../../images/plug-cover.jpg');

export class BookInfo {
  $bookInfoContent = document.querySelector('.book-info__content');

  constructor(book) {
    this.title = book.title;
    this.subtitle = book.subtitle;
    this.author = book.author_name;
    this.coverId = book.cover_i;
    this.year = book.first_publish_year;
    this.years = book.publish_year;
    this.languages = book.language;
  }

  static getImage(id, title, author, year) {
    const IMAGE_URL = 'http://covers.openlibrary.org/b/';
    const plugImage = `
    <img class='book__center-img' src=${coverBook} alt='book cover' />
    <div class='book__center-img-text cover-text'>
      <p class='cover-text__title'>${title}</p>
      <p class='cover-text__author'>${author ? author : 'author unknown'}</p>
      <p class='cover-text__year'>${year}</p>
    </div>
    `;
    const realImage = `<img class='book__center-img' src='${IMAGE_URL}id/${id}-L.jpg' alt='book cover' />`;

    return id ? realImage : plugImage;
  }

  render() {
    const publishYears = this.years ? this.years.join(', ') : '...'; 
    const languages = this.languages ? this.languages.join(', ') : '...'; 

    this.$bookInfoContent.innerHTML = `
    <div class='book__top'>
      <h2 class='book__title'>${this.title}</h2>
      <p class='book__subtitle'>${this.subtitle ? this.subtitle : ''}</p>
      <p class='book__author'>${this.author ? this.author : 'author unknown'}</p>
    </div>
    <div class='book__center'>
      <div class='book__center-wrap'>
        <div class='activity'></div>
        ${BookInfo.getImage(this.coverId, this.title, this.author, this.year)}
      </div>      
      <div class='book__center-text book-descr'>
        <p class='book-descr__years'><span>Years published:</span> ${publishYears}</p>
        <p class='book-descr__languages'><span>Languages avaible:</span> ${languages}</p>
      </div>
    </div>
    <div class='book__bottom'>
      <button class='book__bottom-btn'>Add Book To Read List</button>
    </div>
    `;

    const bookImage = this.$bookInfoContent.querySelector('.book__center-img')
    bookImage.addEventListener('load', (event) => {
      event.target.classList.add('load');
    });
  }
}
