const express = require('express');
// creating an instance of an express application
const app = express();

const User = require("./models/user")
const { validateSignUp } = require("./utils/validation")
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const DBConnection = require("./config/database")
const { UserAuth } = require('./Middlewares/auth')


// middlewares provided by express to read the json data into objects
app.use(express.json())
app.use(cookieParser())


app.post("/signup", async (req, res) => {

    console.log(req.body);



    try {
        //validation of data..
        validateSignUp(req);

        const { firstName, lastName, emailId, password } = req.body;
        // console.log(password)

        //Encrypt the password
        const hashPassword = await bcrypt.hash(password, 10);
        // console.log(hashPassword)


        // creating a new instance of user model and passing dynamic data that's comes throgh the api.
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: hashPassword
        })

        // user data will save into database 
        await user.save();
        res.send("data successfully saved...")
    }
    catch (err) {
        res.status(400).send("Something went wrong on saving the data at signUp...." + err.message)
    }

})

// for login
app.post("/login", async (req, res) => {

    try {

        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId: emailId })

        if (user.length == 0) {
            throw new Error("Invalid credentials..")
        }

        // console.log(password,"***",user.password)

        // const isPasswordValid =  bcrypt.compare(password, user.password);
        const isPasswordValid = await user.validatePassword(password)

        if (isPasswordValid) {

            //Create a JWT Token...
            // const token = await jwt.sign({ _id: user._id }, 'DEV@Tinder$123',{expiresIn:'7d'})

            const token = await user.getJWT()
            console.log(token);

            //Add the token to cookie and send the response back to the user..

            res.cookie('token', token)


            res.send("Login successfully...")
        }
        else {
            throw new Error("password is not valid...")
        }

    }
    catch (err) {
        res.status(400).send("Something went wrong on saving the data at logIn...." + err.message)
    }
})

// get profile
app.get('/profile', UserAuth, async (req, res) => {

    try {

        const user = req.user;
        //   console.log(cookies," ",token)
        res.send(user)

    } catch (err) {
        res.status(400).send("User fetching records failed")
    }
})


app.post('/sentConnectionRequest',UserAuth,(req,res)=>{
    try{

        const user = req.user;
        res.send( user.firstName +" sent the connections....")
    }
    catch(err)
    {
        res.status(400).send("Connection failed..")
    }
})




DBConnection().then(() => {
    console.log("Database connection established...")

    // listening on port 7777
    app.listen(7777, () => {
        console.log("Successfully listening on port 7777...");
    });

}).catch(err => {
    console.log("Database cannot be connected")
})


