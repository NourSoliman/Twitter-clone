import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    confirmPassword:{
        type:String,
        required:true,
    },
    bio:{
        type:String,
    },
    image:{
        type:String,
    },
    profileImage:{
        type:String,
    },
    coverImage:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    updatedAt:{
        type:Date,
        default:Date.now,
    },
    followingIds:{
        type:Array,
    },
    hasNotification:{
        type:Boolean,
    },
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:`Posts`
    }],
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:`Comments`
    }],
    notifications:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:`Notifications`
    }]
})
const Users = mongoose.model(`Users`,userSchema)
export default Users