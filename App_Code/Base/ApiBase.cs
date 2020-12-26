using Aglie;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.SessionState;

/// <summary>
/// ApiBase 的摘要说明
/// </summary>
public class ApiBase : DataBase, IHttpHandler, IRequiresSessionState
{
    private const string method = "method";//方法约定参数名
    private const string jsonp = "{0}({1})";//JSONP 返回字符串格式
    private const string callback = "callback";// JSONP 回调方法约定为 callback

    protected HttpResponse Response;
    protected HttpRequest Request;
    protected HttpServerUtility Server;
    protected HttpSessionState Session;
    protected string OpenID = "";
    protected Logger logger = Logger.CreateLogger(typeof(ApiBase));
   
    public void ProcessRequest(HttpContext context)
    {
        Response = context.Response;
        Request = context.Request;
        Server = context.Server;
        Session = context.Session;
        //if (Session[ConfigHelper.SessionKey] != null)
        //{
        //    OpenID = Session[ConfigHelper.SessionKey].ToString();
        //}
       // EasyTool.Log("拿取用户id：" + Request["OpenID"]);
        if (Session["OpenID"] != null)
        {
            OpenID = Session["OpenID"].ToString();
        }
        else {
            OpenID = "oeJiXjhPF8vfpchOgzmuJFdQEdiI";
        }
        //支持 Session 的 跨域请求头 上线后若使用 https协议 请注释
        if (Request.Headers["Origin"] != null)
        {
            Response.AddHeader("Access-Control-Allow-Credentials", "true");
            Response.AddHeader("Access-Control-Allow-Origin", Request.Headers["Origin"]);
        }
        else Response.AddHeader("Access-Control-Allow-Origin", "*");

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
                //EasyTool.Log(ex.InnerException.Message, Method);
                Response.Write(Result.Error(ex.InnerException.Message));
            }
        }


    }
   
    public bool IsReusable { get { return false; } }
}