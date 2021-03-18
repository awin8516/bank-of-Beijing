var API = {
    // DOMAIN: location.href.indexOf("lina") != -1 ? "http://lina007.com/Api/Handler.ashx" : " http://114.55.11.192:7300/mock/5f841673d29faf95e856baa9/lina",               //正式
    DOMAIN: "http://lina007.com",               //正式
    DEBUG: true,    
    _send: function(method,type, data, success){
        var successfn = function(res){
            if (API.DEBUG){
                // console.log(method + "——success");
                // console.log(res);
            }
            
            if(res && res.errcode == 0){
                if (success) success(res);
            }else{
                if (success) success(res);
                // if(confirm('数据请求超时，是否刷新页面？')){
                //     window.location.reload();
                // }
            } 
        };
        var errorFn = function(res) {
            if (API.DEBUG) {
                // console.log(method + "——fail");
                // console.log(res);
            } 
            // if(confirm('数据请求超时，是否刷新页面？')){
            //     window.location.reload();
            // }
        }
        if(API.DEBUG){
            successfn && successfn(__DATA[method])
        }else{
            $.ajax({
                url: API.DOMAIN + "/Api/Handler.ashx?method=" + method,
                type: API.DEBUG ? "GET" : type,
                data: data,
                dataType: 'json',
                async: true,
                success: successfn,
                error: errorFn
            });
        }
    },


    getSiteInfo:function(data,success){
        API._send('getSiteInfo',"POST", data, success);
    },

    getExchange:function(data,success,error){
        $.ajax({
            type: "GET",
            url: "http://ewealth.abchina.com/app/data/api/DataService/RealTimeExchangeRateV2",
            data: {},
            dataType: "json",
            success: success,
            error:error
        });
    },

    getFund:function(data,success,error){
        $.ajax({
            type: "GET",
            url: "http://ewealth.abchina.com/app/data/api/DataService/FundFilterV2_New?i=1&s=50&o=2&W=0%7C-1%7C-1%7C1%7C0%7C1%7C1%7C0%7C-1%7C9_DESC",
            data: {},
            dataType: "json",
            success: success,
            error:error
        });
    },

    getGuide:function(data,success){
        API._send('getGuide',"POST", data, success);
    },
    getFacilities:function(data,success){
        API._send('getFacilities',"POST", data, success);
    },
    getParty:function(data,success){
        API._send('getParty',"POST", data, success);
    },
    getPersonnel:function(data,success){
        API._send('getPersonnel',"POST", data, success);
    },
    getConsumer:function(data,success){
        API._send('getConsumer',"POST", data, success);
    },
    getVip:function(data,success){
        API._send('getVip',"POST", data, success);
    },
    getFinancial:function(data,success){
        API._send('getFinancial',"POST", data, success);
    },
    getHonor:function(data,success){
        API._send('getHonor',"POST", data, success);
    },
    getAnniversary:function(data,success){
        API._send('getAnniversary',"POST", data, success);
    },
    getCash:function(data,success){
        API._send('getCash',"POST", data, success);
    },
}
