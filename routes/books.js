const express = require("express");
const {getAllBooks, getBookById, createBook, updateBook, deleteBook} = require("../controllers/bookController");
const {verifyTokenAndAdmin} = require("../middlewares/verifyToken");
const router = express.Router();


//apply json middleware
router.use(express.json())

router.get('/', getAllBooks)

router.get('/:id', getBookById)

router.post('/', verifyTokenAndAdmin,  createBook)

router.put("/:id", verifyTokenAndAdmin, updateBook)

router.delete("/:id", verifyTokenAndAdmin,  deleteBook)

module.exports = router;