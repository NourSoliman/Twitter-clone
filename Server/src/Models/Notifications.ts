import mongoose from "mongoose";
const NotificationSchema = new mongoose.Schema({
    type:{
        type:String,
    },
    body:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:`Users`,
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: `Posts`,
    },
    likedUserId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:`Users`
    },
    read: {
        type: Boolean,
        default: false,
    },
})
const Notifications = mongoose.model(`Notifications` , NotificationSchema)
export default Notifications