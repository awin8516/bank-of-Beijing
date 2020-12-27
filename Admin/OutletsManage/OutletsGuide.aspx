<%@ Page Title="" Language="C#" MasterPageFile="~/Admin/Master/Main.master" AutoEventWireup="true" CodeFile="OutletsGuide.aspx.cs" Inherits="Lays_BrandInfo_Edit" ValidateRequest="false" %>

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

    <script>

        $(document).ready(function summernote() {
            $('#Info').summernote({
                height: 450,
                minHeight: 250,
                maxHeight: 1000,
                
                fontSizes: ['11', '12', '13', '14', '15', '16', '17', '18', '19', '20'
                    , '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'
                ],
            })
            $('#ContentPlaceHolder1_Infoset').summernote({
                height: 450,
                minHeight: 250,
                maxHeight: 1000,
                fontSizes: ['11', '12', '13', '14', '15', '16', '17', '18', '19', '20'
                    , '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'
                ],
                callbacks: {
                    onImageUpload: function (files) {

                        var formData = new FormData();
                        formData.append('file', files[0]);

                        $.ajax({
                            url: '../Ajax/UploadManage.ashx?method=Upload',
                            type: "POST",
                            data: formData,
                            dataType: 'JSON',
                            processData: false,//告诉jQuery不要加工数据
                            contentType: false,
                            success: function (data) {
                                if (data.errcode == 0) {
                                    $('#ContentPlaceHolder1_Infoset').summernote('insertImage', data.result, 'img');
                                }
                            },
                            error: function (data) {
                                alert(data);
                            }
                        });
                    }
                }
            })
            $('#Info3').summernote({
                height: 450,
                minHeight: 250,
                maxHeight: 1000,
                fontSizes: ['11', '12', '13', '14', '15', '16', '17', '18', '19', '20'
                    , '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'
                ],
            })


        })

        function check() {
            if ($('#ContentPlaceHolder1_Infoset').val() == '') {
                alert("请输入内容");
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
                        <div class="col-xs-8">
                            <label class="control-label">内容：</label>
                            <%-- <asp:TextBox ID="TextBox3" runat="server" class="form-control"></asp:TextBox>--%>
                            <textarea class="form-control" id="Infoset" runat="server"></textarea>

                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <div class="form-material">
                        <div class="col-xs-12">
                            <label class="control">高峰-小时：</label>
                            <asp:TextBox ID="TextBox1" runat="server" autocomplete="off" Height="200px" TextMode="MultiLine" Width="945px" style="display:block;border:solid 1px #ccc;">09:00-11:00=4,
11:00-12:00=3,
12:00-13:00=2,
13:00-14:00=3,
14:00-15:30=4,
15:30-17:00=2,</asp:TextBox>
                        </div>
                    </div>
                </div>
                
                <div class="form-group">
                    <div class="form-material">
                        <div class="col-xs-12">
                            <label class="control">高峰-周：</label>
                            <asp:TextBox ID="TextBox2" runat="server"  autocomplete="off" Height="200px" TextMode="MultiLine" Width="945px" style="display:block;border:solid 1px #ccc;">周一=4,
周二=3,
周三=3,
周四=2,
周五=3,
周日=1,</asp:TextBox>

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

