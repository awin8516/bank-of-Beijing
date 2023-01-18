
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
            int OutletsID = int.Parse(Request["OutletsID"]);
            if (OutletsID == 0)
            {

                Admin_OutletsGuide comm = Manage.Get<Admin_OutletsGuide>("OutletsID=@0 and IsDel=@1", OutletsID, 0);
                if (comm != null)
                {
                    this.Infoset.Value = comm.content;
                    this.TextBox1.Text = comm.peakTime;
                    this.TextBox2.Text = comm.peakWeek;
                    this.HiddenField1OutletsID.Value = comm.OutletsID.ToString();
                }
            }
            else
            {
                Admin_OutletsGuide comm = Manage.Get<Admin_OutletsGuide>("OutletsID=@0 and IsDel=@1", OutletsID, 0);
                if (comm != null)
                {
                    this.Infoset.Value = comm.content;
                    this.TextBox1.Text = comm.peakTime;
                    this.TextBox2.Text = comm.peakWeek;
                }
                this.HiddenField1OutletsID.Value = Request["OutletsID"];
            }



        }
    }




    protected void btnSave_Click(object sender, EventArgs e)
    {
        int OutletsID = Convert.ToInt32(this.HiddenField1OutletsID.Value);


        Admin_OutletsGuide comm = Manage.Get<Admin_OutletsGuide>("OutletsID=@0 and IsDel=@1", OutletsID, 0);


        if (comm == null)
        {
            comm = new Admin_OutletsGuide();
        }
            comm.OutletsID = OutletsID;
            comm.content = this.Infoset.Value;
            comm.peakTime = this.TextBox1.Text;
            comm.peakWeek = this.TextBox2.Text;
            comm.AddTime = DateTime.Now;

            comm.IsDel = false;

            Manage.Save(comm);




            Response.Redirect("OutletsGuide.aspx?OutletsID=" + OutletsID);
    }


    protected void Button1_Click(object sender, EventArgs e)
    {
        int OutletsID = Convert.ToInt32(this.HiddenField1OutletsID.Value);
        Response.Redirect("OutletsGuide.aspx?OutletsID=" + OutletsID);
    }


}