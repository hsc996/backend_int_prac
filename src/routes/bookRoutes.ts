import { Router, Request, Response } from "express";

const router = Router();

interface Book {
    id: number;
    title: string;
    author: string;
}

const books: Book[] = [
    { id: 1, title: "1984", author: "George Orwell" },
    { id: 2, title: "Brave New World", author: "Aldous Huxley" },
    { id: 3, title: "Lolita", author: "Vladimir Nabokov" }
];

// Get all books
router.get("/books", (req: Request, res: Response) => {
    res.json(books);
});


// Get book by ID
router.get("/books/:id", (req: Request, res: Response) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);
    if (book){
        res.json(book)
    } else {
        res.status(400).json({ error: "Book not found."});
    }
});


// Create a new book
router.post("/newbook", (req: Request, res: Response) => {
    const newBook: Book = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author
    };
    books.push(newBook);
    res.status(200).json(newBook);
});


// Update book by ID
router.patch("updatebook/:id", (req: Request, res: Response) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);

    if (bookIndex !== - 1){
        books[bookIndex] = {
            id: bookId,
            title: req.body.title,
            author: req.body.author
        };
        res.json(books[bookIndex]);
    } else {
        res.json(404).json({ error: "Book not found."});
    }
});

// Delete book by ID
