﻿
$(document).ready(function(){
  var $o = {
    win:$(window),
    html:$("html"),
    head:$("head"),
    body:$("body"),
    container:$("body > .container"),
    logo:$(".logo-img"),
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

  var screenSize = {width:$o.win.width(),height:$o.win.height()}
  var screenType = screenSize.width/screenSize.height>1?"horizontal":"vertical";
  var siteId = getQueryString("siteId");
  var backHomeTime = 60; // 没有操作？秒后回首页
  var backHomeTimer = null;
  var newDate = "2020/11/28 00:00:00";  
  var nowDate = new Date();

  if(siteId == 1){
    var siteNav =  [
      {"zh": "网点导览","en": "Guide","template": "Guide"},
      {"zh": "便民设施","en": "Facilities","template": "Facilities"},
      {"zh": "党建信息","en": "Party","template": "Party"},
      {"zh": "服务人员展示","en": "Personnel","template": "Personnel"},
      {"zh": "消费者保护专栏","en": "Consumer","template": "Consumer"},
      {"zh": "贵宾增值服务","en": "VIP","template": "VIP"},
      {"zh": "理财资讯","en": "Financial","template": "Financial"},
      {"zh": "我的的荣誉","en": "Honor","template": "Honor"},
      {"zh": "13周年庆","en": "Anniversary","template": "Anniversary"},
      {"zh": "现金服务","en": "Cash","template": "Cash"}
    ];
  }else{
    var siteNav =  [
      // {"zh": "网点导览","en": "Guide","template": "Guide"},
      // {"zh": "便民设施","en": "Facilities","template": "Facilities"},
      {"zh": "党建信息","en": "Party","template": "Party"},
      // {"zh": "服务人员展示","en": "Personnel","template": "Personnel"},
      {"zh": "消费者保护专栏","en": "Consumer","template": "Consumer"},
      {"zh": "贵宾增值服务","en": "VIP","template": "VIP"},
      {"zh": "理财资讯","en": "Financial","template": "Financial"},
      // {"zh": "我的的荣誉","en": "Honor","template": "Honor"},
      {"zh": "13周年庆","en": "Anniversary","template": "Anniversary"},
      {"zh": "现金服务","en": "Cash","template": "Cash"}
    ];
  }
  

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
  $o.popupClose.on('click', hidePopup);

  // $o.body.on(eventList.click, ".popup-fullscreen .popup .close", function(){
  //   hidePopup2()
  // });

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
  initCash();

  //获得http url参数
	function getQueryString(name) {
		if (name && name != '') {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return decodeURIComponent(r[2]);
			return null;
		} //end if
		else return null;
	} //end func
  
  function initPlayList(el){
    var $videos= $(el);
    $.each($videos,function(index, video){
      // console.log(this.dataset.playlist)
      var playlist = JSON.parse(this.dataset.playlist);
      var index = 0;
      video.src = playlist[index];
      $(video).on("ended", function(){
        index = index === playlist.length-1 ? 0 : index+1;
        video.src = playlist[index];
        video.play();
      })
    })
  }

  function getIndexByArray(key,value,arr){
    var index = false;
    for(var i=0;i<arr.length;i++){
      if(arr[i][key] == value){
        index = i;
        break;
      }
    }   
    return index 
  }

  function delStyleHtml(html){
    return html.replace(/style="(.*?)"/g,"") 
  }

  function removeNav(name){
    var index = getIndexByArray("en",name,siteNav)
    siteNav.splice(index,1);
    var nav = {siteNav:siteNav}
    // console.log(nav)
    Template('tpl-nav-home', nav);
    Template('tpl-nav-fixed', nav);
  }

  /*******************
   * 初始化首页 & 菜单
   */
  function initHome() {
    API.getSiteInfo({id:siteId},function(res){
      // console.log(res)
      res.result.siteNav = siteNav;
      // console.log(res);
      backHomeTime = res.result.siteBackTime ? parseInt(res.result.siteBackTime) : 60; // 没有操作？秒后回首页
      $o.body.on(eventList.click, autoBackHome);
      $o.body.addClass("theme-ui-"+res.result.siteTheme);
      document.title = res.result.siteName;
      if(res.result.siteLogo){
        $o.logo.attr("src",res.result.siteLogo);
      }

      if(res.result.sitePoster){
        showPopup("<img src='"+res.result.sitePoster+"'>", true);
      }

      var banners = {
        siteBanner:res.result.siteBanner[screenType]
      }

      // console.log(banners)
      var v = []
      res.result.siteVideo.forEach(i => {
        if(nowDate > new Date(i.startTime) && nowDate < new Date(i.endTime)){
          v.push(i.src);
        }
      })
      res.result.siteVideo = v
      console.log(res)
      Template('tpl-nav-home', res.result);
      Template('tpl-banner', banners);
      Template('tpl-video', res.result);
      Template('tpl-nav-fixed', res.result);
      $o.video = $("video");
      swiperBanner = new Swiper({
        el: '.swiper-home-banner',
        // initialSlide: 0,
        // spaceBetween: 50,
        // slidesPerView: 1,
        // centeredSlides: true,
        // slideToClickedSlide: true,
        // grabCursor: true,
        // scrollbar: {
        //   el: '.swiper-scrollbar',
        // },
        // mousewheel: {
        //   enabled: true,
        // },
        // keyboard: {
        //   enabled: true,
        // },
        pagination: {
          el: '.swiper-home-banner .swiper-pagination',
        },
        loop : true,
        autoplay: {
          delay: 5000,
          stopOnLastSlide: false,
          disableOnInteraction: true
        }
        // navigation: {
        //   nextEl: '.swiper-home-banner .swiper-button-next',
        //   prevEl: '.swiper-home-banner .swiper-button-prev',
        // }
      });

      initPlayList('.video video');
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
    API.getGuide({id:siteId},function(res){
      if(res.errcode == 0 && res.result.content){
        var time = JSON.parse('[{"name":"'+res.result.peakTime.replace(/\s|\n|\r\n|；$|;$|，$|,$|。$|\.$/g, '').replace(/;|；|,|，/g, '},{"name":"').replace(/=/g, '","value":')+'}]');
        var week = JSON.parse('[{"name":"'+res.result.peakWeek.replace(/\s|\n|\r\n|；$|;$|，$|,$|。$|\.$/g, '').replace(/;|；|,|，/g, '},{"name":"').replace(/=/g, '","value":')+'}]');
        var data = {
          content:delStyleHtml(res.result.content),
          peakTime:time,
          peakWeek:week,
        }
        // console.log(data)
        Template('tpl-page-guide-content', data);
      }else{
        removeNav("Guide");
      }
      
    });
  }

  
  /*****************
   * 初始化便民设施
   */
  function initFacilities() {
    API.getFacilities({id:siteId},function(res){
      // console.log(res.result);
      if(res.errcode == 0 && res.result.length){
        Template('tpl-page-facilities', {list:res.result});
      }else{
        removeNav("Facilities");
      }
    });
  }

  /*****************
   * 初始化党建信息
   */
  function initParty() {
    API.getParty({id:siteId},function(res){
      // console.log(res.result);
      Template('tpl-page-party', {content:delStyleHtml(res.result.data)});
    });
  }
  
  /*****************
   * 初始化服务人员
   */
  function initPersonnel() {
    API.getPersonnel({id:siteId},function(res){
      // console.log(res.result);
      res.errcode = 1
      for(var i=0;i<res.result.data.length;i++){
        if(res.result.data[i].list.length){
          res.errcode = 0
        }
      }
      // console.log(res);
      if(res.errcode == 0 && res.result.data.length){
        Template('tpl-page-personnel', {groupPhoto:res.result.groupPhoto,category:res.result.data});
      }else{
        removeNav("Personnel");
      }
    });
  }
  /*****************
   * 初始化消费者保护
   */
  function initConsumer() {
    API.getConsumer({id:siteId},function(res){
      // console.log(res.result);
      Template('tpl-page-consumer', {content:delStyleHtml(res.result.data)});
    });
  }
  /*****************
   * 初始化贵宾增值服务
   */
  function initVip() {
    API.getVip({id:siteId},function(res){
      // console.log(res.result);
      Template('tpl-page-vip', {content:delStyleHtml(res.result.data)});
    });
  }
  /*****************
   * 初始化理财资讯
   */
  function initFinancial() {
    API.getFinancial({id:siteId},function(res){
      // console.log(res.result);
      Template('tpl-page-financial', {content:delStyleHtml(res.result.data)});
    });
  }
  /*****************
   * 初始化我的的荣誉
   */
  function initHonor() {
    API.getHonor({id:siteId},function(res){
      // console.log(res.result);
      if(res.errcode == 0 && res.result.data){
        Template('tpl-page-honor', {content:delStyleHtml(res.result.data)});
      }else{
        removeNav("Honor");
      }
    });
  }
  /*****************
   * 13周年庆
   */
  function initAnniversary() {
    API.getAnniversary({id:siteId},function(res){
      // console.log(res.result);
      if(res.errcode == 0 && res.result.data){
        Template('tpl-page-anniversary', {content:delStyleHtml(res.result.data)});
      }else{
        removeNav("Anniversary");
      }
    });
  }
  /*****************
   * 现金服务
   */
  function initCash() {
    API.getCash({id:siteId},function(res){
      // console.log(res.result);
      if(res.errcode == 0 && res.result.data){
        Template('tpl-page-cash', {content:delStyleHtml(res.result.data)});
        initPlayList('.video-playlist-cash')
      }else{
        removeNav("Cash");
      }
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
      $("#"+tpl).prevAll().remove();
      $("#"+tpl).before(html);
      // $("#"+tpl).replaceWith(html);
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
    var video = $(".page-show video")
    if(video.length) video[0].pause();
    $o.pages.filter(".page-home").addClass("page-show").siblings(".page-show").removeClass("page-show");
    $o.html.attr("class", "");
    hidePopup();
  }

  function showPopup(html, fullscreen) {
    $o.popupContent.html(html);
    if(fullscreen){
      $o.container.addClass("popup-fullscreen")
    }
    $o.popup.addClass("show");
  }
  function hidePopup() {
    console.log('hidePopup')
    // if(!$o.container.hasClass("popup-fullscreen")){
      $o.container.removeClass("popup-fullscreen")
      $o.popup.removeClass("show");
      $o.popupContent.html("");
    // }
  }
  function hidePopup2() {    
    console.log('hidePopup2')
    setTimeout(function(){
      $o.container.removeClass("popup-fullscreen")
      $o.popup.removeClass("show");
      $o.popupContent.html("");
    }, 17)
  }

  
  /**
   * 打开页面
   */
  function pageTo(e) {
    console.log(this.dataset.tpl);    
    var $prevPage = $(".page-show");
    var $nextPage = $o.pages.filter(".page-"+this.dataset.tpl.toLowerCase());

    if($prevPage[0].id == $nextPage[0].id) return;
    $nextPage.addClass("page-show");
    $prevPage.removeClass("page-show");
    $("#navFixed a[data-tpl="+this.dataset.tpl+"]").addClass("active").siblings(".active").removeClass("active");
    $o.html.attr("class", "has-nav html-page-"+this.dataset.tpl.toLowerCase());
    initSwipe();
    var prevVideo = $('video', $prevPage);
    var nextVideo = $('video', $nextPage);
    if(prevVideo.length) prevVideo[0].pause();
    if(nextVideo.length) nextVideo[0].play();
  }

  /**
   * 初始全屏
   */
  function initFullScreen() {
    // return false;
    // $("<div class='fullscreen-mask'><div class='btn-fullscreen'></div></div>").appendTo(".container > .header");
    $("<div class='btn-fullscreen'></div>").appendTo(".container > .header");
    $o.body.on("click", ".btn-fullscreen", function(e){
      
      console.log(this)
      console.log(22)
      if($o.container.hasClass("full-screen")){
        console.log(33)
        exitFullscreen(function(){
          $o.container.removeClass("full-screen")
          console.log("exitFullscreen");
          $o.video[0].pause();
          console.log("video pause")
        });
      }else{
        console.log(44)
        fullScreen(function(){
          $o.container.addClass("full-screen");
          screenSize = {width:$o.win.width(),height:$o.win.height()};
          // if(nowDate < new Date(newDate)){
          //   if(screenSize.width > screenSize.height){
          //     $o.video[0].play();
          //     console.log("video play")
          //   }else{
          //     $o.video[0].pause();
          //     console.log("video pause")
          //   }
          // }else{
            $o.video[0].play();
            console.log("video play")
            console.log("fullScreen")
          // }
          // $o.video[0].play();
          // console.log("video play")
          // console.log("fullScreen")
        });
      }
      
      // $(this).parent().addClass("hide");
    });

    //监听window是否全屏，并进行相应的操作,支持esc键退出
    window.onresize = function() {      
      console.log('onresize')
      var isFull=!!(document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement );//!document.webkitIsFullScreen都为true。因此用!!
      if (isFull==false) {
        console.log('removeClass("full-screen")')
        $o.container.removeClass("full-screen")
      }else{
        console.log('addClass("full-screen")')
        $o.container.addClass("full-screen")
      }
    }


  }

  function fullScreen(callback) {
    var el = document.documentElement;
    var rfs =
      el.requestFullscreen ||
      el.webkitRequestFullScreen ||
      el.mozRequestFullScreen ||
      el.msRequestFullscreen;
    if (typeof rfs != "undefined" && rfs) {
      var _catch = false;
      try{
        rfs.call(el);
      }catch(e){
        _catch = true
        console.log(e)
        console.log("fullScreen-error")
      }
      !_catch && callback && callback();
    }
    return;
  }

  function exitFullscreen(callback) {
    var el = document;
    var rfs =
      el.exitFullscreen ||
      el.webkitCancelFullScreen ||
      el.mozCancelFullScreen ||
      el.msExitFullscreen;
    if (typeof rfs != "undefined" && rfs) {
      var _catch = false;
      try{
        rfs.call(el);
      }catch(e){
        _catch = true
        console.log(e)
        console.log("exitFullscreen-error")
      }
      !_catch && callback && callback();
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