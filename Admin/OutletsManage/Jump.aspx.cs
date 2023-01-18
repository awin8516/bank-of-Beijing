using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Lays_BrandInfo_list : PageBase
{
    
    private Logger logger = Logger.CreateLogger(typeof(Lays_BrandInfo_list));
    protected void Page_Load(object sender, EventArgs e)
    {
        int ID = Convert.ToInt32(Request["OutletsID"]);

        Admin_OutletsManage outlets = Manage.Get<Admin_OutletsManage>("ID=@0 and IsDel=@1", ID, 0);

        this.Label1.Text = outlets.siteName;
        //TableSearch ts = new TableSearch("BrandInfo.json");
        //ts.AddQuery("Brand_ID=@0",ID);
        //WriteJS(ts.Load("box"));//重新加载
    }

    protected void add_ServerClick(object sender, EventArgs e)
    {
        Response.Redirect("BrandInfoEdit.aspx?BrandID=" + Request["BrandID"]);
    }
    protected void a1_ServerClick(object sender, EventArgs e)
    {
        Response.Redirect("Multimedia.aspx?BrandID=" + Request["BrandID"]);
    }
    protected void a2_ServerClick(object sender, EventArgs e)
    {
        Response.Redirect("Video.aspx?BrandID=" + Request["BrandID"]);
    }
    protected void a3_ServerClick(object sender, EventArgs e)
    {

    }
    protected void a4_ServerClick(object sender, EventArgs e)
    {
        Response.Redirect("Product.aspx?BrandID=" + Request["BrandID"]);
    }
    protected void a5_ServerClick(object sender, EventArgs e)
    {
        Response.Redirect("Outside.aspx?BrandID=" + Request["BrandID"]);
    }
}