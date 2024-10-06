const express = require('express');
const {adminAuth,UserAuth} = require('./Middlewares/auth')

// creating an instance of an express application
const app = express();


// this will handle GET call to /user
// app.get("/user/:userid/:name/:password",(req,res)=>{

//     console.log(req.params)
//     res.send({firstName:"vipin",lastName:"gautam"})

// })

app.use("/admin",adminAuth)


app.use("/user/login",(req,res)=>{
    res.send("User is logined.....")
})

app.use("/user",UserAuth,(req,res)=>{
    res.send("User is getting checked....")
})

app.use("/admin/getAllData",(req,res)=>{

    res.send("Getting Admin Data....")
})



app.use("/admin/deleteUser",(req,res)=>{
    res.send("Delete a User....")
})



// listening on port 7777
app.listen(7777, () => {
    console.log("Successfully listening on port 7777...");
});
