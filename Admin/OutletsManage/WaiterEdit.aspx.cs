
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;

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
            DataTable dt = DB.GetDataTable("select * from Admin_WaiterCategory where IsDel=0"); ;
            ddl_Type.DataSource = dt;
            ddl_Type.DataTextField = "CategoryName";
            ddl_Type.DataValueField = "ID";
            ddl_Type.DataBind();
            if (Request["ID"] != null)
            {
                int ID = int.Parse(Request["ID"]);
                this.hidID.Value = ID.ToString();
                Admin_Waiter comm = Manage.Get<Admin_Waiter>(ID);


                //if (!string.IsNullOrEmpty(comm.HandImage)) image1.ImageUrl = "http://yihuo.beats-digital.com" + comm.HandImage;
                this.TextBox1.Text = comm.name;
                this.TextBox2.Text = comm.position;
                this.TextBox3.Text = comm.number;
                this.TextBox4.Text = comm.promise;
                this.TextBox5.Text = comm.qualification;
                this.image1.ImageUrl = comm.photo;
                this.ddl_Type.SelectedValue = comm.category;

                var imageList = Manage.GetList<Admin_QualificationImgs>("WaiterID=@0 and IsDel=0", comm.ID);
                List<string> tempPathList = new List<string>();
                foreach (var item in imageList)
                {
                    var name = item.ImgUrl.Split('.');
                    var houzhui = name[1];
                    if (houzhui == "mp4")
                    {
                        html += "<li>";
                        html += "<video class='btnShow' data-type='video' style='width:100%;object-fit: cover;height: 100%;' src='" + item.ImgUrl + "' /></video>";
                        html += "<a class='btn-remove' data-url='" + item.ImgUrl + "'><i class='glyphicon glyphicon-remove'></i></a>";
                        html += "</li>";
                    }
                    else
                    {
                        html += "<li>";
                        html += "<img class='btnShow' data-type='img' src='" + item.ImgUrl + "'  />";
                        html += "<a class='btn-remove' data-url='" + item.ImgUrl + "'><i class='glyphicon glyphicon-remove'></i></a>";
                        html += "</li>";
                    }

                    tempPathList.Add(item.ImgUrl);
                }
                this.img.Value = string.Join(",", tempPathList.ToArray());
                this.HiddenField1OutletsID.Value = comm.OutletsID.ToString();

            }
            if (Request["OutletsID"] != null)
            {
                this.HiddenField1OutletsID.Value = Request["OutletsID"];
            }



        }
    }




    protected void btnSave_Click(object sender, EventArgs e)
    {
        int OutletsID = Convert.ToInt32(this.HiddenField1OutletsID.Value);

        Admin_Waiter comm = Manage.Get<Admin_Waiter>("ID", Request["ID"]);


        if (comm == null)
        {
            comm = new Admin_Waiter();
        }
        comm.OutletsID = OutletsID;
        comm.name = this.TextBox1.Text;
        comm.position = this.TextBox2.Text;
        comm.number = this.TextBox3.Text;
        comm.promise = this.TextBox4.Text;
        comm.qualification = this.TextBox5.Text;

        comm.category = this.ddl_Type.SelectedValue;
        if (!string.IsNullOrWhiteSpace(FileUpload1.FileName))
        {
            if (FileUpload1.PostedFile.ContentType.Contains("image"))
            {
                string path = "/Upload/Img/" + Guid.NewGuid() + Path.GetExtension(FileUpload1.FileName);
                FileUpload1.SaveAs(Server.MapPath("~" + path));
                comm.photo = GetSiteUrl() + path;
            }
        }
        comm.AddTime = DateTime.Now;

        comm.IsDel = false;

        Manage.Save(comm);
        string imagePath = this.img.Value.Trim(',');
        DB.ExecuteCommand("delete from Admin_QualificationImgs where WaiterID=@0 and IsDel=@1", comm.ID,0);
        if (!string.IsNullOrWhiteSpace(imagePath))
        {
            foreach (var item in imagePath.Split(','))
            {
                Admin_QualificationImgs qmodel = new Admin_QualificationImgs();

                qmodel.WaiterID = comm.ID;
                if (item.Contains(GetSiteUrl()))
                {
                    qmodel.ImgUrl = item;
                }
                else
                {
                    qmodel.ImgUrl = GetSiteUrl() + item;
                }
                qmodel.AddTime = DateTime.Now;
                qmodel.IsDel = false;
                Manage.Add(qmodel);
            }
        }


        Response.Redirect("Waiter.aspx?OutletsID=" + OutletsID);
    }


    protected void Button1_Click(object sender, EventArgs e)
    {
        int OutletsID = Convert.ToInt32(this.HiddenField1OutletsID.Value);
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