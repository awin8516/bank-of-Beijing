var fn = {};
fn.touchMove = function(o){
	o = o || document;
	return {
		on  : function(){$(o).off('touchmove.touchMoveDisabled')},
		off : function(){$(o).on('touchmove.touchMoveDisabled',function(e){e.preventDefault();});}
	};
}();
fn.browser = function(){
	var u = navigator.userAgent.toLowerCase(), app = navigator.appVersion;
	return {//移动终端浏览器版本信息
		pc : (function(){	return u.indexOf('mobile') == -1;})(),
		mobile : (function(){	return ( u.indexOf('mobile') > -1 && u.indexOf('ipad') == -1 );})(),
		ipad : (function(){	return ( u.indexOf('ipad') != -1 );})(),
		ios : (function(){
			if ( u.indexOf('ipad') > -1 || u.indexOf('iphone') > -1 ){
				var w = window.screen.width,h = window.screen.height;
				if(w==320) return {iphone5 : true};
				else if(w==375) return {iphone6 : true};
				else if(w==414) return {iphone6plus : true};
			}else{
				return false;	
			};
		})()
	};
}();

fn.orientation = function(){
	var key = (window.orientation && Math.abs(window.orientation) == 90) || (!window.orientation && window.screen.width > window.screen.height) ? 'horizontal':'vertical';
	return key;
}();
fn.screenMode = function(){
	setTimeout(function(){
		$('html').removeClass('horizontal vertical').addClass(fn.orientation);
	}, 100);
};
fn.loading = function(title){
	var done = title== false ? 'hide':'show';
	title =  title || '加载中...';
	var that = {
		show : function(title){if($('#loading').length > 0) return;var html = $('<div id="loading" class="loading">'+'<div class="loading-title"><img src="+'+websitePath+'+/image/common/loading.gif"></div>'+'<div class="loading-mask"></div></div>').appendTo('body');},
		hide : function(){
			var loaddiv = $('#loading');
			loaddiv.addClass('remove');
			setTimeout(function(){loaddiv.remove();}, 800);
		}
	};
	that[done](title);
};
fn.alert = function(title, _class, _close){
	var oHtml = $('<div id="alert" class="alert '+_class+'"><div class="alert-inside"><div class="alert-title">'+title+'</div><a class="alert-confirm">确定</a></div><div class="alert-mask"></div></div>').appendTo('body');
	$('>div>a.alert-confirm', oHtml).on('click',  function(e){
		e.preventDefault();
		e.stopPropagation();
		oHtml.remove();
	});
	if(_close){
		$('>.alert-mask', oHtml).on('click',  function(e){
			e.preventDefault();
			e.stopPropagation();
			oHtml.remove();
		});
	};
	$(document).on('keydown.alert',function(event){
		e = event ? event :(window.event ? window.event : null); 
		if(e.keyCode==13){oHtml.remove();$(document).off('keydown.alert');} 
	});
};
fn.popup = function(obj, option){
	option = $.extend({
		_class : 'popup-test',
		oncompleted : null,
		onclose : null
	}, option || {});	
	//obj = $(obj)[0].outerHTML;
	obj = $(obj);
	var exist = obj.length;
	var parent = obj.parent();
	var popup = $('<div class="popup '+option._class+'"><div class="popup-inside"><div class="popup-main"></div><b class="popup-close"><i>╳</i></b></div><div class="popup-mask"></div></div>').appendTo('body');
	obj.appendTo($('.popup-main', popup));	
	var btnClose = $(".popup-close",popup);
	$('html').addClass("popup-active");
	btnClose.on("click",function(){
		if(exist){
			obj.appendTo(parent);
		};
		popup.remove();
		$('html').removeClass("popup-active");
		option.onclose && option.onclose();
	});
	option.oncompleted && setTimeout(function(){option.oncompleted()}, 0) ;
};
fn.gotoTop = function(){
	var top = $('<a class="goto-top"><b></b></a>').appendTo('body > .container');	
	top.on('click',function(){
		$('html,body').animate({scrollTop:0}, 300);
	});
	$(window).scroll(function(){
		if($(this).scrollTop() <=400 ){
			if( !top.hasClass('showed') ) return;
			top.fadeOut().removeClass('showed');
		}else{
			if( top.hasClass('showed') ) return;
			top.fadeIn().addClass('showed');
		};
	});
};
//初始化视频
fn.initVideo = function(){
	var video = $('[data-video]');
	video.addClass('v-player').append('<i>');
	$(document).on('click', '[data-video]', function(){
		fn.popup('<div id="popupVideo" class=""></div>', {_class:'popup-video'});
		var file     = $(this).data('video');
		if(file.indexOf('<iframe') != -1){
			$('#popupVideo').parent().html(file);
		}else{
			var image    = $(this).data('image') || '';
			var v = cyberplayer("popupVideo").setup({
				flashplayer: "js/T5PlayerWebSDK/player/cyberplayer.flash.swf",
				width: '100%',
				height:'100%',
				backcolor: "#fff",
				file:file,		
				image: image,
				autoStart: true,
				volume: 100,
				//ak和sk（sk只需前16位）参数值需要开发者进行申请
				ak: 'kRrXGkXpGibU676fVkp12XkW',
				sk: 'GtlpUOhBOXIZcsfhoBo0U2nSv1xnFBx5'
			});
			$(this).attr('autoplay') && v.play();
			$("#popupVideo .popup-close").on('click', function(){
				v.destroyPlayer();
			});
		};
	});	
};
fn.getRequest = function(name, url) {
	url = url || window.location.search;
	if(name && name!=''){
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = url.substr(1).match(reg);
		if (r != null) return decodeURIComponent(r[2]); return null;
	}//end if
	else return null;
};
//加载图片
fn.readyImage = function(src, progress, callback){
	var img, counter  = 0, srcArr=src, len = src.length;
	if($.type(src) === "string" && src!=''){srcArr=[];srcArr.push(src);len = 0;};
	function check(s){
		counter++;
		var pro = 100/len*counter >100 ? 100 :100/len*counter;
		progress && progress.call(this, pro);
		if(counter >= len){callback.call(counter);};
	};
	for(var i=0; i<srcArr.length; i++){
		img = new Image(); //创建一个Image对象，实现图片的预下载
		(function(k){
			img.src=srcArr[k];
			if (img.complete) {
				check(srcArr[k]);
			} else {
				img.onload = function () {
					check(srcArr[k]);
				};
				img.onerror = function () {
					check(srcArr[k]);
				};
			};
		})(i);
	};//end for
};
//局部展开折叠小件
fn.toggler = function(c){
	c = c || $(document);
	var toggler = $('.toggler', c);
	if(toggler.length > 0){
		toggler.each(function(index, element) {
			var self = $(element);
			var btn  = $('>.toggler-btn', self);
			btn.off().on("click",function(){
				self.toggleClass('open');
			});
		});
	};	
};
// 手机键盘弹出 input BUG
//top值 - 弹出键盘后input跟页面顶部的距离, 默认为0
fn.keyboardCover = function(input, top){
	var u = navigator.userAgent.toLowerCase();
	if(u.indexOf('mobile') == -1) return;
	var _ = $('body');
	var input = $(input);
	var keyboardup = false; 
	input.off('focusin.keyboardCover').on('focusin',function(){
		var y = (top || 0) - $(this).offset().top ;
		_.css({"-webkit-transform": "translate(0, " + y + "px)", "transform": "translate(0, " + y + "px)"});
		setTimeout(function(){keyboardup = true; }, 1000);
	});
	input.off('focusout.keyboardCover').on('focusout',function(){
		_.css({"-webkit-transform": "","transform": ""});
		setTimeout(function(){keyboardup = false; }, 1000);
	});
	//修复安卓下关闭键盘后input不失焦BUG
	if(!fn.browser.ios){
		$(window).on('resize', function(){
			if(keyboardup){
				input.blur();
				keyboardup = false; 
			};
		});
	};
};

