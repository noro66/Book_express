const express = require("express");
const router = express.Router();
const {verifyTokenAndAdmin} = require("../middlewares/verifyToken");
const {getAllAuthors, getAuthorById, creteAuthor, updateAuhtor, deleteAuthor} = require("../controllers/authorController");
router.use(express.json());

router.route('/')
    .get( getAllAuthors)
    .post(verifyTokenAndAdmin, creteAuthor);

router.route('/:id')
    .get( getAuthorById)
    .put( verifyTokenAndAdmin,  updateAuhtor)
    .delete( verifyTokenAndAdmin,  deleteAuthor);

module.exports = router;