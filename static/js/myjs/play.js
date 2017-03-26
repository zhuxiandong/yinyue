
/**
 * Created by PC on 2017/1/10.
 */
$(function(){
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
    //将数据转化成dom
    function render(){
        $(".list").empty();
        $.each(musics,function(i,v){
            var index=i+1;
            $(`<div class="lists list"><div class="inputbox"><div class="input"></div></div><div class="sing">${index} ${v.name}<div class="share"></div><div class="add"></div><div class="bofang"></div></div><div class="singer">${v.artist}</div><div class="time">${v.duration}</div><div class="delete"></div></div>`).appendTo(".leftcon");
        })
    }
    //移入效果
    $(".list").hover(function(){
        $(".share",this).toggle();
        $(".add",this).toggle();
        $(".bofang",this).toggle();
        $(".delete",this).toggle();
    })
    //删除歌曲
    function deletemusic(){
        console.log(1);
        var index=$(this).index();
        if(index<current){
            current-=1;
        }else if(current===index){
            if(current===musics.length-1){
                current-=1;
            }
        }
        musics.splice(index,1);
        render();
        return false;
    }
    $(".list").on("click",".delete",deletemusic);
    render();
})