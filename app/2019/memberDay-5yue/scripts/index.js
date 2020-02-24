;(function(){
    function fixImageSrc(res){
        var imgs = document.getElementsByTagName('img');
        for(var i=0,len=imgs.length; i<len; i++){
            var img = imgs[i];
            var dataSrc = img.getAttribute('src-fix');
            var data = res[dataSrc];
            if(dataSrc && data){
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
        if( !( typeof objConfig === 'object') ) return [];
        if( objConfig instanceof Array) return objConfig;
        var frames = [];
        for( var i in objConfig ){
          objConfig[i].key = i;
          frames.push(objConfig[i]);
        }
        return frames.sort(function (a, b) {
          return parseInt(a.key.replace(/^[^\d]+/, "")) - parseInt(b.key.replace(/^[^\d]+/, ""));
        });
    }

    var loader;


    var loadComplete = function () {
       


        /*initScroll();  新版wap端跳转新页面再返回来之后，页面无法滑动了*/
    };
    function startLoading(){
        loader = new Loader('images/');
        var domLoad = document.getElementById('evt_loading');
        domLoad.style.display = 'block';
        loader.addGroup('preload', resData);
        loader.on('progress', function(groupName, ix, len){
            domLoad.innerHTML = parseInt(ix/len*100) + '%';
        });
        loader.on('complete', function(groupName){
            fixImageSrc(loader.getAll());
            domLoad.style.display = 'none';
            document.getElementById('evt_content').style.display = 'block';
             loadComplete();
        });
        loader.loadGroup('preload');
    }
    startLoading();





    var initScroll = function (){
        window.scrollAnimate('#evt_container', [
            ,{dom: '.banner-t',x:0, y:100,duration:500,delay:200}
        ])
    };


})();


/*移动端通用
 *判断手机横竖屏状态
 * 翻转屏幕自动刷新页面
 */
function hengshuping() {
    if (window.orientation == 180 || window.orientation == 0) {
        window.location.reload();/*竖屏状态*/
    }
    if (window.orientation == 90 || window.orientation == -90) {
        window.location.reload(); /*横屏状态*/
    }
}
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);

/*活动倒计时
* 活动时间五月份每周二10点到晚上10点
* */
$(function(){
    var curdata=moment().get('date');
    var curHour=moment().get('hours');
    var __END_DATE__='';

    switch (curdata){
        case 7:
            $(".numb img").attr("src","https://act.mcake.com/fangli/2019/wap/memberDay-5yue/images/numb-1.png");
            $(".calendar img").attr("src","https://act.mcake.com/fangli/2019/wap/memberDay-5yue/images/calendar-1.png");
            __END_DATE__='1557237600000';
            break;
        case 14:
            $(".numb img").attr("src","https://act.mcake.com/fangli/2019/wap/memberDay-5yue/images/numb-2.png");
            $(".calendar img").attr("src","https://act.mcake.com/fangli/2019/wap/memberDay-5yue/images/calendar-2.png");
            __END_DATE__='1557842400000';
            break;
        case 21:
            $(".numb img").attr("src","https://act.mcake.com/fangli/2019/wap/memberDay-5yue/images/numb-3.png");
            $(".calendar img").attr("src","https://act.mcake.com/fangli/2019/wap/memberDay-5yue/images/calendar-3.png");
            __END_DATE__='1558447200000';
            break;
        case 28:
            $(".numb img").attr("src","https://act.mcake.com/fangli/2019/wap/memberDay-5yue/images/numb-4.png");
            $(".calendar img").attr("src","https://act.mcake.com/fangli/2019/wap/memberDay-5yue/images/calendar-4.png");
            __END_DATE__='1559052000000';
            break;
        default:
            $(".numb img").attr("src","https://act.mcake.com/fangli/2019/wap/memberDay-5yue/images/numb-1.png");
            $(".calendar img").attr("src","https://act.mcake.com/fangli/2019/wap/memberDay-5yue/images/calendar-1.png");
    }


    /*$('.timer').countdown(__END_DATE__, function(event) {
     /!*$(this).html(event.strftime('%D天 %H:%M:%S'));*!/
     $(this).html(event.strftime('%H:%M:%S'));
     });*/

    var str='';
    $('#timer').countdown(__END_DATE__, function(event) {
        /*$(this).html(event.strftime('%D天 %H:%M:%S'));*/
        $(this).html(event.strftime('%H:%M:%S'));
        str=$(this).html().split(":");

        if(str[0]>=12){  /*判断是否到活动开始时间上午10点*/
            $('.timer').html(event.strftime('00:00:00'));
        }else{
            $('.timer').html(event.strftime('%H:%M:%S'));
        }

    });
})


