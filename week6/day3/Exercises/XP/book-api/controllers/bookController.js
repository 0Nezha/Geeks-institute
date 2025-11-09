let books = require("../models/bookModel");

// READ ALL
exports.getAllBooks = (req, res) => {
  res.status(200).json(books);
};

// READ ONE
exports.getBookById = (req, res) => {
  const bookId = parseInt(req.params.bookId);
  const book = books.find((b) => b.id === bookId);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.status(200).json(book);
};

// CREATE
exports.createBook = (req, res) => {
  const { title, author, publishedYear } = req.body;

  if (!title || !author || !publishedYear) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newBook = {
    id: books.length + 1,
    title,
    author,
    publishedYear,
  };

  books.push(newBook);
  res.status(201).json(newBook);
};

// UPDATE
exports.updateBook = (req, res) => {
  const bookId = parseInt(req.params.bookId);
  const { title, author, publishedYear } = req.body;

  const book = books.find((b) => b.id === bookId);
  if (!book) return res.status(404).json({ message: "Book not found" });

  book.title = title || book.title;
  book.author = author || book.author;
  book.publishedYear = publishedYear || book.publishedYear;

  res.status(200).json(book);
};

// DELETE
exports.deleteBook = (req, res) => {
  const bookId = parseInt(req.params.bookId);
  const index = books.findIndex((b) => b.id === bookId);

  if (index === -1) return res.status(404).json({ message: "Book not found" });

  books.splice(index, 1);
  res.status(200).json({ message: "Book deleted successfully" });
};
