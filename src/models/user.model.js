import mongoose , {Schema} from "mongoose";

const userSchema = new Schema({
    avatar:{
        type:{
            url:String,
            localpath:String
        },
        default:{
            url:`https://placehold.co/400`,
            localpath:""
        },


    },

    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        // index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        // index:true
    },
    fullname:{
        type:String,
        required:true,
        
    },
    password:{
        type:String,
        required:[true,"password is required"],
       
    },
     password:{
        type:String,
        required:[true,"password is required"],
       
    },
   



},{timestamps:true});


export const User = mongoose.model("User",userSchema);

