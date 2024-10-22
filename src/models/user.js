const mongoose = require("mongoose");
const validator = require('validator');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
        index:true
    },
    lastName:{
        type:String 
    },
    emailId:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value))
            {
                throw new Error("Email is not valid........"+value)
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value))
            {
                throw new Error("Password is not Strong........"+value)
            }
        }
    },
    age:{
        type:Number,
        min:18,
    },
    gender:{
        type:String,
        validate(value){
       if(!["male","female","other"].includes(value))
       {
        throw new Error("Gender data is not valid...")
       }
        }
    },
    photoUrl:{
        type:String,
        default:"https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png",
        validate(value){
            if(!validator.isURL(value))
            {
                throw new Error("url is not valid........"+value)
            }
        }
    },
    about:{
        type:String,
        default:"This is a default about of the user!!!"
    },
    skills:{
        type:[String],
    },
   

},
{
    timestamps:true,
})

// userSchema level for creating the token 
userSchema.methods.getJWT = async function(){
    const user = this;

    const token = await jwt.sign({_id:user._id},'DEV@Tinder$123',{expiresIn:'7d'})

    // console.log(token);

    return token;
}

// userschema level for validiating the password
userSchema.methods.validatePassword = async function(passwordInputByUser) {
    const user = this;

    const passwordHash = user.password;

    // Await bcrypt.compare to resolve the promise
    const isPasswordValid = await bcrypt.compare(passwordInputByUser,passwordHash)

    return isPasswordValid;
}


const User = mongoose.model("User",userSchema);

module.exports = User; 