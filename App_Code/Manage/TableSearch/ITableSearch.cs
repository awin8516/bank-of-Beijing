using Aglie;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

/// <summary>
/// ITableSearch 的摘要说明
/// </summary>
public abstract class ITableSearch
{
    protected int PageSize;//页尺寸
    protected int Span;//分页跨度
    protected JSON Subject;//主xml对象
    protected JSON Column;//表对象


    protected abstract void LoadJSON(string Config);
    public abstract string GetSelect(int index);
    public abstract string GetList(int p, string query, string sort);
    public abstract byte[] Export(string query, string sort);
    public abstract StringBuilder ExportCSV(string query, string sort, string refID = "0", string exportName = "");
}