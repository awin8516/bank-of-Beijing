using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Web;

/// <summary>
/// CSVHelper 的摘要说明
/// </summary>
public class CSVHelper
{
    public static string SaveAsCSV<T>(string fileName, IList<T> listModel, string header="") where T : class, new()
        {
            string results = "";
            try
            {
                StringBuilder sb = new StringBuilder();
                //通过反射 显示要显示的列
                BindingFlags bf = BindingFlags.Instance | BindingFlags.NonPublic | BindingFlags.Public | BindingFlags.Static;//反射标识
                Type objType = typeof(T);
                PropertyInfo[] propInfoArr = objType.GetProperties(bf);
               
                List<string> listPropertys = new List<string>();
                foreach (PropertyInfo info in propInfoArr)
                {
                    if (string.Compare(info.Name.ToUpper(), "ID") != 0) //不考虑自增长的id或者自动生成的guid等
                    {
                        if (!listPropertys.Contains(info.Name))
                        {
                            listPropertys.Add(info.Name);
                        }
                        header += info.Name + ",";
                    }
                }
                //这里是要生成的表头
                sb.AppendLine(header.Trim(',')); //csv头
                foreach (T model in listModel)
                {
                    string strModel = string.Empty;
                    foreach (string strProp in listPropertys)
                    {
                        foreach (PropertyInfo propInfo in propInfoArr)
                        {
                            if (string.Compare(propInfo.Name.ToUpper(), strProp.ToUpper()) == 0)
                            {
                                PropertyInfo modelProperty = model.GetType().GetProperty(propInfo.Name);
                                if (modelProperty != null)
                                {
                                    object objResult = modelProperty.GetValue(model, null);
                                    string result = ((objResult == null) ? string.Empty : objResult).ToString().Trim();
                                    if (result.IndexOf(',') != -1)
                                    {
                                        result = "\"" + result.Replace("\"", "\"\"") + "\""; //特殊字符处理 
                                    }
                                    if (!string.IsNullOrEmpty(result))
                                    {
                                        Type valueType = modelProperty.PropertyType;
                                        if (valueType.Equals(typeof(Nullable<decimal>)))
                                        {
                                            result = decimal.Parse(result).ToString("#.#");
                                        }
                                        else if (valueType.Equals(typeof(decimal)))
                                        {
                                            result = decimal.Parse(result).ToString("#.#");
                                        }
                                        else if (valueType.Equals(typeof(Nullable<double>)))
                                        {
                                            result = double.Parse(result).ToString("#.#");
                                        }
                                        else if (valueType.Equals(typeof(double)))
                                        {
                                            result = double.Parse(result).ToString("#.#");
                                        }
                                        else if (valueType.Equals(typeof(Nullable<float>)))
                                        {
                                            result = float.Parse(result).ToString("#.#");
                                        }
                                        else if (valueType.Equals(typeof(float)))
                                        {
                                            result = float.Parse(result).ToString("#.#");
                                        }
                                    }
                                    strModel += result + ",";
                                }
                                else
                                {
                                    strModel += ",";
                                }
                                break;
                            }
                        }
                    }
                    strModel = strModel.Substring(0, strModel.Length - 1);
                    sb.AppendLine(strModel);
                }
                string content = sb.ToString();

                results = content;

            }
            catch
            {

            }
            return results;

        }
}