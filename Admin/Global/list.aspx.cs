
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using Aglie;

public partial class Lays_Job_Edit : PageBase
{
    protected string html = "";
    protected string html1 = "";
    protected void Page_Load(object sender, EventArgs e)
    {
        btnSave.Attributes.Add("onclick", "this.disabled=true;" + this.ClientScript.GetPostBackEventReference(btnSave, ""));
        btnSave.Attributes.Add("onclick", "if (typeof(Page_ClientValidate) == 'function') { if (Page_ClientValidate() == false) { return false; }};this.disabled=true;" + this.ClientScript.GetPostBackEventReference(btnSave, ""));

        if (!IsPostBack)
        {


            if (Request["ID"] != null)
            {
                int ID = int.Parse(Request["ID"]);
                this.hidID.Value = ID.ToString();
                Admin_GlobalManage comm = Manage.Get<Admin_GlobalManage>(ID);
                if (comm != null)
                {
                    if (comm.GlobalType == true)
                    {
                        this.ddl_Type.SelectedValue = "1";
                    }
                    else {
                        this.ddl_Type.SelectedValue = "2";
                    }

                    //if (!string.IsNullOrEmpty(comm.HandImage)) image1.ImageUrl = "http://yihuo.beats-digital.com" + comm.HandImage;

                    this.image2.ImageUrl = comm.sitePoster;

                    var imageList = Manage.GetList<Admin_GlobalMedia>("GlobalID=@0 and IsDel=0 and MediaType=@1", comm.ID, "img");
                    List<string> tempPathList = new List<string>();
                    foreach (var item in imageList)
                    {

                        html += "<li>";
                        html += "<img class='btnShow' data-type='img' src='" + item.MediaUrl + "'  />";
                        html += "<a class='btn-remove' data-url='" + item.MediaUrl + "'><i class='glyphicon glyphicon-remove'></i></a>";
                        html += "</li>";


                        tempPathList.Add(item.MediaUrl);
                    }
                    this.img.Value = string.Join(",", tempPathList.ToArray());


                    var imageList1 = Manage.GetList<Admin_GlobalMedia>("GlobalID=@0 and IsDel=0 and MediaType=@1", comm.ID, "video");
                    List<string> tempPathList1 = new List<string>();
                    foreach (var item in imageList1)
                    {

                        html1 += "<li>";
                        html1 += "<video class='btnShow' data-type='video' style='width:100%;object-fit: cover;height: 100%;' src='" + item.MediaUrl + "' /></video>";
                        html1 += "<a class='btn-remove' data-url='" + item.MediaUrl + "'><i class='glyphicon glyphicon-remove'></i></a>";
                        html1 += "</li>";


                        tempPathList1.Add(item.MediaUrl);
                    }
                    this.img1.Value = string.Join(",", tempPathList1.ToArray());
                }
            }



        }
    }




    protected void btnSave_Click(object sender, EventArgs e)
    {

        Admin_GlobalManage comm = Manage.Get<Admin_GlobalManage>("ID", Request["ID"]);


        if (comm == null)
        {
            comm = new Admin_GlobalManage();
        }

        if (!string.IsNullOrWhiteSpace(FileUpload2.FileName))
        {
            if (FileUpload2.PostedFile.ContentType.Contains("image"))
            {
                string path = "/Upload/Img/" + Guid.NewGuid() + Path.GetExtension(FileUpload2.FileName);
                FileUpload2.SaveAs(Server.MapPath("~" + path));
                comm.sitePoster = GetSiteUrl() + path;
            }
        }
        if (this.ddl_Type.SelectedValue == "1")
        {
            comm.GlobalType = true;
        }
        else
        {
            comm.GlobalType = false;
        }
        comm.AddTime = DateTime.Now;

        comm.IsDel = false;

        Manage.Save(comm);
        string imagePath = this.img.Value.Trim(',');
        DB.ExecuteCommand("delete from Admin_GlobalMedia where GlobalID=@0 and MediaType=@1", comm.ID, "img");
        if (!string.IsNullOrWhiteSpace(imagePath))
        {
            foreach (var item in imagePath.Split(','))
            {
                Admin_GlobalMedia qmodel = new Admin_GlobalMedia();
                qmodel.MediaType = "img";
                qmodel.GlobalID = comm.ID;
                if (item.Contains(GetSiteUrl()))
                {
                    qmodel.MediaUrl = item;
                }
                else
                {
                    qmodel.MediaUrl = GetSiteUrl() + item;
                }
                qmodel.AddTime = DateTime.Now;
                qmodel.IsDel = false;
                Manage.Add(qmodel);
            }
        }
        string imagePath1 = this.img1.Value.Trim(',');
        DB.ExecuteCommand("delete from Admin_GlobalMedia where GlobalID=@0 and MediaType=@1", comm.ID, "video");
        if (!string.IsNullOrWhiteSpace(imagePath1))
        {
            foreach (var item in imagePath1.Split(','))
            {
                Admin_GlobalMedia qmodel = new Admin_GlobalMedia();
                qmodel.MediaType = "video";
                qmodel.GlobalID = comm.ID;
                if (item.Contains(GetSiteUrl()))
                {
                    qmodel.MediaUrl = item;
                }
                else
                {
                    qmodel.MediaUrl = GetSiteUrl() + item;
                }

                qmodel.AddTime = DateTime.Now;
                qmodel.IsDel = false;
                Manage.Add(qmodel);
            }
        }


        Response.Redirect("List.aspx?ID=1");
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