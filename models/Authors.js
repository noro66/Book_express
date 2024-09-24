const  mongoose = require('mongoose');
const {string} = require("joi");
const {models} = require("mongoose");
const Joi = require('joi');

const  AuthorSchema = new mongoose.Schema({
    firstName: {
        type : String,
        required : true,
        trim : true,
        minLength : 3,
        maxLength : 200
    },

    lastName: {
        type : String,
        required : true,
        trim : true,
        minLength : 3,
        maxLength : 200
    },

    nationality: {
        type : String,
        required : true,
        trim : true,
        minLength : 2,
        maxLength : 200
    },
    image: {
        type : String,
        default : "default-avatar.png"
    }
}, {
    timestamps : true,
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

const Author  = mongoose.model("Author", AuthorSchema);
module.exports = {
    Author,
    validateCreatingAuthor,
    validateUpdateAuthor
};