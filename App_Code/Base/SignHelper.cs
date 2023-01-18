using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using Aglie;
/// <summary>
/// SignHelper 的摘要说明
/// </summary>
public class SignHelper
{
    
	public SignHelper()
	{
		//
		// TODO: 在此处添加构造函数逻辑
		//
	}
    /// <summary>
    /// 验证签名是否正确
    /// </summary>
    /// <param name="sPara"></param>
    /// <param name="sign"></param>
    /// <returns></returns>
    public static bool VerifySign(SortedDictionary<string, object> sPara, string signStr)
    {
        //string sdfdsf = GetSign(sPara);
        return GetSign(sPara) == signStr;
    }
    private static string GetSign(SortedDictionary<string, object> sPara)
    {
        string key = "skdfjdlsfjls2";
        string param = CreateLinkString(sPara);
        return EasyTool.MD5(param + key);
    }
    /// <summary>
    /// 把数组所有元素，按照“参数=参数值”的模式用“&”字符拼接成字符串
    /// </summary>
    /// <param name="sArray">需要拼接的数组</param>
    /// <returns>拼接完成以后的字符串</returns>
    private static string CreateLinkString(SortedDictionary<string, object> dicArray)
    {
        StringBuilder prestr = new StringBuilder();
        foreach (KeyValuePair<string, object> temp in dicArray)
        {
            prestr.Append(temp.Key + "=" + temp.Value + "&");
        }

        //去掉最後一個&字符
        int nLen = prestr.Length;
        prestr.Remove(nLen - 1, 1);

        return prestr.ToString();
    }
}