const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "username and password are required" });
  }

  if (isValid(username)) {
    return res.status(400).json({ message: "username already exists" });
  }

  users.push({ username, password });



  return res.status(200).json({ message: "User created successfully" });
});

// Get the book list available in the shop
public_users.get('/', async function (req, res) {

  return res.json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {

  const { isbn } = req.params;
  const book = books[isbn];
  if (book) {
    return res.json(book);
  }
  return res.status(404).json({ message: "Book not found" });


});

// Get book details based on author
public_users.get('/author/:author', async function (req, res) {

  const { author } = req.params;
  const _books = Object.values(books).filter((book) => book.author.toLowerCase() === author.toLowerCase());
  if (_books.length > 0) {
    return res.json(_books);
  }
  return res.status(404).json({ message: "Book not found" });
});



// Get all books based on title
public_users.get('/title/:title', async function (req, res) {

  const { title } = req.params;
  const book = Object.values(books).find((book) => book.title.toLowerCase() === title.toLowerCase());
  if (book) {
    return res.json(book);
  }
  return res.status(404).json({ message: "Book not found" });

});

//  Get book review
public_users.get('/review/:isbn', async function (req, res) {

  const { isbn } = req.params;
  const book = books[isbn];
  if (book) {
    return res.json(book.reviews);
  }
  return res.status(404).json({ message: "Book not found" });
});


module.exports.general = public_users;
