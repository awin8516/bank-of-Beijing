var API = {
    DOMAIN: location.href.indexOf("lina") != -1 ? "" : " http://114.55.11.192:7300/mock/5f841673d29faf95e856baa9/lina",               //正式
    DEBUG: false, 
    _send: function(method,type, data, success){
        $.ajax({
            url: API.DOMAIN + "/" + method,
            type:type,
            data: data,
            dataType: 'json',
            async: true,
            success: function(res) {
                if (API.DEBUG){
                    console.log(method + "——success");
                    console.log(res);
                }
                
                if(res && res.errcode == 0){
                    if (success) success(res);
                }else{
                    if(confirm('数据请求超时，是否刷新页面？')){
                        window.location.reload();
                    }
                } 
            },
            error: function(res) {
                if (API.DEBUG) {
                    console.log(method + "——fail");
                    console.log(res);
                } 
                if(confirm('数据请求超时，是否刷新页面？')){
                    window.location.reload();
                }
            }
        }); 
    },


    getSiteInfo:function(data,success){
        API._send('getSiteInfo',"POST", data, success);
    },

    getParty:function(data,success){
        API._send('getParty',"POST", data, success);
    }
}
