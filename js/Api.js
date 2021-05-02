export class Api {

    async search(q, pageNum) {
        const API_URL = `http://openlibrary.org/search.json?q=${q}&page=${pageNum}`;

        const response = await fetch(API_URL);
        return response.json();
    }
}
