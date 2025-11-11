const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const jwt_password = "karishmarawt1234567890asdfghjklzxcvbnm@#$%^&*";
const { z } = require("zod");
const cors = require("cors");

const app = express();
app.use(zod());
app.use(cors());
app.use(express.json());

//  ####### ADMIN ########
app.post("/admin/signup" , function(req,res){

});

app.post("/admin/signin" , function(req,res){

});

app.post("/admin/addCourse" , function(req,res){

});

app.delete("/admin/deleteCourse" , function(req,res){

});

app.post("/admin/addCourseContent" , function(req,res){

});

app.listen(3000);




