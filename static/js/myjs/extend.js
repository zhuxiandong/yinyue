//1.回到顶部

jQuery.extend({
	returnBack:function(jqobj,time){
		jqobj.on("click",function(){
			var time=time||500;
			var top=$(window).scrollTop();
			var obj={nub:top};
			$(obj).animate({nub:0},{
				duration:time,
				step:function(val){
					$(window).scrollTop(val);
				}
			})
		})
	}
})


//2.
jQuery.fn.extend({
	mousewheel:function(upfun,downfun){
		this.each(function(index,obj){
			if(obj.addEventListener){
				obj.addEventListener("mousewheel",scroll,false);
				obj.addEventListener("DOMMouseScroll",scroll,false);
			}else{
				obj.attachEvent("onmousewheel",scroll);
			}
			function scroll(e){
				var ev=e||window.event;
				if(ev.preventDefault){
					ev.preventDefault();
				}else{
					ev.returnValue=false;
				}
				var direction=ev.detail||ev.wheelDelta;
				if(direction==120||direction==-3){
					upfun.call(obj);
				}else if(direction==-120||direction==3){
					downfun.call(obj);
				}
			}
		})
	},
	offsetLeft:function(){
		return this[0].offsetLeft;
	},
	offsetTop:function(){
		return this[0].offsetTop;
	}
})








