const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const User = new Schema({
    email : {type : String , unique : true} ,
    password : String ,
    firstName : String , 
    lastName : String
});

const Admin = new Schema({
    email : {type : String , unique : true} ,
    password : String ,
    firstName : String , 
    lastName : String
});

const Course = new Schema({
    title : String ,
    discripation : String ,
    price : Number ,
    imageUrl : String ,
    createrId : ObjectId
});

const Purchases = new Schema({
    courseId : String ,
    userId : String
});

const UserModel = mongoose.model("user" , User);
const AdminModel = mongoose.model("admin" , Admin);
const CourseModel = mongoose.model("course" , Course);
const PurchasesModel = mongoose.model("purchase" , Purchases);

module.exports = {
    UserModel : UserModel ,
    AdminModel : AdminModel ,
    CourseModel : CourseModel ,
    PurchasesModel : PurchasesModel
};
