#DevTinder APIs

##Auth router
-POST /signup
-POST /login
-POST /logout

##Profile Router
-GET /profile/view        //getting the data of profile
-PATCH /profile/edit      // updating the profile
-PATCH /profile/password
  
##ConnectionRequest Router
-POST /request/send/status/:userId     // status - [interested,ignored]

-POST /request/review/:status/:requestId   // status - [accepted,rejected]


##userRouter
-GET user/request/received
-GET user/connections
-GET /feed - Gets you the profile of other users on platform




Status: ignore, interested, accepted, rejected