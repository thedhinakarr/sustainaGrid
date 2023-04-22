import express from "express";
import multer from "multer";
import { isAuthenticated } from "../../middleware/authValidation.js";
import Approval from "../../models/Approvals.js";

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
      cb(null, "./assets/proposalFiles");
    },
  
    filename: function (req, file, cb) {
      let ext = file.mimetype.split("/")[1];
      cb(null, file.fieldname + "-" + Date.now() + "." + "pdf");
    },
  
});

const upload = multer({ storage: storage });

let router = express.Router();

router.post("/addApproval",isAuthenticated,upload.single('proposal'),async (req,res)=>{
    try {
        console.log(req.file);

        let filename = req.file.filename;
        let proposalFileUrl = `/api/approvals/file/${filename}`;

        let newProposal = new Approval({
            "proposalBy":req.payload.id,
            proposalFileUrl
        })

        await newProposal.save();

        res.status(200).json(newProposal);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({"message":"Internal server error"});
    }
});

router.post("/acceptApproval/:approvalId",isAuthenticated,async (req,res)=>{
    try {
        if(req.payload.id != "643fbf124d159f872deee32d"){
            res.status(401).json({"message":"Unauthorised"});
        }

        let foundApproval = await Approval.findOne({_id:req.params.approvalId});

        if(!foundApproval){
            res.status(404).json({"message":"Proposal not found"});
        }

        await Approval.updateOne({_id:req.params.approvalId},{ $set: { isApproved: true, state:"Approved" }});

        res.status(200).json({"message":"Proposal Approved, you can continue to buy."});

    } catch (error) {
        console.log(error);
        res.status(500).json({"message":"Internal server error"});
    }
})

router.post("/rejectApproval/:approvalId",isAuthenticated,async (req,res)=>{
    try {
        if(req.payload.id != "643fbf124d159f872deee32d"){
            res.status(401).json({"message":"Unauthorised"});
        }

        let foundApproval = await Approval.findOne({_id:req.params.approvalId});


        if(!foundApproval){
            res.status(404).json({"message":"Proposal not found"});
        }

        await Approval.updateOne({_id:req.params.approvalId},{ $set: { isApproved: false, state:"Rejected" }});
        res.status(200).json({"message":"Proposal Rejected, the proposal does not comply to government norms"});   
             
    } catch (error) {
    console.log(error);
    res.status(500).json({"message":"Internal server error"}); 
    }
})

router.get("/getAllApprovals",isAuthenticated,async (req,res)=>{
    try {
        if(req.payload.id != "643fbf124d159f872deee32d"){
            res.status(401).json({"message":"Unauthorised"});
        }

        let x = await Approval.find();

        res.status(200).json(x);
    } catch (error) {
        console.log(error);
        res.status(500).json({"message":"internal server error"});
    }
})


export default router;

