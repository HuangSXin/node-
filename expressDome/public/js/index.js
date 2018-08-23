$(function(){
	
//	根据cookie值判断是否登录
	function isCookie(){
		cookie=document.cookie;
		cookie=cookie.split("=");
		return cookie;
	}
//	检测是否是cookie值;
	
	function getArticle(){
		var cookie=isCookie();
		if(cookie[0]){
			$("#hasCookie").html("欢迎你：");
			$("#user").html(cookie[0]);
			$("#secede").show();
//			如果登录了可以查看文章信息
			$.ajax({
				type:"post",
				url:"http://127.0.0.1:7777/article",
				async:true,
				success:function(data){
					let article=[];
					let callback=data;
					for(var i=0;i<callback.length;i++){
						if(callback[i].article){
							article.push(callback[i]);
						}
					}
//					console.log(article[0].article);
					var html="";
					for(var i=0;i<article.length;i++){
						var author=article[i].article.author;
						var title=article[i].article.title;
						var thisId=article[i].article.id;
						html+=`<a href="###" articleId="${thisId}">《${title}》,作者：${author}, 评论人数：</a>`
					}
					$("#article_inner").html(html);
				}
			})
		}else{
			$("#hasCookie").html("请先登录");
			$("#user").html("点击登录");
			$("#secede").hide();
			$("#article_inner").html("需要登录才能查看文章内容");
		}
	}
	
	
	
	getArticle();
	$("#user").click(function(){
		if($("#user").html()=="点击登录"){
			window.location="http://127.0.0.1:7777/";
		}
	});
	$("#secede").click(function(){
		cookie=document.cookie;
		cookie=cookie.slice(0,cookie.length-2);
		cookie=cookie.split("=");
		var username=$("#user").html();
		$.ajax({
			type:"post",
			url:"http://127.0.0.1:7777/add/secede",
			data:{
				username:cookie[0],
				password:cookie[1]
			},
			async:true,
			success:function(data){
				if(data.code==1){
					alert(data.message);
				window.location="http://127.0.0.1:7777/index";
				}else if(data.code==0){
					alert(data.message);
				}
			}
		});
	});
	$(".init").click(function(){
		$.ajax({
			type:"get",
			url:"http://127.0.0.1:7777/add/11",
			data:{
				username:cookie[0],
				password:cookie[1]
			},
			async:true,
			success:function(data){
				if(data.code==1){
					alert(data.message);
				window.location="http://127.0.0.1:7777/index";
				}else if(data.code==0){
					alert(data.message);
				}
			}
		});
	})
	
//	点击文章链接跳转到相应的文章,根据绑定的ID发请求
	$("#article_inner").delegate("a",'click',function(){
		var cookie=isCookie();
		if(!cookie[0]){
			alert("请先登录");
			return;
		}
		let articleId=$(this).attr("articleId");
		$.ajax({
			type:"post",
			url:"http://127.0.0.1:7777/article/getCont",
			data:{
				articleId
			},
			async:true,
			success:function(data){
				console.log(data);
//				return;
				$("html").html(data);
			}
		});
	})
});
