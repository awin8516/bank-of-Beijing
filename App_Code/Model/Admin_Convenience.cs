using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Admin_Convenience 的摘要说明
/// 便民设施
/// </summary>
public class Admin_Convenience
{
    public int ID { get; set; }

    /// <summary>
    /// 
    /// </summary>
    public int OutletsID { get; set; }
    /// <summary>
    /// 标题
    /// </summary>
    public string title { get; set; }
    /// <summary>
    /// 图标
    /// </summary>
    public string icon { get; set; }
    /// <summary>
    /// 照片
    /// </summary>
    public string img { get; set; }

    public DateTime AddTime { get; set; }

    public bool IsDel { get; set; }
}