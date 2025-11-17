const Router = require("express");
const courseRouter = Router();
const { CourseModel, PurchasesModel, UserModel } = require("../db");
const { userMiddleware } = require("../middleware/user");

courseRouter.post("/purchase",userMiddleware ,async function (req, res) {
    const userId = req.userId;
    const courseId = req.body.courseId;
    const cheakPurches = await PurchasesModel.findOne({
        courseId : courseId ,
        userId : userId
    });
    if(cheakPurches){
        res.status(200).json({
            msg : "you already purches this course"
        })
    }else {
        const purchase = await PurchasesModel.create({
            courseId : courseId ,
            userId : userId
        });
        res.status(200).json({
            msg : "you succesfully puchesed the course with course id" ,
            courseId : courseId
        })
    }
});

courseRouter.get("/perview",async function (req, res) {
    const courses = await CourseModel.find({});
    res.status(200).json({
        courses
    })
});

module.exports = {
    courseRouter:  courseRouter
}
