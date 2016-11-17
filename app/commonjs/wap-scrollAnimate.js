;(function(global){
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
            duration: typeof item.duration==='number' ? item.duration : 600,
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

    global.scrollAnimate = function(el, items){
        if(useIScroll){
            $(el).css({
                position: 'absolute',
                overflow: 'hidden',
                top:0,
                bottom:0
            })
            document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
            myScroll = new IScroll(el, {probeType: 3, click:false, bounce:false, deceleration:0.003});
            myScroll.on('scroll', function(){
                var st = -parseInt(this.y / 10) * 10;
                if(st<slTop) return;
                slTop = st;
                scrollItems(items, slTop);

            })
        } else {
            var $win = $(window)
            slTop = $win.on('scroll', function(){
                var st = parseInt($win.scrollTop() / 10) * 10;
                if(st<slTop) return;
                slTop = st;
                scrollItems(items, slTop);
            }).scrollTop();
        }
        scrollItems(items, slTop);
    }
})(window)