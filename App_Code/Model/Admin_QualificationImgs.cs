using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Admin_QualificationImgs 的摘要说明
/// 资质照片
/// </summary>
public class Admin_QualificationImgs
{
    public int ID { get; set; }
    /// <summary>
    /// 服务人员ID
    /// </summary>
    public int WaiterID { get; set; }
    /// <summary>
    /// 资质照片
    /// </summary>
    public string ImgUrl { get; set; }

    public DateTime AddTime { get; set; }

    public bool IsDel { get; set; }
}