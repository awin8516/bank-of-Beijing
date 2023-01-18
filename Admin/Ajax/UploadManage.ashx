<%@ WebHandler Language="C#" Class="UploadManage" %>

using System;
using System.Web;
using Aglie;
using Newtonsoft.Json;
using System.IO;

public class UploadManage : HandlerBase
{

    public string Upload()
    {
        var file = Request.Files["file"];
        var count = Request.Files;
        //var file = files[i];
        string path1 = "";
        //string ext = Path.GetExtension(files[i].FileName).Trim('.');
        if (file.ContentLength > 0)
        {
            string path = "/Upload/Img/" + Guid.NewGuid() + Path.GetExtension(file.FileName);
            file.SaveAs(Server.MapPath("~" + path));
            path1 = GetSiteUrl() + path;

        }
        return Result.Return(path1);

    }

    public string GetSiteUrl()
    {

        //string tet = HttpContext.Current.Request.Url.AbsolutePath;

        string fullUrl = Request.Url.AbsoluteUri;
        string querystring = Request.Url.PathAndQuery;
        string url = fullUrl.Replace(querystring, "");
        return url;

    }

}