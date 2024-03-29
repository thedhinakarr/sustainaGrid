import express from "express";
import multer from "multer";
import Stripe from "stripe";

import User from "../../models/User.js";
import Source from "../../models/Sources.js";
import { isAuthenticated } from "../../middleware/authValidation.js";
import fs from "fs/promises";

//Need to change this. Vulnerable information is being displayed.Use config.
const stripe = Stripe(`sk_test_51MyvmbSGiNjG3rZcOfyOBofLOfZ2oyBYOv4hmuaJ0xmXZyFub3XLThUqtUDzdeECB1V95EG2tLtrAhhtOyToT05V0045wTunku`);
const router = express.Router();

//Source storage engine, stores the source's images.
//Images are stored on the server. /assets/sourceImages
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

/* A total of 11 API endpoints here. */
//API endpoint to buy a source, needs the source id.
router.post("/buySource/:sourceId", isAuthenticated, async (req, res) => {
    try {
        console.log(req.params.sourceId);
        let foundSource = await Source.findOne({_id:req.params.sourceId});
        let foundUser = await User.findOne({_id:req.payload.id});
        console.log(foundSource);

        //Hitting the stripe's API, will create take us to the checkout page of stripe.
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

//Creates a new source in the database, hit after approval by the govt.
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

        // Need to create a new product in the catalog of stripe in order to process
        // when someone buys a source.
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
        /*
         The created product also needs to have a mechanisms to support subscription.
         The following code initiates a subscription functionality for the added source.
        */
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

        //Final creation of the source, this data is added to the database.
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

//Editing a source's information, should be done only by the govt.
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

//Returns information of all the sources.
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

//Returns the coordinates of all the sources in the database.
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

//Returns the sources owned by the logged user.
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

//Returns all the sources eligible for sale.
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

//Returns all sources owned by someone, should be accessed by govt only.
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

//Returns the sources information based on the params.
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

//Peculiar endpoint, should essentially be hit when ownership of a source changes.
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

//Adds price ID to a Source.
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