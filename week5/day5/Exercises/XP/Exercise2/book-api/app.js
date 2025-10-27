import express from 'express';

const app = express();
const PORT = 5000;

app.use(express.json());

const books = [
  { id: 1, title: '1984', author: 'George Orwell', published: 1949 },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', published: 1960 },
  { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', published: 1925 },
];



app.get('/api/books', (req, res) => {
  res.json(books);
});


app.get('/api/books/:bookId', (req, res) => {
  const book = books.find(book => book.id === parseInt(req.params.bookId));
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  res.json(book);
});


app.post('/api/books', (req, res) => {
  const { title, author, published } = req.body;
  const newBook = { id: books.length + 1, title, author, published };
  books.push(newBook);
  res.status(201).json(newBook);
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});