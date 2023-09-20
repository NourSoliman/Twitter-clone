import mongoose from "mongoose";
const PostsSchema = new mongoose.Schema({
    body:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    updatedAt:{
        type:Date,
        default:Date.now,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:`Users`,
    },
    likedIds:{
        type:Array,
    }
})
const Posts = mongoose.model(`Posts` , PostsSchema)
export default Posts