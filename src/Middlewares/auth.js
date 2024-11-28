const jwt = require("jsonwebtoken");

const User = require('../models/user')

const UserAuth = async (req,res,next)=>{
   //Read the token from the req cookies

   try{
       const cookies =   req.cookies;
       const{token} = cookies;
       if(!token)
       {
         return res.status(401).send("Please login")
       }
     
       // validiate the token
     
       const decodedMessage = jwt.verify(token,"DEV@Tinder$123")
     
       const{_id} = decodedMessage;
    //    console.log("*****IN auth",_id) 

    const user = await User.findById(_id);
    if(!user)
    {
        throw new Error("User is not found...")
    }

    req.user = user;
       next();
   }
   catch(err)
   {
    res.status(400).send("ERROR:"+ err.message);
   }


   // Find the user


}

module.exports = {
    UserAuth
}