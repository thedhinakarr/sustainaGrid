import mongoose from "mongoose";

let proposalSchema  = new mongoose.Schema(
    {
        name:{
            type:String
        },

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
        },

        proposedResourceType:{
            type: String,
            required: true
        },

        proposedEnergyType:{
            type:String,
            required: true
        },
    
        proposedEnergyGenerated:{
            type:String,
            required: true
        },
    
        proposedSourceCost:{
            type: Number,
            required: true
        },
    
        proposedSubscriptionPrice:{
            type: Number,
            required:true
        },

        imageUrl:{
            type:String,
        },
    
        description:{
            type:String,
            required:true
        },
        
        locationString:{
            type: String,
            required:true
        },
    
        locationLat:{
            type: Number,
            required:true
        },
    
        locationLong:{
            type: Number,
            required:true
        }


    },{timestamps:true}
)

let Proposal = new mongoose.model("Proposal",proposalSchema);

export default Proposal;