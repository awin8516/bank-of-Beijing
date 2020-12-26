using Aglie;
using System.Web.UI;

/// <summary>
/// BasePage 的摘要说明
/// </summary>
public class PageBase : Page
{
    private const string conn = "DB";
    protected static DBHelper DB = new DBHelper(conn);
    protected static ManageBase Manage = new ManageBase(DB);
    protected static CacheBase ICache = new CacheBase(conn);

   
    protected override void OnPreLoad(System.EventArgs e)
    {
        if (Session["LoginState"] == null) Response.Redirect("~/Admin/Login.html");
    }
    public void WriteJS(string js)
    {
        ClientScript.RegisterStartupScript(GetType(), "", string.Format("<script>{0}</script>", js));
    }
    public void Alert(string str)
    {
        Page.ClientScript.RegisterStartupScript(GetType(), "onload", "<script>alert(\"" + str + "\");</script>");
    }

    public void Alert(string str, string url)
    {
        if (url == "")
            Alert(str);
        else
            Page.ClientScript.RegisterStartupScript(GetType(), "onload", "<script>alert(\"" + str + "\");location.href='" + url + "';</script>");
    }
}