const mongoose = require("mongoose");

const DBConnection = async() =>{

    // connecting to the cluster.. inside cluster there is multiple database.... adding devTinder Database into connection string.
    await mongoose.connect("mongodb+srv://NamasteDEV:iUy7ydXyEhTepHaW@namastenode.uwvhv.mongodb.net/devTinder")
};

module.exports = DBConnection

