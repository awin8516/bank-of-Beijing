using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Admin_Party 的摘要说明
/// </summary>
public class Admin_Party
{
    public int ID { get; set; }
    /// <summary>
    /// 内容
    /// </summary>
    public string content { get; set; }

    public DateTime AddTime { get; set; }

    public bool IsDel { get; set; }
}