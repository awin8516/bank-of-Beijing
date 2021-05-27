<%@ Page Title="" Language="C#" MasterPageFile="~/Admin/Master/Main.master" AutoEventWireup="true" CodeFile="Edit.aspx.cs" Inherits="Lays_Job_Edit" ValidateRequest="false" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <link href="../assets/css/style.css" rel="stylesheet" />
    <link href="../assets/js/plugins/bootstrap-datepicker/bootstrap-datepicker3.min.css" rel="stylesheet" />
    <script src="../assets/js/plugins/bootstrap-datepicker/bootstrap-datepicker.min.js"></script>
    <link href="../assets/summernote/summernote.css" rel="stylesheet" />
    <script src="../assets/summernote/summernote.js"></script>
    <script src="../assets/summernote/lang/summernote-zh-CN.js"></script>
    <script src="../assets/layer/layer.js"></script>
    <script src="../assets/ueditor1_4_3-utf8-net/ueditor.config.js"></script>
    <script src="../assets/ueditor1_4_3-utf8-net/ueditor.all.min.js"></script>
    <script src="../assets/ueditor1_4_3-utf8-net/lang/zh-cn/zh-cn.js"></script>
    <style>
        .company-upload, .company-upload3, .company-upload4 {
            position: relative;
            display: inline-block;
            width: 100px;
            height: 100px;
            overflow: hidden;
            border: 1px #ccc solid;
            border-radius: 3px;
            cursor: pointer;
        }

            .company-upload:hover {
                border: 1px #aaa solid;
            }

            .company-upload::before, .company-upload3::before, .company-upload4::before {
                content: "";
                display: block;
                width: 60%;
                height: 6%;
                position: absolute;
                z-index: 1;
                left: 20%;
                top: 47%;
                background: #eee;
                border-radius: 3px;
            }

            .company-upload::after, .company-upload3::after, .company-upload4::after {
                content: "";
                display: block;
                width: 6%;
                height: 60%;
                position: absolute;
                z-index: 1;
                left: 47%;
                top: 20%;
                background: #eee;
                border-radius: 3px;
            }

            .company-upload input, .company-upload3 input, .company-upload4 input {
                position: absolute;
                font-size: 100px;
                right: 0;
                top: 0;
                opacity: 0;
                z-index: 10;
                cursor: pointer;
            }


        .company-upload1 {
            position: relative;
            display: inline-block;
            width: 100px;
            height: 100px;
            overflow: hidden;
            border: 1px #ccc solid;
            border-radius: 3px;
            cursor: pointer;
        }

            .company-upload1:hover {
                border: 1px #aaa solid;
            }

            .company-upload1::before {
                content: "";
                display: block;
                width: 60%;
                height: 6%;
                position: absolute;
                z-index: 1;
                left: 20%;
                top: 47%;
                background: #eee;
                border-radius: 3px;
            }

            .company-upload1::after {
                content: "";
                display: block;
                width: 6%;
                height: 60%;
                position: absolute;
                z-index: 1;
                left: 47%;
                top: 20%;
                background: #eee;
                border-radius: 3px;
            }

            .company-upload1 input {
                position: absolute;
                font-size: 100px;
                right: 0;
                top: 0;
                opacity: 0;
                z-index: 10;
                cursor: pointer;
            }


                       .company-upload2 {
            position: relative;
            display: inline-block;
            width: 100px;
            height: 100px;
            overflow: hidden;
            border: 1px #ccc solid;
            border-radius: 3px;
            cursor: pointer;
        }

            .company-upload2:hover {
                border: 1px #aaa solid;
            }

            .company-upload2::before {
                content: "";
                display: block;
                width: 60%;
                height: 6%;
                position: absolute;
                z-index: 1;
                left: 20%;
                top: 47%;
                background: #eee;
                border-radius: 3px;
            }

            .company-upload2::after {
                content: "";
                display: block;
                width: 6%;
                height: 60%;
                position: absolute;
                z-index: 1;
                left: 47%;
                top: 20%;
                background: #eee;
                border-radius: 3px;
            }

            .company-upload2 input {
                position: absolute;
                font-size: 100px;
                right: 0;
                top: 0;
                opacity: 0;
                z-index: 10;
                cursor: pointer;
            }

        .company-imgs, .company-imgs3 {
            display: inline-block;
            vertical-align: top;
            list-style: none;
            margin-bottom: 0;
        }

            .company-imgs li, .company-imgs3 li {
                position: relative;
                display: inline-block;
                margin-left: 20px;
                margin-bottom: 20px;
                vertical-align: top;
                text-align: center;
                width: 100px;
                height: 100px;
                border: 1px #ccc solid;
                white-space: nowrap;
                font-size: 0;
            }

                .company-imgs li::before, .company-imgs3 li::before {
                    content: "";
                    display: inline-block;
                    height: 100%;
                    vertical-align: middle;
                }

                .company-imgs li img, .company-imgs3 li img {
                    display: inline-block;
                    vertical-align: middle;
                    max-width: 100%;
                    max-height: 100%;
                }

                .company-imgs li .btn-remove {
                    position: absolute;
                    font-size: 12px;
                    line-height: 1;
                    width: 20px;
                    height: 20px;
                    right: -10px;
                    top: -10px;
                    border: 1px #e30512 solid;
                    border-radius: 50%;
                    background: #e30512;
                    text-align: center;
                    color: #fff;
                    cursor: pointer;
                }

                    .company-imgs li .btn-remove:hover {
                        transform: scale(1.05);
                    }

                    .company-imgs li .btn-remove::before {
                        content: "";
                        display: inline-block;
                        height: 94%;
                        vertical-align: middle;
                    }

                    .company-imgs li .btn-remove i {
                        vertical-align: middle;
                        transform: scale(0.8);
                    }



        .company-imgs1 {
            display: inline-block;
            vertical-align: top;
            list-style: none;
            margin-bottom: 0;
        }

            .company-imgs1 li {
                position: relative;
                display: inline-block;
                margin-left: 20px;
                margin-bottom: 20px;
                vertical-align: top;
                text-align: center;
                width: 100px;
                height: 100px;
                border: 1px #ccc solid;
                white-space: nowrap;
                font-size: 0;
            }

                .company-imgs1 li::before {
                    content: "";
                    display: inline-block;
                    height: 100%;
                    vertical-align: middle;
                }

                .company-imgs1 li img {
                    display: inline-block;
                    vertical-align: middle;
                    max-width: 100%;
                    max-height: 100%;
                }

                .company-imgs1 li .btn-remove {
                    position: absolute;
                    font-size: 12px;
                    line-height: 1;
                    width: 20px;
                    height: 20px;
                    right: -10px;
                    top: -10px;
                    border: 1px #e30512 solid;
                    border-radius: 50%;
                    background: #e30512;
                    text-align: center;
                    color: #fff;
                    cursor: pointer;
                }

                    .company-imgs1 li .btn-remove:hover {
                        transform: scale(1.05);
                    }

                    .company-imgs1 li .btn-remove::before {
                        content: "";
                        display: inline-block;
                        height: 94%;
                        vertical-align: middle;
                    }

                    .company-imgs1 li .btn-remove i {
                        vertical-align: middle;
                        transform: scale(0.8);
                    }

