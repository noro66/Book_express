const express = require("express");
const router = express.Router();
const asyncHandler = require('express-async-handler')
const {User, validateUserRegister,validateUserLogin, validateUserUpdate} = require("../models/User");
const bcrypt = require('bcryptjs');
/**
 * @desc Register New User
 * @route /api/auth/register
 * @method POST
 * @access public
 */

router.post('/register', asyncHandler(async (req,res)=>{
    const {error} = validateUserRegister(req.body);
    if(error){
        return res.status(400).json({ message: error.details[0].message })
    }
    let user = await User.findOne({ email: req.body.email });
    if (user){
        return res.status(400).json ({message : "THis user is already registered "})
    }
    const salt = await bcrypt.genSalt(10)
    req.body.password = await bcrypt.hash(req.body.password, salt)

    user = new User({
        email : req.body.email,
        username : req.body.username,
        password : req.body.password,
        isAdmin : req.body.isAdmin
    });
    const result = await user.save();
    const token = null;
    const {password, ...other} = result._doc;
    res.status(201).json({...other, token});
}));

/**
 * @desc Login to Account
 * @route /api/auth/Login
 * @method POST
 * @access public
 */

router.post('/login', asyncHandler(async (req,res)=>{
    const {error} = validateUserLogin(req.body);
    if(error){
        return res.status(400).json({ message: error.details[0].message })
    }
    let user = await User.findOne({ email: req.body.email });
    if (!user){
        return res.status(400).json ({message : "invalid Email !"})
    }
    const isPasswordMatch = await  bcrypt.compare(req.body.password, user.password);
    if (!isPasswordMatch){
        return res.status(400).json ({message : "invalid Password !"})
    }

    const token = null;
    const {password, ...other} = user._doc;
    res.status(201).json({...other, token});
}));

module.exports = router;