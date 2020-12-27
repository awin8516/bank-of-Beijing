
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;

public partial class Lays_BrandInfo_Edit : PageBase
{
    protected void Page_Load(object sender, EventArgs e)
    {
        btnSave.Attributes.Add("onclick", "this.disabled=true;" + this.ClientScript.GetPostBackEventReference(btnSave, ""));
        btnSave.Attributes.Add("onclick", "if (typeof(Page_ClientValidate) == 'function') { if (Page_ClientValidate() == false) { return false; }};this.disabled=true;" + this.ClientScript.GetPostBackEventReference(btnSave, ""));

        if (!IsPostBack)
        {
            if (Request["ID"] != null)
            {

                Admin_Convenience comm = Manage.Get<Admin_Convenience>("ID=@0 and IsDel=@1", Convert.ToInt32(Request["ID"]), 0);

                this.TextBox1.Text = comm.title;

                this.image1.ImageUrl = comm.icon;
                this.image2.ImageUrl = comm.img;
                this.image1Hidden.Value = comm.icon;
                this.image2Hidden.Value = comm.img;
                this.HiddenField1OutletsID.Value = comm.OutletsID.ToString();

            }
            if (Request["OutletsID"]!=null)
            {
                this.HiddenField1OutletsID.Value = Request["OutletsID"];
            }


        }
    }




    protected void btnSave_Click(object sender, EventArgs e)
    {

        int OutletsID = Convert.ToInt32(this.HiddenField1OutletsID.Value);

        Admin_Convenience comm = Manage.Get<Admin_Convenience>("ID", Request["ID"]);


        if (comm == null)
        {
            comm = new Admin_Convenience();
        }
        comm.OutletsID = OutletsID;
        comm.title = this.TextBox1.Text; ;
        if (!string.IsNullOrWhiteSpace(FileUpload1.FileName))
        {
            if (FileUpload1.PostedFile.ContentType.Contains("image"))
            {
                string path = "/Upload/Img/" + Guid.NewGuid() + Path.GetExtension(FileUpload1.FileName);
                FileUpload1.SaveAs(Server.MapPath("~" + path));
                comm.icon = GetSiteUrl() + path;
            }
        }
        else
        {
            comm.icon = image1Hidden.Value;
        }
        if (!string.IsNullOrWhiteSpace(FileUpload2.FileName))
        {
            if (FileUpload2.PostedFile.ContentType.Contains("image"))
            {
                string path = "/Upload/Img/" + Guid.NewGuid() + Path.GetExtension(FileUpload2.FileName);
                FileUpload2.SaveAs(Server.MapPath("~" + path));
                comm.img = GetSiteUrl() + path;
            }
        }
        else
        {
            comm.img = image2Hidden.Value;
        }

        comm.AddTime = DateTime.Now;

        comm.IsDel = false;

        Manage.Save(comm);




        Response.Redirect("Convenience.aspx?OutletsID=" + OutletsID);
    }


    protected void Button1_Click(object sender, EventArgs e)
    {
        int OutletsID = Convert.ToInt32(this.HiddenField1OutletsID.Value);
        Response.Redirect("Convenience.aspx?OutletsID=" + OutletsID);
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