import express from "express";
import multer from "multer";
import { isAuthenticated } from "../../middleware/authValidation.js";
import Proposal from "../../models/Proposals.js";
import User from "../../models/User.js";
import Source from "../../models/Sources.js";

import Stripe from "stripe";
const stripe = Stripe(`sk_test_51MyvmbSGiNjG3rZcOfyOBofLOfZ2oyBYOv4hmuaJ0xmXZyFub3XLThUqtUDzdeECB1V95EG2tLtrAhhtOyToT05V0045wTunku`)



const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, "./assets/proposalFiles");
    },

    filename: function (req, file, cb) {
        let ext = file.mimetype.split("/")[1];
        cb(null, file.fieldname + "-" + Date.now() + "." + ext);
    },

});


const upload = multer({ storage: storage });

let router = express.Router();

router.post("/addProposal", isAuthenticated, upload.fields([
    { name: 'proposal' },
    { name: 'picture'}
  ]
  ), async (req, res) => {
    try {
        console.log(req.files.proposal[0]);
        console.log(req.files.picture[0]);
        console.log(req.body.data);
       let body = JSON.parse(req.body.data);
        console.log(body);
        let proposalfilename = req.files.proposal[0].filename;
        let imagefilename = req.files.picture[0].filename;

        let proposalFileUrl = `/api/approvals/file/${proposalfilename}`;
        let imageUrl = `/api/approvals/file/${imagefilename}`;

        let newProposal = new Proposal({

            proposalBy: req.payload.id,
            proposalFileUrl,
            imageUrl,
            name:body.name,
            proposedResourceType:body.proposedResourceType,
            proposedEnergyType:body.proposedEnergyType,
            proposedEnergyGenerated:body.proposedEnergyGenerated,
            proposedSourceCost:body.proposedSourceCost,
            proposedSubscriptionPrice:body.proposedSubscriptionPrice,
            description:body.description,
            locationString:body.locationString,
            locationLat:body.locationLat,
            locationLong:body.locationLong
        })
        console.log(newProposal)
        await newProposal.save();

        res.status(200).json({"message":`proposal ${newProposal._id} sent to govt. Stay tuned for updates in the approvals section!`});

    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "Internal server error" });
    }
});

router.post("/acceptProposal/:proposalId", isAuthenticated, async (req, res) => {
    try {

        if (req.payload.id != "644ba9a86b47fdea44b2380f") {
            res.status(401).json({ "message": "Unauthorised" });
        }

        let foundProposal = await Proposal.findOne({ _id: req.params.proposalId });

        if (!foundProposal) {
            res.status(404).json({ "message": "Proposal not found" });
        }
        
        let {name,proposedResourceType,proposedEnergyType,proposedEnergyGenerated,proposedSourceCost,proposedSubscriptionPrice,description,locationString,locationLat,locationLong,imageUrl} = foundProposal;

        // source.
        const product = await stripe.products.create({
            name: name,
        });
        console.log(product);

        const pricex = await stripe.prices.create({
            unit_amount: proposedSourceCost,
            currency: 'inr',
            product: product.id,
        });

        console.log(pricex);

        //subscription.
        const sproduct = await stripe.products.create({
            name: `${name}-S`,
        });
        console.log(sproduct);
        const spricex = await stripe.prices.create({
            unit_amount: proposedSubscriptionPrice,
            currency: 'inr',
            recurring: {interval: 'month'},
            product: sproduct.id,
        });

        console.log(spricex);

        let source = new Source({
            name,
            resourceType:proposedResourceType,
            energyType:proposedEnergyType,
            energyGenerated:proposedEnergyGenerated,
            sourceCost:proposedSourceCost,
            subscriptionPrice:proposedSubscriptionPrice,
            description,
            locationString,
            locationLat,
            locationLong,
            imageUrl,
            maxCapacity:30,
            productId:product.id,
            priceId:pricex.id,
            sProductId:sproduct.id,
            sPriceId:spricex.id,
        });

        await source.save();
        await Proposal.updateOne({ _id: req.params.proposalId }, { $set: { isApproved: true, state: "Approved" } });

        res.status(200).json({ "message": "Proposal Approved, Check the Producer market" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "Internal server error" });
    }
})

router.post("/rejectApproval/:approvalId", isAuthenticated, async (req, res) => {
    try {
        if (req.payload.id != "643fbf124d159f872deee32d") {
            res.status(401).json({ "message": "Unauthorised" });
        }

        let foundApproval = await Proposal.findOne({ _id: req.params.approvalId });


        if (!foundApproval) {
            res.status(404).json({ "message": "Proposal not found" });
        }

        await Approval.updateOne({ _id: req.params.approvalId }, { $set: { isApproved: false, state: "Rejected" } });
        res.status(200).json({ "message": "Proposal Rejected, the proposal does not comply to government norms" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "Internal server error" });
    }
})

router.get("/getAllApprovals", isAuthenticated, async (req, res) => {
    try {
        if (req.payload.id != "644ba9a86b47fdea44b2380f") {
            res.status(401).json({ "message": "Unauthorised" });
        }

        let x = await Proposal.find();

        res.status(200).json(x);
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "internal server error" });
    }
})

router.get("/getApprovalsByToken", isAuthenticated, async (req, res) => {
    try {
        let x = await Proposal.find({proposalBy:req.payload.id});
        res.status(200).json(x);
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "internal server error" });
    }
})


router.get("/getApprovalById/:id", isAuthenticated, async (req, res) => {
    try {
        let x = await Proposal.find({_id:req.params.id});
        res.status(200).json(x);
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "internal server error" });
    }
})


export default router;

