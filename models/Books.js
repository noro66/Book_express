const mongoose = require("mongoose");
const Joi = require('joi');

const BookSchema = new mongoose.Schema({
    title: {
        type : String,
        require : true,
        trim: true,
        minLength : 3,
        maxLength : 250
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        require : true,
        ref : "Author"
    },
    description :{
        type : String,
        require : true,
        trim : true,
        minLength : 5,
    },
    price : {
        type : Number,
        require : true,
        min : 0,
    },
    cover : {
        type : String,
        require : true,
        enum : ['soft cover', 'hard cover']
    }
}, {timestamps : true});

const Book = mongoose.model('Book', BookSchema);
// validate data using Joi
function validateCreatingBook(obj){
    const schema =  Joi.object({
        title : Joi.string().trim().min(3).max(200).required(),
        author: Joi.string().trim().min(4).max(50).required(),
        description : Joi.string().min(5).max(2024).required(),
        price : Joi.number().min(0).required(),
        cover : Joi.string().trim().valid('soft cover', 'hard cover').required(),
    });

    return  schema.validate(obj);
}

function validateUpdateBook(obj){
    const schema =  Joi.object({
        title : Joi.string().trim().min(3).max(200),
        author: Joi.string().trim().min(4).max(50),
        description : Joi.string().min(5).max(2024),
        price : Joi.number().min(0),
        cover : Joi.string().trim().valid('soft cover', 'hard cover'),
    });

    return  schema.validate(obj);
}

module.exports = {Book, validateCreatingBook, validateUpdateBook};
