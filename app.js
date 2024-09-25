const  express = require('express');

//router path
const booksPath = require('./routes/books')
const authorsPath = require('./routes/authors')
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const logger = require("./middlewares/logger");
dotenv.config();


const app = express();
mongoose.connect(process.env.MONGO_URL)
    .then(()=> console.log("connected  To Mongodb..."))
    .catch(error => console.log("connection failed  To MongoDB", error))

//costume middleware
app.use(logger);
//Routes
app.use("/api/books", booksPath);
app.use("/api/authors", authorsPath);



//lunching the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Service is running in ${process.env.NODE_ENV} port ${PORT}`));