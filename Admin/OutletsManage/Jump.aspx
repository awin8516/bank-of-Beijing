<%@ Page Title="" Language="C#" MasterPageFile="~/Admin/Master/Main.master" AutoEventWireup="true" CodeFile="Jump.aspx.cs" Inherits="Lays_BrandInfo_list" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <link href="../assets/css/style.css" rel="stylesheet" />
    <div class="content bg-gray-lighter">
        <div class="row items-push">
            <div class="col-sm-12">
                <h3 class="page-heading">菜单管理 - <asp:Label ID="Label1" runat="server" Text=""></asp:Label></h3>
            </div>
            <div class="col-sm-12 brand-tabs">
                <div class="tabs-nav">
                    <a id="a1" runat="server" class="" data-link="OutletsGuide.aspx" ><i class="glyphicon glyphicon-th-list"></i> 网点导览</a>

                    <a id="a3" runat="server" class="" data-link="Convenience.aspx" ><i class="glyphicon glyphicon-tree-deciduous"></i> 便民设施</a>
                
                    <a id="a2" runat="server" class="" data-link="Waiter.aspx" ><i class="glyphicon glyphicon-user"></i> 服务人员展示</a>
                
                    <a id="a5" runat="server" class="" data-link="Honors.aspx" ><i class="glyphicon glyphicon-book"></i> 我们的荣誉</a>
                </div>
            </div>
        </div>
    </div>

    <div class="content brand-iframe-box">
        <iframe id="brandIframe" src="" frameborder="0"></iframe>
    </div>

    <script>
        var brandId = $(".form-master").attr("action").split("=")[1];
        var tabNav = $(".tabs-nav a");
        var brandIframe = $("#brandIframe")
        tabNav.on("click", function(){
            $(this).siblings(".current").removeClass("current");
            $(this).addClass("current");
            var link = $(this).data("link")
            var p = link == "OutletsGuide.aspx" ? "OutletsID" : "OutletsID"
            brandIframe[0].src = $(this).data("link") + "?"+p+"=" + brandId
        })

        tabNav.eq(0).click();


    </script>





    <!-- <div class="content">
        <div class="row">
            <div class="col-lg-12">
                <div class="block">
                    <div class="block-header remove-padding-b">
                        <a id="add" runat="server" class="btn btn-success push-5-t" onserverclick="add_ServerClick"><i class="fa fa-plus push-5-r"></i>添加产品介绍</a>
                    </div>
                    <div class="block-content">
                        <div class="table-responsive" id="box"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>  -->
</asp:Content>



