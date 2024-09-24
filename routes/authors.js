const express = require("express");
const Joi = require("joi");
const router = express.Router();
const Author = require('../models/Authors');

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
router.get('/', async (req, res) => {
    const authorList = await Author.find();
    res.status(200).json(authorList);
});

/**
 * @desc Get author by id
 * @route /api/authors/:id
 * @method GET
 * @access public
 */
router.get('/:id', (req, res) => {
    const author = authors.find(a => a.id === parseInt(req.params.id));
    if (author) {
        res.status(200).json(author);
    } else {
        res.status(404).json({ message: "Author not found" });
    }
});

/**
 * @desc Create new author
 * @route /api/authors
 * @method POST
 * @access public
 */
router.post('/', async (req, res) => {
    const { error } = validateCreatingAuthor(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

   try{
       const author = new Author({
           firstName: req.body.firstName,
           lastName: req.body.lastName,
           nationality: req.body.nationality,
           image: req.body.image || "default-image.png",
       });
       const result = await author.save();
       res.status(201).json(result); // 201 ==> created successfully

   }catch (error){
        console.log(error);
        res.status(500).json({message : error})
   }
});

/**
 * @desc Update an author
 * @route /api/authors/:id
 * @method PUT
 * @access public
 */
router.put('/:id', (req, res) => {
    const { error } = validateUpdateAuthor(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const author = authors.find(a => a.id === parseInt(req.params.id));
    if (author) {
        author.firstName = req.body.firstName || author.firstName;
        author.lastName = req.body.lastName || author.lastName;
        author.nationality = req.body.nationality || author.nationality;
        author.image = req.body.image || author.image;

        res.status(200).json({ message: "Author has been updated!" });
    } else {
        res.status(404).json({ message: "Author not found!" });
    }
});

/**
 * @desc Delete an author
 * @route /api/authors/:id
 * @method DELETE
 * @access public
 */
router.delete('/:id', (req, res) => {
    const index = authors.findIndex(a => a.id === parseInt(req.params.id));
    if (index !== -1) {
        authors.splice(index, 1);
        res.status(200).json({ message: "Author has been deleted!" });
    } else {
        res.status(404).json({ message: "Author not found!" });
    }
});

// Validation for creating author
function validateCreatingAuthor(author) {
    const schema = Joi.object({
        firstName: Joi.string().trim().min(3).max(50).required(),
        lastName: Joi.string().trim().min(3).max(50).required(),
        nationality: Joi.string().trim().min(2).max(50).required(),
        image: Joi.string().trim().min(5).max(255).optional(),
    });

    return schema.validate(author);
}

// Validation for updating author
function validateUpdateAuthor(author) {
    const schema = Joi.object({
        firstName: Joi.string().trim().min(3).max(50),
        lastName: Joi.string().trim().min(3).max(50),
        nationality: Joi.string().trim().min(2).max(50),
        image: Joi.string().trim().min(5).max(255),
    });

    return schema.validate(author);
}

module.exports = router;
