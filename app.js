const  express = require('express');

//router path
const booksPath = require('./routes/books')
const authorsPath = require('./routes/authors')
const mongoose = require("mongoose");



const app = express();
mongoose.connect("mongodb://localhost/bookStoreDB")
    .then(()=> console.log("connected  To Mongodb..."))
    .catch(error => console.log("connection failed  To MongoDB", error))
//Routes
app.use("/api/books", booksPath);
app.use("/api/authors", authorsPath);


//lunching the server
const PORT = 3000;
app.listen(PORT, ()=> console.log(`Service is running in port ${PORT}`));