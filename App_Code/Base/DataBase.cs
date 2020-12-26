using Aglie;

/// <summary>
/// BaseData 的摘要说明
/// </summary>
public class DataBase
{
    private const string conn = "DB";//Sqlserver 数据库连接字符串
    protected static DBHelper DB = new DBHelper(conn);
    protected static ManageBase Manage = new ManageBase(DB);
    protected static CacheBase ICache = new CacheBase(conn);


    //private const string conn1 = "EBConnectionString";//Sqlserver 数据库连接字符串
    //protected static DBHelper DB1 = new DBHelper(conn1);
    //protected static ManageBase Manage1 = new ManageBase(DB1);
    //protected static CacheBase ICache1 = new CacheBase(conn1);

}