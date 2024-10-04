const express = require('express');

// creating an instance of an express application
const app = express();


// this will handle GET call to /user
app.get("/user/:userid/:name/:password",(req,res)=>{

    console.log(req.params)
    res.send({firstName:"vipin",lastName:"gautam"})

})

// listening on port 7777
app.listen(7777, () => {
    console.log("Successfully listening on port 7777...");
});
