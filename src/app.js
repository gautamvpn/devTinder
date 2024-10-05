const express = require('express');

// creating an instance of an express application
const app = express();


// this will handle GET call to /user
// app.get("/user/:userid/:name/:password",(req,res)=>{

//     console.log(req.params)
//     res.send({firstName:"vipin",lastName:"gautam"})

// })


app.use("/user", (req, res, next) => {

    // Route handler...
    console.log("Handling the route handler..")
    // res.send("Response...")
    next()
},
    (req, res, next) => {
        console.log("Handling the route handler 2nd..")
        // res.send("Response 2nd...")
        next()
    },
    (req, res, next) => {
        console.log("Handling the route handler 3nd..")
        // res.send("Response 3nd...");
        next()
    },
    (req, res, next) => {
        console.log("Handling the route handler 4nd..")
        // res.send("Response 4nd...")
        next()
    }
)



// listening on port 7777
app.listen(7777, () => {
    console.log("Successfully listening on port 7777...");
});
