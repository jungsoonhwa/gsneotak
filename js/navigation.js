var gnbInter, gnbTime = 500;
var gnbOneS = -1;
var gnbTwoS =  -1;
var gnbTwoOn =false;
var oneN, twoN, thrN;
$(function(){
	//gnb -  heihgt

	//console.log(location.pathname)
	//oneN = gnbOneS = 4;
	//twoN = 0;
	//	thrN = 0;

	//subActive();

	/*
	$(window).resize(function(){
		if(jQuery("#cBody").height() < jQuery(window).height()) {
			jQuery("#header").css('height', jQuery(window).height());
			jQuery(".gnbShadow").css('height',  jQuery(window).height());
		} else {
			jQuery("#header").css('height', jQuery("#cBody").height());
			jQuery(".gnbShadow").css('height',jQuery("#cBody").height());
		}
	});$(window).resize();*/

	//gnb 
	$(".gnb").mouseleave(function(){
		clearInterval(gnbInter);
		gnbInter = setInterval("gnbOut()", gnbTime);
	})

	$("#header").mouseover(function(){
		clearInterval(gnbInter);
	});

	$("#header").mouseout(function(){
		clearInterval(gnbInter);
		gnbInter = setInterval("gnbOut()", gnbTime);
	});

	//oneD  // 같은거 눌럿을때 동작안하게 하기
	$(".gnb li").each(function(q){
		$(this).find("a:first").click(function(){
			if(gnbOneS !=q){
				if(gnbOneS == -1) {
					gnbOneS = q;
					$(".gnb li").find(".twoD").hide(0);
					$(".gnb li").find(".thrD").hide(0);
					gnbTwoDown();
					$(".gnb li").eq(gnbOneS).addClass("on")
					$(".gnb li").eq(gnbOneS).find(".oneD img").attr("src",$(".gnb li").eq(gnbOneS).find(".oneD img").attr("src").replace("_on.png", ".png").replace(".png","_on.png"));
					$(".gnb li").eq(gnbOneS).find(".twoD").show(200);
				} else {
					$(".gnb li").find(".twoD").hide(0);
					$(".gnb li").find(".thrD").hide(0);
					gnbTwoUp();
					$(".gnb li").eq(gnbOneS).removeClass("on");
					$(".gnb li").eq(gnbOneS).find(".oneD img").attr("src", $(".gnb li").eq(gnbOneS).find(".oneD img").attr("src").replace("_on.", "."));
					gnbOneS = q;
					$(".gnb li").eq(gnbOneS).addClass("on")
					$(".gnb li").eq(gnbOneS).find(".oneD img").attr("src",$(".gnb li").eq(gnbOneS).find(".oneD img").attr("src").replace("_on.png", ".png").replace(".png","_on.png"));
					$(".gnb li").eq(gnbOneS).find(".twoD").show(200);
				}
				gnbTwoS = -1;
			}
			$("#header").stop().animate({paddingRight:200}, 200, "easeOutCubic");
		})
	})

	//열린거 클릭했을때 닫히게 하기 
	$(".gnb li .depth").each(function(w){
		if($(".gnb li .thrD").size() != 0){
			$(".gnb li .thrD").prev("a").css("background","url('/common/images/icon/twoD_down.png') no-repeat 167px 26px #dedfe7");
		}
		//2뎁스 클릭 이벤트
		$(this).find("a:first").click(function(){		
			if(gnbTwoS == -1) {
				gnbTwoUp();
				gnbTwoS = w;
				gnbTwoDown();
			} else {
				if(w != gnbTwoS) {
					//다른 메뉴
					gnbTwoUp();
					gnbTwoS = w;
					gnbTwoDown();
				} else {
					//같은 메뉴
					gnbTwoUp();
					gnbTwoS = -1;
				}
			}
		})
	})
	
	/*$(".gnb li .thrD").each(function(q){
		$(this).mouseenter(function(h){
			$(this).parent("a").addClass("on");
		})
		$(this).mouseleave(function(h){
			$(this).parent("a").removeClass("on");
		})
	})*/

	//subNavi
	var navClick =false;
	$(".subNavi .twoD > p> a").click(function(){
		if(!navClick){
			navClick =true;
			$(this).addClass("on");
			$(this).parent().next().slideDown(200);	
			$(".subNavi .thrD > p> a").removeClass("on");
			$(".subNavi .thrD .list").slideUp(200);
			navClick2 =false;
		}else{
			navClick =false;
			$(this).removeClass("on");
			$(this).parent().next().slideUp(200);			
		}
	})

	var navClick2 =false;
	$(".subNavi .thrD > p> a").click(function(){
		if(!navClick2){
			 navClick2 =true;
			$(this).addClass("on");
			$(this).parent().next().slideDown(200);		
			$(".subNavi .twoD > p> a").removeClass("on");
			$(".subNavi .twoD .list").slideUp(200);
			navClick =false;
		}else{
			navClick2 =false;
			$(this).removeClass("on");
			$(this).parent().next().slideUp(200);
			
		}
	})
	if($(".subNavi .thrD").size() != 0){
		$(".subNavi .twoD > p").css("paddingRight", 26).css("marginRight",13).css("background" , "url('/common/images/icon/subNavi_bu.png') no-repeat right 3px");
	}else{
		$(".subNavi .twoD ul").css("right","0")
	}
	//subNavi 리스트박스  min-width값 조절
	setMinWidth(); 
	setMinWidth2(); 
})

