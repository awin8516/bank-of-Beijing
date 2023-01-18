using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


/// <summary>
/// 元素
/// </summary>
public class Element
{
    private HtmlNode hn;
    public Element(HtmlNode hn)
    {
        this.hn = hn;
    }
    public Element(HtmlDocument Html, string Name)
    {
        hn = Html.CreateElement(Name);
    }
    public static Element Get(HtmlDocument Html, string XPath)
    {
        if (XPath[0] == '#') XPath = "//*[@id='" + XPath.Remove(0, 1) + "']";
        else if (XPath[0] == '.') XPath = "//*[@class='" + XPath.Remove(0, 1) + "']";
        else if (XPath[0] != '/') XPath = "//" + XPath;

        HtmlNode hn = Html.DocumentNode.SelectSingleNode(XPath);

        return new Element(hn);
    }

    public void Html(string Html)
    {
        hn.InnerHtml = Html;
    }
    public void Attr(string Name, string Value)
    {
        hn.SetAttributeValue(Name, Value);
    }

    public void Append(string Html)
    {
        hn.InnerHtml += Html;
    }

    public void Append(Element e)
    {
        hn.AppendChild(e);
    }
    public void AppendFormat(string Html, params object[] args)
    {
        hn.InnerHtml += string.Format(Html, args);
    }

    public static implicit operator HtmlNode(Element e)
    {
        return e.hn;
    }
}