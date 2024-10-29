const mongoose = require('mongoose');

const connectionRequestSchema = mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.ObjectId,
        require:true,
        ref:"User"
    },
    toUserId:{
        type:mongoose.Schema.ObjectId,
        require:true,
        ref:"User"
    },

    status:{
        type: String,
        require:true,
        enum:{
            values:["interested","ignored","accepted","rejected"],
            message:`{VALUE} is not supported..`
        },

    }
},
{
    timestamps:true,
})


// middleware function at schema level
connectionRequestSchema.pre("save",function(next){
    const connectionRequest = this;

    // check validation for sending the connection request to own
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId))
    {
        throw new Error("can't send connection request to yourself...")
    }
    next()
})

// making compound indexes for optimizing search operations
// combined these two quesries it become fast as compound

connectionRequestSchema.index({fromUserId:1, toUserId:1})

const connectionRequireModel = new mongoose.model(
    "connectionRequest",
    connectionRequestSchema
);

module.exports = connectionRequireModel;