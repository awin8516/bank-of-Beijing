using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// DictionarySort 的摘要说明
/// </summary>
public class DictionarySort : System.Collections.IComparer
{
    public int Compare(object ol, object or)
    {
        string sl = ol as string;
        string sr = or as string;
        int sll = sl.Length;
        int srl = sr.Length;
        int index = 0;
        while (index < sll && index < srl)
        {
            if (sl[index] < sr[index])
                return -1;
            else if (sl[index] > sr[index])
                return 1;
            else
                index++;
        }
        return sll - srl;

    }
}