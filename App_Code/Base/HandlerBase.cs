using Aglie;
using System;
using System.Reflection;
using System.Web;
using System.Web.SessionState;

/// <summary>
/// HandlerBase 具有多种跨域特点（支持sesson）的 接口基础类
/// </summary>
public class HandlerBase : DataBase, IHttpHandler, IRequiresSessionState
{
    private const string method = "method";//方法约定参数名
    private const string jsonp = "{0}({1})";//JSONP 返回字符串格式
    private const string callback = "callback";// JSONP 回调方法约定为 callback


    protected HttpResponse Response;
    protected HttpRequest Request;
    protected HttpServerUtility Server;
    protected HttpSessionState Session;

    public void ProcessRequest(HttpContext context)
    {
        Response = context.Response;
        Request = context.Request;
        Server = context.Server;
        Session = context.Session;



        //支持 Session 的 跨域请求头 上线后若使用 https协议 请注释
         Response.AddHeader("Access-Control-Allow-Origin", "*");

        string Method = Request[method];
        if (!string.IsNullOrEmpty(Method))
        {
            try
            {
                MethodInfo mi = this.GetType().GetMethod(Method);
                if (mi == null) return;
                object json = mi.Invoke(this, new object[] { });

                if (json != null)
                {
                    //支持JSONP的返回方式
                    string Callback = Request[callback];
                    if (string.IsNullOrEmpty(Callback))
                        Response.Write(json.ToString());
                    else
                        Response.Write(string.Format(jsonp, Callback, json));
                }

            }
            catch (Exception ex)
            {
                EasyTool.Log(ex.InnerException.Message+"-------------"+ex.StackTrace+"----------------"+ex.InnerException, Method);
                Response.Write(Result.Error(ex.InnerException.Message));
            }
        }
    }

    public bool IsReusable { get { return false; } }
}