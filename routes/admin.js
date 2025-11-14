const { Router } = require("express");
const adminRouter = Router();
const { AdminModel, CourseModel } = require("../db");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {JWT_ADMIN_SECRET} = require("../config");
const { adminMiddleware } = require("../middleware/admin");

adminRouter.post("/signup" ,async function(req,res){
    const { email, password, firstName, lastName } = req.body;

  const signupschema = z.object({
    email: z.string().email().min(10).max(50),
    password: z.string().min(4).max(15),
    firstName: z.string().min(4).max(15),
    lastName: z.string().min(4).max(15),
  });

  const result = signupschema.safeParse(req.body);

  if (!result.success) {
    return res.status(403).json({
      msg: "incorrect format",
      error: result.error,
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 5);
    await AdminModel.create({
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
    });

    res.status(200).json({
      msg: "signed up successfully",
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(403).json({
        msg: "Email already exists!",
      });
    } else {
      console.error("Signup error:", error);
      res.status(500).json({ msg: "Error while signing up" });
    }
  }
});

adminRouter.post("/signin" ,async function(req,res){
    const { email, password } = req.body;

  try {
    const admin = await AdminModel.findOne({ email: email });

    if (!admin) {
      return res.status(404).json({ msg: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (passwordMatch) {
      const token = jwt.sign({ id: admin._id }, JWT_ADMIN_SECRET);
      res.status(200).json({
        msg: "signin successful",
        token: token,
      });
    } else {
      res.status(403).json({
        msg: "incorrect credentials",
      });
    }
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({ msg: "Error while signing in" });
  }
});



adminRouter.post("/Course" ,adminMiddleware,async function(req,res){
    const adminId = req.userId;
    const {title , discripation, price , imageUrl} = req.body;
    
    const course = await CourseModel.create({
      title : title ,
      discripation : discripation ,
      price : price ,
      imageUrl : imageUrl ,
      createrId : adminId
    });
    res.status(200).json({
      msg : "course created succesfully",
      courseId  : course._id
    })
});

adminRouter.put("/Course",adminMiddleware ,async function(req,res){
  const adminId = req.userId;
    const {title , discripation, price , imageUrl ,courseId} = req.body;
    
    const course = await CourseModel.updateOne({
      _id : courseId ,
      createrId : adminId
    },{
      title : title ,
      discripation : discripation ,
      price : price ,
      imageUrl : imageUrl 
    });
    res.status(200).json({
      mag : "course updated succesfully",
      courseId  : course._id
    })
});

adminRouter.get("/Course/bulk" , adminMiddleware,async function(req,res){
  const adminId = req.userId;
  
  const course = await CourseModel.find({
    createrId : adminId
  });
  res.json({
    msg : "done" ,
    course : course
  })
});

module.exports = {
    adminRouter : adminRouter
}