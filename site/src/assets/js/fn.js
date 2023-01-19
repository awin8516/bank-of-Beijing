//获得http url参数
let  getQueryString = function(name) {
    if (name && name != '') {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURIComponent(r[2]);
        return null;
    }
    else return null;
}

export default { 
    getQueryString 
}