//修复父层隐藏导致 一些插件失效
fn.toVisible = function (o, callback){
	var $temp = o ;
	for(var i=0;i<100;i++){
		var $temps;
		if(o.is(":visible")){
			callback && callback();
			if ($temps != undefined && $temps != 'undefined') setTimeout(function(){$temps.removeClass("to-visible");}, 100);
			break;
		}else{
			$temp.addClass("to-visible");
			$temps = $($temps).add($temp);
		};
		$temp = $temp.parent();
	};
};

fn.num2cn = function(n){
	var c = ['零','一','二','三','四','五','六','七','八','九','十'];
	var res ;
	if(n<=10){ //2 6 9
		res = c[n];
	}else{//14 25 36
		var int = parseInt(n/10);
		var rem = n%10;
		res = c[int]+'十'+c[rem];
	};
	return res;
};
fn.tabs = function(option){
	option = $.extend({
		selecter : '.tabs',
		curClass : 'active'
	}, option || {});
	$(option.selecter) && $(option.selecter).each(function(index, element) {
        var hds = $('.tab-hd:first',element).parent().children('.tab-hd');
        var bds = $('.tab-bd:first',element).parent().children('.tab-bd');
		hds.on('click',function(){
			$(this).addClass(option.curClass).siblings('.'+option.curClass).removeClass(option.curClass);
			bds.eq($(this).index()).addClass(option.curClass).siblings('.'+option.curClass).removeClass(option.curClass);
		})
    });
};
fn.screenViewer = function(option){
	option = $.extend({
		scrollbox : $(window),
		selecter : '.section',
		curClass : 'screen-viewer',
		percentage : 0.7//section露出多少触发 height 0~1;
	}, option || {});
	option.scrollbox = $(option.scrollbox);
	var size = {width:option.scrollbox.width(), height:option.scrollbox.height()};
	var group = [];
	var o = $(option.selecter);
	var imgs = $('img', o).map(function() { return this.src;}).get();

	var check = function(){
		var top = option.scrollbox.scrollTop();
		for(var i=0; i<group.length; i++){	
			if(top > group[i].top + group[i].obj.height()*option.percentage -size.height){
				group[i].obj.addClass(option.curClass);
			};
			if(top < group[i].top - size.height+10){
				group[i].obj.removeClass(option.curClass);
			};
		};
	};
	var init = function(){
		option.scrollbox.off('scroll.screenViewer').on('scroll.screenViewer', check);
		o.length > 0 && o.each(function(index, element) {
			var self = $(this);
			group.push({obj:self, top: self.offset().top});
		});
		check();
	};	
	fn.readyImage(imgs, null, init);
	option.scrollbox.on('resize', init);
};
fn.swiper = function(selecter){
	selecter = selecter || '.swiper';
	var swiperArr = $(selecter);
	if(swiperArr.length){
		swiperArr.each(function(index, element) {
			element.id = element.id || 'swiper_'+new Date().getTime();
			var option = eval("("+($(this).data("option"))+")");
			var option = eval("("+($(this).data(fn.browser.mobile && !fn.browser.mobile.ipad ? "option-mobile" : "option"))+")");
			option = option || eval("("+($(this).data("option"))+")");
			var s = {};
			s.prev = $( ' .swiper-prev', element);
			s.next = $( ' .swiper-next', element);
			s.pNumber = $( ' > .swiper-pagination-number', element);
			s.checkIndex = function(swiper){
				if(swiper.activeIndex == 0){
					s.prev.addClass('swiper-prev-disabled');	
					s.next.removeClass('swiper-next-disabled');
				}else if(swiper.activeIndex == swiper.slides.length-1){
					s.prev.removeClass('swiper-prev-disabled');
					s.next.addClass('swiper-next-disabled');
				}else{
					s.prev.removeClass('swiper-prev-disabled');
					s.next.removeClass('swiper-next-disabled');
				};
			};
			s.setNumber = function(swiper){
				var realSlides = $( '.swiper-slide:not(.swiper-slide-duplicate)', swiper.container).length;
				var index = isNaN(swiper.activeLoopIndex) ? swiper.activeIndex : swiper.activeLoopIndex;
				s.pNumber.html('<b>'+(index+1)+'</b>/'+realSlides);
			}
			option = $.extend({
				//autoplay : 2000,
				mode : 'horizontal',
				initialSlide:0,
				autoplayDisableOnInteraction : false,
				speed : 500,
				resizeReInit : true,
				media : 'all',
				orientation:'all',
				lazyloading:false, 
				lazyloadingNumber:1,
				preventLinks : false,
				simulateTouch :false,
				//loop:true,
				followFinger : true,//拖动slide时它不会动，当你释放时slide才会切换。
				touchRatio : 0.5,//触摸距离与slide滑动距离的比率。
				pagination :$('> .swiper-pagination', element).length > 0 ? '#'+element.id+' > .swiper-pagination' : null,
				paginationClickable :true,
				createPagination :true,
				onFirstInit : function(swiper){
					swiper.container.className += ' swiper-inited';
					s.prev.on('click',function(){
						swiper.swipePrev();
					});
					s.next.on('click',function(){
						swiper.swipeNext();
					});
					if(swiper.slides.length <= option.slidesPerView) swiper.container.className += ' swiper-single';
					s.checkIndex(swiper);
					s.setNumber(swiper);
				},
				onInit : function(swiper){
					s.checkIndex(swiper);
					s.setNumber(swiper);
				},
				onSlideChangeEnd: function(swiper){
					if(option.centerLoop){
						if(swiper.activeIndex == 0){
							index = swiper.slides.length - option.slidesPerView*3;
							swiper.swipeTo(index, 0, false);
						};
					};
					s.checkIndex(swiper);
					s.setNumber(swiper);
				}
			}, option || {});
			var media = fn.browser.mobile ? 'mobile' : 'pc';
			if((option.media == media) || (option.media == 'all')){
				if((option.orientation == fn.orientation ) || (option.orientation == 'all')){
					var imgs = $('img', element).not('.swiper-lazy-img');
					if(imgs.length > 0){
						imgs = imgs.map(function() { return this.src || $(this).data('src');}).get();	
						fn.readyImage(imgs, null, function(){
							fn.toVisible($(element), function(){
								swipers[element.id] = new Swiper(element, option);
								/*替换原先 reInit方法*/							
								swipers[element.id].update = function(){
									swipers[element.id].reInit();
									swipers[element.id].appendSlide('<div></div>');
									swipers[element.id].removeLastSlide();
									swipers[element.id].resizeFix();
									swipers[element.id].swipeTo(0, 1, true);
								};
								/**/
							});
						});
					}else{
						fn.toVisible($(element), function(){
							swipers[element.id] = new Swiper(element, option);
							/*替换原先 reInit方法*/							
							swipers[element.id].update = function(){
								swipers[element.id].reInit();
								swipers[element.id].appendSlide('<div></div>');
								swipers[element.id].removeLastSlide();
								swipers[element.id].resizeFix();
								swipers[element.id].swipeTo(0, 1, true);
							};
							/**/
						});
					};
				};
			};
		});
	};
};

