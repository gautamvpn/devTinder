const express = require('express');
const { UserAuth } = require('../Middlewares/auth');
const userRouter = express.Router()
const connectionRequest = require('../models/connectionRequest')
const User = require("../models/user")

const saveData = ["firstName","lastName","age","gender","photoUrl","skills","about"]

//getting all pending connection request
userRouter.get('/user/request/received', UserAuth, async(req,res)=>{
    try{
        const loggedUser = req.user;

        //checking if any request existing
        const data = await connectionRequest.find({
            toUserId: loggedUser._id,
            status:'interested'
        }).populate("fromUserId",saveData)




        res.json({message:'fetched connection request..',
            "data":data
        })
    }
    catch(err)
    {
        res.status(400).send("something went wrong.."+ err)
    }
    
})

// getting all accepted connections.
userRouter.get('/user/connections', UserAuth, async(req,res)=>{     
    try{
        const loggedInUser = req.user;

        const connectionReq = await connectionRequest.find({
            $or:[
                {
                 fromUserId:loggedInUser._id , status:"accepted"
                },
                {  
                 toUserId:loggedInUser._id , status:"accepted"
                }
            ]
        }).populate('fromUserId',saveData).populate('toUserId',saveData)


        const data = connectionReq.map((item)=>{
            
            if(item.fromUserId._id.toString() === loggedInUser._id.toString())
            {
                return item.toUserId;
            }
            else{
                return item.fromUserId;
            }  
 
        })

        res.send(data)

    }
    catch(err)
    {
        res.status(400).send({message:err.message});
    }
})

// Gets you the profile of other users 
// can't see himself and sent connections, received connections, already been connections matched
userRouter.get('/feed', UserAuth, async(req,res)=>{
    try{
        const loggedUser = req.user;

        const page = parseInt(req.query.page)  || 1
        let limit =  parseInt(req.query.limit) || 10; 
        limit = limit > 50 ? 50 : limit;
        
        const skip = (page-1) * limit;

        // getting all the existing connections,pending,receiving of logged users
        const connectionRequests = await connectionRequest.find({
            $or:[
                {fromUserId:loggedUser._id}, {toUserId:loggedUser._id}
            ]
        }).select("fromUserId toUserId")
        // .populate("fromUserId", "firstName").populate("toUserId","firstName")

        const filterConnections = new Set();

        connectionRequests.forEach((req)=> {
            filterConnections.add(req.fromUserId.toString())
            filterConnections.add(req.toUserId.toString())
        })

        console.log(filterConnections)

        const users = await User.find({ 
            $and:[
                {_id : {$nin : Array.from(filterConnections)} },
                {_id : {$ne : loggedUser._id}}
                 ]
          }).select(saveData).skip(skip).limit(limit)

        res.send(users)

    }
    catch(err)
    {
        res.status(400).json({message:err.message})
    }
})


module.exports = userRouter;