import mongoose from "mongoose";
const CommentSchema = new mongoose.Schema({
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
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:`Posts`
    }
})
const Comments = mongoose.model(`Comments` , CommentSchema)
export default Comments