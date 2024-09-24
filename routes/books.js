const express = require("express");
const Joi = require("joi");
const {Book, validateUpdateBook, validateCreatingBook} =  require('../models/Books')
const router = express.Router();
const asyncHandler = require('express-async-handler')


//apply json middleware
router.use(express.json());

/**
 * @desc Get all books
 * @route /api/books
 * @method GET
 * @access public
 */
router.get('/', asyncHandler(async (req, res)=>{
    const books = await Book.find();
    res.status(200).json(books);
}));

/**
 * @desc Get Book by id
 * @route /api/books/:id
 * @method GET
 * @access public
 */
router.get('/:id', asyncHandler(async (req, res)=>{
    const book = Book.findById(req.params.id);
    if (book){
        res.status(200).json(book);
    }else {
        res.status(404).json({message: "book not found"})
    }
}))

/**
 * @desc Create new book
 * @route /api/books
 * @method POST
 * @access public
 */
router.post('/',asyncHandler(async (req, res)=> {

    const error =  validateCreatingBook(req.body);
    if (error){
        return res.status(400).json({message : error.details[0].message});
    }
    const book = new Book( {
        title : req.body.title,
        author: req.body.author,
        description : req.body.description,
        price :  req.body.price,
        cover : req.body.cover,
    });
    const result = await book.save();
    res.status(201).json(book); // 201 ==> created successfully
}))

/**
 * @desc Update a book
 * @route /api/books/:id
 * @method PUT
 * @access public
 */

router.put("/:id", asyncHandler( async (req, res)=>{
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

}))

/**
 * @desc Delete a book
 * @route /api/books/:id
 * @method DELETE
 * @access public
 */
router.delete("/:id", asyncHandler( async (req, res)=>{
    const book = Book.findById(req.params.id);
    if (book){
        Book.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "book has been deleted !"});
    }else{
        res.status(400).json({message: "book not found !"});
    }


}))




module.exports = router;