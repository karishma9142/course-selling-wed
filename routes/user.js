const express = require("express");
const { Router } = require("express");
const { z } = require("zod");
const { UserModel } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {JWT_USER_SECRET} = require("../config");
const {userMiddleware} = require("../middleware/user");
const userRouter = Router();

userRouter.post("/signup", async function (req, res) {
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
    await UserModel.create({
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

userRouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const token = jwt.sign({ id: user._id }, JWT_USER_SECRET);
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

userRouter.get("/purchases",userMiddleware, function (req, res) {

});

module.exports = {
    userRouter: userRouter
}


