import { SearchBooks } from './UI/Search-books';
import { BookInfo } from './UI/Book-info'

export class App {
    state = {
        booksFound: [],
        pageNum: null,
        totalPages: null,
        totalBooks: null
    };
    prevBook;
    searchBooks;
    currentQuerry;

    constructor(api) {

        const searchField = document.querySelector('.search__field');
        const scrollBlock = document.querySelector('.search__results-wrap');
        const searchResult = document.querySelector('.search__results');
        const loader = document.querySelector('.search__results-loader');

        //Render results list on user querry 
        searchField.addEventListener('keyup', this.debounce((event) => {
            if (event.target.value.length <= 2) return; //User querry must be at least 3 symbols

            this.prevBook = null;
            this.currentQuerry = searchField.value;
            this.state.pageNum = 1;
            this.showLoading(loader, searchResult);

            api.search(this.currentQuerry, this.state.pageNum).then(response => {
                response.docs.forEach(book => { book.id = book.key.split('/').pop(); });

                this.state.booksFound = response.docs;
                this.state.totalPages = Math.ceil(response.numFound / 100);
                this.searchBooks = new SearchBooks(this.state);
                this.searchBooks.renderSearchResult();
                this.hideLoading(loader, searchResult);
            });
        }, 1000));

        searchResult.addEventListener('click', (event) => {
            if (event.target.tagName !== 'LI') return;

            const el = event.target;
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

            if ((scrollTop + clientHeight >= scrollHeight - 50) && this.hasMoreBooks(this.state.pageNum, this.state.totalPages)) {
                this.state.pageNum++;

                api.search(this.currentQuerry, this.state.pageNum).then(response => {
                    response.docs.forEach(book => { book.id = book.key.split('/').pop(); });
                    this.state.booksFound = [...this.state.booksFound, ...response.docs];

                    this.searchBooks.addToResult();
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

    showLoading(loader, el) {
        loader.style.zIndex = 'initial';
        loader.style.opacity = '1';
        el.parentElement.style.overflowY = 'hidden';
        el.parentElement.scrollTop = 0;
    }

    hideLoading(loader, el) {
        loader.style.zIndex = '-10';
        loader.style.opacity = '0';
        el.parentElement.style.overflowY = 'auto';
    }

    hasMoreBooks(pageNum, totalPages) {
        return totalPages === 0 || pageNum < totalPages;
    }
}