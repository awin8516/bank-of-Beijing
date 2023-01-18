<%@ WebHandler Language="C#" Class="AdminHandler" %>

using System;
using System.Web;
using Aglie;
using System.Text.RegularExpressions;
using System.Collections.Generic;
using System.Text;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
public class AdminHandler : HandlerBase
{

    public string Login()
    {
        string username = Request["Username"];
        string password = Request["Password"];
        //youyijia_Login login = Manage.Get<youyijia_Login>("Number_Login=@0 and Password_Login=@1 and IsDel=@2", username, password, 0);
        if (username == "admin" && password == "7wfXStH6mwt9")//Request["Password"] == "admin" && Request["Password"]=="admin"
        {
            Session["Username"] = username;
            Session["LoginState"] = 1;
            return Result.OK;
        }
        else
        {
            Admin_OutletsManage m = Manage.Get<Admin_OutletsManage>("accountNumber=@0 and password=@1", username, password);
            if (m!=null)
            {
                Session["Username"] = username;
                Session["LoginState"] = 1;
                return Result.OK;
            }
            else
            {


                return Result.Error("用户名或密码错误");
            }
        }
    }

    public string GetRootPath()
    {
        return Result.Return(Request.ApplicationPath == "/" ? "" : Request.ApplicationPath);
    }



    public string UpLoad()
    {
        HttpFileCollection files = Request.Files;
        List<string> list = new List<string>();
        for (int i = 0; i < files.Count; i++)
        {
            if (files[i].ContentLength > 209715200)
            {
                return "0";
            }
            string path = string.Empty;
            string ext = System.IO.Path.GetExtension(files[i].FileName).Trim('.');
            if (ext.Contains("jpg") || ext.Contains("png") || ext.Contains("jpeg"))
            {
                path = "/Upload/Img/" + Guid.NewGuid() + System.IO.Path.GetExtension(files[i].FileName);
                files[i].SaveAs(Server.MapPath("~" + path));
            }
            else
            {
                path = "/Upload/Video/" + Guid.NewGuid() + System.IO.Path.GetExtension(files[i].FileName);
                files[i].SaveAs(Server.MapPath("~" + path));
            }
            list.Add(path);
        }
        return Result.Return(string.Join(",", list.ToArray()));

    }

}