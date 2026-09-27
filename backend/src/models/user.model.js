import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema ({
    fullName: {
        type: String ,
        required: true , 
        trim : true , 
        minlength: [2 ,'Name should be of atleast 2 characters']
    }, 
    userName : {
        type: String ,
        required: true , 
        trim : true , 
        unique: true ,
    }, 
    email : {
        type: String ,
        required: true , 
        trim : true , 
        unique: true , 

    }, 
    password: {
        type: String ,
        required: true , 
        trim : true , 
        minlength: [6 ,'Password should be of atleast 6 characters']
    }
} , {timestamps : true}) ; 


// 
userSchema.pre('save' , async function () {
    if(!this.isModified('password')) {
        return ; 
    }

    this.password = await bcrypt.hash(this.password , 10) ;
})

// 
userSchema.methods.isPassword = async function (password) {
    return await bcrypt.compare(password , this.password) ;
}

export const User = mongoose.model("User" , userSchema) ;
