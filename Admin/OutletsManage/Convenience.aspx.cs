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
            TableSearch ts = new TableSearch("Convenience.json");
            ts.AddQuery("OutletsID=@0", Request["OutletsID"]);
            WriteJS(ts.Load("box"));//重新加载
        }
    }
    protected void add_ServerClick(object sender, EventArgs e)
    {
        Response.Redirect("ConvenienceEdit.aspx?OutletsID=" + Request["OutletsID"]);
    }
}