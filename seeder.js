const {Book} = require('./models/Books');
const {books, authors} = require('./data');
const connectToDB = require('././config/db');
const {Author} = require("./models/Authors");
require('dotenv').config();
connectToDB();
const importBooks = async ()=> {
    try{
        await  Book.insertMany(books);
        console.log('Books inserted successfully')
    }catch (error){
        console.log(error);
        process.exit(1);
    }
}

const importAuthors = async ()=> {
    try{
        await  Author.insertMany(authors);
        console.log('authors inserted successfully')
    }catch (error){
        console.log(error);
        process.exit(1);
    }
}

const removeManyB = async () => {
    try{
        await  Book.deleteMany({});
        console.log("Books Removed");
    }catch (error){
        console.log(error);
        process.exit(1);
    }
}

if (process.argv[2] === "-import"){
     importBooks();
}else if (process.argv[2] === "-remove"){
    removeManyB();
} else if (process.argv[2] === "-import-authors"){
    importAuthors();
}