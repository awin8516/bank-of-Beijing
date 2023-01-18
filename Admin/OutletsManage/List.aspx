<%@ Page Title="" Language="C#" MasterPageFile="~/Admin/Master/Main.master" AutoEventWireup="true" CodeFile="List.aspx.cs" Inherits="Lays_Job_List" %>


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
                        <a class="btn btn-success push-5-t" href="Edit.aspx" id="bent" runat="server"><i class="fa fa-plus push-5-r"></i>添加网点</a>
                    </div>
                    <div class="block-content">
                        <div class="table-responsive" id="box"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</asp:Content>

