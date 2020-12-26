
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
            int ID = int.Parse(Request["ID"]);
            if (ID != 0)
            {

                Admin_Financial comm = Manage.Get<Admin_Financial>("ID=@0 and IsDel=@1", ID, 0);
                if (comm != null)
                {
                    this.Infoset.Value = comm.content;
                   
                }
            }



        }
    }




    protected void btnSave_Click(object sender, EventArgs e)
    {
        int ID = int.Parse(Request["ID"]);


        Admin_Financial comm = Manage.Get<Admin_Financial>("ID=@0 and IsDel=@1", ID, 0);


        if (comm == null)
        {
            comm = new Admin_Financial();
        }
            comm.content = this.Infoset.Value;

            comm.AddTime = DateTime.Now;

            comm.IsDel = false;

            Manage.Save(comm);




            Response.Redirect("list.aspx?ID=1");
    }


    protected void Button1_Click(object sender, EventArgs e)
    {
        
        Response.Redirect("list.aspx?ID=1");
    }


}