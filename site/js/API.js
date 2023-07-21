var API = {
    DOMAIN: location.href.indexOf("lina007.com") != -1 ? "http://lina007.com" : " http://test.lina007.com",
    DEBUG: location.href.indexOf("lina007.com") == -1,    
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
            if(method == 'getSiteInfo'){
                console.log(method, __DATA[method]);
                successfn && successfn(__DATA_UPDATE[method])
            }else{
                console.log(method, __DATA[method]);
                successfn && successfn(__DATA[method])
            }
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

    // getExchange:function(data,success,error){
    //     $.ajax({
    //         type: "GET",
    //         url: "http://ewealth.abchina.com/app/data/api/DataService/RealTimeExchangeRateV2",
    //         data: {},
    //         dataType: "json",
    //         success: success,
    //         error:error
    //     });
    // },

    // getFund:function(data,success,error){
    //     $.ajax({
    //         type: "GET",
    //         // url: "http://ewealth.abchina.com/app/data/api/DataService/FundFilterV2_New?i=1&s=50&o=2&W=0%7C-1%7C-1%7C1%7C0%7C1%7C1%7C0%7C-1%7C9_DESC",
    //         // url: "http://ewealth.abchina.com/app/data/api/DataService/FundFilterV2_New?i=1&s=15&w=0%257C1%257C-1%257C1%257C0%257C1%257C1%257C0%257C-1%257C9_DESC&o=2",
    //         url: "https://ewealth.abchina.com/app/data/api/DataService/FundFilterV2_New?i=1&s=15&w=0%257C-1%257C-1%257C1%257C0%257C1%257C1%257C0%257C-1%257C9_DESC&o=2",
    //         dataType: "json",
    //         success: success,
    //         error:error
    //     });

    //     // var settings = {
    //     //     "url": "http://ewealth.abchina.com/app/data/api/DataService/FundFilterV2_New?i=1&s=15&w=0%257C-1%257C-1%257C1%257C0%257C1%257C1%257C0%257C-1%257C9_DESC&o=2",
    //     //     "method": "GET",
    //     //     "timeout": 0,
    //     //     "dataType":'json',
    //     //     "crossDomain": true
    //     //   };
          
    //     //   $.ajax(settings).done(success);
    // },

    getExchange:function(data,success){
        API._send('getHtmlByUrl',"POST", {url:"http://ewealth.abchina.com/app/data/api/DataService/RealTimeExchangeRateV2"}, success);
    },
    getFund:function(data,success){
        API._send('getHtmlByUrl',"POST", {url:"http://ewealth.abchina.com/app/data/api/DataService/FundFilterV2_New?i=1&s=15&w=0%257C-1%257C-1%257C1%257C0%257C1%257C1%257C0%257C-1%257C9_DESC&o=2"}, success);
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
    getPension:function(data,success){
        API._send('getPension',"POST", data, success);
    },
    getNotice:function(data,success){
        API._send('getNotice',"POST", data, success);
    },
}
