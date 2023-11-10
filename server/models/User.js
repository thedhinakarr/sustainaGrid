import mongoose from "mongoose";

let userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required:true,
            maxLength:40
        },
        email: {
            type: String,
            required: true,
            unique: true,
            maxLength: 70,
        },
        password: {
            type: String,
            required: true
        },
        ownings:{
            type: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Source' }],
            default:[]
        },
        subscriptions:{
            type: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Subscription' }],
            default:[]
          },
        isProd:{
            type: Boolean,
            default:false
        },
        isConsumer:{
            type: Boolean,
            default:false
        },
        approvals:{
            type: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Approvals' }],
            default:[]
        },
        locationString:{
            type:String,
            required:true
        },
        locationLat:{
            type:Number,
            required:true
        },
        locationLong:{
            type:Number,
            required:true
        },
        imageUrl:{
            type: String,
            required: false
        },
        twitterUrl:{
            type: String,
            required: false
        }
    },
    {timestamps:true}
);

let User = mongoose.model("User",userSchema);

export default User;