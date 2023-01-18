using Aglie;
using OfficeOpenXml;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;

/// <summary>
/// TableSearch 的摘要说明 基于Aglie
/// </summary>
public class TableSearch : ITableSearch
{


    private DBHelper DB;
    private ManageBase Manage;
    private const string ConfigPath = "~/Admin/json/";

    private string Config;
    private string Name;//表名
    private string PK;//主键
    private string Field;//返回字段
    private string Sort;//默认排序

    private string AllQuery;//最终查询语句
    private ArrayList para = new ArrayList();//sql 参数

    private string EQuery;//可写查询语句
    private string EPara;//可写查询语句

    //Export
    private Regex reg = new Regex("{[^{^}]+}");//绑定用正则表达式
    private DataTable dt;
    private int dt_i;

    public TableSearch(string Config)
    {
       LoadJSON(Config);
    }
    public TableSearch(string Config, string Equery, string Epara, string JsonQuery)
    {
        LoadJSON(Config);
        LoadDynamicQuery(Equery, Epara, JsonQuery);
    }

    public string Load(string BoxID, string Name = null, string Other = null)
    {
        if (Subject["Ajax"] != null)
        {
            JSON Ajax = Subject["Ajax"];
            foreach (JSON x in Ajax) x["SQL"] = null;
        }

        StringBuilder s = new StringBuilder();
        string VarName = Name ?? Config.Remove(Config.IndexOf('.'));
        string JsonName = VarName + "_json";
        s.AppendFormat("var {0}={1};", JsonName, Subject);
        s.AppendFormat("var {0}=new ITableSearch({{ config: '{1}',config_json: {2}, box: '#{3}',equery:'{4}',epara:'{5}'{6} }});", VarName, Config, JsonName, BoxID, EQuery, EPara, Other == null ? string.Empty : "," + Other);
        return s.ToString();
    }

    protected override void LoadJSON(string Config)
    {
        this.Config = Config;
        Subject = JSON.Load(ConfigPath + Config);
        Column = Subject["Column"];

        JSON c = Subject["Config"];
        PageSize = int.Parse(c["PageSize"]);
        Span = int.Parse(c["Span"]);


        DB = new DBHelper(c["DB"]);
        Manage = new ManageBase(DB);
        Name = c["Name"];
        PK = c["PK"];
        Field = c["Field"];
        Sort = c["Sort"];
        AllQuery = c["Query"];
    }

    public void AddQuery(string sql, params object[] args)
    {
        EQuery = EnCode(sql);
        EPara = EnCode(args != null ? string.Join("|", args) : string.Empty);
    }

    public int Ajax(string Name, string Para)
    {
        JSON Ajax = Subject["Ajax"];
        string SQL = string.Empty;
        foreach (JSON x in Ajax)
        {
            if (x["Name"] == Name)
            {
                SQL = x["SQL"];
                JSON p = new JSON(Para);
                ArrayList al = new ArrayList();
                foreach (JSON y in p)
                {
                    al.Add(y.ToString());
                }
                return DB.ExecuteCommand(x["SQL"], al.ToArray());
            }
        }
        return 0;
    }

    public override string GetSelect(int index)
    {
        DataTable dt = DB.GetDataTable(Column[index]["DataSelect"]);
        return JSON.To(dt);
    }

    public override string GetList(int p, string query, string sort)
    {
        LoadField();
        LoadSort(sort);
        LoadQuery(query);

        DataTable dt = Manage.Pagination(Name, Field, Sort, PK, PageSize, p, AllQuery, para.ToArray());
        JSON r = new JSON();
        r["List"] = JSON.To(dt);
        r["Count"] = Manage.Count(Name, AllQuery, para.ToArray());
        return r;
    }

