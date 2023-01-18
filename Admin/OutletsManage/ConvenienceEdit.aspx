<%@ Page Title="" Language="C#" MasterPageFile="~/Admin/Master/Main.master" AutoEventWireup="true" CodeFile="ConvenienceEdit.aspx.cs" Inherits="Lays_BrandInfo_Edit" ValidateRequest="false" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <link href="../assets/css/style.css" rel="stylesheet" />
    <link href="../assets/js/plugins/bootstrap-datepicker/bootstrap-datepicker3.min.css" rel="stylesheet" />
    <script src="../assets/js/plugins/bootstrap-datepicker/bootstrap-datepicker.min.js"></script>
    <link href="../assets/summernote/summernote.css" rel="stylesheet" />
    <script src="../assets/summernote/summernote.js"></script>
    <script src="../assets/summernote/lang/summernote-zh-CN.js"></script>

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
        })
        function check() {
            if ($('#ContentPlaceHolder1_TextBox1').val() == '') {
                alert("请输入标题");
                return false;
            }
        }

    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <!-- <div class="content bg-gray-lighter">
        <div class="row items-push">
            <div class="col-sm-7">
                <h1 class="page-heading">产品介绍 <small>编辑产品介绍</small></h1>
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
                            <label class="control-label">标题</label>
                            <asp:TextBox ID="TextBox1" runat="server" class="form-control"></asp:TextBox>

                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="form-material">
                        <div class="col-xs-12">
                            <label class="control-label control-label" for="inputError2">图标：</label>
                            <div class="control-container">
                                <asp:HiddenField runat="server" ID="image1Hidden" Value="" />
                                <a href="javascript:;" class="company-upload4">
                                    <asp:FileUpload ID="FileUpload1" AllowMultiple="true" runat="server" CssClass="form-control" />
                                </a>
                                <ul class="company-imgs3">
                                    <li>
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
                            <label class="control-label control-label" for="inputError2">照片：</label>
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
</asp:Content>

