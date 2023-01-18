<%@ WebHandler Language="C#" Class="Handler" %>

using System;
using System.Web;
using Aglie;
using System.Collections.Generic;
using System.Linq;

public class Handler : ApiBase
{

    public string getSiteList()
    {


        var model = Manage.GetList<Admin_OutletsManage>("IsDel=@0", 0);
        var newmodel = model.Select(p => new { p.ID, p.siteName, p.siteLink });

        return Result.Return(newmodel);
    }



    public string getSiteInfo()
    {

        string ID = Request["ID"];
        if (string.IsNullOrWhiteSpace(ID))
        {
            return Result.Error("id不能为空");
        }

        JSON json = new JSON();

        Admin_OutletsManage model = Manage.Get<Admin_OutletsManage>("ID=@0 and IsDel=@1", Convert.ToInt32(ID), 0);
        if (model == null)
        {
            return Result.Error("数据为空");
        }

        json["ID"] = model.ID;
        json["siteName"] = model.siteName;
        json["siteLink"] = model.siteLink;
        json["siteLogo"] = model.siteLogo;
        json["siteTheme"] = model.siteTheme;
        json["siteLogo"] = model.siteLogo;
        List<string> Bannerlist = new List<string>();
        List<string> Videolist = new List<string>();
        Admin_GlobalManage g = Manage.Get<Admin_GlobalManage>("IsDel=0");
        if (g != null)
        {
            if (g.GlobalType == true)
            {
                json["sitePoster"] = g.sitePoster;
                List<Admin_GlobalMedia> m = Manage.GetList<Admin_GlobalMedia>("GlobalID=@0 and IsDel=@1", g.ID, 0);
                foreach (var item in m)
                {
                    if (item.MediaType == "img")
                    {
                        Bannerlist.Add(item.MediaUrl);
                    }
                    else
                    {
                        Videolist.Add(item.MediaUrl);
                    }
                }
            }
            else
            {
                json["sitePoster"] = model.sitePoster;
                List<Admin_OutletsMedia> m = Manage.GetList<Admin_OutletsMedia>("OutletsID=@0 and IsDel=@1", model.ID, 0);
                foreach (var item in m)
                {
                    if (item.MediaType == "img")
                    {
                        Bannerlist.Add(item.MediaUrl);
                    }
                    else
                    {
                        Videolist.Add(item.MediaUrl);
                    }
                }
            }
        }
        else {

            json["sitePoster"] = model.sitePoster;
            List<Admin_OutletsMedia> m = Manage.GetList<Admin_OutletsMedia>("OutletsID=@0 and IsDel=@1", model.ID, 0);
            foreach (var item in m)
            {
                if (item.MediaType == "img")
                {
                    Bannerlist.Add(item.MediaUrl);
                }
                else
                {
                    Videolist.Add(item.MediaUrl);
                }
            }
        }
        


        json["siteBanner"] = JSON.To(Bannerlist);
        json["siteVideo"] = JSON.To(Videolist);
        json["siteBackTime"] = model.siteBackTime;

        return Result.Return(json);
    }




    public string getGuide()
    {

        string ID = Request["ID"];
        if (string.IsNullOrWhiteSpace(ID))
        {
            return Result.Error("id不能为空");
        }

        Admin_OutletsGuide model = Manage.Get<Admin_OutletsGuide>("OutletsID=@0 and IsDel=@1", Convert.ToInt32(ID), 0);
        if (model == null)
        {
            return Result.Error("数据为空");
        }
        JSON json = new JSON();

        json["content"] = model.content;
        json["peakTime"] = model.peakTime;
        json["peakWeek"] = model.peakWeek;
        return Result.Return(json);
    }



    public string getFacilities()
    {
        string ID = Request["ID"];
        if (string.IsNullOrWhiteSpace(ID))
        {
            return Result.Error("id不能为空");
        }
        var model = Manage.GetList<Admin_Convenience>("OutletsID=@0 and IsDel=@1", Convert.ToInt32(ID), 0);
        if (model.Count <= 0)
        {
            return Result.Error("数据为空");
        }
        var newmodel = model.Select(p => new { p.title, p.icon, p.img });

        JSON json = JSON.To(newmodel);
        return Result.Return(json);


    }





