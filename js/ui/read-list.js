export class ReadList {

  static renderReadList(books, el) {
    el.innerHTML = books.reduce((acc, book) => {
      return acc + ReadList.getReadListItem(book);
    }, '');
  }

  static markAsRead(id, storedBooks, el) {

    const idx = storedBooks.findIndex(book => book.id === id);
    storedBooks[idx].isRead = true;
    storedBooks.push(...storedBooks.splice(idx, 1));

    ReadList.renderReadList(storedBooks, el);
  }

  static removeBookFromList(id, storedBooks, el) {

    const idx = storedBooks.findIndex(book => book.id === id);
    storedBooks.splice(idx, 1);

    ReadList.renderReadList(storedBooks, el);
  }

  static getReadListItem(book) {

    const unread = `
      <li class='read-list__item list-item' id=${book.id}>
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

    const read = `
    <li class='read-list__item list-item list-item--read' id=${book.id}>
      <h3 class='list-item__title'>${book.title}</h3>
      <p class='list-item__subtitle'>${book.subtitle}</p>
      <p class='list-item__author'>${book.author}</p>
      <p class='list-item__date'>Was added <span>${book.date} - ${book.time}</span></p>
      <div class='list-item__btn-group'>
        <a class='list-item__btn list-item__btn--remove' aria-label='remove book'></a>
      </div>
    </li>
    `;

    return book.isRead ? read : unread;;
  }

}
