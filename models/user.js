import mongoose from "mongoose";

const user = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },

    firstName : {
        type : String,
        required : true
    },

    lastName : {
        type : String,
        required : true
    },

    password : {
        type : String,
        required : true
    },

    role : {
        type : String,
        required : true,
        enum : ["admin", "customer"],
        default : "customer"
    },

    isblocked : {
        type : Boolean,
        default : false
    },

    isEmailVerified : {
        type : Boolean,
        default : false
    },

    image :  {
        type : String,
        default : "/images/default.jpg"
    },
});

const User = mongoose.model('User', user);

export default User;