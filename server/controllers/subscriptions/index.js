import express from "express";
import Stripe from "stripe";

import User from "../../models/User.js";
import Source from "../../models/Sources.js";
import Subscription from "../../models/Subscriptions.js";

import { isAuthenticated } from "../../middleware/authValidation.js";

const stripe = Stripe(`sk_test_51MyvmbSGiNjG3rZcOfyOBofLOfZ2oyBYOv4hmuaJ0xmXZyFub3XLThUqtUDzdeECB1V95EG2tLtrAhhtOyToT05V0045wTunku`);
const router = express.Router();

router.post("/addSubscription/:sourceId",isAuthenticated,async (req,res)=>{
    try {

        console.log(req.params.sourceId);
        console.log(req.payload);

        let foundUser = await User.findOne({_id:req.payload.id});
        let foundSource = await Source.findOne({_id:req.params.sourceId})

        const session = await stripe.checkout.sessions.create({
            line_items: [
              {
                price: foundSource.priceId,
                quantity: 1,
              },
            ],
            mode: 'subscription',
            success_url: `http://localhost:3000/consumerDashBoard`,
            cancel_url: `http://localhost:3000/rejected`,
        });
          
        console.log(session.url)

        let newSub = new Subscription({
            "subscribedTo":foundSource._id,
            "subscribedBy":foundUser._id
        });

        await newSub.save();
        await Source.updateOne({_id:foundSource._id}, { $push: { "subscriptions": newSub._id }});
        await User.updateOne({_id:foundUser._id}, { $push: { "subscriptions": newSub._id} });
        res.status(200).json(session.url);

    } catch (error) {
        console.log(error);
        res.status(500).json({"message":"internal server error"});
    }
})

router.delete("/deleteSubscription/:subId",isAuthenticated,async (req,res)=>{
    try {
        console.log(req.params.subId);
        
        let foundUser = await User.findOne({_id:req.payload.id});
        let foundSub = await Subscription.findOne({_id:req.params.subId});
        let foundSource = await Source.findOne({_id:foundSub.subscribedTo[0]._id});
        console.log(foundSub);

        await Source.updateOne({_id:foundSource._id}, { $pull: { "subscriptions": foundSub._id }});
        await User.updateOne({_id:foundUser._id}, { $pull: { "subscriptions": foundSub._id} });
        await Subscription.deleteOne({_id:foundSub._id})

        res.status(200).json({"message":"Subscription ended successfully"});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({"message":"internal server error"})
    }
})

router.get("/getSubInformationByToken",isAuthenticated,async (req,res)=>{
    try {
        console.log(`User ID--> ${req.payload.id}`);

        let foundSub = await Subscription.find({subscribedBy:req.payload.id});
        console.log(foundSub);

        res.status(200).json(foundSub);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({"message":"internal server error"});
    }
})

router.get("/getSubInformationByUserId/:userId",isAuthenticated,async (req,res)=>{
    try {
        console.log(`User ID--> ${req.params.userId}`);

        let foundSub = await Subscription.find({subscribedBy:req.params.userId});
        console.log(foundSub);

        res.status(200).json(foundSub);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({"message":"internal server error"});
    }
})

router.get("/getSubInformationBySourceId/:sourceId",isAuthenticated,async (req,res)=>{
    try {
        console.log(`User ID--> ${req.params.sourceId}`);

        let foundSub = await Subscription.find({subscribedTo:req.params.sourceId});
        console.log(foundSub);

        res.status(200).json(foundSub);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({"message":"internal server error"});
    }
})


export default router;
