const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const token = req.header("auth-token");
    if(!token) {
        return res.status(401).json({
            msg: "Unauthorised Access",
            _help: "You do not have the permission to make this request."
        })
    }

    try{
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    }catch(err) {
        res.status(400).json({
            msg: "Invalid Token",
            _help: "Token must have expired, try logging in again."
        })
    }


} 


module.exports = verifyToken;

