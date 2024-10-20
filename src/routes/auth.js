const express = require('express');

const authRouter =  express.Router()
const { validateSignUp } = require("../utils/validation")
const User = require("../models/user")
const bcrypt = require('bcrypt');


// for signup
authRouter.post("/signup", async (req, res) => {

    console.log(req.body);



    try {
        //validation of data..
        validateSignUp(req);

        const { firstName, lastName, emailId, password,photoUrl,about,skills } = req.body;
        // console.log(password)

        //Encrypt the password
        const hashPassword = await bcrypt.hash(password, 10);
        // console.log(hashPassword)


        // creating a new instance of user model and passing dynamic data that's comes throgh the api.
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: hashPassword,
            photoUrl,
            about,
            skills
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
authRouter.post("/login", async (req, res) => {

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

            res.cookie('token', token,{ expires: new Date(Date.now() + 900000)})


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



//for logout

authRouter.post('/logout',(req,res)=>{

    res.cookie('token',null,{
    expires:new Date(Date.now())
    })

    res.send("logout successfully....")
})





module.exports = authRouter;