.company-imgs2 {
            display: inline-block;
            vertical-align: top;
            list-style: none;
            margin-bottom: 0;
        }

            .company-imgs2 li {
                position: relative;
                display: inline-block;
                margin-left: 20px;
                margin-bottom: 20px;
                vertical-align: top;
                text-align: center;
                width: 100px;
                height: 100px;
                border: 1px #ccc solid;
                white-space: nowrap;
                font-size: 0;
            }

                .company-imgs2 li::before {
                    content: "";
                    display: inline-block;
                    height: 100%;
                    vertical-align: middle;
                }

                .company-imgs2 li img {
                    display: inline-block;
                    vertical-align: middle;
                    max-width: 100%;
                    max-height: 100%;
                }

                .company-imgs2 li .btn-remove {
                    position: absolute;
                    font-size: 12px;
                    line-height: 1;
                    width: 20px;
                    height: 20px;
                    right: -10px;
                    top: -10px;
                    border: 1px #e30512 solid;
                    border-radius: 50%;
                    background: #e30512;
                    text-align: center;
                    color: #fff;
                    cursor: pointer;
                }

                    .company-imgs2 li .btn-remove:hover {
                        transform: scale(1.05);
                    }

                    .company-imgs2 li .btn-remove::before {
                        content: "";
                        display: inline-block;
                        height: 94%;
                        vertical-align: middle;
                    }

                    .company-imgs2 li .btn-remove i {
                        vertical-align: middle;
                        transform: scale(0.8);
                    }



        * {
            margin: 0;
            padding: 0;
            list-style: none;
        }

        .form-horizontal {
            height: 100%;
            overflow-y: scroll;
        }

        .reviewBox {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10;
        }

            .reviewBox img, .reviewBox video {
                width: auto;
                height: 80%;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%,-50%);
            }

            .reviewBox .wrap {
                background: rgba(0,0,0,0.6);
                height: 100%;
            }

        .reviewClose {
            position: absolute;
            font-size: 12px;
            line-height: 1;
            width: 30px;
            height: 30px;
            right: 20px;
            top: 20px;
            border: 1px #e30512 solid;
            border-radius: 50%;
            background: #e30512;
            text-align: center;
            color: #fff;
            cursor: pointer;
        }

            .reviewClose::before {
                content: "";
                display: inline-block;
                height: 94%;
                vertical-align: middle;
            }

            .reviewClose i {
                vertical-align: middle;
                transform: scale(1);
                position: relative;
                top: 1px;
                display: inline-block;
                font-family: 'Glyphicons Halflings';
                font-style: normal;
                font-weight: normal;
                line-height: 1;
                -webkit-font-smoothing: antialiased;
            }

                .reviewClose i:before {
                    content: "\e014";
                }


        /**编辑*/
        .btnOpenTextBox {
            width: 100px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            font-size: 14px;
            background: #0090da;
            border-radius: 6px;
            color: #fff;
        }
    </style>
    <script>

        $(function () {
            
           
            


            $("#ContentPlaceHolder1_FileUpload2").change(function (e) {
                var $file = $(this);
                var fileObj = $file[0];
                var windowURL = window.URL || window.webkitURL;
                var dataURL;
                var $img = $("#ContentPlaceHolder1_image2");
                if (fileObj && fileObj.files && fileObj.files[0]) {
                    dataURL = windowURL.createObjectURL(fileObj.files[0]);
                    $img.attr('src', dataURL);
                } else {
                    dataURL = $file.val();
                    var imgObj = document.getElementById("ContentPlaceHolder1_image2");
                    // 两个坑:
                    // 1、在设置filter属性时，元素必须已经存在在DOM树中，动态创建的Node，也需要在设置属性前加入到DOM中，先设置属性在加入，无效；
                    // 2、src属性需要像下面的方式添加，上面的两种方式添加，无效；
                    imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
                    imgObj.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dataURL;

                }

                if (!$("#ContentPlaceHolder1_image2").attr("src")) {
                    $("#ContentPlaceHolder1_image2").parents("li").parents(".company-imgs3").css("display", "none");
                } else {
                    $("#ContentPlaceHolder1_image2").parents("li").parents(".company-imgs3").css("display", "inline-block");
                }
            })

            $("#ContentPlaceHolder1_FileUpload1").change(function (e) {
                var $file = $(this);
                var fileObj = $file[0];
                var windowURL = window.URL || window.webkitURL;
                var dataURL;
                var $img = $("#ContentPlaceHolder1_image1");
                if (fileObj && fileObj.files && fileObj.files[0]) {
                    dataURL = windowURL.createObjectURL(fileObj.files[0]);
                    $img.attr('src', dataURL);
                } else {
                    dataURL = $file.val();
                    var imgObj = document.getElementById("ContentPlaceHolder1_image1");
                    // 两个坑:
                    // 1、在设置filter属性时，元素必须已经存在在DOM树中，动态创建的Node，也需要在设置属性前加入到DOM中，先设置属性在加入，无效；
                    // 2、src属性需要像下面的方式添加，上面的两种方式添加，无效；
                    imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
                    imgObj.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dataURL;

                }
                if (!$("#ContentPlaceHolder1_image1").attr("src")) {
                    $("#ContentPlaceHolder1_image1").parents("li").parents(".company-imgs3").css("display", "none");
                } else {
                    $("#ContentPlaceHolder1_image1").parents("li").parents(".company-imgs3").css("display", "inline-block");
                }
            })

            var $input = $("#ContentPlaceHolder1_upLoad");
            // ①为input设定change事件
            $input.change(inputOnChangeFuc);

            function inputOnChangeFuc() {
                console.log('inputOnChangeFuc', $(this).val());
                if ($(this).val() != "") {
                    console.log('请求成功1')
                    UpLoadFile(this);
                }
            }

            var uploadImgLength = 0, len = 0;
            var hdfImagePath = $('#ContentPlaceHolder1_img');
            var nowLen = 0
            setTimeout(function () {
                $(".company-upload").on("click", function () {
                    nowLen = $("#ContentPlaceHolder1_ImgList").find("li").length;
                    if (nowLen >= 50) {
                        alert("最多上传50张图片");
                        return false;
                    }
                })
            }, 400)

            function resetInput(input) {
                input = $(input);

                input[0].value = '';

            }

            function UpLoadFile(ele) {
                var _this = ele;
                var hdfImagePath2 = $('#ContentPlaceHolder1_img');

                var tempLen = nowLen + $("#ContentPlaceHolder1_upLoad")[0].files.length

                var formData = new FormData();


                if (tempLen > 50) {
                    alert("最多上传50张图片");
                    return false;
                }
                for (var i = 0; i < $("#ContentPlaceHolder1_upLoad")[0].files.length; i++) {
                    formData.append('file[]', $('#ContentPlaceHolder1_upLoad')[0].files[i]);
                }

                var index = layer.load(3, {
                    content: '正在处理...',
                    shade: [0.4, '#393D49'],
                    success: function (layero) {
                        layero.css('padding-left', '30px');
                        layero.find('.layui-layer-content').css({
                            'padding-top': '40px',
                            'width': '200px',
                            'color': 'red',
                            'background-position-x': '16px'
                        });
                    }
                })
                $.ajax({
                    type: "POST",
                    url: "../Ajax/AdminHandler.ashx?method=UpLoad",
                    cache: false,
                    data: formData,
                    dataType: "json",
                    processData: false,
                    contentType: false,
                    success: function (data) {
                        //console.log('请求成功')
                        layer.close(index);
                        if (data == "0") {
                            alert("视频文件过大，请上传200M以内文件");
                            resetInput(_this);
                            //Window.parent.location.relod();

                            //location.href = "Edit.aspx?ID="+$('#ContentPlaceHolder1_hidID') .val();
                            return false;
                        }
                        var result = data.result;
                        var imageTable = $('#ContentPlaceHolder1_ImgList');

                        if (hdfImagePath2.val() != "") {
                            hdfImagePath2.val(hdfImagePath2.val() + ',' + result);
                            var b = hdfImagePath.val();
                        } else {
                            hdfImagePath.val(result);
                        }
                        //hdfImagePath.attr("data-id","1")

                        var images = result.split(",");
                        var html = imageTable.html();
                        for (var i = 0; i < images.length; i++) {
                            var name = images[i].split(".");
                            var houzhui = "";
                            for (var j = 0; j < name.length; j++) {
                                houzhui = name[1];
                            }
                            if (houzhui == "mp4") {
                                html += '<li>';
                                html += '<video class="btnShow" data-type="video" style="width:100%; object-fit: cover;height: 100%;" src="' + images[i] + '"  /></video>';
                                html += '<a class="btn-remove" data-url="' + images[i] + '"><i class="glyphicon glyphicon-remove"></i></a>';
                                html += '</li>';
                            } else {
                                html += '<li>';
                                html += '<img class="btnShow" data-type="img" src="' + images[i] + '"  />';
                                html += '<a class="btn-remove" data-url="' + images[i] + '"><i class="glyphicon glyphicon-remove"></i></a>';
                                html += '</li>';
                            }

                        }
                        imageTable.empty();
                        imageTable.append(html);
                        $("#ContentPlaceHolder1_upLoad").val("");

                    }
                });
            }

            $('body').on('click', '#ContentPlaceHolder1_ImgList .btn-remove', deleteImg);


            $('body').on('click', '.btnShow', function () {
                var type = $(this).attr('data-type');
                console.log(type);
                var reviewHtml = ''
                if (type == 'img') {
                    reviewHtml += '<div class="reviewBox">' +
                                        '<div class="wrap">' +
                                            '<img class="" src="' + $(this).attr("src") + '"/>' +
                                        '</div>' +
                                        '<a class="reviewClose"><i></i></a>' +
                                    '</div>'
                } else {
                    reviewHtml += '<div class="reviewBox">' +
                                        '<div class="wrap">' +
                                            '<video class="" controls="controls" autoplay src="' + $(this).attr("src") + '"/>' +
                                        '</div>' +
                                        '<a class="reviewClose"><i></i></a>' +
                                    '</div>'
                }

                var reviewBox = $('.reviewBox').remove();
                $('body').append(reviewHtml);
                reviewBox = $('.reviewBox');
                reviewBox.find('.reviewClose').one('click', function () {
                    var video = $(this).find('video');
                    if (video.length > 0) {
                        video[0].pause();
                    }
                    reviewBox.remove();
                });
            })



            var $input = $("#ContentPlaceHolder1_upLoad2");
            // ①为input设定change事件
            $input.change(inputOnChangeFuc2);

            function inputOnChangeFuc2() {
                console.log('inputOnChangeFuc2', $(this).val());
                if ($(this).val() != "") {
                    console.log('请求成功1')
                    UpLoadFile2(this);
                }
            }

            var uploadImgLength = 0, len = 0;
            var hdfImagePath4 = $('#ContentPlaceHolder1_img2');
            var nowLen = 0
            setTimeout(function () {
                $(".company-upload2").on("click", function () {
                    nowLen = $("#ContentPlaceHolder1_ImgList2").find("li").length;
                    if (nowLen >= 50) {
                        alert("最多上传50张图片");
                        return false;
                    }
                })
            }, 400)

            function resetInput(input) {
                input = $(input);

                input[0].value = '';

            }

            function UpLoadFile2(ele) {
                var _this = ele;
                var hdfImagePath4 = $('#ContentPlaceHolder1_img2');

                var tempLen = nowLen + $("#ContentPlaceHolder1_upLoad2")[0].files.length

                var formData = new FormData();


                if (tempLen > 50) {
                    alert("最多上传50张图片");
                    return false;
                }
                for (var i = 0; i < $("#ContentPlaceHolder1_upLoad2")[0].files.length; i++) {
                    formData.append('file[]', $('#ContentPlaceHolder1_upLoad2')[0].files[i]);
                }

                var index = layer.load(3, {
                    content: '正在处理...',
                    shade: [0.4, '#393D49'],
                    success: function (layero) {
                        layero.css('padding-left', '30px');
                        layero.find('.layui-layer-content').css({
                            'padding-top': '40px',
                            'width': '200px',
                            'color': 'red',
                            'background-position-x': '16px'
                        });
                    }
                })
                $.ajax({
                    type: "POST",
                    url: "../Ajax/AdminHandler.ashx?method=UpLoad",
                    cache: false,
                    data: formData,
                    dataType: "json",
                    processData: false,
                    contentType: false,
                    success: function (data) {
                        //console.log('请求成功')
                        layer.close(index);
                        if (data == "0") {
                            alert("视频文件过大，请上传200M以内文件");
                            resetInput(_this);
                            //Window.parent.location.relod();

                            //location.href = "Edit.aspx?ID="+$('#ContentPlaceHolder1_hidID') .val();
                            return false;
                        }
                        var result = data.result;
                        var imageTable = $('#ContentPlaceHolder1_ImgList2');

                        if (hdfImagePath4.val() != "") {
                            hdfImagePath4.val(hdfImagePath4.val() + ',' + result);
                            var b = hdfImagePath4.val();
                        } else {
                            hdfImagePath4.val(result);
                        }
                        //hdfImagePath.attr("data-id","1")

                        var images = result.split(",");
                        var html = imageTable.html();
                        for (var i = 0; i < images.length; i++) {
                            var name = images[i].split(".");
                            var houzhui = "";
                            for (var j = 0; j < name.length; j++) {
                                houzhui = name[1];
                            }
                            if (houzhui == "mp4") {
                                html += '<li>';
                                html += '<video class="btnShow" data-type="video" style="width:100%; object-fit: cover;height: 100%;" src="' + images[i] + '"  /></video>';
                                html += '<a class="btn-remove" data-url="' + images[i] + '"><i class="glyphicon glyphicon-remove"></i></a>';
                                html += '</li>';
                            } else {
                                html += '<li>';
                                html += '<img class="btnShow" data-type="img" src="' + images[i] + '"  />';
                                html += '<a class="btn-remove" data-url="' + images[i] + '"><i class="glyphicon glyphicon-remove"></i></a>';
                                html += '</li>';
                            }

                        }
                        imageTable.empty();
                        imageTable.append(html);
                        $("#ContentPlaceHolder1_upLoad2").val("");

                    }
                });
            }

            $('body').on('click', '#ContentPlaceHolder1_ImgList2 .btn-remove', deleteImg2);


            $('body').on('click', '.btnShow', function () {
                var type = $(this).attr('data-type');
                console.log(type);
                var reviewHtml = ''
                if (type == 'img') {
                    reviewHtml += '<div class="reviewBox">' +
                                        '<div class="wrap">' +
                                            '<img class="" src="' + $(this).attr("src") + '"/>' +
                                        '</div>' +
                                        '<a class="reviewClose"><i></i></a>' +
                                    '</div>'
                } else {
                    reviewHtml += '<div class="reviewBox">' +
                                        '<div class="wrap">' +
                                            '<video class="" controls="controls" autoplay src="' + $(this).attr("src") + '"/>' +
                                        '</div>' +
                                        '<a class="reviewClose"><i></i></a>' +
                                    '</div>'
                }

                var reviewBox = $('.reviewBox').remove();
                $('body').append(reviewHtml);
                reviewBox = $('.reviewBox');
                reviewBox.find('.reviewClose').one('click', function () {
                    var video = $(this).find('video');
                    if (video.length > 0) {
                        video[0].pause();
                    }
                    reviewBox.remove();
                });
            })








            var $input1 = $("#ContentPlaceHolder1_upLoad1");
            // ①为input设定change事件
            $input1.change(inputOnChangeFuc1);

            function inputOnChangeFuc1() {
                console.log('inputOnChangeFuc', $(this).val());
                if ($(this).val() != "") {
                    console.log('请求成功1')
                    UpLoadFile1(this);
                }
            }

            var uploadImgLength1 = 0, len1 = 0;
            var hdfImagePath1 = $('#ContentPlaceHolder1_img1');
            var nowLen1 = 0
            setTimeout(function () {
                $(".company-upload1").on("click", function () {
                    nowLen = $("#ContentPlaceHolder1_ImgList1").find("li").length;
                    if (nowLen1 >= 50) {
                        alert("最多上传10个视频");
                        return false;
                    }
                })
            }, 400)

            function resetInput1(input) {
                input1 = $(input);

                input1[0].value = '';

            }

            function UpLoadFile1(ele) {
                var _this = ele;
                var hdfImagePath3 = $('#ContentPlaceHolder1_img1');

                var tempLen = nowLen + $("#ContentPlaceHolder1_upLoad1")[0].files.length

                var formData = new FormData();


                if (tempLen > 50) {
                    alert("最多上传50张图片");
                    return false;
                }
                for (var i = 0; i < $("#ContentPlaceHolder1_upLoad1")[0].files.length; i++) {
                    formData.append('file[]', $('#ContentPlaceHolder1_upLoad1')[0].files[i]);
                }

                var index = layer.load(3, {
                    content: '正在处理...',
                    shade: [0.4, '#393D49'],
                    success: function (layero) {
                        layero.css('padding-left', '30px');
                        layero.find('.layui-layer-content').css({
                            'padding-top': '40px',
                            'width': '200px',
                            'color': 'red',
                            'background-position-x': '16px'
                        });
                    }
                })
                $.ajax({
                    type: "POST",
                    url: "../Ajax/AdminHandler.ashx?method=UpLoad",
                    cache: false,
                    data: formData,
                    dataType: "json",
                    processData: false,
                    contentType: false,
                    success: function (data) {
                        //console.log('请求成功')
                        layer.close(index);
                        if (data == "0") {
                            alert("视频文件过大，请上传200M以内文件");
                            resetInput(_this);
                            //Window.parent.location.relod();

                            //location.href = "Edit.aspx?ID="+$('#ContentPlaceHolder1_hidID') .val();
                            return false;
                        }
                        var result = data.result;
                        var imageTable = $('#ContentPlaceHolder1_ImgList1');

                        if (hdfImagePath3.val() != "") {
                            hdfImagePath3.val(hdfImagePath3.val() + ',' + result);
                            var b = hdfImagePath1.val();
                        } else {
                            hdfImagePath1.val(result);
                        }
                        //hdfImagePath.attr("data-id","1")

                        var images = result.split(",");
                        var html = imageTable.html();
                        for (var i = 0; i < images.length; i++) {
                            var name = images[i].split(".");
                            console.log("----" + name);
                            var houzhui = "";
                            for (var j = 0; j < name.length; j++) {
                                houzhui = name[1];
                            }
                            console.log("----" + houzhui);
                            if (houzhui == "mp4") {
                                html += '<li>';
                                html += '<video class="btnShow" data-type="video" style="width:100%;object-fit: cover;height: 100%;" src="' + images[i] + '"  /></video>';
                                html += '<a class="btn-remove" data-url="' + images[i] + '"><i class="glyphicon glyphicon-remove"></i></a>';
                                html += '</li>';
                            } else {
                                html += '<li>';
                                html += '<img class="btnShow" data-type="img" src="' + images[i] + '"  />';
                                html += '<a class="btn-remove" data-url="' + images[i] + '"><i class="glyphicon glyphicon-remove"></i></a>';
                                html += '</li>';
                            }

                        }
                        imageTable.empty();
                        imageTable.append(html);
                        $("#ContentPlaceHolder1_upLoad1").val("");

                    }
                });
            }

            $('body').on('click', '#ContentPlaceHolder1_ImgList1 .btn-remove', deleteImg1);


            $('body').on('click', '.btnShow', function () {
                var type = $(this).attr('data-type');
                console.log(type);
                var reviewHtml = ''
                if (type == 'img') {
                    reviewHtml += '<div class="reviewBox">' +
                                        '<div class="wrap">' +
                                            '<img class="" src="' + $(this).attr("src") + '"/>' +
                                        '</div>' +
                                        '<a class="reviewClose"><i></i></a>' +
                                    '</div>'
                } else {
                    reviewHtml += '<div class="reviewBox">' +
                                        '<div class="wrap">' +
                                            '<video class="" controls="controls" autoplay src="' + $(this).attr("src") + '"/>' +
                                        '</div>' +
                                        '<a class="reviewClose"><i></i></a>' +
                                    '</div>'
                }

                var reviewBox = $('.reviewBox').remove();
                $('body').append(reviewHtml);
                reviewBox = $('.reviewBox');
                reviewBox.find('.reviewClose').one('click', function () {
                    var video = $(this).find('video');
                    if (video.length > 0) {
                        video[0].pause();
                    }
                    reviewBox.remove();
                });
            })

        })

        function check() {
            if ($('#ContentPlaceHolder1_TextBox1').val() == '') {
                alert('职位名称不能为空');
                return false;
            }

            if ($('#ContentPlaceHolder1_TextBox2').val() == '') {
                alert('招聘人数不能为空');
                return false;
            } else {
                if (isNaN($('#ContentPlaceHolder1_TextBox2').val())) {
                    alert('请输入正确的招聘人数');
                    return false;
                }
            }
            if ($('#ContentPlaceHolder1_Infoset').val() == '') {
                alert("职位详情不能为空");
                return false;
            }

        }

        function deleteImg(e) {
            e.preventDefault();
            e.stopPropagation();
            var hdfImagePath1 = $('#ContentPlaceHolder1_img');
            var that = $(this);
            that.closest("li").remove();
            var imageArr = hdfImagePath1.val().split(",");

            //console.log(imageArr);
            //console.log(imageArr)
            for (var i = 0; i < imageArr.length; i++) {
                if (that.data('url') == imageArr[i]) {
                    imageArr.splice(i, 1);
                    //console.log(imageArr)
                    hdfImagePath1.val(imageArr.join());
                }
            }



        }

        function deleteImg2(e) {
            e.preventDefault();
            e.stopPropagation();
            var hdfImagePath1 = $('#ContentPlaceHolder1_img2');
            var that = $(this);
            that.closest("li").remove();
            var imageArr = hdfImagePath1.val().split(",");

            //console.log(imageArr);
            //console.log(imageArr)
            for (var i = 0; i < imageArr.length; i++) {
                if (that.data('url') == imageArr[i]) {
                    imageArr.splice(i, 1);
                    //console.log(imageArr)
                    hdfImagePath1.val(imageArr.join());
                }
            }



        }




        function deleteImg1(e) {
            e.preventDefault();
            e.stopPropagation();
            var hdfImagePath2 = $('#ContentPlaceHolder1_img1');
            var that = $(this);
            that.closest("li").remove();
            var imageArr = hdfImagePath2.val().split(",");

            //console.log(imageArr);
            //console.log(imageArr)
            for (var i = 0; i < imageArr.length; i++) {
                if (that.data('url') == imageArr[i]) {
                    imageArr.splice(i, 1);
                    //console.log(imageArr)
                    hdfImagePath2.val(imageArr.join());
                }
            }
        }

    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <!-- <div class="content bg-gray-lighter">
        <div class="row items-push">
            <div class="col-sm-7">
                <h1 class="page-heading">招聘信息表 <small>编辑招聘信息表</small></h1>
            </div>
        </div>
    </div> -->
    <div class="">
        <div class="block">
            <div class="block-header">
                <h3 class="block-title"></h3>
            </div>
            <div class="block-content block-content-narrow">
                <asp:HiddenField ID="hidID" runat="server" Value="0" />

                <div class="form-group">
                    <div class="form-material">
                        <div class="col-xs-12">
                            <label class="control-label">网点名称</label>
                            <asp:TextBox ID="TextBox1" runat="server" class="form-control"></asp:TextBox>

                        </div>
                    </div>
                </div>
