const express = require("express");
const router = express.Router();
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs');
const  {User, validateUserUpdate} = require('../models/User');
const {verifyToken, verifyTokenAndAdmin} = require('../middlewares/verifyToken')
/**
 * @desc Update User
 * @route /api/users/:id
 * @method PUT
 * @access private
 */

router.put('/:id', verifyToken,  asyncHandler(async (req, res)=>{
    if (req.user.id !== req.params.id){
       return  res.status(403).json({message: "You are not allowed to update this profile, you can only update your profile"}) //forbidden
    }
    const {error} = validateUserUpdate(req.body);
    if (error){
       return  res.status(400).json({message: error.details[0].message});
    }
    if (req.body.password){
        const salt = await bcrypt.genSalt(10)
        return req.body.password  = await bcrypt.hash(req.body.password, salt)
    }
    const updatedUSer = await  User.findByIdAndUpdate(req.params.id, {
        $set : {
            email: req.body.email,
            password : req.body.password,
            username : req.body.username
        }
    }, {new : true}).select("-password");
    res.status(200).json({updatedUSer});
}));

/**
 * @desc Get All Users
 * @route /api/users
 * @method GET
 * @access private (ONLY ADMIN)
 */

router.get('/', verifyTokenAndAdmin, asyncHandler( async  (req, res)=>{
    const users = await  User.find();
    res.status(200).json(users);
}))
module.exports = router;