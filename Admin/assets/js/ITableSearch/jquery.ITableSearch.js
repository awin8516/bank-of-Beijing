/// <reference path="../jquery.js" />

// ITableSearch （基于jQuery）
// Html 将完全由前端控制

//初始化参数
//config		json配置文件地址
//box           加载元素
//callback		列表刷新回调函数
//hash			翻页hash模式 默认true
//exportname    导出的文件名

var ITableSearch = function (o) {

    //配置变量区
    var root_path = localStorage.tls || '';//项目根路径
    var material_path = root_path + '/Admin/assets/js/ITableSearch/';//素材包绝对路径 img 等  
    var config_path = root_path + '/Admin/json/';//config路径
    var data_path = root_path + '/Admin/Ajax/';//数据接口绝对路径
    var data_select = data_path + 'TableHandler.ashx?method=GetSelect';//动态选择框数据源接口地址
    var data_list = data_path + 'TableHandler.ashx?method=GetList';//获取列表接口地址
    var data_export = data_path + 'TableHandler.ashx?method=Export';//导出数据接口地址
    var data_ajax = data_path + 'TableHandler.ashx?method=Ajax';//简易Ajax数据接口地址



    var t = {};
    o = o || {};

    var Config = o.config || ''; //json配置文件地址
    t.box = $(o.box);
    t.hash = o.hash || true;//翻页hash模式
    t.callback = o.callback;//列表刷新回调函数
    var ExportName = o.exportname || 'excel.xlsx';

    //前端条件
    var JsonQuery = o.query ? JSON.stringify(o.query) : '';
    //加密条件及参数
    var EQuery = o.equery || '';
    var EPara = o.epara || '';


    //html 样式区 
    var TR = '<tr></tr>';
    var TD = '<td></td>';
    var A = '<a></a>';
    var DIV = '<div></div>';
    var OPTION = '<option></option>';
    var TS_text = '<input type="text" class="TS_input TS_text">';//文本框
    var TS_select = '<select class="TS_input TS_select"></select>';//下拉选择框
    var TS_between = '<input type="tel" class="TS_input TS_between">';//区间文本框
    var TS_time = '<input type="text" class="TS_input TS_time">';//时间文本框
    var TS_empty = '<a class="TS_empty btn btn-default btn-sm"><span class="glyphicon glyphicon-erase" aria-hidden="true"></span> 清除查询</a>';//清除查询按钮
    var TS_export = '<a class="TS_export btn btn-primary btn-sm"><span class="glyphicon glyphicon-floppy-save" aria-hidden="true"></span> 导出数据</a>';//导出按钮
    var Go = '<div><span>Page</span></div><div><input class="txt_go" type="text" /></div><div><a class="a_go" >Go</a> <div class="shiftAll" style="line-height: 28px;min-width: 100px;height: 28px;margin-left: 10px;font-family: "微软雅黑";"></div></div>';//指定跳转至x页


    t.subject = $(DIV);//主体
    // t.table = $('<table></table>').addClass('TS_table').addClass('table').addClass('table-bordered'); //表格区
    t.table = $('<table width="100%"></table>').addClass('TS_table').addClass('table').addClass('table-striped'); //表格区
    t.title = $('<thead></thead>').addClass('TS_title'); //标题区
    t.search = $('<tbody></tbody>').addClass('TS_search'); //查询区
    t.list = $('<tbody></tbody>').addClass('TS_list');//列表区
    t.page = $(DIV).addClass('TS_page');//翻页区

    //变量区
    var json = o.config_json;//JSON配置
    var p;//当前页码
    var timer;//延时器
    t.PageSize = 10;//页尺寸
    t.Span = 5;//页跨度


    //初始化
    t.Init = function () {

        t.LoadData(function () {
            t.LoadConfig();
            t.LoadTitle();
            t.LoadSearch();
            t.BindEvent();
            t.HtmlToBox();
            t.GetList();
            t.LoadAjax();
        })
    }
    //循环数据加载
    t.LoadData = function (callback) {

        LoadJSON(callback);
        //加载JSON配置文件
        function LoadJSON(callback) {
            if (json) LoadDataSelect(callback);
            else {
                Ajax(config_path + Config, 'GET', {}, function (data) {
                    json = data;
                    LoadDataSelect(callback);
                });
            }
        }
        //加载动态选择框数据
        function LoadDataSelect(callback) {

            var i = 0;
            function GetDataSelect() {
                if (i >= json.Column.length) { callback(); return; }
                var column = json.Column[i];
                i++;
                if (column.SearchType == 'Select' && column.DataSelect) {
                    Ajax(data_select, 'POST', { Config: Config, index: i - 1 }, function (data) {
                        var info = Object.prototype.toString.call(column.Info) == '[object Array]' ? column.Info : [];
                        data.result.forEach(function (x) {
                            var option = {}, j = 0;
                            for (var y in x) {
                                if (j == 0) option.Value = x[y]
                                else option.Text = x[y]
                                j++;
                            }
                            info.push(option);
                        })
                        column.Info = info;
                        GetDataSelect();
                    });
                }
                else GetDataSelect();
            }
            GetDataSelect();
        }
    }

    //加载配置
    t.LoadConfig = function () {

        var x = json.Config;
        t.PageSize = x.PageSize || t.PageSize;
        t.Span = x.Span || t.Span;

    }
    //加载标题
    t.LoadTitle = function () {
        var tr = $(TR);
        json.Column.forEach(function (x, i) {
            var td = $(TD);
            if (i == 1 || i == json.Column.length - 1) {
                td.attr("width", "260")
            }
            if (x.IsSort) td.addClass('TS_sort').data('id', 'Sort' + i).html(x.Title);
            else td.html(x.Title);
            tr.append(td);
        })
        t.title.append(tr);

    }
    //加载查询区
    t.LoadSearch = function () {

        var tr = $(TR);
        json.Column.forEach(function (x, i) {
            var td = $(TD);

            if (x.SearchType == 'Like' || x.SearchType == 'Equals') {
                var input = $(TS_text).data('id', 'Value' + i);
                td.append(input);
            }
            else if (x.SearchType == 'Select') {
                var select = $(TS_select).append(OPTION).data('id', 'Value' + i);
                if (x.Info) {
                    x.Info.forEach(function (x) {
                        if (x.Other) return;
                        var option = $(OPTION).text(x.Text).attr('value', x.Value);
                        select.append(option);
                    })
                }
                td.append(select);
            }
            else if (x.SearchType == 'Between') {
                var left_input = $(TS_between).data('id', 'LeftValue' + i);
                var right_input = $(TS_between).data('id', 'RightValue' + i);
                td.append(left_input).append('-').append(right_input);

            }
            else if (x.SearchType == 'Time') {
                var left_input = $(TS_time).data('id', 'LeftValue' + i);
                var right_input = $(TS_time).data('id', 'RightValue' + i);
                td.append(left_input).append(' - ').append(right_input);
            }
            else if (x.SearchType && x.SearchType.indexOf('Export') > -1) td.append(TS_export).append(TS_empty);
            else if (x.SearchType && (x.SearchType.indexOf('Empty') > -1 || x.SearchType.indexOf('Clear') > -1)) td.append(TS_empty);
            td.find("input").attr("placeholder", x.Title + " 筛选")
            tr.append(td);
        });
        t.search.append(tr);
    }
    //绑定事件
    t.BindEvent = function () {
        var sort = t.title.find('.TS_sort');
        sort.on('click', function () {
            var x = $(this);
            if (x.hasClass('TS_sort_asc'))
                x.removeClass('TS_sort_asc').addClass('TS_sort_desc');
            else
                x.removeClass('TS_sort_desc').addClass('TS_sort_asc');
            t.GetList(1);
        })
        var input = t.search.find('.TS_input');
        input.each(function (i, x) {
            x = $(x);
            if (x.hasClass('TS_select')) x.on('change', function () { t.GetList(1) })
            else if (x.hasClass('TS_time')) x.on('focus', function () { WdatePicker(); t.GetList(1); })
            else x.keyup(function () { t.GetList(1) })
        });
        t.search.find('.TS_empty').on('click', function () { t.Empty() });
        t.search.find('.TS_export').on('click', function () { t.Export() });
    }
    //输出HTML到box
    t.HtmlToBox = function () {

        t.table.append(t.title).append(t.search).append(t.list);
        t.subject.append(t.table).append(t.page);
        t.box.append(t.subject);

    }
    //获取列表
    t.GetList = function (p) {
        clearTimeout(timer);
        timer = setTimeout(function () {

            var data = GetData();
            p = p || t.p || (t.hash && parseInt(location.hash.substr(1))) || 1;
            if (t.hash) location.hash = '#' + p;
            data['p'] = p;

            Ajax(data_list, 'POST', data, function (data) {

                t.LoadList(data.result.List);
                t.LoadPage(p, data.result.Count, function (p) { t.GetList(p) });

                if (t.callback) t.callback();
            })

        }, 300);
    }

    /**
     * 字符去标点，取纯文本
     * @param {*} str 
     */
    function formatStr(str) {
        return str.replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?|\（|\）|\【|\】|\《|\》|\‘|\’|\“|\”|\：|\、|\；|\。|\？|\！|\￥|\…|\……|\—|\——|\·]/g, "");
    }

    function isChn(str) {
        var reg = /^[\u4E00-\u9FA5]+$/;
        if (!reg.test(str)) {
            // alert("不是中文"); 
            return false;
        }
        // alert("中文"); 
        return true;
    }

    function toUnicode(str, split) {
        split = split || "-"
        var len = str.length;
        var res = str.charCodeAt(0);
        if (len > 1) {
            for (var i = 1; i < len; i++) {
                res += str.charCodeAt(i)
            }
        }
        return parseInt(res).toString(16)
    }
    //加载列表
    t.LoadList = function (data) {

        t.list.empty();

        data.forEach(function (x, i) {

            var tr = $(TR);
            json.Column.forEach(function (y, i) {
                var td = $(TD);
                td.addClass(y.Bind)
                if (y.AttrTitle) {
                    td.attr("title", x[y.Bind])
                }
                if (y.TrClass) {
                    if (typeof x[y.Bind] == "string") {
                        var cls = formatStr(x[y.Bind])
                        cls = isChn(cls) ? toUnicode(cls) : cls;
                        tr.addClass(y.Bind + '-' + cls);
                    } else {
                        tr.addClass(y.Bind + '-' + x[y.Bind]);
                    }

                }
                if (y.BindType == 'Time') {
                    td.append(Format(x[y.Bind], y.Info));
                }
                else if (y.BindType == 'Select') {
                    for (var i = 0; i < y.Info.length ; i++) {
                        var z = y.Info[i];
                        if (z.Value == x[y.Bind] || z.Other) {
                            td.append(BindData(z.Text, x)); break;
                        }
                    }
                    if (!td.html()) td.append(x[y.Bind]);
                }
                else if (y.BindType == 'Html') {
                    td.append(BindData(y.Info, x));
                }
                else if (y.FK) {
                    td.append(x[y.Bind] || x[y.FK.Bind]);
                }
                else {
                    td.append(x[y.Bind]);
                }
                // if(i == 1){
                //     td.attr("title",x[y.Bind])
                // }
                tr.append(td);
            });
            t.list.append(tr);
        })

    }

    //加载分页
    var CountAll = 0;
    t.LoadPage = function (p, Count, Click) {
        //CountAll = Count;

        


        var PageCount = parseInt(Count / t.PageSize) + (Count % t.PageSize > 0 ? 1 : 0); //总页数

        CreatePageHtml(Count);
        BindPageEvent();

        //绑定分页事件
        function BindPageEvent() {

            t.page.find('.bind').click(function () { Click(parseInt($(this).data('p'))); });

            t.page.find('.a_go').click(function () {
                if (t.page.find('.txt_go').val() != '') {
                    var p = parseInt(t.page.find('.txt_go').val());
                    p = (p.toString() == 'NaN' || p < 1) ? 1 : p;
                    p = p > PageCount ? PageCount : p;
                    Click(p);
                }
            });
        }
        //生成分页HTML
        function CreatePageHtml(AllCount) {
            t.page.empty();

            if (Count <= t.PageSize) return '';
            if (p > PageCount) p = PageCount;

            var span = (t.Span - 1) / 2;
            var start = (p - span) <= 2 ? 2 : p - span;
            var end = (p + span) >= PageCount ? PageCount - 1 : (p + span);
            start = PageCount - t.Span < start ? (PageCount - t.Span + 1 > 2 ? PageCount - t.Span + 1 : 2) : start;
            end = 1 + t.Span > end ? (t.Span < PageCount - 1 ? t.Span : PageCount - 1) : end;

            var btn_Prev = $(A).append('Prev');
            if (p > 1) btn_Prev.addClass('bind').data('p', p - 1);
            t.page.append($(DIV).append(btn_Prev));

            var btn_Start = $(A).addClass('num').addClass(p == 1 ? 'sel' : 'bind').append(1).data('p', 1);
            t.page.append($(DIV).append(btn_Start));

            if (start > 2) t.page.append($(DIV).append('...'));

            for (var i = start; i <= end; i++) {
                var btn_Num = $(A).addClass('num').addClass(p == i ? 'sel' : 'bind').append(i).data('p', i);
                t.page.append($(DIV).append(btn_Num));
            };

            if (end < PageCount - 1) t.page.append($(DIV).append('...'));

            var btn_End = $(A).addClass('num').addClass(p == PageCount ? 'sel' : 'bind').append(PageCount).data('p', PageCount);
            t.page.append($(DIV).append(btn_End));

            var btn_Next = $(A).append('Next');
            if (p < PageCount) btn_Next.addClass('bind').data('p', p + 1);
            t.page.append($(DIV).append(btn_Next));

            
            t.page.append(Go);
            $(".shiftAll").text("总数："+AllCount)
        }
    }
    //加载Ajax配置
    t.LoadAjax = function () {
        if (!json.Ajax) return;

        json.Ajax.forEach(function (x) {
            window[x.Name] = function (para) {
                var data = { Config: Config, Name: x.Name, Para: JSON.stringify(para) };
                Ajax(data_ajax, 'POST', data, function (r) {
                    var result = r.result;
                    if (r.result && x.Update) t.GetList();

                    eval(x.Info);
                })
            }
        })
    }
    //清除查询条件
    t.Empty = function () {
        var sort = t.title.find('.TS_sort');
        sort.removeClass('TS_sort_asc').removeClass('TS_sort_desc');

        var input = t.search.find('.TS_input');
        input.each(function (i, x) { $(x).val('') });

        t.GetList(1);
    }
    //导出
    t.Export = function () {
        var excelName = $('#ContentPlaceHolder1_hdfExcel').val();
        var data = GetData();
        data.ExportName = excelName;
        var refID = $('#ContentPlaceHolder1_hdfExcelRefID').val();
        if (refID != undefined) {
            data.RefID = refID;
        }
        else {
            data.RefID = "0";
        }
        data._ = Math.random();
        var para = '';
        for (var k in data) {
            para += '&' + k + '=' + data[k];
        }
        window.open(data_export + para);
    }
    //收集查询条件
    function GetData() {
        var data = { Config: Config, JsonQuery: JsonQuery, EQuery: EQuery, EPara: EPara };
        var Sort = {}, Query = {};

        var sort = t.title.find('.TS_sort');
        sort.each(function (i, x) {
            x = $(x);
            if (x.hasClass('TS_sort_asc')) Sort[x.data('id')] = 'asc';
            if (x.hasClass('TS_sort_desc')) Sort[x.data('id')] = 'desc';
        });
        data.Sort = JSON.stringify(Sort);

        var input = t.search.find('.TS_input');
        input.each(function (i, x) {
            x = $(x);
            if (x.val()) Query[x.data('id')] = x.val();
        });
        data.Query = JSON.stringify(Query);

        return data;
    }
    //数据交互
    function Ajax(url, type, data, callback) {
        url += (url.indexOf('?') != -1 ? '&' : '?') + '_=' + Math.random();
        $.ajax({
            url: url,
            type: type,
            data: data,
            success: callback,
            dataType: 'json'
        });
    }

    function BindData(Info, x) {
        return Info ? Info.replace(/{[^{^}]+}/g, function (v) {
            bind = v.substr(1, v.length - 2);

            return x[bind] || ((x[bind] === 0 || x[bind] === false) ? x[bind] : (x[bind] == null ? '' : v));
        }) : '';
    }

    function Format(date, fmt) {
        if (!date) return '';
        if (!fmt) return date;
        date = new Date(date);
        var o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "H+": date.getHours(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S": date.getMilliseconds()
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        for (var k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
            }
        }
        return fmt;
    }


    t.Init();
    return t;
}