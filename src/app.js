const express = require('express');
// creating an instance of an express application
const app = express();

const User = require("./models/user")

const  DBConnection  = require("./config/database")


// middlewares provided by express to read the json data into objects
app.use(express.json())

app.post("/signup",async(req,res)=>{

    console.log(req.body);

    // creating a new instance of user model and passing dynamic data that's comes throgh the api.
    const user = new User(req.body)

    try{
        // user data will save into database
        await user.save();
        res.send("data successfully saved...")
    }
    catch(err){
        res.status(400).send("Something went wrong on saving the data....")
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


 