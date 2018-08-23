const express=require("express");
const app=express();
const router=express.Router();
const mongoose=require("mongoose");
const path=require("path");
const bodyParser=require("body-parser");
const cookieParser = require('cookie-parser');
const xtpl=require("xtpl");
const fs=require("fs");

app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser.urlencoded({extended:false}));
app.use("/add",require("./mgRegistered.js"));
app.use("/article",require("./commentServer.js"));
//app.set("views","./views");
//app.set("view engine","html");
//app.engine("html",xtpl.renderFile);
app.get("/",(req,res)=>{
	 fs.readFile(("./views/login.html"),(err,data)=>{
	 	if(err){
	 		console.log(err);
	 		return;
	 	}
	 	res.end(data);
	 });
});
app.get("/index",(req,res)=>{
	 fs.readFile(("./views/index.html"),(err,data)=>{
	 	if(err){
	 		console.log(err);
	 		return;
	 	}
	 	res.end(data);
	 });
});
app.listen(7777);
