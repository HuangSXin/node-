const express=require("express");
const mongoose=require("mongoose");
const router=express.Router();
const xtpl=require("xtpl");
const fs=require("fs");

mongoose.connect("mongodb://60.205.218.56:27017/hsx");
let wenzhang_guize=new mongoose.Schema({
		article:{
			id:Number,
			author:String,
			title:String,
			synopsis:String
		},
		comment:{
		id:Number,
		username:String,
		time:String,
		praise:Number,
		trample:Number
		}
});
let wenzhang_cont=mongoose.model("comment",wenzhang_guize);
router.post("/",(req,res)=>{
		wenzhang_cont.find({},(err,data)=>{
//		wenzhang_cont.remove({data[0]},()=>{})
		res.json(data);
		})
	
});
router.post("/getCont",(req,res)=>{
	let articleId=req.body.articleId;
	wenzhang_cont.find({},(err,data)=>{
		let articleMes=[]
		let Data=data;
		for(var i=0;i<Data.length;i++){
			if(Data[i].article.id==articleId){
				articleMes.push(Data[i].article);
			}
		}
		xtpl.renderFile("./views/content.html",{array_1:articleMes},(err,data)=>{
			res.end(data);
		})
	});
})

module.exports=router;
//wenzhang_cont.create({article:{id:3,author:"莫言",title:"生死疲劳",synopsis:"《生死疲劳》是莫言的代表作之一。小说中叙述了1950年到2000年中国农村这50年的历史发展过程。围绕着土地这个沉重的话题，阐释了农民与土地的种种关系，并透过生死轮回的艺术图像，展示了新中国成立以来中国农民的生活和他们顽强、乐观、坚韧的精神。"}},(err,data)=>{
//	
//});