;(function(global){
    function isIphone(){
        var ua = navigator.userAgent.toLowerCase();
        if(/iphone/.test(ua)){
            return true;
        } else {
            return false;
        }
    }
    var useIScroll = isIphone(),slTop=0,myScroll;
    global.fixScroll = function(el, cb){
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
                cb(slTop);
            })
        } else {
            var $win = $(window)
            slTop = $win.on('scroll', function(){
                var st = parseInt($win.scrollTop() / 10) * 10;
                if(st<slTop) return;
                slTop = st;
                cb(slTop);
            }).scrollTop();
        }
        cb(slTop);
    }
})(window)