import { SearchBooks } from './UI/Search-books';
import { BookInfo } from './UI/Book-info'

export class App {
    state = [];
    prevBook;

    constructor(api) {

        const searchField = document.querySelector('.search__field');
        const searchResult = document.querySelector('.search__results');
        const loader = document.querySelector('.search__results-loader');

        searchField.addEventListener('keyup', (event) => {
            if (event.code === 'Enter') {
                this.prevBook = null;

                this.showLoading(loader, searchResult);
                api.search(searchField.value).then(response => {

                    response.docs.forEach(book => {
                        book.id = book.key.split('/').pop();
                    });

                    this.state = response;
                    new SearchBooks(this.state).render();
                    this.hideLoading(loader, searchResult);
                });
            }
        });

        searchResult.addEventListener('click', (event) => {
            if (event.target.tagName !== 'LI') return;
            const el = event.target;
            const list = event.currentTarget;
            const currentBook = this.state.docs.find(item => item.id === el.id);

            el.classList.add('active');
            if (this.prevBook) {
                list.querySelector('#' + this.prevBook.id).classList.remove('active');
            }

            this.prevBook = currentBook;

            new BookInfo(currentBook).render();
        });
    }

    showLoading(lds, result) {
        lds.style.zIndex = 'initial';
        lds.style.opacity = '1';
        result.parentElement.style.overflowY = 'hidden';
        result.parentElement.scrollTop = 0;
    }

    hideLoading(lds, result) {
        lds.style.zIndex = '-10';
        lds.style.opacity = '0';
        result.parentElement.style.overflowY = 'auto';
    }
}