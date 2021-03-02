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

    function startLoading(){
        loader = new Loader('images/');
        var domLoad = document.getElementById('evt-loading');
        var progress = document.getElementById('progress');
        domLoad.style.display = 'block';
        loader.addGroup('preload', resData);
        loader.on('progress', function(groupName, ix, len){
            progress.innerHTML = parseInt(ix/len*100) + '%';
            $(".loading_progress span").width(parseInt(ix/len*100) + '%')
        });
        loader.on('complete', function(groupName){
            fixImageSrc(loader.getAll());
            domLoad.style.display = 'none';
            document.getElementById('leading').style.display = 'block';
            $(".leading-title").delay(300).fadeIn(1000);
            //document.getElementById('evt_content').style.display = 'block';
             loadComplete();
        });
        loader.loadGroup('preload');
    }
    startLoading();

    var loadComplete = function () {
        /*解决：当前页面点击“立即订购”后跳转到新页面后，再返回当前页，会出现页面里的弹窗定位不准确的问题。*/
        /*$("html,body").animate({scrollTop:0},100); 已经放在vue框架的watch里面*/

        zhongQiu.init();




        var audioPlay = function () {
            var audio = document.getElementById('audio');


            var on = true;

            if(audio.paused){
                on=false;
                $(".music-btn").removeClass("rotate");
            }else{
                on=true;
                $(".music-btn").addClass("rotate");
            }

            audio.play();

            $(".music-btn").addClass("rotate");

            $(".music-btn").click(function () {
                if(on){
                    on=false;
                    audio.pause();
                    $(this).removeClass("rotate");
                }else {
                    on=true;
                    audio.play();
                    $(this).addClass("rotate");
                }
            });

            var swiper1 = new Swiper('.swiper1', {
                freeMode : true,
                observer:true,
                observeParents:true,
                speed:1000,
                loop: false,
                initialSlide :0,
                on: {
                    init: function(swiper){

                    },
                    slideChange: function(){
                        $(".hd-tips").addClass("fadeTg");
                    }
                }
                /*pagination: {
                 el: '.swiper-pagination1',
                 clickable: true
                 },*/

            });

        }
        /*微信加载完成自动播放*/
        document.addEventListener('WeixinJSBridgeReady', function() {
            audioPlay();
        }, false);

        audioPlay();

    };

    var $tip = $('.tip-cover .tip'),
        $tipBox = $('.tip-cover'),
        $cityTab = $('.city-tab'),
        $cityLi = $('.city-tab li'),
        $point = $('.point'),
        $noPoint = $('.noPoint'),
        $ctTipp = $('.ctTipp');
        $cityTip = $('.cityTip');

    var zhongQiu={
        tipNum:0,
        num:0,
        billNo:0,
        Loading:function () {

            this.stepClick();
            this.cityTab();
            /*$(".leading").click(function () {
                $(this).fadeOut(500);
                $("#evt_content").fadeIn(400);
                //document.getElementById('evt_content').style.display = 'block';
                $(".tip").fadeOut(0);
                $(".tip").eq(0).fadeIn(0);
                self.stepClick();
                self.cityTab();

                $(".music-btn").addClass("blue");

            });*/

        },
        cityTips:function(n){
            if( $(".city"+n).hasClass("on")){
                return;
            }
            $(".city"+n).find(".city-word-wrap").fadeIn(0);
            var i = 0;
            var time1 = setInterval(function () {
                $(".city"+n+" .city-wordimg").eq(i).fadeIn(500);
                i++;
                if(i>=5){
                    i=5;
                    clearInterval(time1);
                    $(".city"+n).find(".city-word-wrap").delay(2000).fadeOut(500);
                }
            },1000);
            $(".city"+n).addClass("on");
        },
        stepClick:function () {
            var self = this;
            $tipBox.click(function () {
                $tip.eq(self.tipNum).fadeOut(50);
                self.tipNum++;
                $tip.eq(self.tipNum).fadeIn(0);
                if(self.tipNum>=4){
                    $(this).fadeOut(50);
                    self.cityTips(0);
                }
            });
        },
        cityTab:function () {
            var self= this;
            $cityLi.click(function () {
                var i = $(this).index();
                $(this).addClass("cur").siblings().removeClass("cur");
                $(".citys .city").eq(i).fadeIn(10).siblings(".city").fadeOut(0);
                $(".hd-tips").addClass("fadeTg");
                self.cityTips(i);
            });
        },
        pointClick:function () {
            /*var self = this;
            /!*空热点*!/
            $noPoint.click(function () {
                var i = $(this).data("point");
                console.log(i);
                $(".ctTipp-"+i).stop(true).fadeIn(500).delay(1000).fadeOut(500);
            });
            /!*热点点击*!/
            $point.click(function () {
                var i = $(this).data("point");
                $(".ctTip-"+i).stop(true).fadeIn(500).delay(1000).fadeOut(500);
                if($(this).hasClass("on")){
                    return;
                }
                $(this).addClass("on");
                self.choujiang(i);

            });*/

        },
        choujiang:function (i) {

            //console.log(i);
            result(i);

         /*  this.num = $(".point.on").length;
            if(this.num ==2 || this.num ==4 || this.num==6 ||this.num==8){
                new Dialog(".Dialogbg",'.DialogBox',{
                    close:'.closes',
                    btn:'.go-use'
                },this.num,10);
                /!*进度*!/
                $(".prize-box .box"+this.num).find("img").addClass("a-swing");
                $(".prize-box .box"+this.num).find("img").attr("src","https://act.mcake.com/fangli/2020/wap/zhongqiu-H5/images/box-2-"+this.num+".png");
                $(".progress span").width((this.num+2)*10+"%");
            }*/

        },
        bindEvent:function () {

            /*this.Loading();*/
            this.pointClick();
        },
        init:function () {
            this.bindEvent();

        }


    }

    window.zhongQiu=zhongQiu;
    window.Loading=zhongQiu.Loading;
    window.pointClick=zhongQiu.pointClick;
    window.choujiang=zhongQiu.choujiang;
})();



/*移动端通用
*判断手机横竖屏状态
* 翻转屏幕自动刷新页面
*/
function hengshuping() {
    if (window.orientation == 180 || window.orientation == 0) {
        $(".frend-tip").fadeOut(50);
        window.location.reload();/*竖屏状态*/

    }
    if (window.orientation == 90 || window.orientation == -90) {
       // window.location.reload(); /*横屏状态*/
        $(".frend-tip").fadeIn(50);
    }
}
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);


var audioPlay = function () {
    var audio = document.getElementById('audio');

    audio.play();
    var on = true;

    if(!audio.paused){
        on=false;
        $(".music-btn").removeClass("on");
    }else{
        on=true;
        $(".music-btn").addClass("on");
    }

    $(".music-btn").click(function () {
        if(on){
            on=false;
            audio.play();
            $(this).removeClass("on");
        }else {
            on=true;
            audio.pause();
            $(this).addClass("on");
        }
    });

}
/*微信加载完成自动播放*/
document.addEventListener('WeixinJSBridgeReady', function() {
    audioPlay();
}, false);
