using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// CareList 的摘要说明
/// </summary>
public class CareList
{
    public string cate { get; set; }

    public List<Waiter> list { get; set; }
}




public class Waiter {

    public string category { get; set; }
    public string name { get; set; }
    public string photo { get; set; }
    public string number { get; set; }
    public string post { get; set; }
    public string promise { get; set; }
    public string qualification { get; set; }
    public List<string> qualificationImgs { get; set; }

}


