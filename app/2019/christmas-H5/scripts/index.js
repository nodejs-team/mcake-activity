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
        var evtLoading = document.getElementById('evt_loading');
        var domLoad = document.getElementById('loading');
        domLoad.style.display = 'block';
        loader.addGroup('preload', resData);
        loader.on('progress', function(groupName, ix, len){
            domLoad.innerHTML = parseInt(ix/len*100) + '%';
        });
        loader.on('complete', function(groupName){
            fixImageSrc(loader.getAll());
            evtLoading.style.display = 'none';
            domLoad.style.display = 'none';
            document.getElementById('evt_content').style.display = 'block';
             loadComplete();
        });
        loader.loadGroup('preload');
    }
    startLoading();



    var loadComplete = function () {

        /*控制页面整屏显示*/
        var wh = $(window).height();
        var sh = px2rem(wh*2);
        $(".pages").height(wh);

        game.init();

        var audio = document.getElementById("audio");

        document.addEventListener('WeixinJSBridgeReady',function(){
            audio.play();
        },false);

        /*音乐播放控制*/
        $(".music").click(function () {
           /* alert(audio.paused);*/
            if (audio.paused) {
                audio.play();
                $(this).addClass("cur");
            } else {
                audio.pause();
                $(this).removeClass("cur");
            }
        });

    };


    var game = {
        count:count,
        flag:true,
        open:true,
        $page1:$(".sec-page1"),
        $page2:$(".sec-page2"),
        $page3:$(".sec-page3"),
        $page4:$(".sec-page4"),
        $btnGo:$(".btn-go"),
        $txtShengdan:$(".txt-shengdan"),

        $cardBottom:$(".card-bottom"),
        $cardMiddle:$(".card-middle"),
        $cardTop:$(".card-top"),
        $txt1:$(".txt-1"),
        $txt2:$(".txt-2"),
        $shareTxt:$(".share-txt"),
        $btnDhare:$(".btn-share"),
        $closex:$(".closex"),
        $btnGz:$(".btn-gz"),


        $xueWu:$(".xue-wu"),
        $merry:$(".merry"),
        $music:$(".music"),
        start:function () {
            var self = this;
            self.$music.addClass("move");
            self.$txtShengdan.removeClass("on");
            self.$xueWu.removeClass("on");
            self.$merry.removeClass("on");
            self.$btnGo.removeClass("on");
            self.$page1.delay(1000).fadeOut(500);

            /*self.yaoyao();*/
        },
        yaoyao:function () {
            var self = this;
            var SHAKE_THRESHOLD = 2000;
            var last_update = 0;
            var x = y = z = last_x = last_y = last_z = 0;
            function init() {
                if (window.DeviceMotionEvent) {
                    window.addEventListener('devicemotion', deviceMotionHandler, false);

                } else {
                    alert('not support mobile event');
                }
            }
            function deviceMotionHandler(eventData) {
                var acceleration = eventData.accelerationIncludingGravity;
                var curTime = new Date().getTime();
                if ((curTime - last_update) > 100) {
                    var diffTime = curTime - last_update;
                    last_update = curTime;
                    x = acceleration.x;
                    y = acceleration.y;
                    z = acceleration.z;
                    var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;

                    if (speed > SHAKE_THRESHOLD) {
                        /* alert("摇动了");*/

                       /* alert(self.count);*/
                        if(self.count>0){
                            self.choujiang();
                        }else{
                            return;
                        }

                    }
                    last_x = x;
                    last_y = y;
                    last_z = z;
                }
            }

            init();
        },

        choujiang:function () {
            var self = this;

            /*控制一次摇奖只执行一次*/
            function once() {
                if (self.flag) {
                    self.count--;
                    /* alert(self.count)*/
                    if(self.count<=0){
                        self.count = 0;
                        $(".count-txt").html('您的机会已经用完了');
                        function wined() {
                            $(".cake").addClass("swing");
                            setTimeout(function () {
                                self.$page3.fadeIn(100);
                                self.$txt1.addClass("on");
                                self.$cardBottom.addClass("on");
                                self.$cardMiddle.addClass("on");
                                self.$cardTop.addClass("on");
                                self.$closex.addClass("on");
                                self.$btnGz.addClass("on");
                                $(".cake").removeClass("swing");
                            },1000);
                        }
                        winPrize(wined);
                    }else {
                        function wined() {
                            $(".cake").addClass("swing");
                            setTimeout(function () {
                                $(".count-txt span").html(self.count);
                                self.$page3.fadeIn(100);
                                self.$txt1.addClass("on");
                                self.$cardBottom.addClass("on");
                                self.$cardMiddle.addClass("on");
                                self.$cardTop.addClass("on");
                                self.$closex.addClass("on");
                                self.$btnGz.addClass("on");
                                $(".cake").removeClass("swing");
                            },1000);
                        }
                        winPrize(wined);
                    }
                    self.flag = false;
                } else {
                    return;
                }
            }

            once();




            /*关闭*/
            self.$closex.click(function () {
                self.$cardBottom.removeClass("on");
                self.$cardMiddle.removeClass("on");
                self.$cardTop.removeClass("on");
                self.$txt1.removeClass("on");
                self.$txt2.removeClass("on");
                self.$closex.removeClass("on");
                self.$btnGz.removeClass("on");
                self.$page3.fadeOut(500);
                $(".cake").removeClass("swing");
                self.flag=true;
                return false;

            });

            /*分享提示*/
            this.$btnDhare.click(function () {
                self.$page4.fadeIn(200);
                return false;
            });
            self.$page4.click(function () {
                $(this).fadeOut(100);
            });
        },
        init:function () {
            var self = this;
            self.$music.addClass("on");
            this.$txtShengdan.addClass("on");
            this.$xueWu.delay(600).addClass("on");
            this.$merry.delay(600).addClass("on");
            this.$btnGo.delay(1000).addClass("on");
            this.$btnGo.click(function () {
                self.start();
            });

            /*活动规则*/
            this.$btnGz.click(function () {
                if (self.open) {
                    self.$closex.fadeOut(0);
                    self.$btnGz.addClass("cur");
                    self.$txt1.removeClass("on");
                    self.$txt2.addClass("on");
                    self.open = false;
                } else {
                    self.$closex.fadeIn(100);
                    self.$btnGz.removeClass("cur");
                    self.$txt1.addClass("on");
                    self.$txt2.removeClass("on");
                    self.open = true;
                }

            });

        }
    }

    window.game=game;
})();

/*判断手机横竖屏状态：*/
!+(function () {
    var tipmask =document.getElementById("tipmask");
    function hengshuping() {
        if (window.orientation == 180 || window.orientation == 0) {
            tipmask.style.display = "none";
            /*window.location.reload();*/
        }
        if (window.orientation == 90 || window.orientation == -90) {
            /*横屏，提示锁屏*/
            tipmask.style.display = "block";

        }
    }
    window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);
})();



