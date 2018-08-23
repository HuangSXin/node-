$(function(){
	var iw=$(window).width();
	var ih=$(window).height();
//	$("#registered").width(iw/2+'px');
//	$("#login").width(iw/2+'px');
//	$("#registered").height(ih+'px');
//	$("#login").height(ih+'px');
	let isRegistered=true;
	$("#cut").click(function(){
		if(isRegistered==true){
			$("#registered").hide();
			$("#login").show();
			$("#cut").html("我要注册");
		}else{
			$("#login").hide();
			$("#registered").show();
			$("#cut").html("我要登录");
		}
		isRegistered=!isRegistered;
	})

	$("#tjzc").click(function(){
		var val0=$("#registered_form").find("input").eq(0).val();
		var val1=$("#registered_form").find("input").eq(1).val();
		var val2=$("#registered_form").find("input").eq(2).val();
		if(val0&&val1&&val2){
			if(val1!=val2){
				alert("输入的两次密码不一致");
				return;
			}
		}else{
			alert("注册的账号或密码不能为空");
			return;
		}
		$.ajax({
		type:"post",
		url:"http://127.0.0.1:7777/add/registered",
		data:{
			username:val0,
			password:val1
		},
		async:true,
		success:function(data){
			if(data=="注册成功"){
				alert("注册成功");
			}else{
				alert("当前的用户名已被注册");
			}
		}
	})
	})
	
	$("#tjdl").click(function(){
		var val0=$("#login_form").find("input").eq(0).val();
		var val1=$("#login_form").find("input").eq(1).val();
		if(val0&&val1){
			
		}else{
			alert("登录的账号或密码不能为空");
			return;
		}
		$.ajax({
		type:"post",
		url:"http://127.0.0.1:7777/add/login",
		data:{
			username:val0,
			password:val1
		},
		async:true,
		success:function(data){
			var data=JSON.parse(data);
			if(data.code==0){
//				不存在的用户
				alert(data.message);
			}else if(data.code==1){
//				登录成功
				alert(data.message);
				window.location.href="http://127.0.0.1:7777/index"
			}else if(data.code==2){
//				密码错误/**/
				alert(data.message);
			}
		}
	})
	})
	
})
