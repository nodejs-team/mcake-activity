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



    /*指定锚点跳转位置*/
    function scrollTopAni(ele,callback) {
        var sTop = $(ele).offset().top;
        $("html,body").animate({scrollTop:sTop},500,function () {
            callback && callback();
        });
    }

    /*页面加载完成*/
    var loadComplete = function () {

        $("html,body").animate({scrollTop:0},500);
        var video = document.getElementById("shakeVideo");

        if(!video.paused){
            video.play();
        }else {
            video.play();
        }


        document.addEventListener('WeixinJSBridgeReady',function(){
            video.play();
        },false);


        $(".tab-bar span").click(function () {
            var index = $(this).index();
            $(this).addClass("cur").siblings().removeClass("cur");
            $(".tab-box .part").eq(index).fadeIn(100).siblings().fadeOut(10);
            $(".sec-cakes").fadeIn(0);
            if(index == 2){
                $(".sec-cakes").fadeOut(0);
            }
        });

        /**蛋糕*/
        $(".prolist li").each(function () {
            var self = this;
            $(this).find('.m-car').click(function () {
                SelectShow(self,[0,0,0,0],1,true,1,0);
            });

        });
        $(".go-car").click(function () {
            SelectHide();
        });
        $(".go-buy,.s-closes").click(function () {
            SelectHide();
        });

        /*奖品*/
        var swiper1 = new Swiper('.swiper1', {
            observer:true,
            observeParents:true,
            speed:300,
            direction : 'vertical',
            loop: true,
            autoplay : {
                delay:3000,
                disableOnInteraction: false,
            },
            on: {
                slideChangeTransitionStart: function(){
                    $(".prize-nub li.on").removeClass('on');
                    $(".prize-nub li").eq(this.realIndex).addClass('on');
                }
            }
        });

        $(".prize-nub li").on('click',function(e){
            e.preventDefault();
            $(".prize-nub li").removeClass('on');
            $(this).addClass('on');
            swiper1.slideToLoop($(this).index(), 1000, false);

        });

        $(".win-prize,.prize-nub,.swiper1").hover(function () {
            swiper1.autoplay.stop();
        },function () {
            swiper1.autoplay.start();
        });



        /*按钮变色*/
        $(".zn-btn,.buy-yuanbtn,.m-car,.m-btn,.go-buy,go-car").hover(function () {
            $(this).addClass("on");
        },function () {
            $(this).removeClass("on");
        });

        $(".buy-btn").hover(function () {
            $(this).addClass("on").siblings().removeClass("on");
        });

        $(".more").click(function () {
            $(this).fadeOut(200);
            $("#box").removeClass("min-height");
        });

        /*电话号码中间4位用*代替*/
        $(".bangList li,.awardlist li").each(function () {
            var mobile = $(this).find('.tel-phone').text();
            var reg = new RegExp("(\\d{3})(\\d{4})(\\d{4})");
            var tel = mobile.replace(reg, "$1****$3");
            $(this).find('.tel-phone').text(tel);
        });
        /*消费金额*/
        $(".bangList li").each(function () {
            var money = $(this).find('.price').html();
            var reg = new RegExp("(\\d{1})(\\d*)");
            var tel = money.replace(reg, "*$2");
            $(this).find('.price').html(tel);
        });

        /*指定锚点跳转位置*/

        /*指定锚点跳转位置*/
        $(".whdlink").click(function () {
            scrollTopAni("#whd");
        });

        $(".quanlink").click(function () {
            scrollTopAni("#quan");
        });
        $(".xplink").click(function () {
            scrollTopAni("#xp");
        });
        $(".manzenglink").click(function () {
            scrollTopAni("#manzeng");
        });


        $(".winlink").click(function () {
            scrollTopAni("#win");
        });

        $(".Mcardlink").click(function () {
            scrollTopAni("#Mcard");
        });

        $(".zenglink").click(function () {
            scrollTopAni("#zeng");
        });

        $(".zhelink").click(function () {
            scrollTopAni("#zhekou");
        });
        $(".shenglink").click(function () {
            scrollTopAni("#shengbang");
        });



        /*升磅*/
        $(".select li").click(function () {
            $(this).addClass("on").siblings().removeClass("on");
            /*新版wap需要配置data*/
            var self = $(this);
            $(this).each(function() {
                var thisele = $(this);
                $.each(this.attributes, function() {
                    if(this.specified) {
                        var attrs = thisele.attr(this.name);
                        if(this.name =='class'){
                            return;
                        }else{
                            self.parents(".price").find('.go-btn').attr(this.name,attrs);
                        }
                    }
                });
            });
        });


    };



    var initScroll = function (){
        window.scrollAnimate('#evt_container', [
            {dom: '.banner-logo',x:0, y:50,duration:500,delay:600}
            ,{dom: '.banner-word',x:0, y:50,duration:500,delay:200}

            ,{dom: '.sec-zuhe .title',x:0, y:50,duration:500,delay:400}
            ,{dom: '.sec-zuhe .zuhe-1',x:0, y:50,duration:500,delay:200}
            ,{dom: '.sec-zuhe .zuhe-2',x:0, y:50,duration:500,delay:1000}
            ,{dom: '.sec-zuhe .zuhe-3',x:0, y:50,duration:500,delay:600}
            ,{dom: '.sec-zuhe .zuhe-4',x:0, y:50,duration:500,delay:1400}
            ,{dom: '.sec-zuhe .zuhe-5',x:0, y:50,duration:500,delay:1800}


        ])
    };


})();


