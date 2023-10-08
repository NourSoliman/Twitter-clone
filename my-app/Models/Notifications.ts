import mongoose from "mongoose";
const NotificationSchema = new mongoose.Schema({
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
})
const Notifications = mongoose.model(`Notifications` , NotificationSchema)
export default Notifications