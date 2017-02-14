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

;(function(global, $, IScroll){
    if(typeof $==='undefined') return alert('ScrollAnimate依赖jquery'),null;
    if(typeof IScroll==='undefined') return alert('ScrollAnimate依赖IScroll'),null;
    if(typeof $.Velocity==='undefined') return alert('ScrollAnimate依赖Velocity'),null;
    var useIScroll = isIphone(),slTop=0,myScroll,wrapHeight = $(window).height();
    function isIphone(){
        var ua = navigator.userAgent.toLowerCase();
        if(/iphone/.test(ua)){
            return true;
        } else {
            return false;
        }
    }
    function compute(item, slTop){
        if(!item.isShow && item.top-slTop<wrapHeight){
            return true;
        } else {
            return false;
        }
    }
    function animate(item){
        item.isShow = true;
        item.$dom.velocity({
            translateX: 0,
            translateY: 0,
            opacity: 1
        }, {
            duration: typeof item.duration==='number' ? item.duration : 1000,
            delay: typeof item.delay==='number' ? item.delay : 0,
            complete: function(){}
        })
    }

    function scrollItems(items, top){
        items.forEach(function(item){
            if(compute(item, top)){
                animate(item);
            }
        })
    }

    function initItems(items){
        items.forEach(function(item){
            item.$dom = $(item.dom);
            if( !item.$dom.length ){
                console.error(item.dom + " not found!");
                return false;
            }
            item.top = item.$dom.offset().top;
            item.isShow = false;
            $.Velocity.hook(item.$dom, 'opacity', 0);
            $.Velocity.hook(item.$dom, 'translateX', item.x+'px');
            $.Velocity.hook(item.$dom, 'translateY', item.y+'px');
        })
    }

    var psb = new PubSub();

    global.scrollAnimate = function(el, items){
        initItems(items);
        if(useIScroll){
            $(el).css({
                position: 'absolute',
                overflow: 'hidden',
                top:0,
                bottom:0
            });
            document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
            myScroll = new IScroll(el, {probeType: 3, click:false, bounce:false, deceleration:0.003});
            myScroll.on('scroll', function(){
                psb.trigger('scroll', -this.y);
                var st = -parseInt(this.y / 10) * 10;
                if(st<slTop) return;
                slTop = st;
                scrollItems(items, slTop);
            })
        } else {
            var $win = $(window);
            slTop = $win.on('scroll', function(){
                var st = $win.scrollTop();
                psb.trigger('scroll', st);
                st = parseInt(st / 10) * 10;
                if(st<slTop) return;
                slTop = st;
                scrollItems(items, slTop);
            }).scrollTop();
        }
        scrollItems(items, slTop);
    };
    global.scrollAnimate.on = function(){
        psb.on.apply(psb, arguments);
    }
})(window, $, IScroll, PubSub);