export class ReadList {

  static renderReadList(books, el) {
    el.innerHTML = books.reduce((acc, book) => {
      return acc + ReadList.getReadListItem(book);
    }, '');
  }

  static getReadListItem(book) {

    const bookItem = `
      <li class='read-list__item list-item'>
        <h3 class='list-item__title'>${book.title}</h3>
        <p class='list-item__subtitle'>${book.subtitle}</p>
        <p class='list-item__author'>${book.author}</p>
        <p class='list-item__date'>Was added <span>${book.date} - ${book.time}</span></p>
        <div class='list-item__btn-group'>
          <a class='list-item__btn list-item__btn--mark-as-read'>Mark As Read</a>
          <a class='list-item__btn list-item__btn--remove' aria-label='remove book'></a>
        </div>
      </li>
    `;

    return bookItem;
  }

}
