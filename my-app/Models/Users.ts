    import mongoose from "mongoose";
    const randomBios = [
        "Hey! I'm new here :)",
        "Exploring the world one step at a time",
        "Coffee lover ☕",
        "Adventure seeker 🌍",
        "Nature enthusiast 🌿",
        "Bookworm 📚",
        "Tech geek 🖥️",
      ];
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
            default:"",
            maxLength:200,
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
        followerIds:{
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
    userSchema.pre("save",async function(next) {
        if(!this.bio){
            const randomIndex = Math.floor(Math.random()*randomBios.length)
            this.bio = randomBios[randomIndex]
        }
        next();
    })
    const Users = mongoose.model(`Users`,userSchema)
    export default Users
