/**
 * Created by PC on 2017/1/13.
 */
$(function(){
    var addbutton=$("#add");
    var cates=[];
    $.get('/music/index.php/admin/get_categories').done(function(data){
        cates=JSON.parse(data);
    });
    $(addbutton).on("click",function(){
        $.ajax({
            url:'/music/index.php/admin/add_album',
            success:function(id){
                id=JSON.parse(id);
                if(id == 500){
                    alert("不成功");
                    return;
                }
                var el=$(`
                <div class="media">
                    <a class="media-left" href="#" style="position: relative">
                    <img width="100" height="100" style="border-radius: 20%" src="/music/static/image/img/kaishi.png" alt="">
                    <form action="" enctype="multipart/form-data">
                    <label for="file${id}" style="position: absolute;width:100%;height:100%;left:0;top:0"></label>
                    <input type="file" id="file${id}" style="display: none">
                    </form>
                    </a>
                    <div class="media-body">
                    <div class="bs-example">
                    <dl class="dl-horizontal" style="font-size:24px">
                    <dt>专辑名</dt>
                    <dd>
                    <input type="text" class="form-control input-sm" value="">
                    </dd>
                    <dt>歌手</dt>
                    <dd>
                    <input type="text" class="form-control input-sm" value="">
                    <div class="tips"></div>
                    </dd>
                    <dt>分类</dt>
                    <dd>
                    <select class="form-control input-sm">
                    </select>
                    </dd>
                    </dl>
                    </div>
                    </div>
                    </div>
            `)
                $(addbutton).after(el);
                $.each(cates,function(i,v){
                    $(`<option value="${v.id}" ${i== 0?'selected':''} >${v.name}</option>`).appendTo(el.find("select"));
                })
            }
        });

    })


})