HTMLCollection.prototype.forEach = function(callback) {
  [].slice.call(this).forEach(callback);
};
HTMLCollection.prototype.map = function(callback) {
  var res = [];
  [].slice.call(this).forEach(function(v, i) {
    res.push(callback.call(this, v, i));
  });
  return res;
};
HTMLCollection.prototype.filter = function(callback) {
  var res = [];
  [].slice.call(this).forEach(function(v, i) {
    callback.call(this, v, i) && res.push(this);
  });
  return res;
};
NodeList.prototype.filter = function(callback) {
  var res = [];
  [].slice.call(this).forEach(function(v, i) {
    callback.call(this, v, i) && res.push(v);
  });
  return res;
};
Array.prototype.filter = function(callback) {
  var res = [];
  [].slice.call(this).forEach(function(v, i) {
    callback.call(this, v, i) && res.push(v);
  });
  return res;
};
Array.prototype.find = function(callback) {
  var res = null;
  [].slice.call(this).forEach(function(v, i) {
    callback.call(this, v, i) && (res = v);
  });
  return res;
};
String.prototype.trim = function() {
  return this.replace(/(^\s*)|(\s*$)/g, "");
};
function readXml(fileName, callback) {
  try {
    //Internet Explorer
    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
    xmlDoc.async = "false";
    //加载 XML文档,获取XML文档对象
    xmlDoc.load(fileName);
  } catch (e) {
    //Firefox, Mozilla, Opera, etc.
    try {
      xmlDoc = document.implementation.createDocument("", "", null);
      xmlDoc.async = "false";
      //加载 XML文档,获取XML文档对象
      xmlDoc.load(fileName);
    } catch (e) {
      try {
        //Google Chrome
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("get", fileName, true);
        xmlhttp.send(null);
        xmlhttp.onload = function() {
          getData(xmlhttp.responseXML.documentElement);
        };
      } catch (e) {
        console.log(e);
        alert("您的浏览器不能正常加载文件。请切换到兼容模式，或者更换浏览器");
      }
    }
  }
  function getData(xml) {
    var worksheet = xml.querySelectorAll("Worksheet");
    var data = [];
    worksheet.forEach((sheet, index) => {
      var row = sheet.querySelectorAll("Row");
      if (row[0]) {
        data[index] = {};
        data[index].name = sheet.attributes[0].value;
        data[index].key = row[0].children.map(v => v.textContent);
        var row = row.filter((v, i) => {
          return (
            i > 0 && v.children[0] && v.children[0].textContent.trim() != ""
          );
        });
        data[index].list = [];
        row.forEach((r, i) => {
          var item = {
            category: sheet.attributes[0].value
          };
          data[index].key.forEach((k, n) => {
            try {
              item[k] = r.children[n].textContent;
            } catch (e) {
              item[k] = "";
            }
          });
          data[index].list.push(item);
        });
      }
    });
    callback && callback(data);
  }
}
