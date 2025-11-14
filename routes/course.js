const Router = require("express");
const courseRouter = Router();
const { CourseModel } = require("../db");
const { userMiddleware } = require("../middleware/user");

courseRouter.post("/purchase",userMiddleware , function (req, res) {
    
});

courseRouter.get("/perview", function (req, res) {

});

module.exports = {
    courseRouter:  courseRouter
}