fn.scrollbox = function(selecter){
	selecter = selecter || '.scrollbox';
	var scrolls = $(selecter);
	if(scrolls.length > 0){
		scrolls.each(function(index, element) {
			var id = element.id;
			var option =  eval("("+($(this).data("option"))+")");
			var bar = $('<div class="swiper-scrollbar"></div>').appendTo(this);
			option = $.extend({
				mode : 'vertical',
				scrollContainer : true,
				mousewheelControl : true,
				resizeReInit : true,
				slidesPerView : 'auto',
                scrollbar: {
                    container : bar[0],
                    hide : false
                },
				media : 'all',
				orientation:'all'
			}, option || {});
			var media = fn.browser.mobile ? 'mobile' : 'pc';
			if((option.media == media) || (option.media == 'all')){
				if((option.orientation == fn.orientation ) || (option.orientation == 'all')){
					var imgs = $('#'+id+' img').not('.swiper-lazy-img');
					if(imgs.length > 0){
						imgs = imgs.map(function() { return this.src || $(this).data('src');}).get();
						fn.readyImage(imgs, null, function(){
							fn.toVisible($(element), function(){
								swipers[id] = new Swiper(element, option);
								/*替换原先 reInit方法*/							
								swipers[id].update = function(){								
									swipers[id].appendSlide('<p></p>');
									swipers[id].removeLastSlide();
									swipers[id].swipeTo(0, 1, true);
								};
								/**/
							});
						});
					}else{
						fn.toVisible($(element), function(){
							swipers[id] = new Swiper(element, option);
							/*替换原先 reInit方法*/							
							swipers[id].update = function(){								
								swipers[id].appendSlide('<p></p>');
								swipers[id].removeLastSlide();
								swipers[id].swipeTo(0, 1, true);
							};
							/**/
						});
					};
				};
			};
		});
	};
};

