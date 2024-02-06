using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Admin_Waiter 的摘要说明
/// 服务人员展
/// </summary>
public class Admin_Waiter
{
    public int ID { get; set; }


    public int OutletsID { get; set; }
    /// <summary>
    /// 姓名
    /// </summary>
    public string name { get; set; }
    /// <summary>
    /// 科室
    /// </summary>
    public string category { get; set; }
    /// <summary>
    /// 员工照片
    /// </summary>
    public string photo { get; set; }
    /// <summary>
    /// 编号
    /// </summary>
    public string number { get; set; }
    /// <summary>
    /// 岗位
    /// </summary>
    public string position { get; set; }
    /// <summary>
    /// 宣言
    /// </summary>
    public string promise { get; set; }
    /// <summary>
    /// 资质
    /// </summary>
    public string qualification { get; set; }
    /// <summary>
    /// 资质
    /// </summary>
    public int Sort { get; set; }

    public DateTime AddTime { get; set; }

    public bool IsDel { get; set; }


}