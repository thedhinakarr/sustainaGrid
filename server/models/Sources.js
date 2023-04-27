import mongoose from "mongoose";


let sourceSchema = new mongoose.Schema({

    name:{
        type: String,
        required:true,
        maxLength:40
    },

    resourceType:{
        type: String,
        required: true
    },

    energyType:{
        type:String,
        required: true
    },

    energyGenerated:{
        type:String,
        required: true
    },

    ownedBy:{
        type: { type : mongoose.Schema.Types.ObjectId, ref: 'User' },
        default:[]
    },

    subscriptions:{
        type: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Subscription' }],
        default:[]
    },

    sourceCost:{
        type: Number,
        required: true
    },

    subscriptionPrice:{
        type: Number,
        required:true
    },

    numberOfPeopleSubscribed:{
        type: Number,
        default: 0
    },

    maxCapacity:{
        type: Number,
        required:true
    },

    imageUrl:{
        type:String,
    },

    description:{
        type:String,
    },
    
    locationString:{
        type: String,
        required:true
    },

    locationLat:{
        type: Number,
        required:true
    },

    locationLat:{
        type: Number,
        required:true
    },

    locationLong:{
        type: Number,
        required:true
    },

    priceId:{
        type:String,
    },

    productId:{
        type:String
    },

    sPriceId:{
        type:String,
    },

    sProductId:{
        type:String
    }
    

},{timestamps:true})

let Source = new mongoose.model("Source",sourceSchema);

export default Source;