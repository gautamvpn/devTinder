const express = require('express');
const requestRouter = express.Router();
const { UserAuth } = require('../Middlewares/auth')
const connectionRequest = require('../models/connectionRequest')
const User = require('../models/user')


requestRouter.post('/request/send/:status/:toUserId',
    UserAuth,
    async(req,res)=>{
    
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["interested","ignored"];
        if(!allowedStatus.includes(status))
        {
            return res.status(400).send("Invalid status "+ status)
        }

        // checking toUser is existing in DB or not
        const user = await User.findById(toUserId)
        console.log("***user", user)

        if(!user)
        {
            return res.status(400).json({message:"User is not existing in DB.."})
        }


        // if there's any connection request already exist...
        const connectionRequestExist = await connectionRequest.findOne({
            $or:[
                {fromUserId,toUserId},
                {fromUserId:toUserId , toUserId:fromUserId}
            ]
        })
        // console.log("****",connectionRequestExist)
        if(connectionRequestExist)
        {
            return res.status(400).send("Connection request already existed")
        }



     // creating a new instance of connectionRequest...
        const connectionReq = new connectionRequest({
            fromUserId,
            toUserId,
            status
        })

        // this connection request save into DB...
       const data =  await connectionReq.save()
       res.json({
           message:  req.user.firstName+" is "+ status + " in "+ user.firstName,
           "Data":data
       })
    }
    catch(err)
    {
        res.status(400).send("send connection failed.."+ err.message)
    }
})

requestRouter.post('/request/review/:status/:requestId', UserAuth, async(req,res)=>{
    
    try{
        const loggedUser = req.user;
        const {requestId,status} = req.params
        console.log(loggedUser._id,"**",requestId,"**",status)

        const allowedStatus = ["accepted","rejected"];
        if(!allowedStatus.includes(status))
        {
        return res.status(400).json({message:"status now allowed.."})
        }


        const connectionReq = await connectionRequest.findOne({
            _id:requestId,
            toUserId:loggedUser._id,
            status:"interested",
        })

        if(!connectionReq)
        {
            return res.json({mesasge:"connection request not found..."})
        }

        // console.log("***",connectionReq )
        connectionReq.status = status;
        const data = await connectionReq.save()
        res.json({message:"connection requested "+ status, data
        })

    }
    catch(err)
    {
        res.status(400).send("send connection failed.."+ err.message)
    }
})


module.exports = requestRouter;