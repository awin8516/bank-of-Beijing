using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Admin_Honors 
/// 我们的荣誉
/// </summary>
public class Admin_Honors
{
    public int ID { get; set; }
    /// <summary>
    /// 网点id
    /// </summary>
    public int OutletsID  { get; set; }
    /// <summary>
    /// 内容
    /// </summary>
    public string content { get; set; }

    public DateTime AddTime { get; set; }

    public bool IsDel { get; set; }

}