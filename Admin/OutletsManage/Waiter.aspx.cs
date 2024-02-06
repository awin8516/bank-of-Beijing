using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Aglie;
using System.IO;

public partial class Lays_Job_List : PageBase
{
    protected void Page_Load(object sender, EventArgs e)
    {
        int OutletsID = Convert.ToInt32(Request["OutletsID"]);
        Admin_GroupPhoto model = Manage.Get<Admin_GroupPhoto>("OutletsID=@0 and IsDel=@1", OutletsID, 0);
        if (model == null)
        {
            this.image1.ImageUrl = "../assets/默认图标.png";
        }
        else
        {
            this.image1.ImageUrl = model.groupPhoto;
        }
        if (!IsPostBack)
        {
            TableSearch ts = new TableSearch("Waiter.json");
            ts.AddQuery("OutletsID=@0", OutletsID);
            WriteJS(ts.Load("box"));//重新加载
        }
    }
    protected void add_ServerClick(object sender, EventArgs e)
    {
        Response.Redirect("WaiterEdit.aspx?OutletsID=" + Request["OutletsID"]);
    }
    protected void a1_ServerClick(object sender, EventArgs e)
    {
        int OutletsID = Convert.ToInt32(Request["OutletsID"]);

        Admin_GroupPhoto model = Manage.Get<Admin_GroupPhoto>("OutletsID=@0 and IsDel=@1", OutletsID, 0);
        if (model == null)
        {
            model = new Admin_GroupPhoto();
        }

        if (!string.IsNullOrWhiteSpace(fileUpload.FileName))
        {
            if (fileUpload.PostedFile.ContentType.Contains("image"))
            {
                string path = "/Upload/Img/" + Guid.NewGuid() + Path.GetExtension(fileUpload.FileName);
                fileUpload.SaveAs(Server.MapPath("~" + path));
                model.groupPhoto = GetSiteUrl() + path;
            }
        }else{
            model.groupPhoto = "";
        }
        model.OutletsID = OutletsID;
        model.AddTime = DateTime.Now;
        model.IsDel = false;

        Manage.Save(model);

        Response.Redirect("Waiter.aspx?OutletsID=" + OutletsID);
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