const express = require("express");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "karishmarawt1234567890asdfghjklzxcvbnm@#$%^&*";
const cors = require("cors");
const app = express();
app.use(express.json());

app.use(cors());
app.use(express.json());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);

async function main() {
  await mongoose.connect("mongodb+srv://admin:ieiDNs5hmV2mhVFL@cluster0wcwef.tp8kfsa.mongodb.net/cousera-app");
  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
}

main().catch(err => console.error("Connection error:", err));
