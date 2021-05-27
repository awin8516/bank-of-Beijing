using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Admin_index :PageBase
{
    protected string UserName = "";
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!Page.IsPostBack)
        {

            if (Session["UserName"]  != null)
            {
                this.Label1.Text = Session["UserName"].ToString();
            }
            if (Session["UserName"].ToString() != "admin")
            {
                this.li1.Visible = false;
                this.li2.Visible = false;
                this.li3.Visible = false;
                this.li4.Visible = false;
                this.li5.Visible = false;
                this.li6.Visible = false;
                this.li7.Visible = false;
            }
            }
    }
}