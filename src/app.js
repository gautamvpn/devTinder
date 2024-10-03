const express = require('express');

// creating an instance of an express application
const app = express();

app.get("/", (req, res) => {
    // send response from the server
    res.send("Hello from the root route");
});

app.get("/hello", (req, res) => {
    res.send("Hello Hello Hello....");
});

app.get("/test", (req, res) => {
    res.send("Hello from the server");
});

// listening on port 7777
app.listen(7777, () => {
    console.log("Successfully listening on port 7777...");
});
