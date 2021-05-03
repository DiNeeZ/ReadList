import { SearchBooks } from './ui/Search-books';
import { BookInfo } from './ui/Book-info'

export class App {
    state = {
        booksFound: [],
        numFound: null,
        pageNum: null,
        totalPages: null,
        totalBooks: null
    };
    prevBook;
    currentQuerry;

    constructor(api) {

        const searchField = document.querySelector('.search__field');
        const scrollBlock = document.querySelector('.search__results-wrap');
        const searchResult = document.querySelector('.search__results');
        const loaderSpinner = document.querySelector('.search__results-loader-spinner');
        const loaderWave = document.querySelector('.search__loader-wave');

        //Render results list on user querry 
        searchField.addEventListener('keyup', this.debounce((event) => {
            if (event.target.value.length <= 2) return; //User querry must be at least 3 symbols
            event.target.blur();

            this.prevBook = null;
            this.currentQuerry = searchField.value;
            this.state.pageNum = 1;
            this.showLoaderSpinner(loaderSpinner, searchResult);

            api.search(this.currentQuerry, this.state.pageNum).then(response => {
                response.docs.forEach(book => { book.id = book.key.split('/').pop(); });

                this.state.booksFound = response.docs;
                this.state.numFound = response.numFound;
                this.state.totalPages = Math.ceil(response.numFound / 100);
                new SearchBooks(this.state).renderSearchResult();
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
            if (this.prevBook) {
                list.querySelector('#' + this.prevBook.id).classList.remove('active');
            }

            this.prevBook = currentBook;
            new BookInfo(currentBook).render();
        });

        //Add books to search result on scroll
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