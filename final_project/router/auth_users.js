const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => { //returns boolean
  //write code to check is the username is valid
  const user = users.find((user) => user.username === username);
  return user != undefined;
}

const authenticatedUser = (username, password) => { //returns boolean
  
  const user = users.find((user) => user.username === username && user.password === password);
  return user != undefined;
}

//only registered users can login
regd_users.post("/login", (req, res) => {
  //Write your code here
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "username and password are required" });
  }

  if (!isValid(username)) {
    return res.status(400).json({ message: "Invalid username or password" });
  }

 
  if (!authenticatedUser(username, password)) {
    return res.status(400).json({ message: "Invalid username or password" });
  }


  const token = jwt.sign({ username, password }, "access", { expiresIn: "1h" });

  req.session.authorization = { accessToken: token };

  return res.status(200).json({ token: token });
  
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  
  const { isbn } = req.params;
  const { review } = req.body;

  const book = books[isbn];
  if (book) {
    book.reviews[req.user.username] = review;
    return res.status(200).json({ message: "Review added successfully" });
  }

  return res.status(404).json({message:"book not found"});

  
});

// delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {

  const { isbn } = req.params;

  const book = books[isbn];

  if (book) {
    delete book.reviews[req.user.username];
    return res.status(200).json({ message: `Review deleted successfully for ${req.user.username}` });
  }
  return res.status(404).json({message:"book not found"});
})

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
