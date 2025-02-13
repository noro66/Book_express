const asyncHandler = require("express-async-handler");
const {validateUserUpdate, User} = require("../models/User");
const bcrypt = require("bcryptjs");

/**
 * @desc Update User
 * @route /api/users/:id
 * @method PUT
 * @access private
 */
const updateUser =   asyncHandler(async (req, res)=>{
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
})

/**
 * @desc Get All Users
 * @route /api/users
 * @method GET
 * @access private (ONLY ADMIN)
 */
const getAllUsers =  asyncHandler( async  (req, res)=>{
    const users = await  User.find();
    res.status(200).json(users);
})

/**
 * @desc Get User Profile
 * @route /api/users/:id
 * @method GET
 * @access private (User or  ADMIN)
 */
const getUserProfile = asyncHandler(async ()=>{

    const user = await  User.findById(req.body.id).select('-password');
    if (user){
        res.status(200).json(user);
    }else{
        res.status(400).json({message: "user not found"})
    }
})

/**
 * @desc Get User Profile and delete it
 * @route /api/users/:id
 * @method DELETE
 * @access private (User or  ADMIN)
 */
const deleteProfile = asyncHandler(async (req, res)=>{
    const user = await  User.findById(req.params.id).select('-password');
    if (user){
        await  User.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "user has been deleted successfully"});
    }else{
        res.status(400).json({message: "user not found"})
    }
})

module.exports =  {updateUser, getAllUsers, getUserProfile, deleteProfile}