import mongoose from "mongoose";

let subscriptionSchema = new mongoose.Schema(
    {

        subscribedTo:{
             type: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Source' }],
             default:[]
        },

        subscribedBy:{
            type: [{ type : mongoose.Schema.Types.ObjectId, ref: 'User' }],
            default:[]
        }
    }, {timestamps:true}
)


let Subscription = new mongoose.model("Subscription",subscriptionSchema);

export default Subscription;