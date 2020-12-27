<%@ Page Language="C#" AutoEventWireup="true" CodeFile="index.aspx.cs" Inherits="Admin_index" %>

<!DOCTYPE html>
<!--[if IE 9]>         <html class="ie9 no-focus"> <![endif]-->
<!--[if gt IE 9]><!-->
<html class="no-focus">
<!--<![endif]-->
<head>
    <meta charset="utf-8">

    <title>Admin</title>
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />

    <meta name="description" content="OneUI - Admin Dashboard Template & UI Framework created by pixelcave and published on Themeforest">
    <meta name="author" content="pixelcave">
    <meta name="robots" content="noindex, nofollow">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1.0">


    <!-- Page JS Plugins CSS -->
    <link rel="stylesheet" href="assets/js/plugins/slick/slick.min.css">
    <link rel="stylesheet" href="assets/js/plugins/slick/slick-theme.min.css">

    <!-- OneUI CSS framework -->
    <link rel="stylesheet" href="assets/css/oneui.css">
</head>
<body>
    <div id="page-container" class="sidebar-l sidebar-o side-scroll header-navbar-fixed">
        <!-- Sidebar -->
        <nav id="sidebar">
            <!-- Sidebar Scroll Container -->
            <div id="sidebar-scroll">
                <!-- Sidebar Content -->
                <!-- Adding .sidebar-mini-hide to an element will hide it when the sidebar is in mini mode -->
                <div class="sidebar-content">
                    <!-- Side Header -->
                    <div class="side-header bg-white-op" >
                        <!-- Layout API, functionality initialized in App() -> uiLayoutApi() -->
                        <!-- <button class="btn btn-link text-gray pull-right hidden-md hidden-lg" type="button" data-toggle="layout" data-action="sidebar_close">
                            <i class="fa fa-times"></i>
                        </button> -->
                        <!-- Themes functionality initialized in App() -> uiHandleTheme() -->

                        <a class="h5 text-white">
                            <span class="h4 font-w600 sidebar-mini-hide push-10-l">LINA SYSTEM</span>
                        </a>
                    </div>
                    <!-- END Side Header -->
                    <!-- Side Content -->
                    <div class="side-content">
                        <ul class="nav-main">


                            <li id="liUser" runat="server">
                                <a target="xframe" id="autolink" href="OutletsManage/List.aspx"><i class="si si-arrow-right"></i><span class="sidebar-mini-hide">网点配置</span></a>
                            </li>
                            <li id="li1" runat="server">
                                <a target="xframe" href="Party/List.aspx?ID=1"><i class="si si-arrow-right"></i><span class="sidebar-mini-hide">党建信息</span></a>
                            </li>
                            <li id="li2" runat="server">
                                <a target="xframe" href="Consumer/List.aspx?ID=1"><i class="si si-arrow-right"></i><span class="sidebar-mini-hide">消费者保护专栏</span></a>
                            </li>
                            <li id="li3" runat="server">
                                <a target="xframe" href="VIP/List.aspx?ID=1"><i class="si si-arrow-right"></i><span class="sidebar-mini-hide">贵宾增值服务</span></a>
                            </li>
                            <li id="li4" runat="server">
                                <a target="xframe" href="Financial/List.aspx?ID=1"><i class="si si-arrow-right"></i><span class="sidebar-mini-hide">理财资讯</span></a>
                            </li>
                            <li id="li5" runat="server">
                                <a target="xframe" href="Anniversary/List.aspx?ID=1"><i class="si si-arrow-right"></i><span class="sidebar-mini-hide">13周年庆</span></a>
                            </li>

                                                        <li id="li6" runat="server">
                                <a target="xframe" href="Global/List.aspx?ID=1"><i class="si si-arrow-right"></i><span class="sidebar-mini-hide">全局设置</span></a>
                            </li>
                        </ul>
                    </div>
                    <!-- END Side Content -->
                </div>
                <!-- Sidebar Content -->
            </div>
            <!-- END Sidebar Scroll Container -->
        </nav>
        <!-- END Sidebar -->
        <!-- Header -->
        <header id="header-navbar" class="content-mini content-mini-full">
            <!-- Header Navigation Right -->
            <ul class="nav-header pull-right">
                <li class="account">
                    <a><i class="si si-user"></i>
                        <asp:Label ID="Label1" runat="server" Text=""></asp:Label></a>
                </li>
                <li>
                    <!-- Layout API, functionality initialized in App() -> uiLayoutApi() -->
                    <a class="btn btn-default btn-bb" href="Logout.aspx">
                        <i class="si si-power"></i>
                    </a>
                </li>
            </ul>
            <!-- END Header Navigation Right -->
            <!-- Header Navigation Left -->
            <ul class="nav-header pull-left">
                <li class="hidden-md hidden-lg">
                    <!-- Layout API, functionality initialized in App() -> uiLayoutApi() -->
                    <button class="btn btn-default" data-toggle="layout" data-action="sidebar_mini_toggle" type="button">
                        <i class="fa fa-navicon"></i>
                    </button>
                </li>
            </ul>
            <!-- END Header Navigation Left -->
        </header>
        <!-- END Header -->
        <!-- Main Container -->
        <main id="main-container">
            <iframe id="xframe" name="xframe" class="xframe" frameborder="0" src=""  ></iframe>
        </main>
        <!-- END Main Container -->
    </div>
    <!-- END Page Container -->
    <!-- Apps Modal -->
    <!-- Opens from the button in the header -->
    <div class="modal fade" id="apps-modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-sm modal-dialog modal-dialog-top">
            <div class="modal-content">
                <!-- Apps Block -->
                <div class="block block-themed block-transparent">
                    <div class="block-header bg-primary-dark">
                        <ul class="block-options">
                            <li>
                                <button data-dismiss="modal" type="button"><i class="si si-close"></i></button>
                            </li>
                        </ul>
                        <h3 class="block-title">Apps</h3>
                    </div>
                    <div class="block-content">
                        <div class="row text-center">
                            <div class="col-xs-6">
                                <a class="block block-rounded" href="index.html">
                                    <div class="block-content text-white bg-default">
                                        <i class="si si-speedometer fa-2x"></i>
                                        <div class="font-w600 push-15-t push-15">Backend</div>
                                    </div>
                                </a>
                            </div>
                            <div class="col-xs-6">
                                <a class="block block-rounded" href="frontend_home.html">
                                    <div class="block-content text-white bg-modern">
                                        <i class="si si-rocket fa-2x"></i>
                                        <div class="font-w600 push-15-t push-15">Frontend</div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- END Apps Block -->
            </div>
        </div>
    </div>
    <!-- END Apps Modal -->
    <!-- OneUI Core JS: jQuery, Bootstrap, slimScroll, scrollLock, Appear, CountTo, Placeholder, Cookie and App.js -->
    <script src="assets/js/core/jquery.min.js"></script>
    <script src="assets/js/core/bootstrap.min.js"></script>
    <script src="assets/js/core/jquery.slimscroll.min.js"></script>
    <script src="assets/js/core/jquery.scrollLock.min.js"></script>
    <script src="assets/js/core/jquery.appear.min.js"></script>
    <script src="assets/js/core/jquery.countTo.min.js"></script>
    <script src="assets/js/core/jquery.placeholder.min.js"></script>
    <script src="assets/js/core/js.cookie.min.js"></script>
    <script src="assets/js/app.js"></script>
    <script src="assets/js/global.js"></script>

    <!-- Page JS Code -->
    <script>
        $(function () {
            // Init page helpers (Slick Slider plugin)
            App.initHelpers('slick');
        });
        if (document.getElementById("autolink")) {
            document.getElementById("autolink").click()
        }
    </script>
</body>
</html>
