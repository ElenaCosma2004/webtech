const express = require("express");
const Book = require("./Book");
const app = express();
const port = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const bookRouter = express.Router();
app.use("/api", bookRouter);

app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

app.listen(port, () => {
  console.log("Running on the port " + port);
});

let books = [
  new Book(1, "Dune", "sf", "Frank Herbert"),
  new Book(2, "Robinson Crusoe", "adventure", "Daniel Defoe"),
  new Book(3, "Foundation", "sf", "Asimov"),
];
bookRouter
  .route("/books")
  .get((req, res) => {
    let filteredBooks = [];
    if (req.query.genre) {
      filteredBooks = books.filter((x) => x.genre == req.query.genre);
    } else {
      filteredBooks = books;
    }
    res.json(filteredBooks);
  })
  .post((req, res) => {
    // let newBook = new Book(
    //   req.body.id,
    //   req.body.name,
    //   req.body.genre,
    //   req.body.author
    // );

    //validare

    const { id, name, genre, author } = req.body;
    if (!id || !name || !genre || !author) {
      return res.status(400).json({
        error: "All fields are required: id, name, genre, author",
      });
    }
    if (typeof id !== "number") {
      return res.status(400).json({
        error: "id must be a number",
      });
    }
    if (books.some((book) => book.id === id)) {
      return res.status(400).json({
        error: "A book with this id already exists",
      });
    }

    const newBook = new Book(id, name, genre, author);

    books.push(newBook);
    console.log(books);
    return res.json(newBook);
  });
app.get("/books/sorted", (req, res) => {
  let sortedBooks = [...books].sort((a, b) => a.name.localeCompare(b.name));
  res.json(sortedBooks);
});

bookRouter
  .route("/books/:bookId")
  .put((req, res) => {
    bookModif = books.find((b) => b.id == req.params.bookId);
    bookModif.name = req.body.name;
    bookModif.genre = req.body.genre;
    bookModif.author = req.body.author;
    res.json(bookModif);
  })
  .delete((req, res) => {
    const bookId = Number(req.params.bookId);
    const index = books.findIndex((b) => b.id === bookId);
    if (index === -1) {
      return res.status(404).json({ error: "Book not found" });
    }
    const deletedBook = books.splice(index, 1);
    res.json({
      message: `Book with id ${bookId} deleted successfully`,
      deletedBook: deletedBook,
    });
  });
