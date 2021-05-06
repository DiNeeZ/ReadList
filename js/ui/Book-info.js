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

    let imageURL = cover ? `${IMAGE_URL}id/${cover}-L.jpg` :
      `https://images-na.ssl-images-amazon.com/images/I/615DhAjN7sL.jpg`;
    return imageURL;
  }

  render() {
    this.$bookInfoContent.innerHTML = `
    <div class='book__top'>
      <h2 class='book__title'>${this.title}</h2>
      <p class='book__subtitle'>${this.subtitle ? this.subtitle : ''}</p>
      <p class='book__author'>${this.author ? this.author : 'author unknown'}</p>
    </div>
    <div class='book__center'>
      <img class='book__center-cover' src=${BookInfo.getImageURL(this.coverId)} alt='book cover'></img>
      <p class='book__center-text'>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
        Placeat deserunt optio cum reiciendis, quaerat ad illo tenetur, animi voluptate consequuntur alias non? 
        Distinctio officia debitis eligendi aut minus nihil alias.
      </p>
    </div>
    <div class='book__bottom'>
      <button>Add Book To Read List</button>
    </div>
    `;

  }
}
