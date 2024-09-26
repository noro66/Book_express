const express = require("express");
const Joi = require("joi");
const router = express.Router();
const {Author, validateUpdateAuthor,validateCreatingAuthor} = require('../models/Authors');
const asycHandler = require('express-async-handler')
const {verifyTokenAndAdmin} = require("../middlewares/verifyToken");
const {getAllAuthors, getAuthorById, creteAuthor, updateAuhtor, deleteAuthor} = require("../controllers/authorController");

// const authors = [
//     {
//         id: 1,
//         firstName: "mohamed",
//         lastName: "lboftini",
//         nationality: "lebanon",
//         image: "default-image.png"
//     },
// ];

// Apply JSON middleware
router.use(express.json());

/**
 * @desc Get all authors
 * @route /api/authors
 * @method GET
 * @access public
 */
router.get('/', getAllAuthors);

/**
 * @desc Get author by id
 * @route /api/authors/:id
 * @method GET
 * @access public
 */
router.get('/:id', getAuthorById);

/**
 * @desc Create new author
 * @route /api/authors
 * @method POST
 * @access private (only admin)
 */
router.post('/',verifyTokenAndAdmin, creteAuthor);

/**
 * @desc Update an author
 * @route /api/authors/:id
 * @method PUT
 * @access private (only admin)
 */
router.put('/:id', verifyTokenAndAdmin,  updateAuhtor);


/**
 * @desc Delete an author
 * @route /api/authors/:id
 * @method DELETE
 * @access private (only admin)
 */
router.delete('/:id', verifyTokenAndAdmin,  deleteAuthor);

module.exports = router;
