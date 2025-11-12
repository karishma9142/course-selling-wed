const Router = require("express");
const courseRouter = Router();
const { CourseModel } = require("../db");

courseRouter.post("/purchase", function (req, res) {

});

courseRouter.get("/perview", function (req, res) {

});

module.exports = {
    courseRouter:  courseRouter
}
