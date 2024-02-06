<%@ Page Title="" Language="C#" MasterPageFile="~/Admin/Master/Main.master" AutoEventWireup="true" CodeFile="WaiterEdit.aspx.cs" Inherits="Lays_Job_Edit" ValidateRequest="false" %>

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
            .company-upload, .company-upload4 {
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

            .company-upload::before, .company-upload4::before{
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

            .company-upload::after, .company-upload4::after {
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

            .company-upload input, .company-upload4 input {
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
                    if (nowLen >= 1000) {
                        alert("最多上传1000张图片");
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


                if (tempLen > 1000) {
                    alert("最多上传1000张图片");
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
                            alert("视频文件过大，请上传20M以内文件");
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
                                html += '<b class="btn-move btn-left"><i class="glyphicon glyphicon-arrow-left"></i></b>';
                                html += '<b class="btn-move btn-right"><i class="glyphicon glyphicon-arrow-right"></i></b>';
                                html += '</li>';
                            } else {
                                html += '<li>';
                                html += '<img class="btnShow" data-type="img" src="' + images[i] + '"  />';
                                html += '<a class="btn-remove" data-url="' + images[i] + '"><i class="glyphicon glyphicon-remove"></i></a>';
                                html += '<b class="btn-move btn-left"><i class="glyphicon glyphicon-arrow-left"></i></b>';
                                html += '<b class="btn-move btn-right"><i class="glyphicon glyphicon-arrow-right"></i></b>';
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


        })

        function check() {
            if ($('#ContentPlaceHolder1_TextBox1').val() == '') {
                alert('姓名不能为空');
                return false;
            }
            if ($('#ContentPlaceHolder1_image1').attr('src') == '' && $('#ContentPlaceHolder1_FileUpload1').val() == '') {
                alert("请上图片");
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
                <asp:HiddenField ID="HiddenField1OutletsID" runat="server" Value="0" />
                <div class="form-group">
                    <div class="form-material">
                        <div class="col-xs-12">
                            <label class="control-label">姓名</label>
                            <asp:TextBox ID="TextBox1" runat="server" class="form-control"></asp:TextBox>

                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <div class="form-material">
                        <div class="col-xs-12">
                            <label class="control-label" for="inputError2">科室:</label>
                            <asp:DropDownList ID="ddl_Type" runat="server" class="form-control">
  
                            </asp:DropDownList>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="form-material">
                        <div class="col-xs-12">
                            <label class="control-label">岗位</label>
                            <asp:TextBox ID="TextBox2" runat="server" class="form-control"></asp:TextBox>

                        </div>
                    </div>
                </div>
           <div class="form-group">
                    <div class="form-material">
                        <div class="col-xs-12">
                            <label class="control-label">工号</label>
                            <asp:TextBox ID="TextBox3" runat="server" class="form-control"></asp:TextBox>

                        </div>
                    </div>
                </div>
                           <div class="form-group">
                    <div class="form-material">
                        <div class="col-xs-12">
                            <label class="control-label">服务承诺</label>
                            <asp:TextBox ID="TextBox4" runat="server" class="form-control"></asp:TextBox>

                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="form-material">
                        <div class="col-xs-12">
                            <label class="control-label control-label" for="inputError2">照片：</label>
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
                            <label class="control-label">资质</label>
                            <asp:TextBox ID="TextBox5" runat="server" class="form-control"></asp:TextBox>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="form-material">
                        <div class="col-xs-12">
                            <label class="control-label control-label" for="inputError2">资质照片:</label>
                            <asp:HiddenField runat="server" ID="img" Value="" />
                            <%--<asp:HiddenField runat="server" ID="hdfImagePath" Value="1" />--%>
                            <div class="control-container">
                                <a href="javascript:;" class="file company-upload">
                                    <input type="file" name="" accept="image/x-png,image/jpeg,image/jpg" multiple="multiple" runat="server" id="upLoad" />
                                </a>
                                <ul class="company-imgs upload-file-list" runat="server" id="ImgList">
                                    <%= html %>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="form-material">
                        <div class="col-xs-12">
                            <label class="control-label">排序</label>
                            <asp:TextBox ID="TextBox6" runat="server" Text="1" class="form-control"></asp:TextBox>
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

