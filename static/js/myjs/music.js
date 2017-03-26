/**
 * Created by PC on 2017/1/9.
 */
$(function(){
    //假设已经拿到数据
    var musics=[
        {
            id:1,
            name:"歌1",
            artist:"周杰伦",
            duration:"3:05",
            src:"/music/static/musics/1.mp3",
            pic:"/music/static/image/img/1.jpg"
        },
        {
            id:2,
            name:"歌2",
            artist:"周杰伦",
            duration:"3:05",
            src:"/music/static/musics/2.mp3",
            pic:"/music/static/image/img/2.jpg"
        },
        {
            id:3,
            name:"歌3",
            artist:"周杰伦",
            duration:"3:05",
            src:"/music/static/musics/3.mp3",
            pic:"/music/static/image/img/3.jpg"
        }
    ];
    var current=0;
    var audio=$("audio").get(0);
    //把数据转换成dom
    function render(){
        $("#play-list").empty();
        $.each(musics,function(i,v){
        var index=i+1;
        $(`<li class = "${i===current?'active' : '' }"><span>${index<10?("0"+index):index}</span><span>${v.name}</span><span>${v.artist}</span><span>${v.duration}</span><span class="delete">×</span><span class="play"><</span></li>`).appendTo("#play-list");
    })
    }

    //删除歌曲
    $("#play-list").on("click",".delete",function(){
        var index=$(this).closest("li").index();
        if(index<current){
            current-=1;
        }else if(index===current){
            if(current===musics.length){
                current-=1;
            }
        }else{

        }
        musics.splice(index,1);
        render();
        if(current===index&&audio.play){
            audio.pause();
        }
        return false;
    });

    //添加歌曲
    function addmusic(){
        var v=$(this).text();
        $.ajax({
            url:`/music/index.php/index/getdata/${v}`,
            success:function(data){
                var data=JSON.parse(data);
                musics=musics.concat(data);
                render();
            }
        })

    }
    $(".control").on("click",".add",addmusic);
    $("#add").on("click",function(){
        var v={
            id:4,
            name:"歌4",
            artist:"周杰伦",
            duration:"3:05",
            src:"/music/static/musics/4.mp3",
            pic:"/music/static/image/img/4.jpg"
        };
        musics.push(v);
        render();
    });

    //播放歌曲
    function play(){
        audio.src=musics[current].src;
        audio.play();
    }
    $("#play-list").on("click",".play",function(){
        current=$(this).closest("li").index();
        play();
        render()
    });
    // 切换播放暂停
     var playbutton=$("#play");
     function toggleplay(){
         if(audio.paused){
             if(audio.src === location.href){
                 // console.log(location.href);
                 play();
             }else{
                 audio.play();
             }

         }else{
             audio.pause();
         }
     }
     playbutton.on("click",toggleplay);
     audio.onplay=function(){
         playbutton.text("暂停");
     };
     audio.onpause=function(){
         playbutton.text("播放");
     };

     // 下一首
    var nextbutton=$("#next");
    function next(){
        current+=1;
        current= current===musics.length?0:current;
        render();
        play();
    }
    nextbutton.on("click",next);


    // 上一首
    var prebutton=$("#pre");
    function pre(){
        current-=1;
        current= current===-1?(musics.length-1):current;
        render();
        play();
    }
    prebutton.on("click",pre);



    audio.onended=next;



    /////////////////////////////////////////////////////////
    var inner=$("#play-op-inner");
    var playOp=$("#play-op");
    var point=$("#point");
    point.on("click",false);
    point.on("mousedown",function(){
        $(document).on("mousemove",function(e){
            var x=e.clientX-playOp.offset().left();
            var percent=x/playOp.width();
            var time=audio.duration*percent;
            audio.currentTime=time;
        })

    });
    $(document).on("mouseup",function(){
        $(this).off("mousemove");
    });

    playOp.on("click",function(e){
            if(audio.src === location.href){
                return;
            }
        audio.currentTime=audio.duration*e.offsetX/$(this).width();
    });
    audio.ontimeupdate=function(){
        inner.width(audio.currentTime/audio.duration*100+"%");
    };

    var volOp=$("#vol-op");
    var volInner=$("#vol-op-inner");
    var volPointer=$("#vol-op-point");
    var volIcon=$("#vol-icon");
    volPointer.on("click",false);
    volPointer.on("mousedown",function(){
        $(document).on("mousemove",function(e){
            var x=e.clientX-volOp.offset().left;
            var volume=x/volOp.width();
            volume=volume>=1?1:volume;
            volume=volume<=0?0:volume;
            audio.volume=volume;
        })
    });
    volOp.on("click",function(e){
        audio.volume=e.offsetX/$(this).width();
    });
    $(audio).on("volumechange",function(){
        if(audio.volume===0){
            volIcon.html('静音');

        }else{
            volIcon.html('喇叭');
        }
        volInner.width(audio.volume*100+"%");
    });
    volIcon.on("click",(function(){
        var oldV=null;
        return function(){
            if(oldV){
                audio.volume=oldV;
                oldV=null;
            }else{
                oldV=audio.volume;
                audio.volume=0;
            }
        }
    })());
    //for(var i=1;i<musics.length;i++){
    //    s(`<li><span>01</span><span>${musics[0].name}</span><span>${musics[0].artist}</span><span>${musics[0].duration}</span><span class="delete"></span></li>`).appendTo("#play-list");
    //}
    render();
})