    public override byte[] Export(string query, string sort)
    {
        LoadField();
        LoadSort(sort);
        LoadQuery(query);
        LoadDataSelect();

        dt = Manage.Pagination(Name, Field, Sort, PK, int.MaxValue, 1, AllQuery, para.ToArray());

        ExcelPackage excel = new ExcelPackage();
        ExcelWorksheet sheet = excel.Workbook.Worksheets.Add("sheet1");

        foreach (JSON c in Column)
        {
            sheet.Cells[1, Column.index + 1].Value = c["Title"];
        }
        int dt_i = 0;
        foreach (DataRow dr in dt.Rows)
        {
            foreach (JSON c in Column)
            {
                string Bind = c["Bind"];
                string BindType = c["BindType"];
                string SearchType = c["SearchType"];
                string Info = c["Info"];
                var Range = sheet.Cells[dt_i + 2, Column.index + 1];
                string Value = string.IsNullOrEmpty(Bind) ? string.Empty : dr[Bind].ToString();

                if (BindType == "Time") Range.Value = Convert.ToDateTime(Value).ToString(Info);
                else if (SearchType == "Empty" || SearchType == "Export") { }
                else if (BindType == "Html")
                {
                    Range.Value = NoHTML(reg.Replace(Info, new MatchEvaluator(GetValue)));
                }
                else if (BindType == "Select")
                {
                    JSON info = c["Info"];
                    foreach (JSON o in info)
                    {
                        if (o["Value"] == Value || o["Other"] != null)
                        {
                            Range.Value = NoHTML(reg.Replace(o["Text"], new MatchEvaluator(GetValue))); break;
                        }
                    }
                    if (Range.Value == null) Range.Value = Value;
                }
                else Range.Value = Value;

            }
            dt_i++;
        }


        MemoryStream ms = new MemoryStream();
        excel.SaveAs(ms);
        return ms.GetBuffer();
    }
    public override StringBuilder ExportCSV(string query, string sort, string refID = "0", string exportName = "")
    {
        LoadField();
        LoadSort(sort);
        LoadQuery(query);
        LoadDataSelect();
        //string sss = AllQuery.TrimEnd(new char[] { ' ', 'a', 'n', 'd' });
        string tempQuery = AllQuery.TrimEnd(new char[] { ' ', 'a', 'n', 'd' });
        if (exportName.Contains("奖品配置") && refID != "0")
        {
            tempQuery += " and prizeid=" + refID;
        }
        if (exportName.Contains("项目列表") && refID != "0")
        {
            tempQuery += " and CompanyID=" + refID;
        }
        //EasyTool.Log("tempQuery=" + tempQuery + ",Para=" + string.Join(",",para.ToArray()), "export");
        dt = Manage.Pagination(Name, Field, Sort, PK, int.MaxValue, 1, tempQuery, para.ToArray());



        StringBuilder sb = new StringBuilder();

        int index = 0;
        foreach (JSON c in Column)
        {
            if (c["SearchType"] == "Empty" || c["SearchType"] == "Export") continue;
            index++;
            if (index == Column.Count - 1)
            {
                sb.Append(c["Title"] + "\t");
            }
            else if (c["Title"].ToString().ToUpper() == "ID")
            {
                sb.Append("\t" + c["Title"] + ",");
            }
            else
            {
                sb.Append(c["Title"] + ",");
            }

        }
        sb.Append("\r\n");
        foreach (DataRow dr in dt.Rows)
        {
            int drIndex = 0;
            foreach (JSON c in Column)
            {
                string Bind = c["Bind"];
                string BindType = c["BindType"];
                string SearchType = c["SearchType"];
                string Info = c["Info"];
                if (SearchType == "Empty" || SearchType == "Export") continue;
                drIndex++;

                string Value = string.IsNullOrEmpty(Bind) ? string.Empty : dr[Bind].ToString();

                if (BindType == "Time")
                {
                    if (!string.IsNullOrWhiteSpace(Value))
                    {
                        Value = Convert.ToDateTime(Value).ToString(Info);
                    }
                    else
                    {
                        Value = "";
                    }
                }
                else if (SearchType == "Empty" || SearchType == "Export") { }
                else if (BindType == "Html")
                {
                    Value = NoHTML(reg.Replace(Info, new MatchEvaluator(GetValue)));
                }
                else if (BindType == "Select")
                {
                    JSON info = c["Info"];
                    foreach (JSON o in info)
                    {
                        if (o["Value"] == Value || o["Other"] != null)
                        {
                            Value = NoHTML(reg.Replace(o["Text"], new MatchEvaluator(GetValue))); break;
                        }
                    }
                    if (Value == null)
                    {
                        Value = "";
                    }
                }
                if (drIndex == Column.Count - 1)
                {
                    sb.Append("\"" + NoHTML(reg.Replace(Value, new MatchEvaluator(GetValue))) + "\"\t" + "\r\n");
                }
                else
                {
                    if (Bind.ToUpper() == "ID")
                    {
                        sb.Append(NoHTML(reg.Replace(Value, new MatchEvaluator(GetValue))) + "\t" + ",");
                    }
                    else
                    {
                        sb.Append("\"" + NoHTML(reg.Replace(Value, new MatchEvaluator(GetValue))) + "\"\t" + ",");
                    }
                }

            }

        }

        return sb;
    }
    private string GetValue(Match m)
    {
        string bind = m.Value.Substring(1, m.Value.Length - 2);
        object value = dt.Rows[dt_i][bind];
        return value == null ? string.Empty : value.ToString();
    }
    private static string NoHTML(string s)
    {
        if (s.Contains("<img"))
        {
            s = GetHtmlImageUrlList(s)[0];
        }
        else
        {
            s = Regex.Replace(s, @"<script[^>]*?>.*?</script>", "", RegexOptions.IgnoreCase);
            s = Regex.Replace(s, @"<(.[^>]*)>", "", RegexOptions.IgnoreCase);
        }
       
        return s;
    }
      /// <summary>
        /// 获取Img的路径
        /// </summary>
        /// <param name="htmlText">Html字符串文本</param>
        /// <returns>以数组形式返回图片路径</returns>
    private static string[] GetHtmlImageUrlList(string htmlText)
        {
            Regex regImg = new Regex(@"<img\b[^<>]*?\bsrc[\s\t\r\n]*=[\s\t\r\n]*[""']?[\s\t\r\n]*(?<imgUrl>[^\s\t\r\n""'<>]*)[^<>]*?/?[\s\t\r\n]*>", RegexOptions.IgnoreCase);
            //新建一个matches的MatchCollection对象 保存 匹配对象个数(img标签)
            MatchCollection matches = regImg.Matches(htmlText);
            int i = 0;
            string[] sUrlList = new string[matches.Count];
            //遍历所有的img标签对象
            foreach (Match match in matches)
            {
                //获取所有Img的路径src,并保存到数组中
                sUrlList[i++] = match.Groups["imgUrl"].Value;
            }
            return sUrlList;
        }

