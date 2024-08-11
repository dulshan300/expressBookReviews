const { default: axios } = require("axios");

// get all the books
const base_url = "http://localhost:5000";

// get books
async function getBooks() {
    console.log("Fetching books...");

    const books = await axios.get(`${base_url}`);
    console.log(books.data);
}

// get books by isbs
async function getBooksByIsbn() {
    console.log("Fetching books by isbn...");
    const books = await axios.get(`${base_url}/isbn/2`);
    console.log(books.data);
}


// get books by author
async function getBooksByAuthor() {
    console.log("Fetching books by isbn...");
    const books = await axios.get(`${base_url}/author/Unknown`);
    console.log(books.data);
}

// get books by title
async function getBooksByTitle() {
    console.log("Fetching books by isbn...");
    const books = await axios.get(`${base_url}/title/The Epic Of Gilgamesh`);
    console.log(books.data);
}


(async () => {
    await getBooks();
    await getBooksByIsbn();
    await getBooksByAuthor();
    await getBooksByTitle();
})();


