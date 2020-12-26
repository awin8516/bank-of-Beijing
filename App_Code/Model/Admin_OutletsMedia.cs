using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Admin_OutletsMedia 的摘要说明
/// 网点视频/图片
/// </summary>
public class Admin_OutletsMedia
{
    public int ID { get; set; }
    /// <summary>
    /// 网点ID
    /// </summary>
    public int OutletsID { get; set; }
    /// <summary>
    /// video/img
    /// </summary>
    public string MediaType { get; set; }
    /// <summary>
    /// url地址
    /// </summary>
    public string MediaUrl { get; set; }

    public DateTime AddTime { get; set; }

    public bool IsDel { get; set; }
}