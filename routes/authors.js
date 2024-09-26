const express = require("express");
const Joi = require("joi");
const router = express.Router();
const {Author, validateUpdateAuthor,validateCreatingAuthor} = require('../models/Authors');
const asycHandler = require('express-async-handler')
const {verifyTokenAndAdmin} = require("../middlewares/verifyToken");

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
router.get('/', asycHandler(async (req, res) => {
    const authorList = await Author.find();
    res.status(200).json(authorList);
}));

/**
 * @desc Get author by id
 * @route /api/authors/:id
 * @method GET
 * @access public
 */
router.get('/:id', asycHandler(async (req, res) => {
    const author = await  Author.findById(req.params.id);
    if (author) {
        res.status(200).json(author);
    } else {
        res.status(404).json({ message: "Author not found" });
    }
}));

/**
 * @desc Create new author
 * @route /api/authors
 * @method POST
 * @access private (only admin)
 */
router.post('/',verifyTokenAndAdmin, asycHandler(async (req, res) => {
    const { error } = validateCreatingAuthor(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const author = new Author({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nationality: req.body.nationality,
        image: req.body.image || "default-image.png",
    });
    const result = await author.save();
    res.status(201).json(result); // 201 ==> created successfully
}));

/**
 * @desc Update an author
 * @route /api/authors/:id
 * @method PUT
 * @access private (only admin)
 */
router.put('/:id', verifyTokenAndAdmin,  asycHandler(async (req, res) => {
    // Validate the incoming request data
    const { error } = validateUpdateAuthor(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    // Find the author by ID and update with new data
    const author = await Author.findByIdAndUpdate(
        req.params.id,
        {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                nationality: req.body.nationality,
                image: req.body.image || 'default-image.png', // Add a fallback default image
            },
        },
        { new: true } // Return the updated document
    );

    // If author is not found, return 404 error
    if (!author) {
        return res.status(404).json({ message: "Author not found" });
    }

    // Return the updated author details
    res.status(200).json(author);
}));


/**
 * @desc Delete an author
 * @route /api/authors/:id
 * @method DELETE
 * @access private (only admin)
 */
router.delete('/:id', verifyTokenAndAdmin,  asycHandler(async(req, res) => {
    const author = await Author.findById(req.params.id);
    if (author) {
        await Author.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Author has been deleted!" });
    } else {
        res.status(404).json({ message: "Author not found!" });
    }
}));


module.exports = router;
