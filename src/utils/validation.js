
const validator = require("validator");

const validateSignUp = (req) => {

    const {firstName,lastName,emailId,password} = req.body;

    if(!firstName || !lastName)
    {
        throw new Error("name is not valid");
    }
    else if(firstName.length < 4 || firstName.length > 20)
    {
        throw new Error("firstName length is not valid");
    }

    else if(!validator.isEmail(emailId))
    {
       throw new Error("email is not valid..");
    }

    else if(!validator.isStrongPassword(password))
    {
       throw new Error("password is not strong")
    }

}


const validateUpdateData = (req) => {

    const photoUrl = req.body;

    const allowedEditFields = [
      "firstName",
      "lastName",
      "emailId",
      "photoUrl",
      "gender",
      "age",
      "about",
      "skills",
    ];

    
//   if(!validator.isURL(photoUrl))
//     {
//       throw new Error("photoUrl is not valid........"+photoUrl)
//     }
  
    const isEditAllowed = Object.keys(req.body).every((field) =>
      allowedEditFields.includes(field)
    );
  
    return isEditAllowed;
  };

module.exports = {
    validateSignUp,
    validateUpdateData
}