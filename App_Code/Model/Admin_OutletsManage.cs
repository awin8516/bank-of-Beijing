using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Admin_OutletsManage 的摘要说明
/// 网点视频/图片
/// </summary>
public class Admin_OutletsManage
{
    public int ID { get; set; }
    /// <summary>
    /// 网点名称
    /// </summary>
    public string siteName { get; set; }
    /// <summary>
    /// 网点链接
    /// </summary>
    public string siteLink { get; set; }
    /// <summary>
    /// 主题
    /// </summary>
    public string siteTheme { get; set; }
    /// <summary>
    /// logo
    /// </summary>
    public string siteLogo { get; set; }
    /// <summary>
    /// 开屏海报
    /// </summary>
    public string sitePoster { get; set; }
    /// <summary>
    /// 定时
    /// </summary>
    public string siteBackTime { get; set; }
    /// <summary>
    /// 账号
    /// </summary>
    public string accountNumber { get; set; }
    /// <summary>
    /// 密码
    /// </summary>
    public string password { get; set; }

    public DateTime AddTime { get; set; }

    public bool IsDel { get; set; }
}