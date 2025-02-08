const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
  //Write your code here
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
        console.log( users );
        const user = users.filter(user => user.username === username);
        if (user.length>0) {
            return res.status(400).json({ message: "username already exists" });
        }
        users.push({ username, password });
        return res.status(200).json({ message: "user successfuly registered" });
    }else {
        return res.status(400).json({ message: "please provide username and password" });
    }
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    //Write your code here
    return res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    //Write your code here
    const isbn = req.params.isbn;
    const book = books[isbn];
    console.log(book);

    return res.send(JSON.stringify(book, null, 4));
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    //Write your code here
    const author = req.params.author;
    const booksArr = Object.keys(books);
    const key = booksArr.filter(key => books[key].author === author);
    console.log(books[key]);
    return res.send(JSON.stringify(books[key], null, 4));
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    //Write your code here
    const title = req.params.title;
    const booksArr = Object.keys(books);
    const key = booksArr.filter(key => books[key].title === title);
    return res.send(JSON.stringify(books[key], null, 4));
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    //Write your code here
    const isbn = req.params.isbn;
    const book = books[isbn];

    return res.send(JSON.stringify(book.reviews, null, 4));
});

module.exports.general = public_users;
