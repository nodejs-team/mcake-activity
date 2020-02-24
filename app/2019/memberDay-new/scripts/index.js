;(function () {
  function fixImageSrc(res) {
    var imgs = document.getElementsByTagName('img');
    for (var i = 0, len = imgs.length; i < len; i++) {
      var img = imgs[i];
      var dataSrc = img.getAttribute('src-fix');
      var data = res[dataSrc];
      if (dataSrc && data) {
        img.setAttribute('src', data.url);
      }
    }
  }

  function px2rem(d) {
    var val = parseFloat(d) * 10 / 750;
    if (typeof d === 'string' && d.match(/px$/)) {
      val += 'rem';
    }
    return val;
  }

  function rem2px(d) {
    var val = parseFloat(d) * 750 / 10;
    if (typeof d === 'string' && d.match(/rem$/)) {
      val += 'px';
    }
    return val;
  }

  function formatResData(objConfig) {
    if (!( typeof objConfig === 'object')) return [];
    if (objConfig instanceof Array) return objConfig;
    var frames = [];
    for (var i in objConfig) {
      objConfig[i].key = i;
      frames.push(objConfig[i]);
    }
    return frames.sort(function (a, b) {
      return parseInt(a.key.replace(/^[^\d]+/, "")) - parseInt(b.key.replace(/^[^\d]+/, ""));
    });
  }

  function setNumber(hours, minites, seconds) {
    hours = hours.toString();
    minites = minites.toString();
    seconds = seconds.toString();
    return '<span class="flip hour">' +
      '            <span><img src="images/' + hours.charAt(0) + '.png"/></span>' +
      '            <span><img src="images/' + hours.charAt(1) + '.png"/></span>' +
      '          </span>' +
      '          <span class="flip minite">' +
      '            <span><img src="images/' + minites.charAt(0) + '.png"/></span>' +
      '            <span><img src="images/' + minites.charAt(1) + '.png"/></span>' +
      '          </span>' +
      '          <span class="flip second">' +
      '            <span><img src="images/' + seconds.charAt(0) + '.png"/></span>' +
      '            <span><img src="images/' + seconds.charAt(1) + '.png"/></span>' +
      '          </span>';
  }


    function padZero(n) {
    return n < 10 ? "0" + n : n
  }

  function countDown(date, onChange, onEnd) {
    var targetTimes = new Date(date).getTime();
    var timer = null;

    function calculate() {
      var times = parseInt((targetTimes - new Date().getTime()) / 1000);
      if (times < 0) return stop();
      var hours = Math.floor(times / (60 * 60 ));
      var minites = Math.floor(times / 60 % 60);
      var seconds = times % 60;
      typeof onChange === 'function' && onChange(padZero(hours), padZero(minites), padZero(seconds));

    }

    function start() {
      calculate();
      timer = setInterval(calculate, 1000);
    }

    function stop() {
      clearInterval(timer);
      typeof onEnd === 'function' && onEnd();
    }

    return {
      start: start,
      stop: stop
    }

  }

  var initScroll = function (){
    window.scrollAnimate('#evt_container', [
      {dom: '.cake',x:300, y:-180,duration:600,delay:0},
      {dom: '.cake-tips',opacity:0,duration:600,delay:600},
      {dom: '.banner-text',x:0,y:100,opacity:0,duration:600,delay:1200},
      {dom: '.cake-sm',x:100,y:100,opacity:0,duration:600,delay:1800},
      {dom: '.cake-spoon',x:100,y:100,opacity:0,duration:600,delay:2200},
      {dom: '.counter-down',x:200,y:0,opacity:0,duration:600,delay:0},
      {dom: '.main-cake',opacity:0,duration:600,delay:400},
      {dom: '.text2',opacity:0,duration:600,delay:400},
      {dom: '.main-text',opacity:0,duration:600,delay:1000}
    ])
  };

  var loader;

  function startLoading() {
    loader = new Loader('images/');
    var domLoad = document.getElementById('evt_loading');
    domLoad.style.display = 'block';
    loader.addGroup('preload', resData);
    loader.on('progress', function (groupName, ix, len) {
      domLoad.innerHTML = parseInt(ix / len * 100) + '%';
    });
    loader.on('complete', function (groupName) {
      fixImageSrc(loader.getAll());
      domLoad.style.display = 'none';
      document.getElementById('evt_content').style.display = 'block';
      loadComplete();
    });
    loader.loadGroup('preload');
  }

  startLoading();


  var loadComplete = function () {
    var fliper = document.getElementById("count_fliper");
    countDown(__END_DATE__, function (hours, minites, seconds) {
      fliper.innerHTML = setNumber(hours, minites, seconds);
    }).start();


    initScroll();
  }

})();