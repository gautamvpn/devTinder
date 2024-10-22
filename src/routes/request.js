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


module.exports = requestRouter;