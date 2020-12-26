using Aglie;
using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Web;
using System.Web.SessionState;

/// <summary>
/// Binding 的摘要说明
/// </summary>
public class Binding : IHttpHandler, IRequiresSessionState
{
    protected HtmlDocument Html;
    protected HttpResponse Response;
    protected HttpRequest Request;
    protected HttpServerUtility Server;
    protected HttpSessionState Session;

    protected static DBHelper DB = new DBHelper("DB");
    protected static ManageBase Manage = new ManageBase(DB);

    public void ProcessRequest(HttpContext context)
    {
        Response = context.Response;
        Request = context.Request;
        Server = context.Server;
        Session = context.Session;

        string path = Request.Url.AbsolutePath;
        string MapPath = Server.MapPath(path);
        if (!File.Exists(MapPath)) return;
        string param = Request.Url.Query;

        using (StreamReader sr = new StreamReader(MapPath))
        {
            Html = new HtmlDocument();
            Html.LoadHtml(sr.ReadToEnd());

            string Method = Path.GetFileNameWithoutExtension(path).ToLower();
            try
            {
                MethodInfo mi = this.GetType().GetMethod(Method, BindingFlags.Public | BindingFlags.IgnoreCase | BindingFlags.Instance);
                if (mi != null) mi.Invoke(this, null);
            }
            catch (TargetInvocationException ex)
            {
                EasyTool.Log(ex.InnerException.Message, "页面绑定报错/" + Method);
                throw ex.InnerException;
            }

            Response.Write(Html.DocumentNode.InnerHtml);
        }
    }

    public bool IsReusable
    {
        get { return true; }
    }
}
