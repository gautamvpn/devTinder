const express = require('express');

// creating an instance of an express application
const app = express();


// this will handle GET call to /user
app.get("/user",(req,res)=>{
    res.send({firstName:"vipin",lastName:"gautam"})
})


// for POST call only...
app.post("/user",(req,res)=>{
    // saving data to DB...
    res.send("successfully adding new data.....")
})


// for delete call only...
app.delete("/user",(req,res)=>{
    res.send("deleting the current data...")
})


// this will match all the HTTP method API calls to /tests
app.use("/test",(req,res)=>{
    res.send('Hello from the server')
})


// listening on port 7777
app.listen(7777, () => {
    console.log("Successfully listening on port 7777...");
});
