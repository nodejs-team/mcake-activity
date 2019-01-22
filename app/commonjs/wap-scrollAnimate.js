/**
 scrollAnimate(container, scrollDomList)
 */

/**
 * Example
 window.scrollAnimate('#evt_container', [
 {dom: '.img1', x:-200, y:0}
 ,{dom: '.text1', x:200, y:-200}
 ,{dom: '.area1', x:200, y:200}
 ,{dom: '.img2', x:200, y:0}
 ,{dom: '.text2', x:-200, y:200}
 ,{dom: '.img3', x:-200, y:0}
 ,{dom: '.text3', x:200, y:200}
 ])
 */

;(function (global, $, IScroll) {
  if (typeof $ === 'undefined') return alert('ScrollAnimate依赖jquery'), null;
  if (typeof IScroll === 'undefined') return alert('ScrollAnimate依赖IScroll'), null;
  if (typeof $.Velocity === 'undefined') return alert('ScrollAnimate依赖Velocity'), null;
  var $win = $(window),
    slTop = 0,
    myScroll,
    wrapHeight = $win.height();

  if (!$.fn.scrollTop) {
    $.fn.scrollTop = function () {
      var scrollTop = 0;
      this.each(function (i, el) {
        if (el !== null && typeof el === 'object' && !!el.setInterval) {
          scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        } else {
          scrollTop = el.scrollTop;
        }
      });

      return scrollTop;
    };
  }

  function isIphone() {
    var ua = navigator.userAgent.toLowerCase();
    if (/iphone/.test(ua)) {
      return true;
    } else {
      return false;
    }
  }

  function compute(item, slTop) {
    if (!item.isShow && item.top - slTop < wrapHeight) {
      return true;
    } else {
      return false;
    }
  }

  function animate(item) {
    item.isShow = true;
    var params = {
      /*结束位置*/
      opacity: 1
    };

    if (item.x !== undefined) {
      params.translateX = 0;
    }

    if (item.y !== undefined) {
      params.translateY = 0;
    }

    item.$dom.velocity(params, {
      duration: typeof item.duration === 'number' ? item.duration : 1000,
      delay: typeof item.delay === 'number' ? item.delay : 0,
      easing: item.ease || 'easeOutCubic',
      complete: function () {
        item.$dom.trigger("animate-done");
      }
    })

  }

  function scrollItems(items, top) {
    items.forEach(function (item) {
      if (compute(item, top)) {
        animate(item);
      }
    })
  }

  function initItems(items) {
    items.forEach(function (item) {
      item.$dom = $(item.dom);
      if (!item.$dom.length) {
        console.error(item.dom + " not found!");
        return false;
      }
      item.top = item.$dom.offset().top;
      item.isShow = false;
      $.Velocity.hook(item.$dom, 'opacity', item.opacity === undefined ? 0 : item.opacity);
      if (item.x !== undefined) {
        $.Velocity.hook(item.$dom, 'translateX', item.x + 'px');
        /*开始位置*/
      }
      if (item.y !== undefined) {
        $.Velocity.hook(item.$dom, 'translateY', item.y + 'px');
      }
    })
  }

  var psb = new PubSub();

  global.scrollAnimate = function (el, items) {
    initItems(items);

    var preventDefaultHandler = function (e) {
      e.preventDefault();
    };

    var winScrollHandler = function () {
      var st = $win.scrollTop();
      psb.trigger('scroll', st);
      st = parseInt(st / 10) * 10;
      if (st < slTop) return;
      slTop = st;
      scrollItems(items, slTop);
    };

    if (isIphone() && global.scrollAnimate.useIScroll) {
      $(el).css({
        position: 'absolute',
        overflow: 'hidden',
        top: 0,
        bottom: 0
      });
      $(el).addClass("isIphone");

      /*document.addEventListener('touchmove', preventDefaultHandler, false);*/
      myScroll = new IScroll(el, {probeType: 3, click: false, bounce: false, deceleration: 0.003});
      myScroll.on('scroll', function () {
        psb.trigger('scroll', -this.y);
        var st = -parseInt(this.y / 10) * 10;
        if (st < slTop) return;
        slTop = st;
        scrollItems(items, slTop);
      })
    } else {
      slTop = $win.on('scroll', winScrollHandler).scrollTop();
    }

      /*slTop = $win.on('scroll', winScrollHandler).scrollTop();*/
    scrollItems(items, slTop);

    return {
      destroy: function(){
        if (myScroll) {
          myScroll.destroy();
          //document.removeEventListener('touchmove', preventDefaultHandler, false);
        } else {
          $win.off('scroll', winScrollHandler);
        }
      }
    }
  };
  global.scrollAnimate.useIScroll = true;
  global.scrollAnimate.on = function () {
    psb.on.apply(psb, arguments);
  };
})(window, $, IScroll, PubSub);