fn.fixedbar = function(selecter, stop, placeholder){
	var that = this;
	this.self = $(selecter);	
	this.top = parseInt(this.self.offset().top);
	this.win = $(window);
	stop = stop || 0;
	stop = typeof stop == 'string' && stop.indexOf('%') != -1 ? this.win.height()*parseInt(stop)/100 : stop;
	// console.log(this.win.height())
	this.fixed = false;
	this.placeholder = $('<div id="fixedbarPlaceholder" style="display:none;width:'+this.self.outerWidth()+'px;height:'+this.self.outerHeight()+'px;margin:0;padding:0;"></div>');
	this.self.next('#fixedbarPlaceholder').remove();
	placeholder && this.self.after(this.placeholder);
	this.check = function(top){
		if(!that.fixed && top >= that.top-stop){
			that.self.addClass('fixedbar-fixed').css({top:stop+'px'});
			that.placeholder.show();
			that.fixed = true;
		}else if(that.fixed && top < that.top-stop){
			that.self.removeClass('fixedbar-fixed').removeAttr('style');
			that.placeholder.hide();
			that.fixed = false;
		};
	}
	this.resize = function(){
		that.top = parseInt(that.fixed ? that.placeholder.offset().top-stop : that.self.offset().top-stop);
		that.placeholder[0].style.width = that.self.outerWidth()+'px';
		that.placeholder[0].style.height = that.self.outerHeight()+'px';
	}
	this.win.off('scroll.fixedbar').on('scroll.fixedbar', function(){
		var top = $(this).scrollTop();
		that.check(top);
	});
	this.win.off('resize.fixedbar').on('resize.fixedbar', this.resize);
	that.check(this.win.scrollTop());
};

