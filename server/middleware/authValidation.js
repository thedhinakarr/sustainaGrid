import jwt from "jsonwebtoken";
import config from "config";

//this function generates the jwt token, 
//which will be used to authenticate the requests made by the client.
const generateToken = (payload)=>{
    try {
        const token = jwt.sign(payload,config.get(`JWT_SECRET`),{expiresIn:`24h`});
        return token;
    } catch (error) {
        console.log(error);
        return;
    }
};

//Everytime a request is hits an API endpoint on the server, this fuction is invoked, 
//which checks the authenticity of the the client trying to make the request.
const isAuthenticated = (req,res,next)=>{
    try {
        let token = req.headers["auth-token"];
        let payload = jwt.verify(token,config.get("JWT_SECRET"));
        console.log(payload);
        req.payload = payload;
        return next();
    } catch (error) {
        console.error(error);
        res.status(401).json({error:"Invalid Token/Token expired"});
    }
};

export {isAuthenticated,generateToken};