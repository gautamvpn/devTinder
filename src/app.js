const express = require('express');
// creating an instance of an express application
const app = express();
const cookieParser = require('cookie-parser')
// const jwt = require('jsonwebtoken')
const DBConnection = require("./config/database")


// middlewares provided by express to read the json data into objects
app.use(express.json())
app.use(cookieParser())


const authRouter = require('./routes/auth')
const profileRouter = require('./routes/profile')
const requestRouter = require('./routes/request')


app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);






DBConnection().then(() => {
    console.log("Database connection established...")

    // listening on port 7777
    app.listen(7777, () => {
        console.log("Successfully listening on port 7777...");
    });

}).catch(err => {
    console.log("Database cannot be connected")
})


