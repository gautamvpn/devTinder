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
-POST /request/send/interested/:userId
-POST /request/send/ignored/:userId
-POST /request/review/accepted/:requestId
-POST /request/review/rejected/:requestId


##userRouter
-GET user/connections
-GET /requests/received
-GET /feed - Gets you the profile of other users on platform




Status: ignore, interested, accepted, rejected