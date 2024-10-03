const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();
async function usermiddleware(req,res,next){
    const token = req.headers.token;

    if(!token){
        return res.status(401).json({message:"No token provided"});
    }

    try{
        const decoded = jsonwebtoken.verify(token,process.env.USER_SECRET);
        req.userId = decoded._id;
        next();

    }catch(e){
        res.status(403).json({message:"Failed to autenticate token"});
    }
}

module.exports = {
    usermiddleware
}