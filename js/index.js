// screenfull && screenfull.request();
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

window.onload = function() {
  try {
    readXml("服务人员.xml", function(data) {
      console.log(data);
      setPeople(data);
    });
    readXml("理财信息.xml", function(data) {
      setFinancia(data);
    });
  } catch (e) {}

  var body = document.querySelector("body");
  var nav = document.querySelector("#Map1").querySelectorAll("area");
  var navfixed = document.querySelectorAll(".nav-fixed a");
  var aside = document.querySelectorAll("aside");
  var close = document.querySelectorAll(".close-x");
  var paging = document.querySelectorAll(".paging");
  var popup = document.querySelector("#popup");
  var popupClose = popup.firstElementChild.firstElementChild;
  var popupContent = popup.firstElementChild.lastElementChild;

  var scroll = document.querySelectorAll(".scroll");
  var scrollbox = document.querySelectorAll(".scrollbox");
  var scrollboxHeight = scrollbox[0].clientHeight;
  var pageCurrent = 1;
  var scrollCurrent = 0;
  var scrollPx = 150;
  var timer = null;
  var asideIndex = -1;
  var backHomeTime = 60; // 没有操作？秒后回首页
  var backHomeTimer = null;

  function backHome() {
    // fullScreen();
    clearTimeout(backHomeTimer);
    backHomeTimer = setTimeout(function() {
      // console.log("backhome");
      hideAside(asideIndex);
    }, backHomeTime * 1000);
  }
  body.onclick = backHome;
  body.ontouchstart = backHome;
  
  setExchangeRate();

  function setPeople(data) {
    var el = document.querySelector("#peopleList");
    var html = "";
    var col = 5;
    function createPlaceholderi(item) {
      if (item.list.length % col > 0) {
        var lis = col - (item.list.length % col);
        var html = "";
        for (var i = 0; i < lis; i++) {
          html += "<li></li>\n";
        }
        return html;
      } else {
        return "";
      }
    }
    data.forEach((item, index) => {
      html += "<dl><dt>" + item.name + "</dt><dd><ul>";
      item.list = item.list.filter(v => v["照片"].trim() == "有");
      var li = createPlaceholderi(item);
      item.list.forEach((people, i) => {
        html +=
          "<li data-people='" +
          JSON.stringify(people) +
          "'>\
                        <img src='" +
          (people["照片"].trim() == "有"
            ? "image/4/" + people.category + "/" + people["姓名"]
            : "image/noimg") +
          ".jpg'>" +
          people["服务承诺"] +
          "<div>" +
          people["姓名"] +
          "</div>\
                      </li>\n";
      });
      html += li;
      html += "</ul></dd></dl>";
    });
    el.innerHTML = html;
    bindPeople(data);
  }

  function setFinancia(data) {
    var el = document.querySelector("#financiaList");
    var html = "";
    data.forEach((item, index) => {
      html += "<tr>";
      item.key.forEach((key, k) => {
        html += "<th>" + key + "</th>";
      });
      html += "</tr>";
      item.list.forEach((product, p) => {
        html += "<tr>";

        item.key.forEach((key, k) => {
          html += "<td>" + product[key] + "</td>";
        });
        html += "</tr>";
      });
    });
    el.innerHTML = html;
  }

  function createPeoplePopHtml(pe) {
    var html =
      "<div class='people'>\
        <img src='" +
      (pe["照片"].trim() == "有"
        ? "image/4/" + pe.category + "/" + pe["姓名"]
        : "image/noimg") +
      ".jpg'>\
        <div>";
    pe["姓名"] && (html += "<h2><b>姓名：</b>" + pe["姓名"] + "</h2>");
    pe["工号"] && (html += "<h2><b>工号：</b>" + pe["工号"] + "</h2>");
    pe["岗位"] && (html += "<h2><b>岗位：</b>" + pe["岗位"] + "</h2>");
    pe["服务承诺"] &&
      (html += "<h2><b>服务承诺：</b>" + pe["服务承诺"] + "</h2>");
    pe["销售资质"] &&
      (html += "<h2><b>销售资质：</b>" + pe["销售资质"] + "</h2>");
    html += "</div>\
      </div>";
    try {
      var n = parseInt(pe["资质材料"].trim());
      if (n > 0) {
        html += '<div class="img-book">';
        for (var i = 1; i <= n; i++) {
          html +=
            "<img src='image/4/" +
            pe.category +
            "/" +
            pe["姓名"] +
            "/" +
            (i < 10 ? "0" + i : i) +
            ".jpg'>\n";
        }
        html += "</div>";
      }
    } catch (e) {}
    return html;
  }

  function bindPeople(data) {
    var popimg = document.querySelectorAll("[data-img]");
    var peopleArea = document.querySelector("#map2").querySelectorAll("area");
    var people = document.querySelectorAll("[data-people]");
    var peopleAll = [];
    data.forEach(v => {
      peopleAll = peopleAll.concat(v.list);
    });

    for (var i = 0; i < popimg.length; i++) {
      (function(pimg) {
        pimg.onclick = function() {
          showPopup("<img src=" + pimg.dataset.img + ">");
        };
      })(popimg[i]);
    }
    for (var i = 0; i < people.length; i++) {
      (function(p) {
        p.onclick = function() {
          var pe = JSON.parse(p.dataset.people);
          showPopup(createPeoplePopHtml(pe));
        };
      })(people[i]);
    }

    for (var i = 0; i < peopleArea.length; i++) {
      (function(p) {
        p.onclick = function() {
          var name = p.dataset.name;
          if (!name) return;
          var pe = peopleAll.find(v => v["姓名"] == name);
          showPopup(createPeoplePopHtml(pe));
        };
      })(peopleArea[i]);
    }
  }

  function resetScroll(index) {
    var scrollHeight = scrollbox[index].scrollHeight - scrollboxHeight;
    console.log(scrollbox[index].scrollHeight +"--"+  scrollboxHeight);
    // console.log(scrollboxHeight);
    scrollCurrent = 0;
    scrollbox[index].scrollTo(0, 0);
    scroll[index].firstElementChild.classList.add("disabled");
    scroll[index].lastElementChild.classList.remove("disabled");
    if (scrollHeight <= 5) {
      scroll[index].classList.add("none");
    } else {
      scroll[index].classList.remove("none");
    }
  }

  function showAside(index) {
    hideAside(asideIndex);
    asideIndex = index;
    aside[index].className =
      aside[index].className.indexOf("page") != -1
        ? "page page-1 show"
        : "show";
    navfixed[index].classList.add("active");
    pageCurrent = 1;
    paging[index].firstElementChild.classList.add("disabled");
    paging[index].lastElementChild.classList.remove("disabled");
    resetScroll(index);
    body.classList.add("show");
  }
  function hideAside(index) {
    if (index < 0) return;
    aside[index].classList.remove("show");
    navfixed[index].classList.remove("active");
    hidePopup();
    body.classList.remove("show");
  }
  function pagingTo(prev, next, pageNum, index) {
    aside[index].className = "page show page-" + pageCurrent;
    resetScroll(index);
    if (pageCurrent == 1) {
      prev.classList.add("disabled");
      next.classList.remove("disabled");
    } else if (pageCurrent > 1 && pageCurrent < pageNum) {
      prev.classList.remove("disabled");
      next.classList.remove("disabled");
    } else if (pageCurrent == pageNum) {
      prev.classList.remove("disabled");
      next.classList.add("disabled");
    }
  }
  function swipe(index, dir) {
    scrollbox[index].scrollTo(0, scrollPx * scrollCurrent);
  }
  function showPopup(html) {
    popupContent.innerHTML = html;
    popup.classList.add("show");
  }
  function hidePopup() {
    popup.classList.remove("show");
    popupContent.innerHTML = "";
  }
  for (var i = 0; i < nav.length; i++) {
    (function(k) {
      nav[k].onclick = function() {
        showAside(k);
      };
      navfixed[k].onclick = function() {
        showAside(k);
      };
      close[k].onclick = function() {
        hideAside(k);
      };

      var prev = paging[k].firstElementChild;
      var next = paging[k].lastElementChild;
      var pageNum =
        paging[k].parentElement.nextElementSibling.firstElementChild
          .childElementCount;
      prev.onclick = function() {
        pageCurrent--;
        pagingTo(prev, next, pageNum, k);
      };
      next.onclick = function() {
        pageCurrent++;
        pagingTo(prev, next, pageNum, k);
      };

      var swipup = scroll[k].firstElementChild;
      var swipdown = scroll[k].lastElementChild;

      var start = function(d) {
        var scrollHeight = scrollbox[k].scrollHeight - scrollboxHeight;
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
      var end = function() {
        clearTimeout(timer);
      };
      swipup.onclick = function() {
        swipe(k, -1);
      };
      swipdown.onclick = function() {
        swipe(k, 1);
      };

      swipup.onmousedown = function() {
        start(-1);
      };
      swipup.onmouseup = end;
      swipdown.onmousedown = function() {
        start(1);
      };
      swipdown.onmouseup = end;

      swipup.ontouchstart = function() {
        start(-1);
      };
      swipup.ontouchend = end;
      swipdown.ontouchstart = function() {
        start(1);
      };
      swipdown.ontouchend = end;
    })(i);
  }

  popupClose.onclick = function() {
    hidePopup();
  };

  function setExchangeRate(){
    // return false;
    $.ajax({
      type: "GET",
      url: "http://ewealth.abchina.com/app/data/api/DataService/RealTimeExchangeRateV2",
      data: {},
      dataType: "json",
      success: function (response) {
        if(response.ErrorCode == '0'){
          var html = ''
          var list = response.Data.CacheTable
          for(var i=0; i<list.length; i++){
            var CurrencyPair = list[i].CurrencyPair
            var BuyPrice = list[i].BuyPrice
            var SalePrice = list[i].SalePrice
            var LowestBuyIn = list[i].LowestBuyIn
            var HighestSellOut = list[i].HighestSellOut
            html+='<li><span>'+CurrencyPair+'</span><span>'+BuyPrice+'</span><span>'+SalePrice+'</span><span>'+LowestBuyIn+'</span><span>'+HighestSellOut+'</span></li>'
          }
          $('#exchange ul').html(html)
          setScroll($('#exchange dd'))
        }
      }
    });

    // $.ajax({
    //   type: "GET",
    //   url: "http://jingzhi.funds.hexun.com/jz/JsonData/KaifangChaoEPM.aspx?pagesize=200&curpage=1",
    //   data: {},
    //   dataType: "jsonp",
    //   success: function (response) {
    //     try{
    //       var html = ''
    //       var list = response.list
    //       for(var i=0; i<list.length; i++){
    //         var fundCode = list[i].fundCode;
    //         var fundName = list[i].fundName;
    //         var base = list[i].base;
    //         var netValue = list[i].netValue + ' | ' + list[i].netDate;
    //         var quarter = list[i].quarter;
    //         var half = list[i].half;
    //         var thisyear = list[i].thisyear;
    //         var setup = list[i].setup;
    //         var ratefee = list[i].ratefee;
    //         html+='<li><span>'+fundCode+'</span><span>'+fundName+'</span><span>'+base+'</span>\
    //         <span>'+netValue+'</span><span>'+quarter+'</span><span>'+half+'</span>\
    //         <span>'+thisyear+'</span><span>'+setup+'</span><span>'+ratefee+'</span></li>'
    //       }
    //       $('#fund ul').html(html);
    //       setScroll($('#fund dd'))
    //     }catch(e){}
    //   }
    // });

    $.ajax({
      type: "GET",
      // url: "https://web.juhe.cn:8080/fund/zcgjj/",
      url: "http://ewealth.abchina.com/app/data/api/DataService/FundFilterV2_New?i=1&s=50&o=2&W=0%7C-1%7C-1%7C1%7C0%7C1%7C1%7C0%7C-1%7C9_DESC",
      // data: {key:"c6125f02acdd94ead25ce2449a1ca3fc"},
      data: {},
      dataType: "json",
      success: function (response) {
        console.log(response.Data.Table);
        try{
          var html = ''
          var list = response.Data.Table
          for(var i=0; i<list.length; i++){
            var FundCode     = list[i].FundCode;
            var ShortName    = list[i].ShortName;
            var NetValue     = list[i].NetValue;
            var AccumulatedNetValue = list[i].AccumulatedNetValue;
            var DayChanged   = parseFloat(list[i].DayChanged).toFixed(2) + "%";
            var LastMonth    = (parseFloat(list[i].LastMonth) * 100).toFixed(2) + "%";
            var LastQuarter  = (parseFloat(list[i].LastMonth) * 100).toFixed(2) + "%";
            html+='<li><span>'+FundCode+'</span><span>'+ShortName+'</span><span>'+NetValue+'</span>\
            <span>'+AccumulatedNetValue+'</span><span>'+DayChanged+'</span><span>'+LastMonth+'</span>\
            <span>'+LastQuarter+'</span></li>'
          }
          $('#fund ul').html(html);
          setScroll($('#fund dd'))
        }catch(e){
          console.log(e)
        }
      }
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

};
