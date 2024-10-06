
const adminAuth = (req,res,next)=>{
    console.log("Admin auth is getting checked.....")
    const token = "xyz";
    const isAdminAuthorization = token == "xyz";

    if(!isAdminAuthorization)
    {
           res.status(401).send("Authorization failed....");
    }
    else{
        next();
    }
}


const UserAuth = (req,res,next)=>{
    console.log("User auth is getting checked.....")
    const token = "xyz";
    const isAdminAuthorization = token == "xyz";

    if(!isAdminAuthorization)
    {
           res.status(401).send("Authorization failed....");
    }
    else{
        next();
    }
}

module.exports = {
    adminAuth,
    UserAuth
}