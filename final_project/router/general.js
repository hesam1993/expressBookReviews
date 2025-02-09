const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const axios = require('axios');
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
public_users.get('/', async function (req, res) {
    try {
        const response = await axios.get('URL_TO_GET_BOOKS');
        const books = response.data;
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Error fetching books", error: error.message });
    }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
    const isbn = req.params.isbn;
    try {
        const response = await axios.get(`URL_TO_GET_BOOK_BY_ISBN/${isbn}`);
        const book = response.data;
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: "Error fetching book details", error: error.message });
    }
});

// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
    const author = req.params.author;
    try {
        const response = await axios.get(`URL_TO_GET_BOOKS_BY_AUTHOR/${author}`);
        const booksByAuthor = response.data;
        res.status(200).json(booksByAuthor);
    } catch (error) {
        res.status(500).json({ message: "Error fetching books by author", error: error.message });
    }
});

// Get all books based on title
public_users.get('/title/:title', async function (req, res) {
    const title = req.params.title;
    try {
        const response = await axios.get(`URL_TO_GET_BOOKS_BY_TITLE/${title}`);
        const booksByTitle = response.data;
        res.status(200).json(booksByTitle);
    } catch (error) {
        res.status(500).json({ message: "Error fetching books by title", error: error.message });
    }
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    //Write your code here
    const isbn = req.params.isbn;
    const book = books[isbn];

    return res.send(JSON.stringify(book.reviews, null, 4));
});

module.exports.general = public_users;
