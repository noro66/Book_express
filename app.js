const  express = require('express');
const Joi = require("joi");



    const books = [
    {
        "id": 1,
        "title": "To Kill a Mockingbird",
        "author": "Harper Lee",
        "published_year": 1960,
        "genres": ["Fiction", "Classic", "Literature"],
        "pages": 281,
        "publisher": "J.B. Lippincott & Co.",
        "isbn": "978-0-06-112008-4",
        "availability": true
    },
    {
        "id": 2,
        "title": "1984",
        "author": "George Orwell",
        "published_year": 1949,
        "genres": ["Dystopian", "Science Fiction", "Political Fiction"],
        "pages": 328,
        "publisher": "Secker & Warburg",
        "isbn": "978-0-452-28423-4",
        "availability": false
    },
    {
        "id": 3,
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "published_year": 1925,
        "genres": ["Fiction", "Classic", "Literature"],
        "pages": 180,
        "publisher": "Charles Scribner's Sons",
        "isbn": "978-0-7432-7356-5",
        "availability": true
    },
    {
        "id": 4,
        "title": "The Catcher in the Rye",
        "author": "J.D. Salinger",
        "published_year": 1951,
        "genres": ["Fiction", "Classic", "Young Adult"],
        "pages": 214,
        "publisher": "Little, Brown and Company",
        "isbn": "978-0-316-76948-0",
        "availability": true
    },
    {
        "id": 5,
        "title": "Moby-Dick",
        "author": "Herman Melville",
        "published_year": 1851,
        "genres": ["Adventure", "Classic", "Literature"],
        "pages": 635,
        "publisher": "Harper & Brothers",
        "isbn": "978-0-14-243724-7",
        "availability": false
    }
]

//display all books
const app = express();

//apply json middleware
app.use(express.json());


app.get('/api/books', (req, res)=>{
    res.status(200).json(books);
});

//display one book by his id
app.get('/api/books/:id', (req, res)=>{
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (book){
        res.status(200).json(book);
    }else {
        res.status(404).json({message: "book not found"})
    }

})

//adding a book to the books
app.post('/api/books',(req, res)=>{
    const schema =  Joi.object({
        title : Joi.string().trim().min(3).max(200).required(),
        author: Joi.string().trim().min(4).max(50).required(),
        published_year : Joi.string().trim().min(4).max(4).required(),
        page : Joi.number().min(10).max(500).required(),
        publisher : Joi.string().trim().min(5).max(100).required(),
        isbn : Joi.array().min(3).max(10).required(),
        genres : Joi.string().trim().min(4).max(40).required(),
        availability : Joi.boolean().required(),

    })
    const {error} = schema.validate(req.body);
    if (error){
        return res.status(400).json({message : error.details[0].message});
    }

    const book = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author,
        published_year: req.body.published_year,
        genres: req.body.genres,
        pages: req.body.pages,
        publisher: req.body.publisher,
        isbn: req.body.isbn,
        availability: req.body.availability
    }

    books.push(book);
    res.status(201).json(book); // 201 ==> created successfully
    res.send("body")
})

//lunching the server
const PORT = 3000;
app.listen(PORT, ()=> console.log(`Service is running in port ${PORT}`));