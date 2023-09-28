import express from "express";
import multer from "multer";
import Stripe from "stripe";

import User from "../../models/User.js";
import Source from "../../models/Sources.js";
import { isAuthenticated } from "../../middleware/authValidation.js";
import fs from "fs/promises";

const stripe = Stripe(`sk_test_51MyvmbSGiNjG3rZcOfyOBofLOfZ2oyBYOv4hmuaJ0xmXZyFub3XLThUqtUDzdeECB1V95EG2tLtrAhhtOyToT05V0045wTunku`);
const router = express.Router();

const sourceStorage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, "./assets/sourceImages/");
    },

    filename: function (req, file, cb) {
        let ext = file.mimetype.split("/")[1];
        cb(null, file.fieldname + "-" + Date.now() + "." + ext);
    },

});

const uploadSource = multer({ storage: sourceStorage });

router.post("/buySource/:sourceId", isAuthenticated, async (req, res) => {
    try {
        console.log(req.params.sourceId)
        let foundSource = await Source.findOne({_id:req.params.sourceId});
        let foundUser = await User.findOne({_id:req.payload.id});
        console.log(foundSource);

        const session = await stripe.checkout.sessions.create({
            line_items: [
              {
                price: foundSource.priceId,
                quantity: 1,
              },
            ],
            mode: 'payment',
            success_url: `http://localhost:3000/producerDashBoard`,
            cancel_url: `http://localhost:3000/pRejection`,
        });

       console.log(session.url);

       await Source.updateOne({_id:foundSource._id},{ $push: { "ownedBy":foundUser._id}});
       await User.updateOne({_id:foundUser._id},{$push:{"ownings":foundSource._id}});

        res.status(200).send(session.url)

    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "Internal server error" });
    }
})

router.post("/addSource", isAuthenticated, async (req, res) => {
    try {

        let { name, resourceType, energyType, energyGenerated, sourceCost, subscriptionPrice, maxCapacity, description, locationString, locationLat, locationLong } = req.body;
        console.log(req.body);

        let findEmail = await User.findOne({ _id: req.payload.id });

        if (!findEmail) {
            return res.status(400).json({ message: "Unauthorized" });
        }
        
        console.log(findEmail);
        if (findEmail._id != "644ba9a86b47fdea44b2380f") {
            return res.status(400).json({ message: "Unauthorized" });
        }

        // source.
        const product = await stripe.products.create({
            name: name,
        });
        console.log(product);

        const pricex = await stripe.prices.create({
            unit_amount: sourceCost,
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
            unit_amount: subscriptionPrice,
            currency: 'inr',
            recurring: {interval: 'month'},
            product: sproduct.id,
        });

        console.log(spricex);

        let source = new Source({
            name,
            resourceType,
            energyType,
            energyGenerated,
            sourceCost,
            subscriptionPrice,
            maxCapacity,
            description,
            locationString,
            locationLat,
            locationLong,

            productId:product.id,
            priceId:pricex.id,
            
            sProductId:sproduct.id,
            sPriceId:spricex.id,
        })

        await source.save();
        res.status(200).json({ message: "source added." });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
})

router.post("/editSourceProfile/:sourcename",  uploadSource.single('picture'), async (req, res) => {
    try {
        console.log(req.file);

        // if (req.payload.id != "643fbf124d159f872deee32d") {
        //     return res.status(400).json({ message: "Unauthorized" });
        // }

        let foundSource = await Source.findOne({ name: req.params.sourcename });

        if (!foundSource) {
            res.status(404).json({ "message": "Source not found" });
        }

        let filename = req.file.filename;
        let imageUrl = `/api/source/pic/${filename}`;

        let updatedImg = await Source.updateOne({ _id: foundSource.id }, { $set: { "imageUrl": imageUrl } })

        res.status(200).json({ "message": "profile updated successfully", updatedImg });

    } catch (err) {
        console.log(err);
        res.status(500).json({ "message": "internal server error" });
    }

})

router.get("/getAllSources", isAuthenticated, async (req, res) => {
    try {
        console.log(req.payload);
        let x = await Source.find();
        res.status(200).send(x);
    } catch (err) {
        console.log(err);
        res.status(500).json({ "message": "internal server error" });
    }
})

router.get("/getAllSourcesLatLong", isAuthenticated, async (req, res) => {
    try {
        console.log(req.payload);
        let x = await Source.find();
        let y = x.map((ele) => {
            return { "lat": ele.locationLat, "lng": ele.locationLong };
        })
        res.status(200).send(y);
    } catch (err) {
        console.log(err);
        res.status(500).json({ "message": "internal server error" });
    }
})

router.get("/getSourcesByToken", isAuthenticated, async (req, res) => {
    try {
        console.log(req.payload);
        let x = await Source.find({ ownedBy: req.payload.id });
        res.status(200).send(x);
    } catch (err) {
        console.log(err);
        res.status(500).json({ "message": "internal server error" });
    }
})

router.get("/getAllSourcesWithoutOwners", async (req, res) => {
    try {
        console.log(req.payload);
        let x = await Source.find({ ownedBy: [] });
        res.status(200).send(x);
    } catch (err) {
        console.log(err);
        res.status(500).json({ "message": "internal server error" });
    }
})

router.get("/getAllSourcesWithOwners", async (req, res) => {
    try {
        console.log(req.payload);
        let x = await Source.find({ ownedBy:{$exists: true, $not: { $size: 0 }}});
        res.status(200).send(x);
    } catch (err) {
        console.log(err);
        res.status(500).json({ "message": "internal server error" });
    }
})


router.get("/getSourceById/:id", isAuthenticated, async (req, res) => {
    try {
        console.log(req.params.id)
        let x = await Source.find({ _id: req.params.id });
        res.status(200).json(x);
    } catch (err) {
        console.log(err);
        res.status(500).json({ "message": "internal server error" });
    }
})

router.post("/editownerShip/:sourceName", isAuthenticated, async (req, res) => {
    try {
        console.log(req.body)
        if (req.payload.id != "643fbf124d159f872deee32d") {
            return res.status(400).json({ message: "Unauthorized" });
        };

        let foundUser = await User.findOne({ _id: req.body.id });
        let foundSource = await Source.findOne({ name: req.params.sourceName });

        console.log(foundSource);

        await Source.updateOne({ _id: foundSource._id }, { $push: { "ownedBy": foundUser._id } });
        await User.updateOne({ _id: foundUser._id }, { $push: { "ownings": foundSource._id } });

        res.status(200).json({ "source": "Ownership updated successfully." });

    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "internal server error" })

    }
})

router.post("/addStripePriceId/:sourcename", isAuthenticated, async (req, res) => {
    try {
        console.log(req.body.priceId);

        let foundSource = await Source.findOne({ "name": req.params.sourcename });

        await Source.updateOne({ _id: foundSource._id }, { $set: { "priceId": req.body.priceId } })

        res.status(200).json({ "message": "Successful" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "internal server error" });
    }
})

export default router;