const express = require('express');
const profileRouter = express.Router()
const { UserAuth } = require('../Middlewares/auth')
const {validateUpdateData} = require('../utils/validation')

// get profile
profileRouter.get('/profile/view', UserAuth, async (req, res) => {

    try {

        const user = req.user;
        //   console.log(cookies," ",token)
        res.send(user)

    } catch (err) {
        res.status(400).send("User fetching records failed")
    }
})


profileRouter.patch('/profile/edit', UserAuth, async(req,res)=>{

    const checkValidation = validateUpdateData(req);
    console.log(checkValidation)
    try{
        if(!checkValidation )
        {
            throw new Error("Cannot update fields..");
        }


    
        const loggedInUser = req.user;

        // res.send(loggedInUser)

        console.log('**before',loggedInUser)
        // loggedInUser.firstName = req.body.firstName;

        Object.keys(req.body).forEach(item => loggedInUser[item] = req.body[item]);
        
        console.log('**after',loggedInUser)
        // newUpdatedData = Object.keys(req.body).every(item => item = user);

        // saving into database
        await loggedInUser.save();
    
        res.json({ "message" : `${loggedInUser.firstName},  your profile updated successfully..`,
            "data":loggedInUser
        })
        
    }
    catch(err)
    {
        res.status(400).send("something went wrong.." + err);
    }
})


profileRouter.post('/profile/forgotPassword',UserAuth,(req,res)=>{
    const loggedInUser = req.user;
    


})

module.exports = profileRouter;