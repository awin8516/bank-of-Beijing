using Aglie;
using System;
using System.Reflection;
using System.Web;

/// <summary>
/// InterfaceBase 普通接口基础类
/// </summary>
public class InterfaceBase : DataBase, IHttpHandler
{
    private const string method = "method";//方法约定参数名

    protected HttpResponse Response;
    protected HttpRequest Request;
    protected HttpServerUtility Server;

    //protected SessionBase Session;//普通接口登录状态
    //protected string OpenID;//微信小程序专用

    public void ProcessRequest(HttpContext context)
    {
        Response = context.Response;
        Request = context.Request;
        Server = context.Server;

        //Session = string.IsNullOrEmpty(Request["SessionKey"]) ? new SessionBase() : new SessionBase(Request["SessionKey"]);
        //OpenID = Session["OpenID"].ToString();

        string Method = Request[method];
        if (!string.IsNullOrEmpty(Method))
        {
            try
            {
                MethodInfo mi = this.GetType().GetMethod(Method);
                if (mi == null) return;
                object json = mi.Invoke(this, new object[] { });
                if (json != null) Response.Write(json.ToString());
            }
            catch (Exception ex)
            {
                EasyTool.Log(ex.InnerException.Message, Method);
                Response.Write(Result.Error(ex.InnerException.Message));
            }
        }
    }
    public bool IsReusable { get { return false; } }
}