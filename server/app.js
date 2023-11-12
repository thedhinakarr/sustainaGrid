import express from "express";
import config from "config";
import dbConnect from "./dbConnect.js";

import userRouter from "./controllers/user/index.js"
import sourceRouter from "./controllers/sources/index.js"
import subscriptionRouter from "./controllers/subscriptions/index.js"
import approvalRouter from "./controllers/approvals/index.js";
import AIrouter from "./controllers/AIController/index.js";

const app = express();
const port = config.get("PORT")

app.use(express.json())

//Serving static files
app.use("/api/user/pic",express.static("./assets/profileImages"));
app.use("/api/source/pic",express.static("./assets/sourceImages"));
app.use("/api/approvals/file",express.static("./assets/proposalFiles"));

//Main routes...
app.use("/api/user/",userRouter);
app.use("/api/sources/",sourceRouter);
app.use("/api/subscriptions/",subscriptionRouter);
app.use("/api/approvals/",approvalRouter);
app.use("/api/ai/",AIrouter);

/* A total of 34 API endpoints as of 11/11/23 */

app.get("/", (req,res)=>{
    res.send("Server is up")
})

app.listen(port, ()=>{
    console.log("Listening on port",port)
} )