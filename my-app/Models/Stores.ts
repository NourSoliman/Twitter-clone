import mongoose from "mongoose"
const storeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    userName:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    updatedAt:{
        type:Date,
        default:Date.now,
    }
})
const Store = mongoose.model(`Store`, storeSchema);
module.exports=Store