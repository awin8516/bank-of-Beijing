using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Admin_GroupPhoto 的摘要说明
/// </summary>
public class Admin_GroupPhoto
{
    public int ID { get; set; }
    /// <summary>
    /// 网点ID
    /// </summary>
    public int OutletsID { get; set; }
    /// <summary>
    /// 合照
    /// </summary>
    public string groupPhoto { get; set; }

    public DateTime AddTime { get; set; }

    public bool IsDel { get; set; }

}