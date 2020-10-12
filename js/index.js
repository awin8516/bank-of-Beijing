
function fullScreen() {
  var el = document.documentElement;
  var rfs =
    el.requestFullScreen ||
    el.webkitRequestFullScreen ||
    el.mozRequestFullScreen ||
    el.msRequestFullscreen;
  if (typeof rfs != "undefined" && rfs) {
    rfs.call(el);
  }
  return;
}

$(document).ready(function(){
  var $o = {
    html:$("html"),
    body:$("body"),
    navFixed:$("#navFixed"),
    pageHome:$("#pageHome"),
    navHome:$("#navHome"),
    pageGuide:$("#pageGuide"),
    pageFacilities:$("#pageFacilities"),
    pageParty:$("#pageParty"),
    pageService:$("#pageService"),
    pageConsumer:$("#pageConsumer"),
    pageVip:$("#pageVip"),
    pageFinancial:$("#pageFinancial"),
    pageHonor:$("#pageHonor")
  }
  var timer = null;
  var backHomeTime = 60; // 没有操作？秒后回首页
  var backHomeTimer = null;

  $o.body.on("touchstart click", backHome);

  initHome();

  /**
   * 初始化首页 & 菜单
   */
  function initHome() {
    API.getSiteInfo({siteId:1},function(res){
      console.log(res)
    })
  }

  /**
   * 超时回到首页
   */
  function backHome() {
    clearTimeout(backHomeTimer);
    backHomeTimer = setTimeout(function() {
      hideAside(asideIndex);
    }, backHomeTime * 1000);
  }

  /**
   * 打开页面
   */
  function pageTo(id) {
    
  }
})
