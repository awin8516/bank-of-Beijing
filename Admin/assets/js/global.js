/// <reference path="core/jquery.min.js" />
//全局变量
var Root_PathAr = localStorage.tls || '';//项目根路径
$(function(){
    
    $('.del-img').on("click",function(){
        var ul = $(this).closest("ul");
        var hidden = $(this).closest(".control-container").find("input:hidden");
        console.log(ul);
        console.log(hidden);
        ul.hide();
        hidden.val("")
    })

    console.log($(".company-imgs3"))

    $(".company-imgs3").each(function(index,item){
        console.log($(item).find("li .img").attr("src"))
        if (!$(item).find("li .img").attr("src")) {
            $(item).css("display", "none");
            console.log(0)
        } else {
            $(item).css("display", "inline-block");
            console.log(1)
        }
    })
    
})

$(document).on("click", ".upload-file-list .btn-move", function(){
    var $ul = $(this).closest(".upload-file-list");
    var $li = $(this).closest("li");
    var $prev = $li.prev();
    var $next = $li.next();
    var $hidForm = $ul.parent().find("input[type=hidden]");
    if(!$hidForm.length){
        $hidForm = $ul.parent().parent().find("input[type=hidden]");
    }
    if($(this).hasClass("btn-left")){
        if($prev.length){
            $li.insertBefore($prev);
        }else{
            $li.insertAfter($li.siblings(":last"));
        }
    }else if($(this).hasClass("btn-right")){
        if($next.length){
            $li.insertAfter($next);
        }else{
            $li.insertBefore($li.siblings(":first"));
        }
    }

    // var ul = $("#ContentPlaceHolder1_ImgList");
    // var imgs = ul.html().match(/src="(.*?)"/g);
    // console.log(imgs)
    var imgs = $ul.html().match(/src="(.*?)"/g);

    $hidForm.val(imgs.join(",").replace(/src=|"/g,""))


    
    
        
})
