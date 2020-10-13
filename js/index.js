
$(document).ready(function(){
  var $o = {
    html:$("html"),
    body:$("body"),
    // navFixeds:$("#navFixed a"),
    pages:$("section.page"),
    pageHome:$("#pageHome"),
    navHome:$("#navHome"),
    exchange:$("#exchange"),
    fund:$("#fund"),
    pageGuide:$("#pageGuide"),
    pageFacilities:$("#pageFacilities"),
    pageParty:$("#pageParty"),
    pageService:$("#pageService"),
    pageConsumer:$("#pageConsumer"),
    pageVip:$("#pageVip"),
    pageFinancial:$("#pageFinancial"),
    pageHonor:$("#pageHonor"),
    swipUp:$(".side-btns .scroll b:first"),
    swipDown:$(".side-btns .scroll b:last")
  }
  var eventList ={
    click :'ontouchstart' in document.documentElement ? "touchstart": "click"
  } 
  var timer = null;
  var backHomeTime = 60; // 没有操作？秒后回首页
  var backHomeTimer = null;
  template.defaults.debug=true;  

  $o.body.on(eventList.click, autoBackHome);
  $o.body.on(eventList.click, ".nav a", pageTo);
  $o.body.on(eventList.click, ".back-home", backHome);

  initHome();
  initGuide();

  /*******************
   * 初始化首页 & 菜单
   */
  function initHome() {
    API.getSiteInfo({siteId:1},function(res){
      console.log(res.data);
      Template('tpl-nav-home', res.data);
      Template('tpl-nav-fixed', res.data);
    });

    API.getExchange({},function(res){
      console.log(res);
      if(res.ErrorCode == 0){
        Template('tpl-exchange', {list:res.Data.CacheTable});
        setScroll($('.exchange dd'))
      }else{
        console.log("加载超时");
      }
    });

    API.getFund({},function(res){
      console.log(res);
      if(res.ErrorCode == 0){
        Template('tpl-fund', {list:res.Data.Table});
        setScroll($('.fund dd'))
      }else{
        console.log("加载超时");
      }
    });
  }
  
  /*****************
   * 初始化网点导览
   */
  function initGuide() {
    API.getGuide({siteId:1},function(res){
      console.log(res.data);
      Template('tpl-page-guide-content', {content:res.data});
    });
  }

  function setScroll(box){
    var sh = box[0].scrollHeight - box.height()
    var time = sh/20
    box.animate({scrollTop:sh}, time*1000, 'linear', function(){
      box[0].scrollTop = 0;
      setScroll(box)
    })
  }

  /**
   * 渲染HTML
   */
  function Template(tpl, data, el) {
    var html = template(tpl, data);
    $("#"+tpl).replaceWith(html);
  }

  /**
   * 超时回到首页
   */
  function autoBackHome() {
    clearTimeout(backHomeTimer);
    backHomeTimer = setTimeout(function() {
      backHome();
    }, backHomeTime * 1000);
  }

  /**
   * 回到首页
   */
  function backHome() {
    $o.pages.filter(".page-home").addClass("page-show").siblings(".page-show").removeClass("page-show");
    $o.html.attr("class", "");
  }

  /**
   * 打开页面
   */
  function pageTo(e) {
    console.log(this.dataset.tpl);    
    $o.pages.filter(".page-"+this.dataset.tpl.toLowerCase()).addClass("page-show").siblings(".page-show").removeClass("page-show");
    $("#navFixed a[data-tpl="+this.dataset.tpl+"]").addClass("active").siblings(".active").removeClass("active");
    $o.html.attr("class", "has-nav html-page-"+this.dataset.tpl.toLowerCase());
    initSwipe();
  }

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

  function initSwipe() {
    var scrollPx = 150;
    var $scrollbox = $(".page-show .scrollbox");
    var scrollboxHeight = $(".page-show .scrollbox").height();
    var scrollHeight = $(".page-show .scrollbox")[0].scrollHeight;
    var scrollTop = 0

    var start = function(d) {
      scrollTop = scrollHeight - scrollboxHeight;
      scrollCurrent = scrollCurrent + d;
      var _scroll = scrollPx * scrollCurrent;
      swipe(k, d);
      if (_scroll <= 0) {
        swipup.classList.add("disabled");
        swipdown.classList.remove("disabled");
      } else if (_scroll > 0 && _scroll < scrollHeight) {
        swipup.classList.remove("disabled");
        swipdown.classList.remove("disabled");
        timer = setTimeout(function() {
          start(d);
        }, 100);
      } else if (_scroll > scrollHeight) {
        swipup.classList.remove("disabled");
        swipdown.classList.add("disabled");
      }
    };

    var swipe = function(dir) {
      $scrollbox.scrollTop(scrollPx * dir);
    }

    $o.swipUp.on(eventList.click, function(){
      swipe(-1);
    });
    $o.swipDown.on(eventList.click, function(){
      swipe(1);
    });

    var end = function() {
      clearTimeout(timer);
    };

    // swipup.onmousedown = function() {
    //   start(-1);
    // };
    // swipup.onmouseup = end;
    // swipdown.onmousedown = function() {
    //   start(1);
    // };
    // swipdown.onmouseup = end;


    // scrollbox[index].scrollTo(0, scrollPx * scrollCurrent);
  }
})
