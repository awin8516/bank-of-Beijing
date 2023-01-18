<%@ Page Title="" Language="C#" MasterPageFile="~/Admin/Master/Main.master" AutoEventWireup="true" CodeFile="Waiter.aspx.cs" Inherits="Lays_Job_List" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <style>
        /*.TS_table td:nth-child(4)>div {
            white-space: normal;
            width: 500px;
            word-break: break-word;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
        }*/
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <!-- <div class="content bg-gray-lighter">
        <div class="row items-push">
            <div class="col-sm-12">
                <h3 class="page-heading">招聘信息管理&nbsp;&nbsp;<small>可操编辑招聘信息。</small></h3>
            </div>
        </div>
    </div> -->
    <div class="">
        <div class="row">
            <div class="col-lg-12">
                <div class="block">
                    <div class="block-header remove-padding-b">
                        <div>
                            <div class="block-header " style="float: left">
                                <a id="add" runat="server" class="btn btn-success push-5-t" onserverclick="add_ServerClick"><i class="fa fa-plus push-5-r"></i>添加人员</a>
                            </div>
                                                        <div class="col-xs-4" style="float: right; margin-top: 1px;">
                                <div class="form-material" style="display:flex;align-items:center;">
                                    <asp:Image ID="image1" runat="server" CssClass="img" Height="100" Width="100" onerror="this.src='../assets/默认图标.png';this.onerror=null"/>
                                     <asp:FileUpload ID="fileUpload" runat="server" AllowMultiple="true" CssClass="form-control"  style="flex:2;"/>
                                    <a id="a1" runat="server" class="btn btn-success push-5-t" onserverclick="a1_ServerClick"><i class="fa fa-plus push-5-r"></i> 合照上传 </a>
                                </div>
                            </div>
<%--                            <div class="col-xs-2" style="float: right; margin-top: 15px;">
                                <div class="form-material">
                                   

                                </div>
                            </div>--%>

                        </div>
                        <%--                   <div class="form-group">
                    <div class="form-material">
                        <div class="col-xs-4">
                            <label class="control-label control-label" for="inputError2">合照：</label>
                            <asp:FileUpload ID="FileUpload1" AllowMultiple="true" runat="server" CssClass="form-control" />
                        </div>
                        <div class="col-xs-4">
                            <label class="control-label" for="inputError2"></label>
                            <div class="form-control px0 noborder">
                                <asp:Image ID="image1" runat="server" CssClass="img" />
                            </div>
                        </div>
                    </div>
                </div>--%>
                    </div>
                    <div class="block-content">
                        <div class="table-responsive" id="box"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</asp:Content>

