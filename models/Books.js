const mongoose = require("mongoose");
const Joi = require('joi');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 250
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Author"
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minLength: 5
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    cover: {
        type: String,
        required: true,
        enum: ['soft cover', 'hard cover']
    }
}, {timestamps: true});

const Book = mongoose.model('Book', BookSchema);

// Joi validation for creating a book
function validateCreatingBook(obj) {
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(250).required(),
        author: Joi.string().required(),
        description: Joi.string().min(5).max(2024).required(),
        price: Joi.number().min(0).required(),
        cover: Joi.string().trim().valid('soft cover', 'hard cover').required(),
    });

    return schema.validate(obj);
}

// Joi validation for updating a book
function validateUpdateBook(obj) {
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(250),
        author: Joi.string(),
        description: Joi.string().min(5).max(2024),
        price: Joi.number().min(0),
        cover: Joi.string().trim().valid('soft cover', 'hard cover'),
    });

    return schema.validate(obj);
}

module.exports = {Book, validateCreatingBook, validateUpdateBook};
