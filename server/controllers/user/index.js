import express from "express";
import config from "config";
import bcrypt from "bcrypt";
import multer from "multer";
import jwt from "jsonwebtoken";

import User from "../../models/User.js";
import { registerValidations, loginValidations, errorMiddleWare } from "../../middleware/generalValidations.js";
import { generateToken } from "../../middleware/authValidation.js";
import { isAuthenticated } from "../../middleware/authValidation.js";

const router = express.Router();

//A storage engine instantiated 
//to upload the user profile images stored in /assets/profileImages
//Beware, the images are stored on the server not the database.
const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, "./assets/profileImages");
    },

    filename: function (req, file, cb) {
        let ext = file.mimetype.split("/")[1];
        cb(null, file.fieldname + "-" + Date.now() + "." + ext);
    },

});

const upload = multer({ storage: storage });

//A total of 11 API endpoints here.

router.post("/register", registerValidations(), errorMiddleWare, async (req, res) => {
    try {
        let { name, email, password, locationString, locationLat, locationLong } = req.body;
        //Object deconstruction

        console.log(req.body);

        let findEmail = await User.findOne({ email: req.body.email });

        if (findEmail) {
            return res.status(409).json({ error: "User already exists" });
        }

        let hashedPassword = await bcrypt.hash(password, 12);

        let user = new User({
            name,
            email,
            password: hashedPassword,
            locationString,
            locationLat,
            locationLong,
        });

        console.log(user);

        await user.save();

        return res.status(200).json({ message: "User registered successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ "message": "internal server error" })
    }
});

router.post("/login", loginValidations(), errorMiddleWare, async (req, res) => {
    try {
        let { email, password } = req.body;

        let findEmail = await User.findOne({ email: email });

        if (!findEmail) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        let match = await bcrypt.compare(password, findEmail.password)

        if (!match) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        let payload = {
            id: findEmail.id,
            email: findEmail.email,
        }

        let token = generateToken(payload);

        return res.status(200).json(
            {
                message: "Login Successful",
                token
            }
        );

    } catch (err) {
        console.log(error);
        res.status(500).json({ "message": "internal server error" })
    }
});

router.post("/auth", async (req, res) => {
    try {
        console.log(req.body.token);
        let letgov = jwt.verify(req.body.token, config.get("JWT_SECRET"));
        console.log(letgov);
        return res.status(200).json(letgov);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Unauthorized." });
    }
});

router.post("/editUserProfile", isAuthenticated, upload.single('picture'), async (req, res) => {
    try {
        console.log(req.payload);

        let foundUser = await User.findOne({ _id: req.payload.id });
        if (!foundUser) {
            res.status(404).json({ "message": "User not found" });
        }

        let filename = req.file.filename;
        let imageUrl = `/api/user/pic/${filename}`;

        let updatedImg = await User.updateOne({ _id: req.payload.id }, { $set: { "imageUrl": imageUrl } })
        console.log(updatedImg);
        let updatedUser = await User.findOne({ _id: req.payload.id });
        res.status(200).json({ "message": "Image updated successfully", updatedUser })

    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "Internal server error" });
    }
})

//Returns user details based on the payload in jwt.
router.get("/getUserByToken", isAuthenticated, async (req, res) => {
    try {
        console.log(req.payload);

        let foundUser = await User.findOne({ _id: req.payload.id });

        if (!foundUser) {
            res.status(404).json({ "message": "User not found" })
        }
        else {
            res.status(200).json({ "user": foundUser })
        }
    } catch (err) {
        res.status(500).json({ "message": "internal server error" })
    }
});

//Returns user details based on the id of the user in the params.
router.get("/getUserDetailsById/:id", isAuthenticated, async (req, res) => {
    try {
        let token = req.params.id;
        console.log(token);
        let foundUser = await User.findOne({ _id: token });
        if (!foundUser) {
            res.status(404).json({ "Message": "User not found" });
        }
        else {
            res.status(200).json({ "user": foundUser })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "Internal server error" })
    }
})

//Returns the location string of the user based on the payload.
router.get("/getLocationString", isAuthenticated, async (req, res) => {
    try {

        let foundUser = await User.findOne({ _id: req.payload.id });

        if (!foundUser) {
            res.status(404).json({ "message": "User not found" })
        }
        else {
            res.status(200).json({ "locationString": foundUser.locationString })
        }

    } catch (err) {
        res.status(500).json({ "message": "internal server error" })
    }
});

//Returns the location coordinates of the user based on the payload.
router.get("/getLatLong", isAuthenticated, async (req, res) => {
    try {
        console.log(req.payload)
        let foundUser = await User.findOne({ _id: req.payload.id });

        if (!foundUser) {
            res.status(404).json({ "message": "User not found" })
        }
        else {
            res.status(200).json({ "lat": foundUser.locationLat, "long": foundUser.locationLong })
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({ "message": "internal server error" })
    }
});

//Returns the location coordinates of all the users in the database. Should be accessed by govt only.
router.get("/getAllLatLong", isAuthenticated, async (req, res) => {
    try {
        console.log(req.payload);
        let x = await User.find();

        let y = x.map((ele) => {
            return { "lat": ele.locationLat, "lng": ele.locationLong };
        })

        res.status(200).json(y);
    } catch (err) {
        res.status(500).json({ "message": "internal server error" })
    }
});

//Returns the locations strings of all the users in the database. Should be only government.
router.get("/getAllLocationStrings", isAuthenticated, async (req, res) => {
    try {
        console.log(req.payload);
        let x = await User.find();

        let y = x.map((ele) => {
            return { "stringL": ele.locationString };
        })

        res.status(200).json(y);
    } catch (err) {
        res.status(500).json({ "message": "internal server error" })
    }
});

//Returns the location coordinates of a user whose id is give in the params of the request.
router.get("/getLatLongById/:id", isAuthenticated, async (req, res) => {
    try {
        console.log(req.params.id);

        let u = await User.find({ _id: req.params._id });

        res.status(200).json({ "lat": u.locationLat, "long": u.locationLong });

    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "Internal server error" });
    }
})

export default router;
