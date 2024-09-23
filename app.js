const  express = require('express');

//router path
const booksPath = require('./routes/books')



const app = express();

//Routes
app.use("/api/books", booksPath);

//lunching the server
const PORT = 3000;
app.listen(PORT, ()=> console.log(`Service is running in port ${PORT}`));