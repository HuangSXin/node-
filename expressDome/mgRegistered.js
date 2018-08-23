const express=require("express");
const mongoose=require("mongoose");
const router=express.Router();
//链接
mongoose.connect("mongodb://60.205.218.56:27017/hsx");
let guize=new mongoose.Schema({
	username:String,
	password:String
});
let userForm=mongoose.model("user",guize);
router.post("/registered",(req,res)=>{
		let username=req.body.username;
		let password=req.body.password;
		userForm.find({username:username},(err,data)=>{
		if(err){
			return;
		} 
		if(data.length==0){
//			表示找不到相同的username
			userForm.create({username:username,password:password},(err,data)=>{
				if(err){
					console.log(err);
					return;
				}
				res.setHeader("Content-Type","text/html;charset=utf8");
				res.end("注册成功");
			})
			
		}else{
//			表示找到相同的username
			console.log(data);
			res.setHeader("Content-Type","text/html;charset=utf8");
			res.end("注册失败");
		}

		})
});
//验证登录
router.post("/login",(req,res)=>{
		let username=req.body.username;
		let password=req.body.password;
		userForm.find({username:username},(err,data)=>{
		if(err){
			return;
		}
		if(data.length==0){
			res.end(JSON.stringify({code:0,message:"此用户名不存在"}));
			return;
		}
		let dataUsername=data[0].username;
		let dataPassword=data[0].password;
		if(dataPassword==password){
			res.cookie(dataUsername,dataPassword);
			res.end(JSON.stringify({code:1,message:"登录成功"}))
		}else {
			res.end(JSON.stringify({code:2,message:"密码错误"}))
		}
		return;
		})
});
//退出登录
router.post("/secede",(req,res)=>{
		let username=req.body.username;
		let password=req.body.password;
		if(username){
			res.clearCookie(username);
			res.json({code:1,message:"退出成功"});
			return;
		}
		res.json({code:0,message:"退出失败"});
		return;
});
module.exports=router;
