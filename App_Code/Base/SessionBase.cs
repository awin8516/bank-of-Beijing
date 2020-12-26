using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Caching;

/// <summary>
/// SessionBase 基于Cache自定义可控Session  可自定义SessionKey
/// </summary>
public class SessionBase
{

    private Cache c = HttpRuntime.Cache;//缓存
    private int Minutes = 120;//过期时间 （默认120分钟无访问则释放）

    private string sessionkey;
    public string SessionKey { get { return sessionkey; } }
    public SessionBase()
    {
        sessionkey = "Session_" + Guid.NewGuid();
    }
    public SessionBase(string SessionKey)
    {
        sessionkey = SessionKey;
    }

    public object this[string Key]
    {
        get
        {
            object o = c.Get(SessionKey);
            if (o != null)
            {
                var x = (Dictionary<string, object>)o;
                if (x.ContainsKey(Key)) return x[Key];
            }
            return null;
        }
        set
        {
            object o = c.Get(SessionKey);
            if (o != null)
            {
                var x = (Dictionary<string, object>)o;
                if (x.ContainsKey(Key))
                    x[Key] = value;
                else
                    x.Add(Key, value);
            }
            else
            {
                var x = new Dictionary<string, object>();
                x.Add(Key, value);
                InsertCache(SessionKey, x);
            }
        }
    }

    public void Clear()
    {
        c.Remove(SessionKey);
    }

    private void InsertCache(string key, object o)
    {
        c.Insert(key, o, null, Cache.NoAbsoluteExpiration, TimeSpan.FromMinutes(Minutes));
    }
}