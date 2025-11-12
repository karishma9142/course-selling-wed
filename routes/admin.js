const Router = require("express");
const adminRouter = Router();
const { AdminModel } = require("../db");

adminRouter.post("/signup" , function(req,res){

});

adminRouter.post("/signin" , function(req,res){

});

adminRouter.post("/Courses" , function(req,res){

});

adminRouter.put("/Course" , function(req,res){

});

adminRouter.get("/Course/bulk" , function(req,res){

});

module.exports = {
    adminRouter : adminRouter
}