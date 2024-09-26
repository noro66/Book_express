const {Book, validateUpdateBook, validateCreatingBook} =  require('../models/Books')
const asyncHandler = require('express-async-handler')
const {verifyTokenAndAdmin, verifyToken} = require("../middlewares/verifyToken");

/**
 * @desc Get all books
 * @route /api/books
 * @method GET
 * @access public
 */
const getAllBooks = asyncHandler(async (req, res)=>{
    const books = await Book.find();
    res.status(200).json(books);
});

/**
 * @desc Get Book by id
 * @route /api/books/:id
 * @method GET
 * @access public
 */
const getBookById = asyncHandler(async (req, res)=>{
    const book = await  Book.findById(req.params.id);
    if (book){
        res.status(200).json(book);
    }else {
        res.status(404).json({message: "book not found"})
    }
})

/**
 * @desc Create new book
 * @route /api/books
 * @method POST
 * @access private
 */
const createBook = asyncHandler(async (req, res) => {

    // Validate request body
    const { error } = validateCreatingBook(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    // Create a new book
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        price: req.body.price,
        cover: req.body.cover,
    });

    // Save to the database
    const result = await book.save();

    // Return the saved book
    res.status(201).json(result); // 201 ==> created successfully
})

/**
 * @desc Update a book
 * @route /api/books/:id
 * @method PUT
 * @access private
 */
const updateBook = asyncHandler( async (req, res)=>{
    const {error} = validateUpdateBook(req.body);
    if (error){
        return res.status(400).json({message: error.details[0].message});
    }
    const updateBook = await Book.findByIdAndUpdate( req.params.id, {
        $set : {
            title : req.body.title,
            author: req.body.author,
            description : req.body.description,
            price :  req.body.price,
            cover : req.body.cover,
        }
    }, {new : true});
    if (updateBook){
        res.status(200).json({message: "book has been update !", book : updateBook});
    }else{
        res.status(400).json({message: "book not found !"});
    }

})

/**
 * @desc Delete a book
 * @route /api/books/:id
 * @method DELETE
 * @access private
 */
const deleteBook = asyncHandler( async (req, res)=>{
    const book = await  Book.findById(req.params.id);
    if (book){
        await  Book.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "book has been deleted !"});
    }else{
        res.status(400).json({message: "book not found !"});
    }
})

module.exports = {getAllBooks, getBookById, createBook, updateBook, deleteBook};