const  express = require('express');
const  {User, validateUserLogin, validateUserRegister, validateUserUpdate} = require('./models/User')
require('dotenv').config(); //Access to the .env file
const logger = require("./middlewares/logger");
const {notFound, errorHandler} = require("./middlewares/notFound");
const connectToDb = require('./config/db')


//connect to database
connectToDb();

//Init App
const app = express();

// costume middleware
app.use(logger);

// Routes
app.use(express.json());
app.use("/api/books", require('./routes/books'));
app.use("/api/authors", require('./routes/authors'));
app.use("/api/auth", require('./routes/auth'));
app.use("/api/users", require('./routes/users'));

//Error Handling middleware
app.use(notFound)
app.use(errorHandler);


//Running  the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Service is running in ${process.env.NODE_ENV} port ${PORT}`));