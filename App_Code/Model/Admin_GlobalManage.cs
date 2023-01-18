using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Admin_GlobalManage 的摘要说明
/// </summary>
public class Admin_GlobalManage
{
    public int ID { get; set; }
    /// <summary>
    /// true 开启   false 关闭
    /// </summary>
    public bool GlobalType { get; set; }
    /// <summary>
    /// 开屏海报
    /// </summary>
    public string sitePoster { get; set; }


    public DateTime AddTime { get; set; }

    public bool IsDel { get; set; }
}