<%--                <div class="form-group">
                    <div class="form-material">
                        <div class="col-xs-12">
                            <label class="control-label">网点链接</label>
                            <asp:TextBox ID="TextBox5" runat="server" class="form-control"></asp:TextBox>

                        </div>
                    </div>
                </div>--%>
                <div class="form-group">
                    <div class="form-material">
                        <div class="col-xs-12">
                            <label class="control-label" for="inputError2">网点主题:</label>
                            <asp:DropDownList ID="ddl_Type" runat="server" class="form-control">
                                <asp:ListItem Value="red" Text="red"></asp:ListItem>
                                <%--<asp:ListItem Value="blue" Text="blue"></asp:ListItem>--%>
                            </asp:DropDownList>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <div class="form-material">
                        <div class="col-xs-12">
                            <label class="control-label control-label" for="inputError2">LOGO:</label>
                            <div class="control-container">
                                <asp:HiddenField runat="server" ID="image1Hidden" Value="" />
                                <a href="javascript:;" class="company-upload4">
                                    <asp:FileUpload ID="FileUpload1" AllowMultiple="true" runat="server" CssClass="form-control" />
                                </a>
                                <ul class="company-imgs3">
                                    <li id="li1" runat="server">
                                        <asp:Image ID="image1" runat="server" CssClass="img" />
                                        <a class="btn-remove del-img"><i class="glyphicon glyphicon-remove"></i></a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="form-group">
                    <div class="form-material">
                        <div class="col-xs-12">
                            <label class="control-label control-label" for="inputError2">开屏海报:</label>
                            <div class="control-container">
                                <asp:HiddenField runat="server" ID="image2Hidden" Value="" />
                                <a href="javascript:;" class="company-upload3">
                                    <asp:FileUpload ID="FileUpload2" AllowMultiple="true" runat="server" CssClass="form-control" />
                                </a>

                                <ul class="company-imgs3">
                                    <li>
                                        <asp:Image ID="image2" runat="server" CssClass="img" />
                                        <a class="btn-remove del-img"><i class="glyphicon glyphicon-remove"></i></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
            </div>
            <div class="form-group">
                <div class="form-material">
                    <div class="col-xs-12">
                        <label class="control-label control-label" style="vertical-align: top;"  for="inputError2" >首页轮播图:<br />横屏<br />643px*597px</label>
                        <asp:HiddenField runat="server" ID="img" Value="" />
                        <%--<asp:HiddenField runat="server" ID="hdfImagePath" Value="1" />--%>
                        <div class="control-container" style="max-width: 80%;">
                            <a href="javascript:;" class="file company-upload">
                                <input type="file" name="" accept="image/x-png,image/jpeg,image/jpg" multiple="multiple" runat="server" id="upLoad" />
                            </a>
                            <ul class="company-imgs" style="max-width: 80%;" runat="server" id="ImgList">
                                <%= html %>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

                                                <div class="form-group">
                    <div class="form-material">
                        <div class="col-xs-12">
                            <label class="control-label control-label" for="inputError2" style="vertical-align: top;">首页轮播图:<br />竖屏<br />864px*487px</label>
                            <asp:HiddenField runat="server" ID="img2" Value="" />

                            <div class="control-container" style="max-width: 80%;">
                                <a href="javascript:;" class="file company-upload2">
                                    <input type="file" name="" accept="image/x-png,image/jpeg,image/jpg" multiple="multiple" runat="server" id="upLoad2" />
                                </a>
                                <ul class="company-imgs2" style="max-width: 80%;" runat="server" id="ImgList2">
                                    <%= html2 %>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            <div class="form-group">
                <div class="form-material">
                    <div class="col-xs-12">
                        <label class="control-label control-label" for="inputError2">首页轮播视频:</label>
                        <asp:HiddenField runat="server" ID="img1" Value="" />

                        <div class="control-container">
                            <a href="javascript:;" class="file company-upload1">
                                <input type="file" name="" accept="video/mp4" multiple="multiple" runat="server" id="upLoad1" />
                            </a>
                            <ul class="company-imgs1" runat="server" id="ImgList1">
                                <%= html1 %>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="form-material">
                    <div class="col-xs-12">
                        <label class="control-label">定时设置</label>
                        <asp:TextBox ID="TextBox2" runat="server" class="form-control"></asp:TextBox>

                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="form-material">
                    <div class="col-xs-12">
                        <label class="control-label">后台账号</label>
                        <asp:TextBox ID="TextBox3" runat="server" class="form-control"></asp:TextBox>

                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="form-material">
                    <div class="col-xs-12">
                        <label class="control-label">后台密码</label>
                        <asp:TextBox ID="TextBox4" runat="server" class="form-control"></asp:TextBox>

                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-xs-6">
                    <div class="form-material">
                        <asp:Button ID="btnSave" runat="server" Text="保存" CssClass="btn btn-sm btn-primary" OnClientClick="return check();" OnClick="btnSave_Click" />
                        <asp:Button ID="Button1" runat="server" Text="取消" CssClass="btn btn-sm btn-primary" OnClick="Button1_Click" />
                    </div>
                </div>
            </div>
        </div>

    </div>
    </div>




    <script>



    </script>


</asp:Content>

