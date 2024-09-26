const express = require("express");
const router = express.Router();
const {verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization} = require('../middlewares/verifyToken')
const {updateUser, getAllUsers, getUserProfile, deleteProfile} = require("../controllers/usersController");

router.get('/', verifyTokenAndAdmin,getAllUsers)

router.route('/:id')
    .put( verifyToken,updateUser)
    .get(verifyTokenAndAuthorization,  getUserProfile)
    .delete(verifyTokenAndAuthorization,  deleteProfile)

module.exports = router;