//문자열 길이에 따른 css적용
function setMinWidth() {
	//twoD 문자열 길이를 담는 배열
	var strLen = new Array();
	var targerObj = jQuery(".twoD").find("ul.list");
	jQuery(targerObj).find("li").each(function(){
		strLen.push(jQuery(this).text().length);
	});
	jQuery(targerObj).css("width", Math.max.apply(Math, strLen)*13);
}

function setMinWidth2() {
	//thrD 문자열 길이를 담는 배열
	var strLen2 = new Array();
	var targerObj2 = jQuery(".thrD").find("ul.list");
	jQuery(targerObj2).find("li").each(function(){
		strLen2.push(jQuery(this).text().length);
	});

	var url = window.location.href;
	if(url.indexOf('/Product/') > 0  ||  url.indexOf('/Lamp/') > 0  ){
		jQuery(targerObj2).css("width", Math.max.apply(Math, strLen2)*8);
	}else{
		jQuery(targerObj2).css("width", Math.max.apply(Math, strLen2)*12);
	}
}

function gnbOut()
{
	clearInterval(gnbInter);
	$(".gnb li").find(".twoD").hide(0);
	$(".gnb li").eq(gnbOneS).removeClass("on");	
	if($(".gnb li .depth").eq(gnbTwoS).find(".thrD").size() != 0) {
		/*$(".gnb li .depth").eq(gnbTwoS).find("a:first").removeClass("on");*/
		$(".gnb li .depth").eq(gnbTwoS).find("a:first").find("img").attr("src",$(".gnb li .depth").eq(gnbTwoS).find("a:first").find("img").attr("src").replace("_on.png",".png"));	
		$(".gnb li .depth").eq(gnbTwoS).find("a:first").css("background","url('/common/images/icon/twoD_down.png') no-repeat 167px 26px #dedfe7");
	}
	$(".gnb li").eq(gnbOneS).find(".oneD img").attr("src", $(".gnb li").eq(gnbOneS).find(".oneD img").attr("src").replace("_on.", "."));
	$("#header").stop().animate({paddingRight:0}, 200, "easeOutCubic");
	gnbOneS = -1;
}

function gnbTwoUp(){	
	$(".gnb li .depth").eq(gnbTwoS).find(".thrD").stop(true, true).slideUp(0)
	if($(".gnb li .depth").eq(gnbTwoS).find(".thrD").size() != 0) {
		/*$(".gnb li .depth").eq(gnbTwoS).find("a:first").removeClass("on");*/
		$(".gnb li .depth").eq(gnbTwoS).find("a:first").find("img").attr("src",$(".gnb li .depth").eq(gnbTwoS).find("a:first").find("img").attr("src").replace("_on.png",".png"));
		$(".gnb li .depth").eq(gnbTwoS).find("a:first").css("background","url('/common/images/icon/twoD_down.png') no-repeat 167px 26px #dedfe7");
	}
}

function gnbTwoDown(){	
	$(".gnb li .depth").eq(gnbTwoS).find(".thrD").stop(true, true).slideDown(200);
	if($(".gnb li .depth").eq(gnbTwoS).find(".thrD").size() != 0) {
		/*$(".gnb li .depth").eq(gnbTwoS).find("a:first").addClass("on")*/
		$(".gnb li .depth").eq(gnbTwoS).find("a:first").find("img").attr("src",$(".gnb li .depth").eq(gnbTwoS).find("a:first").find("img").attr("src").replace(".png","_on.png"));
		$(".gnb li .depth").eq(gnbTwoS).find("a:first").css("background","url('/common/images/icon/twoD_up.png') no-repeat 167px 26px #575d70");
	}
}
