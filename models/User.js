const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    user_fname:{
        type:String,
        required:true
    },
    user_lname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    user_id:{
        type:String,
    }
},{
    timestamps:true
})

const User = mongoose.model("User",userSchema)

module.exports = User