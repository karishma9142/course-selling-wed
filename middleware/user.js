const { JWT_USER_SECRET } = require("../config");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../db");

async function userMiddleware(req, res, next) {
    try {
        const token = req.headers.token;
        if (!token) {
            return res.json({
                msg: "token missing"
            })
        }
        const decoded = jwt.verify(token, JWT_USER_SECRET);
        const userId = decoded.id;
        const foundUser =await UserModel.findById(userId);

        if (!foundUser) {
            return res.json({
                msg: "wrong credentials"
            })
        }
        req.userId = userId;
        next();
    }catch(error){
        console.error("JWT verification error:", error.message);
        res.status(401).json({ msg: "Invalid or expired token" });
    }
}

module.exports = {
    userMiddleware : userMiddleware
}