fn.hashBar = function(uName){
	uName = uName || 'hash';
	var Hash = location.hash || '#'+fn.getRequest(uName);
	var hashBar = $('.hash-bar');
	var hashBarLi = $('li',hashBar);
	var win = $(window);
	var box = $('body,html');
	var htop = $('#header').outerHeight();
	var scrollabled  = true;
	
	if($(Hash).length){
		tohash(Hash);
	};
	function sethashbar(params){
		if(!isNaN(params)){
			hashBarLi.eq(params).addClass('active').siblings('.active').removeClass('active');
		}else{
			$('ul a',hashBar).each(function(index, element){
				var hash = this.hash || '#'+fn.getRequest(uName, this.search);
				if(hash == params){
					$(this).parent().addClass('active').siblings('.active').removeClass('active');
				}
			});
		};
	}
	function tohash(hash){
		sethashbar(hash);
		if(!$(hash).length) return;
		var top = $(hash).offset().top;
		box.animate({scrollTop : top-htop }, 300, function(){
			scrollabled = true;
		});
		scrollabled = false;		
		return false;
	};
	win.off('hashchange.hash').on('hashchange.hash', function(e){
		tohash(location.hash);
		return false;
	});
	if(hashBar.length){
		if(fn.browser.pc || fn.browser.ipad){
			$('#header').css({'position':'absolute'})
			new fn.fixedbar('.hash-bar');
		}
		sethashbar(Hash);
		hashBar.off().on('click', 'li > a', function(){
			tohash(this.hash);
			scrollabled = false;
			sethashbar($(this).parent().index());
			if(this.hash){
				//location.hash = '';
				return false
			};
		});
		var imgs = $('img').map(function() { return this.src;}).get();
		var hashtop = [];
		fn.readyImage(imgs, null, function(){
			$('ul a',hashBar).each(function(index, element){				
				$(this.hash).length? hashtop.push($(this.hash).offset().top):null;
			});
			win.off('scroll.hashBar').on('scroll.hashBar', function(){
				var _top = $(this).scrollTop();
				$.each(hashtop, function(index, top){
					if(_top < top-htop-5){
						scrollabled && sethashbar(index-1<0?0:index-1);
						return false;
					}else if(index==hashtop.length-1 && _top >= top-htop-5){
						scrollabled && sethashbar(index);
						return false;
					}
				})
			})
		})
	}
}








