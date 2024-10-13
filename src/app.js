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
        res.status(400).send("Something went wrong on saving the data...."+err)
    }

})

// get user by emailId....
app.get("/user",async (req,res)=>{

    try{
        const emailID = req.body.emailId;
        const users = await User.find({emailId:emailID});
        console.log("****",users)
        if(users.length === 0)
        {
            res.status(400).send("User not found....")
        }
        else{
            res.send(users);
        }
    }
    catch(err)
    {
        res.status(400).send("User fetching records failed")
    }

})

// getting all the user from the database
app.get("/feed", async (req,res)=>{
    try{
        // just give empty object inside find methods, it return all documents 
        const users = await User.find({});
        res.send(users);
    }
    catch(err)
    {
        res.status(400).send("Users fetching records failed...")
    }
})


// deleting the data from the database...
app.delete("/user",async(req,res)=>{
    const userId = req.body.userID;

    try{
        await User.findByIdAndDelete(userId)
        res.send("User deleted successfuly....")
    } catch(err)
    {
        res.status(400).send("something went wrong.....")
    }

})


// Update data of the user
app.patch("/user/:userId",async(req,res)=>{

    // const userId = req.body.userId;
    const userId = req.params.userId;
    const data = req.body;

   

    console.log("***",userId)

    try{


        const ALLOWED_UPDATES = [
           "photoUrl","about","gender","age","skills"
        ]
    
        const isUpdateAllowed = Object.keys(data).every((k)=>
          ALLOWED_UPDATES.includes(k)    
        )
    
        if(!isUpdateAllowed)
        {
            throw new Error("Update not allowed...");
        }

        if(data?.skills.length > 10)
        {
            throw new Error("skills cannot be more than 10.")
        }

       const user =  await User.findByIdAndUpdate(userId,data,{
        runValidators:true
       });
        res.send("updated successfully...")
    }

    catch(err)
    {
        res.status(400).send("Update failed..."+err)
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


 