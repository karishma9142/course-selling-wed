
const jwt = require("jsonwebtoken");
const {JWT_ADMIN_SECRET} = require("../config");
const { AdminModel } = require("../db");


async function adminMiddleware(req, res, next) {
    try {
        const token = req.headers.token;
        if (!token) {
            return res.status(401).json({ msg: "Token missing" });
        }
        const decoded = jwt.verify(token, JWT_ADMIN_SECRET);
        const userId = decoded.id;

        const foundUser =await AdminModel.findById(userId);
        if (!foundUser) {
            return res.status(403).json({
                msg: "wrong credentials"
            })
        }
        req.userId = userId;
        next();
    } catch (error) {
        console.error("JWT verification error:", error.message);
        res.status(401).json({ msg: "Invalid or expired token" });
    }

}

module.exports = {
    adminMiddleware: adminMiddleware
}