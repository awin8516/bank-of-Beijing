<%@ WebHandler Language="C#" Class="TableHandler" %>

using System;
using System.Web;
using Aglie;
using System.Text;
public class TableHandler : HandlerBase
{
    public string GetSelect()
    {
        string Config = Request["Config"];
        int index = int.Parse(Request["index"]);
        
        ITableSearch ts = new TableSearch(Config);
        return Result.Return(ts.GetSelect(index));
    }
    public string GetList()
    {
        int p = int.Parse(Request["p"]);
        string Config = Request["Config"];
        string Query = Request["Query"];
        string Sort = Request["Sort"];
        string EQuery = Request["EQuery"];
        string EPara = Request["EPara"];
        string JsonQuery = Request["JsonQuery"];

        ITableSearch ts = new TableSearch(Config, EQuery, EPara, JsonQuery);
        return Result.Return(ts.GetList(p, Query, Sort));
    }

    public void Export()
    {
        string Config = Request["Config"];
        string Query = Request["Query"];
        string Sort = Request["Sort"];
        string EQuery = Request["EQuery"];
        string EPara = Request["EPara"];
        string JsonQuery = Request["JsonQuery"];
        string ExportName = Request["ExportName"];
        string RefID = Request["RefID"];
        //JsonQuery = "{DistributorID:1}";
        ITableSearch ts = new TableSearch(Config, EQuery, EPara, JsonQuery);
        //Response.ClearContent();
        //Response.AddHeader("content-disposition", "attachment; filename=" + ExportName + ".csv");
        //Response.ContentEncoding = System.Text.Encoding.GetEncoding("utf-8");
        //Response.ContentType = "application/excel";
        //string exportContent = "";
        //if (RefID != "0")
        //{
        //    //EasyTool.Log("RefID=" + RefID + ",Query=" + Query, "export");
        //    exportContent = ts.ExportCSV(Query, Sort, RefID, ExportName);
        //}
        //else
        //{
        //    exportContent = ts.ExportCSV(Query, Sort);
        //}

        //Response.Write(exportContent);
        //Response.End();


        Response.ClearContent();
        Response.AppendHeader("content-disposition", "attachment; filename=" + HttpUtility.UrlEncode(ExportName + ".csv", System.Text.Encoding.UTF8).Replace("+", "%20"));
        //sponse.AddHeader("content-disposition", "attachment; filename=" + ExportName + ".csv",);
        //Response.ContentEncoding = System.Text.Encoding.GetEncoding("utf-8");
        Response.Charset = "UTF-8";
        Response.ContentEncoding = System.Text.Encoding.UTF8;
        Response.HeaderEncoding = System.Text.Encoding.UTF8;
        Response.ContentType = "text/csv";
        //主要是下面这一句  
        Response.BinaryWrite(new byte[] { 0xEF, 0xBB, 0xBF });
        StringBuilder exportContent = new StringBuilder();
        if (RefID != "0")
        {
            //EasyTool.Log("RefID=" + RefID + ",Query=" + Query, "export");
            exportContent = ts.ExportCSV(Query, Sort, RefID, ExportName);
        }
        else
        {
            exportContent = ts.ExportCSV(Query, Sort);
        }
        System.IO.StringWriter sw = new System.IO.StringWriter(exportContent);
        Response.Write(sw);

        //Response.Write(exportContent);
        Response.End();
    }

    public string Ajax()
    {
        string Config = Request["Config"];
        string Name = Request["Name"];
        string Para = Request["Para"];

        TableSearch ts = new TableSearch(Config);

        return Result.Return(ts.Ajax(Name, Para));
    }
}