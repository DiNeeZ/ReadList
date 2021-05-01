export class Api {

    async search(q) {
        const API_URL = `http://openlibrary.org/search.json?q=${q}&page=2`;

        const response = await fetch(API_URL);
        return response.json();
    }
}
