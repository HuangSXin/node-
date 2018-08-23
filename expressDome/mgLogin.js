const express=require("express");
const mongoose=require("mongoose");
const router=express.Router();

mongoose.connect("mongodb://60.205.218.56:27017/hsx");
let guize=new mongoose.Schema({
	username:String,
	password:String
});
let userForm=mongoose.model("user",guize);

router.get("/user",(req,res)=>{
    userForm.find().then(function(users){
        console.log(users);
    });
});

module.exports=router;
