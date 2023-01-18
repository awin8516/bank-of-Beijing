using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Aglie;

public partial class Lays_Job_List : PageBase
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            if (Session["UserName"].ToString() != "admin")
            {
                TableSearch ts = new TableSearch("OutletsManage.json");
                ts.AddQuery("accountNumber=@0", Session["UserName"].ToString());
                WriteJS(ts.Load("box"));//重新加载
            }
            else
            {
                TableSearch ts = new TableSearch("OutletsManage.json");
                WriteJS(ts.Load("box"));//重新加载
            }
        }
        if (Session["UserName"].ToString() != "admin")
        {
            this.bent.Visible = false;
        }
        }
}