    private void LoadDynamicQuery(string equery, string epara, string jsonquery)
    {
        LoadEncryptQuery(equery, epara);//加载加密设置条件
        LoadJsonQuery(jsonquery);//加载前端设置条件
    }

    private void LoadField()
    {
        StringBuilder s = new StringBuilder();
        foreach (JSON x in Column)
        {
            if (x["FK"] != null)
            {
                JSON FK = x["FK"];
                s.AppendFormat(",{0}=(select top 1 [{1}] from [{2}] where [{2}].[{3}]=[{4}].[{5}] {6})", x["Bind"], FK["Field"], FK["Table"], FK["Key"], Name, FK["Bind"], FK["Other"] == null ? "" : " and " + FK["Other"]);
            }
        }
        Field += s.ToString();
    }

    private void LoadSort(string sort)
    {
        JSON st = sort;

        StringBuilder s = new StringBuilder();
        foreach (JSON x in Column)
        {
            int i = Column.index;
            string Bind = x["Bind"];
            string IsSort = x["IsSort"];

            if (IsSort == "True")
            {
                string SortValue = st["Sort" + i];
                if (!string.IsNullOrEmpty(SortValue))
                {
                    s.AppendFormat(",[{0}] {1}", Bind, SortValue == "desc" ? "desc" : "");
                }
            }
        }

        if (s.Length > 0) Sort = s.ToString().Remove(0, 1);
    }
    private void LoadQuery(string Query)
    {
        JSON q = Query;
        StringBuilder s = new StringBuilder();
        foreach (JSON x in Column)
        {
            int i = Column.index;
            string SearchType = x["SearchType"];
            string Bind = x["Bind"];
            string Value = q["Value" + i];

            if (x["FK"] != null && !string.IsNullOrEmpty(Value))
            {
                JSON FK = x["FK"];
                s.AppendFormat(" and {0} in (select [{1}] from {2} {3}", FK["Bind"], FK["Key"], FK["Table"], FK["Other"] == null ? "" : "where " + FK["Other"]);
                Bind = FK["Field"];
            }

            if (SearchType == "Between")
            {
                string LeftValue = q["LeftValue" + i];
                if (!string.IsNullOrEmpty(LeftValue))
                {
                    s.AppendFormat(" and {0}>=@{1}", Bind, para.Count);
                    para.Add(LeftValue);
                }
                string RightValue = q["RightValue" + i];
                if (!string.IsNullOrEmpty(RightValue))
                {
                    s.AppendFormat(" and [{0}]<=@{1}", Bind, para.Count);
                    para.Add(RightValue);
                }
            }
            else if (SearchType == "Time")
            {
                string LeftValue = q["LeftValue" + i];
                if (!string.IsNullOrEmpty(LeftValue))
                {
                    s.AppendFormat(" and {0}>=@{1}", Bind, para.Count);
                    para.Add(LeftValue);
                }
                string RightValue = q["RightValue" + i];
                if (!string.IsNullOrEmpty(RightValue))
                {
                    s.AppendFormat(" and {0}<@{1}", Bind, para.Count);
                    para.Add(DateTime.Parse(RightValue).AddDays(1));
                }
            }
            else if (SearchType == "Like")
            {
                if (!string.IsNullOrEmpty(Value))
                {
                    s.AppendFormat(" and {0} like @{1}", Bind, para.Count);
                    para.Add("%" + Value + "%");
                }
            }
            else if (SearchType == "Equals" || SearchType == "Select")
            {
                if (!string.IsNullOrEmpty(Value))
                {
                    s.AppendFormat(" and {0}=@{1}", Bind, para.Count);
                    para.Add(Value);
                }
            }

            if (x["FK"] != null && !string.IsNullOrEmpty(Value)) s.Append(")");
        }

        if (s.Length > 0)
        {
            if (string.IsNullOrEmpty(AllQuery)) AllQuery = s.ToString().Remove(0, 5);
            else AllQuery += s.ToString();
        }
    }

