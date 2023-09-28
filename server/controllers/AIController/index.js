import express from "express";
import { openai } from "../../fineTunedModel/api.js";

import { isAuthenticated } from "../../middleware/authValidation.js";

const router = express.Router();

router.post("/chat",isAuthenticated,async (req,res)=>{
    try {
    console.log(req.body);
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: req.body.query}],
    });
    res.status(200).json(completion.data.choices[0].message.content);
    } catch (error) {
        console.log(error.data);
        res.status(500).json({"message":"internal server error"});
    }
})

export default router;