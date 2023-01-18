using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Admin_OutletsGuide 的摘要说明
/// 网点导览
/// </summary>
public class Admin_OutletsGuide
{
    public int ID { get; set; }
    /// <summary>
    /// 网点ID
    /// </summary>
    public int OutletsID { get; set; }
    /// <summary>
    /// 内容
    /// </summary>
    public string content { get; set; }
    /// <summary>
    /// 高峰-小时
    /// </summary>
    public string peakTime { get; set; }
    /// <summary>
    /// 高峰-周
    /// </summary>
    public string peakWeek { get; set; }

    public DateTime AddTime { get; set; }

    public bool IsDel { get; set; }
}