    private void LoadEncryptQuery(string EQuery, string EPara)
    {
        if (!string.IsNullOrEmpty(EQuery))
        {
            string sql = DeCode(EQuery);
            object[] args = DeCode(EPara).Split('|');

            if (string.IsNullOrEmpty(AllQuery)) AllQuery = sql;
            else AllQuery += " and " + sql;

            para.AddRange(args);
        }
    }

    private void LoadJsonQuery(string JsonQuery)
    {
        JSON w = JsonQuery;
        if (w.IsJson())
        {
            StringBuilder s = new StringBuilder();

            foreach (var key in w.Keys)
            {
                s.AppendFormat(" and {0}=@{1}", key, para.Count);
                para.Add(w[key].ToString());
            }

            if (string.IsNullOrEmpty(AllQuery)) AllQuery = s.ToString().Remove(0, 5);
            else AllQuery += s.ToString();
        }
    }

    private void LoadDataSelect()
    {
        foreach (JSON x in Column)
        {
            if ((x["BindType"] == "Select" || x["SearchType"] == "Select") && x["DataSelect"] != null)
            {
                DataTable dt = DB.GetDataTable(x["DataSelect"]);
                JSON info = new JSON("[]");
                foreach (DataRow dr in dt.Rows)
                {
                    JSON vt = new JSON();
                    vt["Value"] = dr[0].ToString();
                    vt["Text"] = dr[1].ToString();
                    info.Add(vt);
                }
                x["Info"] = info;
            }
        }
    }






    #region 加解密

    private byte[] Keys = { 0x12, 0x42, 0x82, 0x71, 0x29, 0xBF, 0xBA, 0xCF };//默认密钥向量   
    private string Key = "exi1hcux";//密钥
    //加密
    private string EnCode(string s)
    {
        if (string.IsNullOrEmpty(s)) return string.Empty;
        byte[] k = Encoding.UTF8.GetBytes(Key.Substring(0, 8));
        byte[] v = Keys;
        byte[] buffer = Encoding.UTF8.GetBytes(s);
        DESCryptoServiceProvider DCSP = new DESCryptoServiceProvider();
        MemoryStream ms = new MemoryStream();
        CryptoStream cs = new CryptoStream(ms, DCSP.CreateEncryptor(k, v), CryptoStreamMode.Write);
        cs.Write(buffer, 0, buffer.Length);
        cs.FlushFinalBlock();
        return Convert.ToBase64String(ms.ToArray());
    }

    //解密
    private string DeCode(string s)
    {
        try
        {
            if (string.IsNullOrEmpty(s)) return string.Empty;
            byte[] k = Encoding.UTF8.GetBytes(Key);
            byte[] v = Keys;
            byte[] buffer = Convert.FromBase64String(s);
            DESCryptoServiceProvider DCSP = new DESCryptoServiceProvider();
            MemoryStream ms = new MemoryStream();
            CryptoStream cs = new CryptoStream(ms, DCSP.CreateDecryptor(k, v), CryptoStreamMode.Write);
            cs.Write(buffer, 0, buffer.Length);
            cs.FlushFinalBlock();
            return Encoding.UTF8.GetString(ms.ToArray());
        }
        catch
        {
            return string.Empty;
        }
    }
    #endregion
}