    public string getPersonnel()
    {

        string ID = Request["ID"];
        if (string.IsNullOrWhiteSpace(ID))
        {
            return Result.Error("id不能为空");
        }

        List<CareList> list = new List<CareList>();

        List<Admin_WaiterCategory> Categorylist = Manage.GetList<Admin_WaiterCategory>("IsDel=@0", 0);
        foreach (var item in Categorylist)
        {
            CareList c = new CareList();

            c.cate = item.CategoryName;
            List<Waiter> wlist = new List<Waiter>();
            List<Admin_Waiter> wmodel = Manage.GetList<Admin_Waiter>("OutletsID=@0 and category=@1 and IsDel=@2", Convert.ToInt32(ID), item.ID, 0);
            foreach (var witem in wmodel)
            {
                Waiter w = new Waiter();

                w.category = item.CategoryName;
                w.name = witem.name;
                w.photo = witem.photo;
                w.number = witem.number;
                w.post = witem.position;
                w.promise = witem.promise;
                w.qualification = witem.qualification;
                List<string> imglist = new List<string>();
                List<Admin_QualificationImgs> Qlist = Manage.GetList<Admin_QualificationImgs>("WaiterID=@0 and IsDel=@1", witem.ID, 0);
                foreach (var imgitem in Qlist)
                {
                    imglist.Add(imgitem.ImgUrl);
                }
                w.qualificationImgs = imglist;
                wlist.Add(w);

            }

            c.list = wlist;

            list.Add(c);

        }
        JSON json = new JSON();
        Admin_GroupPhoto Group = Manage.Get<Admin_GroupPhoto>("OutletsID=@0 and IsDel=@1", Convert.ToInt32(ID), 0);
        if (Group == null)
        {
            json["groupPhoto"] = "";
        }
        else
        {
            json["groupPhoto"] = Group.groupPhoto;
        }
        json["data"] = JSON.To(list);
        return Result.Return(json);

    }



    public string getHonor()
    {

        string ID = Request["ID"];
        if (string.IsNullOrWhiteSpace(ID))
        {
            return Result.Error("id不能为空");
        }

        Admin_Honors model = Manage.Get<Admin_Honors>("OutletsID=@0 and IsDel=@1", Convert.ToInt32(ID), 0);
        if (model == null)
        {
            return Result.Error("数据为空");
        }
        JSON json = new JSON();

        json["data"] = model.content;

        return Result.Return(json);

    }

    public string getParty()
    { 
        Admin_Party model = Manage.Get<Admin_Party>("IsDel=0");
        if (model == null)
        {
            return Result.Error("数据为空");
        }
        JSON json = new JSON();

        json["data"] = model.content;

        return Result.Return(json);

    }

    public string getConsumer()
    {

        Admin_Consumer model = Manage.Get<Admin_Consumer>("IsDel=0");
        if (model == null)
        {
            return Result.Error("数据为空");
        }
        JSON json = new JSON();

        json["data"] = model.content;

        return Result.Return(json);

    }

    public string getVip()
    {

        Admin_VIP model = Manage.Get<Admin_VIP>("IsDel=0");
        if (model == null)
        {
            return Result.Error("数据为空");
        }
        JSON json = new JSON();

        json["data"] = model.content;

        return Result.Return(json);

    }

    public string getFinancial()
    {

        Admin_Financial model = Manage.Get<Admin_Financial>("IsDel=0");
        if (model == null)
        {
            return Result.Error("数据为空");
        }
        JSON json = new JSON();

        json["data"] = model.content;

        return Result.Return(json);

    }

    public string getAnniversary()
    {

        Admin_Anniversary model = Manage.Get<Admin_Anniversary>("IsDel=0");
        if (model == null)
        {
            return Result.Error("数据为空");
        }
        JSON json = new JSON();

        json["data"] = model.content;

        return Result.Return(json);

    }

}