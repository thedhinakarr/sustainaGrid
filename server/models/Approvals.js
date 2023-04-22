import mongoose from "mongoose";

let approvalSchema  = new mongoose.Schema(
    {
        proposalBy:{
            type: [{ type : mongoose.Schema.Types.ObjectId, ref: 'User' }],
            default:[]
        },
        isApproved:{
            type:Boolean,
            default:false
        },
        state:{
            type:String,
            default:"pending"
        },
        proposalFileUrl:{
            type:String,
            required:true,
        }
    },{timestamps:true}
)

let Approval = new mongoose.model("Approval",approvalSchema);

export default Approval;