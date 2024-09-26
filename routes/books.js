const express = require("express");
const {getAllBooks, getBookById, createBook, updateBook, deleteBook} = require("../controllers/bookController");
const {verifyTokenAndAdmin} = require("../middlewares/verifyToken");
const router = express.Router();

//apply json middleware
router.use(express.json())

router.route('/')
    .get(getAllBooks)
    .post( verifyTokenAndAdmin,  createBook)

router.route('/id')
    .get( getBookById).put(verifyTokenAndAdmin, updateBook)
    .delete( verifyTokenAndAdmin,  deleteBook)

module.exports = router;