/**
 * Created by PC on 2017/1/12.
 */
$(function(){
    var addbutton=$("#add");
    addbutton.on("click",function(){
        $.ajax({
            url:'/music/index.php/admin/add_artist',
            success:function (id){
                id =JSON.parse(id);
                $(`
                <div class="col-sm-6 col-md-4" data-id="${id}">
                    <div class="thumbnail">
                    <form action="" enctype="multipart/form-data">
                        <label for="file${id}">+</label>
                        <input type="file" name="file" id="file${id}" style="display: none">
                    </form>

                <img width="80" height="80" alt="" src="">
                <div class="caption">
                    <h5><input class="name" type="text" value=""></h5>
                <p><input type="radio" value="1" checked name="${id}"> 男
                    <input type="radio" value="2" name="${id}"> 女
                <p><input class="age" type="text" value=""></td></p>
                    <p><span class="glyphicon glyphicon-remove" style="color:orangered;cursor: pointer"></span></p>
                    </div>
                    </div>
                    </div>
                `).insertAfter(addbutton.closest(".col-md-4"));
            }
        })
    })
    $("#contant").on("click",".glyphicon-remove",function(){
        var card=$(this).closest('.col-md-4');
        var id=card.attr("data-id");
        $.ajax({
            url:`/music/index.php/admin/delete_artist/id/${id}`,
            success:function(data){
                if ( JSON.parse(data)==200){
                    card.addClass("animate");
                    setTimeout(function(){
                        card.remove();
                    },800);

                }
            }
        })
    });
    var progress=$(".progress .active");
    $(document).ajaxStart(function(){
        progress.show().animate({width:'30%'});
    });
    $(document).ajaxSend(function(){
        progress.animate({width:'80%'});
    });
    $(document).ajaxSuccess(function(){
        progress.animate({width:'100%'});
    });
    $(document).ajaxComplete(function(){
        progress.delay(500).queue(function(){
            $(this).hide().animate({width:'0%'}).dequeue();
        })
    });
    ////////////////////////////////////////////////
    $('#contant').on("change","input:radio,input:text",function(){
        var parent=$(this).closest(".col-md-4");
        var post_data={
            artist_gender:parent.find("input:radio:checked").val(),
            artist_name:$.trim(parent.find(".name").val()),
            artist_age:$.trim(parent.find(".age").val()),
            artist_id:parent.attr('data-id')
        };
        var url='/music/index.php/admin/update_artist';
        $.ajax({
            url:url,
            type:'post',
            data:post_data
        }).done(function(data){
            console.log(data);
        })
    });
    //////////////////////////////////////////////////////
    $("#contant").on("change","input:file",function(){
        //提交form表单
        var formData=new FormData($(this).parent().get(0));
        formData.append('id',$(this).closest(".col-md-4").attr("data-id"));
        console.log(formData);
        $.ajax({
            url:'/music/index.php/admin/upload_pic',
            processData: false,
            contentType: false,
            type: 'post',
            data: formData,
            success:(function(src){
                console.log(src);
                $(this).closest(".thumbnail").find("img").remove();
                src=JSON.parse(src);
                $("<img>").attr({"src":src,width:80,height:80}).prependTo($(this).closest(".thumbnail"));
            }).bind(this)
        })
    })
})