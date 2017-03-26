/**
 * Created by PC on 2016/12/29.
 */
$(function () {
    var leftbtn=$(".leftbtn");
    var rightbtn=$(".rightbtn");
    var btn=$(".btnbox li");
    var imgs=$(".lunboul");
    var num=imgs.length-1;
    var state={
        now:0,
        next:0,
        dir:"right"
    };
    var render=function(){
        imgs.removeClass("activeul r-o r-i l-o l-i");
        if(state.dir=="right"){
            imgs.eq(state.now).addClass("r-o");
            imgs.eq(state.next).addClass("activeul r-i");
        }else if(state.dir=="left"){
            imgs.eq(state.now).addClass("l-o");
            imgs.eq(state.next).addClass("activeul l-i");
        }
    };
    var setstate=function(){
        if(state.dir=="right"){
            state.next=(state.now+1>num)?0:state.now+1;
            render();
            state.now=state.next;
        }else if(state.dir=="left"){
            state.next=(state.now-1<0)?num:state.now-1;
            render();
            state.now=state.next;
        }
    };
    function next(){
        state.dir="right";
        setstate();
    }
    function pre(){
        state.dir="left";
        setstate();
    }
    leftbtn.click(function(){
        pre();
    });
    rightbtn.click(function(){
        next();
    })
})