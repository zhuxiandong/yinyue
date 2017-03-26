$(function(){
    var addButton = $("#add");
    function addcat() {
        $.ajax({
            url:'/music/index.php/admin/add_cat',
            success:function (id) {
                id =JSON.parse(id);
                $(
                    `<tr data-id="${id}">
                    <td>${id}</td>
                    <td><input class="" type="text" value=""/></td>
                    <td><span class="glyphicon glyphicon-remove delete" style="color:orangered;cursor: pointer"></span></td>
                    </tr>`
                ).appendTo("tbody");
            }
        })
    }
    addButton.on("click",addcat);

    $('tbody').on("click",'.delete',function () {
        var tr=$(this).closest('tr');
        var id=tr.attr('data-id');
        $.ajax({
            url:`/music/index.php/admin/delete_cat/id/${id}`,
            success:function (data) {
                if(data){
                    tr.remove();
                }
            }
        })
    });

    $('tbody').on("change",'input',function () {
        var tr =$(this).closest('tr');
        var id = tr.attr('data-id');
        var value =$.trim($(this).val());
        $.ajax({
            url:'/music/index.php/admin/update_cat',
            data:{cate_id:id,cate_name:value},
            type:"post",
            success:function (data) {
                console.log(JSON.parse(data));
            }
        })
    });
})