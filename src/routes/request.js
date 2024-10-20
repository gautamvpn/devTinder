const express = require('express');
const requestRouter = express.Router();
const { UserAuth } = require('../Middlewares/auth')


requestRouter.post('/sentConnectionRequest',UserAuth,(req,res)=>{
    try{

        const user = req.user;
        res.send( user.firstName +" sent the connections....")
    }
    catch(err)
    {
        res.status(400).send("Connection failed..")
    }
})


module.exports = requestRouter;