const jwt = require('jsonwebtoken');
const dontenv = require('dotenv');
const User = require('../models/User');

dontenv.config();

const autheticate = async (req, res, next) => {

    //check the Token
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ message: "UnAuthoried.. authHeader missing" })
    }
    //if header is available then extract token for the same.
    const token = authHeader.replace('Bearer ', "");

    if (!token) {
        return res.status(401).json({ message: "UnAuthoried.. token missing" })
    }
    try {
        //verify and decode the Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById({ _id: decoded._id }, { password: 0 });
        //check if the User Exist
        if (!user)
            return res.status(401).json({ message: "UnAuthoried.." })
        req.user=user;
        //proceed to route
        next(); 
    } catch (error) {
        return res.status(401).json({message:"UnAuthoried.."})
    }
}

module.exports= {autheticate};