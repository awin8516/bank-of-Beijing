
$(document).ready(function(){
  var $o = {
    html:$("html"),
    head:$("head"),
    body:$("body"),
    container:$("body > .container"),
    pages:$("section.page"),
    pageHome:$("#pageHome"),
    navHome:$("#navHome"),
    exchange:$("#exchange"),
    fund:$("#fund"),
    pageGuide:$("#pageGuide"),
    pageFacilities:$("#pageFacilities"),
    pageParty:$("#pageParty"),
    pagePersonnel:$("#pagePersonnel"),
    pageConsumer:$("#pageConsumer"),
    pageVip:$("#pageVip"),
    pageFinancial:$("#pageFinancial"),
    pageHonor:$("#pageHonor"),
    pageAnniversary:$("#pageAnniversary"),
    swipBtnBox:$(".side-btns .scroll"),
    swipUp:$(".side-btns .scroll b:first"),
    swipDown:$(".side-btns .scroll b:last"),
    popup:$("#popup"),
    popupClose:$("#popup .close"),
    popupContent:$("#popup .content"),
  }
  var eventList ={
    click :"ontouchstart" in document.documentElement ? "touchstart": "click",
    mousedown :"ontouchstart" in document.documentElement ? "touchstart": "mousedown",
    mousemove :"ontouchmove" in document.documentElement ? "touchmove": "mousemove",
    mouseup :"ontouchend" in document.documentElement ? "touchend": "mouseup",
    scroll :"scroll"
  }
  console.log(eventList);

  var backHomeTime = 60; // 没有操作？秒后回首页
  var backHomeTimer = null;

  $o.body.on(eventList.click, autoBackHome);
  $o.body.on(eventList.click, ".nav a", pageTo);
  $o.body.on(eventList.click, ".back-home", backHome);
  
  $o.body.on(eventList.click, "[data-img]", function(){
    if(this.dataset.img){
      showPopup("<img src=" + this.dataset.img + ">");
    }
  });
  $o.body.on(eventList.click, "[data-personnel]", function(){
    if(this.dataset.personnel){
      showPopup(createPersonnelDetail(this.dataset.personnel));
    }
  });
  $o.popupClose.on(eventList.click, hidePopup);


  initFullScreen();
  initHome();
  initGuide();
  initFacilities();
  initParty();
  initPersonnel();
  initConsumer();
  initVip();
  initFinancial();
  initHonor();
  initAnniversary();

  /*******************
   * 初始化首页 & 菜单
   */
  function initHome() {
    API.getSiteInfo({siteId:1},function(res){
      // console.log(res.data);
      Template('tpl-nav-home', res.data);
      Template('tpl-video', res.data);
      Template('tpl-nav-fixed', res.data);
      document.title = res.data.siteName;
      $o.body.attr("class", "theme-ui-"+res.data.siteTheme)
    });

    API.getExchange({},function(res){
      // console.log(res);
      if(res.ErrorCode == 0){
        Template('tpl-exchange', {list:res.Data.CacheTable});
        autoScroll($('.exchange dd'))
      }else{
        console.log("加载超时");
      }
    });

    API.getFund({},function(res){
      // console.log(res);
      if(res.ErrorCode == 0){
        Template('tpl-fund', {list:res.Data.Table});
        autoScroll($('.fund dd'))
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
      // console.log(res.data);
      var time = JSON.parse('[{"name":"'+res.data.peakTime.replace(/\s|\n|\r\n|；$|;$|，$|,$|。$|.$/g, '').replace(/;|；|,|，/g, '},{"name":"').replace(/=/g, '","value":')+'}]');
      var week = JSON.parse('[{"name":"'+res.data.peakWeek.replace(/\s|\n|\r\n|；$|;$|，$|,$|。$|.$/g, '').replace(/;|；|,|，/g, '},{"name":"').replace(/=/g, '","value":')+'}]');
      var data = {
        content:res.data.content,
        peakTime:time,
        peakWeek:week,
      }
      // console.log(data)
      Template('tpl-page-guide-content', data);
    });
  }

  
  /*****************
   * 初始化便民设施
   */
  function initFacilities() {
    API.getFacilities({siteId:1},function(res){
      // console.log(res.data);
      Template('tpl-page-facilities', {list:res.data});
    });
  }

  /*****************
   * 初始化党建信息
   */
  function initParty() {
    API.getParty({siteId:1},function(res){
      // console.log(res.data);
      Template('tpl-page-party', {content:res.data});
    });
  }
  
  /*****************
   * 初始化服务人员
   */
  function initPersonnel() {
    API.getPersonnel({siteId:1},function(res){
      // console.log(res.data);
      // var category=[]
      // var cate = ""
      // for(var i=0;i<res.data.length;i++){
      //   var _cate = res.data[i].category;
      //   if(cate.indexOf(_cate+"#") != -1){
      //     //已有分类
      //     for(var c=0;c<category.length;c++){
      //       if(category[c].cate == _cate){
      //         category[c].list.push(res.data[i])
      //       }
      //     }
      //   }else{
      //     //新分类
      //     cate = cate + _cate + "#";
      //     category.push({
      //       cate:_cate,
      //       list: [res.data[i]]
      //     })
      //   }
      // }
      // console.log(JSON.stringify(category))
      Template('tpl-page-personnel', {groupPhoto:res.groupPhoto,category:res.data});
    });
  }
  /*****************
   * 初始化消费者保护
   */
  function initConsumer() {
    API.getConsumer({siteId:1},function(res){
      // console.log(res.data);
      Template('tpl-page-consumer', {content:res.data});
    });
  }
  /*****************
   * 初始化贵宾增值服务
   */
  function initVip() {
    API.getVip({siteId:1},function(res){
      // console.log(res.data);
      Template('tpl-page-vip', {content:res.data});
    });
  }
  /*****************
   * 初始化理财资讯
   */
  function initFinancial() {
    API.getFinancial({siteId:1},function(res){
      // console.log(res.data);
      Template('tpl-page-financial', {content:res.data});
    });
  }
  /*****************
   * 初始化我的的荣誉
   */
  function initHonor() {
    API.getHonor({siteId:1},function(res){
      // console.log(res.data);
      Template('tpl-page-honor', {content:res.data});
    });
  }
  /*****************
   * 13周年庆
   */
  function initAnniversary() {
    API.getAnniversary({siteId:1},function(res){
      // console.log(res.data);
      Template('tpl-page-anniversary', {content:res.data});
    });
  }

  /**
   * 生成服务人员详细弹窗HTML
   */
  function createPersonnelDetail(data) {
    // console.log(data);
    data = JSON.parse(data)
    return template("tpl-page-personnel-detail", data);
  }


  /**
   * 汇率自动滚动
   * @param {*} box 
   */
  function autoScroll(box){
    var sh = box[0].scrollHeight - box.height();
    if(sh > 0){
      var name = "auto-scroll-" + new Date().getTime() + parseInt(Math.random()*1000) 
      var duration = sh*20
      box.children().attr("style", "animation: "+name+" "+duration+"ms linear infinite;");
      $o.head.append("<style>.a {width:100px} @keyframes "+name+"{to {transform: translateY(-"+sh+"px);}}</style>")
    }
  }

  function autoScroll(box){
    var sh = box[0].scrollHeight - box.height();
    if(sh > 0){
      var name = "auto-scroll-" + new Date().getTime() + parseInt(Math.random()*1000) 
      var duration = sh*20
      box.children().attr("style", "animation: "+name+" "+duration+"ms linear infinite;");
      $o.head.append("<style>.a {width:100px} @keyframes "+name+"{to {transform: translateY(-"+sh+"px);}}</style>")
    }
  }

  /**
   * 渲染HTML
   */
  function Template(tpl, data, el) {
    var html = template(tpl, data);
    if(el){
      $(el).html(html);
    }else{
      $("#"+tpl).replaceWith(html);
    }
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
    hidePopup();
  }

  function showPopup(html) {
    $o.popupContent.html(html);
    $o.popup.addClass("show");
  }
  function hidePopup() {
    $o.popup.removeClass("show");
    $o.popupContent.html("");
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

  /**
   * 初始全屏
   */
  function initFullScreen() {
    // return false;
    // $("<div class='fullscreen-mask'><div class='btn-fullscreen'></div></div>").appendTo(".container > .header");
    $("<div class='btn-fullscreen'></div>").appendTo(".container > .header");
    $o.body.on(eventList.click, ".btn-fullscreen", function(){
      console.log(22)
      if($o.container.hasClass("full-screen")){
        console.log(33)
        console.log("exitFullscreen")
        exitFullscreen();
      }else{
        console.log(44)
        console.log("fullScreen")
        fullScreen();
      }
      
      // $(this).parent().addClass("hide");
    });

    //监听window是否全屏，并进行相应的操作,支持esc键退出
    window.onresize = function() {
      console.log(0)
      var isFull=!!(document.webkitIsFullScreen || document.mozFullScreen || 
        document.msFullscreenElement || document.fullscreenElement
      );//!document.webkitIsFullScreen都为true。因此用!!
      if (isFull==false) {
        console.log(1)
        $o.container.removeClass("full-screen")
      }else{
        console.log(2)
        $o.container.addClass("full-screen")
      }
    }


  }

  function fullScreen(callback) {
    var el = document.body;
    var rfs =
      el.requestFullScreen ||
      el.webkitRequestFullScreen ||
      el.mozRequestFullScreen ||
      el.msRequestFullscreen;
    if (typeof rfs != "undefined" && rfs) {
      rfs.call(el);
      callback && callback();
    }
    return;
  }

  function exitFullscreen(callback) {
    var el = document;
    var rfs =
      el.exitFullscreen ||
      el.webkitExitFullscreen ||
      el.mozCancelFullScreen ||
      el.msExitFullscreen;
    if (typeof rfs != "undefined" && rfs) {
      rfs.call(el);
      callback && callback();
    }
    return;
  }

  /**
   * 初始上滑下滑按钮
   */
  function initSwipe() {
    $o.swipBtnBox.attr("status", "");
    var $scrollbox = $(".page-show .scrollbox");
    if($scrollbox.length <= 0 ) return;
    var scrollboxHeight = $(".page-show .scrollbox").height();
    var scrollSpace = $(".page-show .scrollbox")[0].scrollHeight - scrollboxHeight;
    if(scrollSpace <= 0 ) return;
    var scrollTop = 0;
    var timer = null;
    var timerPx = null;
    $scrollbox.scrollTop(scrollTop);
    $o.swipBtnBox.attr("status", "top");

    var updateBtnStatus = function(){
      scrollTop = $scrollbox.scrollTop();
      if (scrollTop <= 0) {
        $o.swipBtnBox.attr("status", "top");
        clear();
        return false;
      } else if (scrollTop > 0 && scrollTop < scrollSpace) {        
        $o.swipBtnBox.attr("status", "mid")
        return true;
      } else if (scrollTop >= scrollSpace) {        
        $o.swipBtnBox.attr("status", "bottom")
        clear();
        return false;
      }
    }

    var swipe = function(dir, px) {
      px = px || 150
      scrollTop = $scrollbox.scrollTop();
      scrollTop = scrollTop + px * dir
      $scrollbox.scrollTop(scrollTop);
      var status = updateBtnStatus();

      if(!timer && !timerPx && status){
        timer = setTimeout(function() {
          timerPx = setInterval(function() {
            swipe(dir, 10);
          }, 100);
        }, 1000);
      }
    }

    var clear = function(){
      clearTimeout(timer);
      clearInterval(timerPx);
      timer = null
      timerPx = null
    }

    $o.swipUp.on(eventList.mousedown, function(){
      swipe(-1)
    });
    $o.swipDown.on(eventList.mousedown, function(){
      swipe(1)
    });
    $scrollbox.on(eventList.scroll, function(){
      updateBtnStatus()
    });

    $o.swipUp.on(eventList.mouseup, function(){clear()});
    $o.swipDown.on(eventList.mouseup, function(){clear()});
  }
});