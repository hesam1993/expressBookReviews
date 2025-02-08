const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => { //returns boolean
    //write code to check is the username is valid
}

const authenticatedUser = (username, password) => { //returns boolean
    if (username, password) {
        console.log( users );
        const user = users.filter(user => user.username === username && user.password === password);
        return user.length > 0 ? true : false;
    } else {
        return false;
    }
    //write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req, res) => {
    //Write your code here
    const username = req.body.username;
    const password = req.body.password;
    if( username && password ){
        if (authenticatedUser(username, password)) {
            let accessToken = jwt.sign( {
                data: password,
            }, 'fingerprint_customer', {expiresIn: 600*600} );
            console.log( accessToken );
            req.session.authorization = {
                accessToken, username
            }
            return res.status(200).json({ message: "Loged in successfuly" });
        } else {
            return res.status(400).json( {message: 'not authorized user'} );
        }
    } else {
        return res.status(400).json( {message: 'please provide username and password'} );
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const book = books[isbn];
    const username = req.session.authorization.username;

    const review = req.query.review;
    book.reviews[username] = review;

    return res.status(200).json({ message: "new review is added" });
});
// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const book = books[isbn];
    const username = req.session.authorization.username;

    const review = req.query.review;
    delete book.reviews[username];

    return res.status(200).json({ message: "the review is deleted" });
});
module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
