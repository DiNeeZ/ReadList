import { SearchBooks } from './ui/search-books';
import { BookInfo } from './ui/book-info';
import { ReadList } from './ui/read-list';
import { BookStorage } from './services/storage';
import { Book } from './book';
import { Error } from './ui/errors';

export class App {
    state = {
        booksFound: [],
        storedBooks: [],
        numFound: null,
        pageNum: null,
        totalPages: null,
        totalBooks: null
    };
    currentBook;
    currentQuerry;

    constructor(api) {

        const searchField = document.querySelector('.search__field');
        const scrollBlock = document.querySelector('.search__results-wrap');
        const searchResult = document.querySelector('.search__results');
        const loaderSpinner = document.querySelector('.search__results-loader-spinner');
        const loaderWave = document.querySelector('.search__loader-wave');
        const bookContainer = document.querySelector('.book');
        const readList = document.querySelector('.read-list__items');

        //Init read list from local storage
        document.addEventListener('DOMContentLoaded', () => {
            this.state.storedBooks = BookStorage.getBooks();
            ReadList.renderReadList(this.state.storedBooks, readList);
        });

        //Render results list on user querry 
        searchField.addEventListener('keyup', this.debounce((event) => {
            if (event.target.value.length <= 2) return; //User querry must be at least 3 symbols
            event.target.blur();

            this.currentBook = null;
            this.currentQuerry = searchField.value;
            this.state.pageNum = 1;
            this.showLoaderSpinner(loaderSpinner, searchResult);

            api.search(this.currentQuerry, this.state.pageNum).then(response => {
                response.docs.forEach(book => { book.id = book.key.split('/').pop(); });

                this.state.booksFound = response.docs;
                this.state.numFound = response.numFound;
                this.state.totalPages = Math.ceil(response.numFound / 100);

                if (this.state.numFound > 0) {
                    new SearchBooks(this.state).renderSearchResult();
                } else {
                    Error.showEmptyResultMsg(searchResult);
                }

                this.hideLoaderSpinner(loaderSpinner, searchResult);
            }).catch(err => {
                Error.showApiErrorMsg(err, searchResult);
                this.hideLoaderSpinner(loaderSpinner, searchResult);
            });
        }, 1000));

        //Show book info by click on search result item
        searchResult.addEventListener('click', (event) => {
            if (event.target.parentElement.tagName !== 'LI') return;

            const el = event.target.parentElement;
            const list = event.currentTarget;
            const currentBook = this.state.booksFound.find(item => item.id === el.id);
            el.classList.add('active');
            if (this.currentBook) {
                list.querySelector('#' + this.currentBook.id).classList.remove('active');
            }

            this.currentBook = currentBook;
            new BookInfo(currentBook, this.state.storedBooks).render();
        });

        //Add books to search results on scroll
        scrollBlock.addEventListener('scroll', this.debounce(() => {
            const { scrollTop, scrollHeight, clientHeight } = scrollBlock;

            if ((scrollTop + clientHeight >= scrollHeight) &&
                this.state.pageNum < this.state.totalPages) {
                this.state.pageNum++;
                loaderWave.classList.add('show');
                api.search(this.currentQuerry, this.state.pageNum).then(response => {
                    response.docs.forEach(book => { book.id = book.key.split('/').pop(); });
                    this.state.booksFound = [...this.state.booksFound, ...response.docs];

                    new SearchBooks(this.state, response.docs).addToResult();
                    loaderWave.classList.remove('show');
                });
            }
        }, 500));

        //Add book to read list
        bookContainer.addEventListener('click', (event) => {
            if (!event.target.classList.contains('book__bottom-btn')) return;
            const book = new Book(this.currentBook);
            this.state.storedBooks.unshift(book);
            ReadList.renderReadList(this.state.storedBooks, readList);
            BookStorage.addBooksToStorage(this.state.storedBooks);
        });

        //Mark a book as read in read list and delete book
        readList.addEventListener('click', (event) => {
            const bookId = event.target.parentElement.parentElement.id;

            if (event.target.classList.contains('list-item__btn--mark-as-read')) {
                ReadList.markAsRead(bookId, this.state.storedBooks, readList);
                BookStorage.addBooksToStorage(this.state.storedBooks);
            } else if (event.target.classList.contains('list-item__btn--remove')) {

                ReadList.removeBookFromList(bookId, this.state.storedBooks, readList);
                BookStorage.addBooksToStorage(this.state.storedBooks);

            } else {
                return;
            }
        });

    }

    debounce(fn, ms) {
        let timeout;
        return function () {
            const fnCall = () => { fn.apply(this, arguments) }
            clearTimeout(timeout);
            timeout = setTimeout(fnCall, ms);
        };
    }

    showLoaderSpinner(loader, el) {
        loader.style.zIndex = 'initial';
        loader.style.opacity = '1';
        el.parentElement.style.overflowY = 'hidden';
        el.parentElement.scrollTop = 0;
    }

    hideLoaderSpinner(loader, el) {
        loader.style.zIndex = '-10';
        loader.style.opacity = '0';
        el.parentElement.style.overflowY = 'auto';
    }

}