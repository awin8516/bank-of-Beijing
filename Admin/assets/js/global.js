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
