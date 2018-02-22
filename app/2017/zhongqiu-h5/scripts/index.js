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


    var loadComplete = function () {

        //execJs();
        App._Init();
    };




    var $step0 = $('#js_step0')
        ,$step1 = $('#js_step1')
        ,$step2 = $('#js_step2')
        ,$step3 = $('#js_step3')
        ,$sec0=$('.sec-s0')
        ,$sec1=$('.sec-s1')
        ,$sec2=$('.sec-s2')
        ,$fangdajing=$('#fangdajing')
        ,$moon=$('.moon')
        ,$zhaoMoon=$('#zhaoMoon')

        ,$coverZhao=$('.cover-zhao')
        ,$resultZhao=$('.result-zhao')

        ,$coverCang=$('.cover-cang')
        ,$resultCang=$('.result-cang')
        ,$lingjiang=$('#lingjiang')

        ,$rewarded=$('#rewarded')
        ,$btnKy=$('.btn-ky')
        ,$btnSc=$('.btn-sc')
        ,$shares=$('#shares')
        ,moonT=0
        ,num=0   /*点击次数*/
        ,opci1=0
        ,opci2=0
        ,percent=0
        ,totalDistance=500;/*总距离500*/

    var animates = {
        yueer:function () {
            //图片配置
            var mcConfig = {
                "00016":{"x":413,"y":253,"w":5,"h":5,"offX":0,"offY":0,"sourceW":750,"sourceH":627},
                "00000":{"x":187,"y":350,"w":5,"h":5,"offX":0,"offY":0,"sourceW":750,"sourceH":627},
                "00001":{"x":483,"y":137,"w":5,"h":5,"offX":0,"offY":0,"sourceW":750,"sourceH":627},
                "00002":{"x":0,"y":375,"w":144,"h":177,"offX":0,"offY":223,"sourceW":750,"sourceH":627},
                "00003":{"x":0,"y":0,"w":177,"h":178,"offX":84,"offY":278,"sourceW":750,"sourceH":627},
                "00004":{"x":0,"y":188,"w":177,"h":177,"offX":142,"offY":233,"sourceW":750,"sourceH":627},
                "00005":{"x":187,"y":0,"w":170,"h":170,"offX":219,"offY":166,"sourceW":750,"sourceH":627},
                "00006":{"x":187,"y":180,"w":159,"h":160,"offX":318,"offY":146,"sourceW":750,"sourceH":627},
                "00007":{"x":0,"y":562,"w":149,"h":149,"offX":398,"offY":168,"sourceW":750,"sourceH":627},
                "00008":{"x":0,"y":721,"w":138,"h":138,"offX":469,"offY":213,"sourceW":750,"sourceH":627},
                "00009":{"x":367,"y":0,"w":126,"h":127,"offX":526,"offY":235,"sourceW":750,"sourceH":627},
                "00010":{"x":0,"y":869,"w":117,"h":117,"offX":578,"offY":204,"sourceW":750,"sourceH":627},
                "00011":{"x":367,"y":137,"w":106,"h":106,"offX":639,"offY":188,"sourceW":750,"sourceH":627},
                "00012":{"x":356,"y":253,"w":47,"h":95,"offX":703,"offY":185,"sourceW":750,"sourceH":627},
                "00013":{"x":154,"y":375,"w":5,"h":5,"offX":0,"offY":0,"sourceW":750,"sourceH":627},
                "00014":{"x":127,"y":869,"w":5,"h":5,"offX":0,"offY":0,"sourceW":750,"sourceH":627},
                "00015":{"x":0,"y":996,"w":5,"h":5,"offX":0,"offY":0,"sourceW":750,"sourceH":627}
            };
            // MovieClip 可以通过duration控制两张图片轮播的速度。duration:0.2*10=2
            var yue= new MovieClip('yueer', loader.get('yueer_png').data,formatResData(mcConfig)).play(1);

        }
    };

    var App = {
        step1Ani:function () {
            setTimeout(function () {
                $(".s0-moon,.s0-title").fadeOut(1000,function () {
                    $(".s0-bg-cover").fadeIn(1000);
                    $(".sec-s0 .s0-words").fadeIn(1000,function () {
                        animates.yueer();
                    });
                });

            },3000);
        },
        /*一、找月亮*/
       step1:function () {
           var game = {
               gameInit:function () {
                   /*game初始化*/
                   num=0;
                   $(".sec-s1 .center").fadeOut(0);
                   $(".g-btn-1").fadeOut(10);
                   $(".g-btn-2").fadeIn(10);
                   $(".distance span").text(totalDistance);
                   $(".moon").stop().css({
                       top:-10+"rem"
                   });

                   $(".game-shuibo-1").css({
                       opacity:0
                   });
                   $(".game-shuibo-2").css({
                       opacity:0
                   });
                   $(".progress-bar").css({
                       height:0+"%"
                   });
                   $('.s1-time').html("倒计时：<span>30</span>秒，点击次数<b>0</b>次");

               },
               game:function () {
                   var self = this;
                   number--;
                   moonT =px2rem($moon.offset().top)-5;
                   //console.log("月亮的位置"+moonT);
                   /*倒计时*/
                   this.showtime(times,num,percent);

                   /*玩游戏*/
                   $(".game-btn").bind("click",self.gameStart);

               },
               gameStart:function(){
                   num++;
                   moonT+=0.05;
                   var distance =parseInt(totalDistance-(totalDistance*num/totalNum)); /*距离月亮*/
                   $(".distance span").text(distance);
                   $('.s1-time b').text(num);
                   percent = (num / totalNum)*100;

                   if(percent<10){
                       opci1=0.05;
                       opci2=0.1;
                   }else if(percent>10 && percent<30){
                       opci1=0.2;
                       opci2=0.4;
                   }else if(percent<30){
                       opci1=0.4;
                       opci2=0.6;
                   }else if(percent<60){
                       opci1=0.6;
                       opci2=0.8;
                   }else if(percent<90){
                       opci1=0.8;
                       opci2=0.9;
                   }else if(percent>=95){
                       opci1=1;
                       opci2=1;
                       game.successFun();
                   }



                   $(".moon").stop().animate({
                       top:moonT+"rem"
                   },500);

                   $(".game-shuibo-1").animate({
                       opacity:opci1
                   });
                   $(".game-shuibo-2").animate({
                       opacity:opci2
                   });
                   $(".progress-bar").stop().animate({
                       height:percent+"%"
                   },200);

               },
               update_p:function(t,num,percent){
                   if(t==0) {
                       $('.s1-time').text('时间结束！');

                       if(percent<90){
                           this.failFun();
                       }else{
                           this.successFun();
                       }
                   }
                   else {
                       $('.s1-time span').text(t);

                   }
               },
               showtime:function (t,num,percent) {

                   var self = this;
                   for(var i=0;i<=t;i++) {
                       setTimeout(function () {
                           self.update_p(t--,num,percent);
                       }, i * 1000);

                       setTimeout(function () {
                           $(".game-word3").fadeIn(500,function () {
                               $(this).fadeOut(500);
                           });
                       }, i * 3000);
                   }
               },
               goOn:function () {
                   var self = this;
                   $coverZhao.fadeOut(200);
                   $resultZhao.fadeOut(200);
                   $(this).parent().fadeOut(200);
                   self.gameInit();
                   self.game();
               },
               successFun:function () {
                   var self = this;
                   $(".game-btn").unbind("click",self.gameStart);
                   $coverZhao.fadeIn(400);
                   $resultZhao.fadeIn(500);
                   /*console.log("剩余次数-----"+time);*/
                   if(number || percent>=95){
                       $(".success").fadeIn(200);
                        /*领奖*/
                   }else if(number==0 && percent>=95){
                       $(".success").fadeIn(200);
                        /*领奖*/
                   }else if(number==0 && percent<95){
                       /*console.log('没有机会了');*/
                       $(".fail-3").fadeIn(200);   /*机会用完了*/
                   }
               },
               failFun:function () {

                   var self = this;
                   $(".game-btn").unbind("click",self.gameStart);
                   $coverZhao.fadeIn(400);
                   $resultZhao.fadeIn(500);
                   if(number==2){
                       $(".fail-1").fadeIn(200);  /*余2次机会*/
                       $(".go-on-1").click(function () {
                           self.goOn();/*继续游戏*/
                       });

                   }else if(number==1){
                       $(".fail-2").fadeIn(200);  /*余1次机会*/
                       $(".go-on-2").click(function () {
                           self.goOn();/*继续游戏*/
                       });
                   }else if(number<=0){
                       $(".fail-3").fadeIn(200);   /*机会用完了*/

                   }
               },
               bindeEvent:function () {
                   $(".game-btn").bind("touchstart",function () {
                       $(this).find("div").fadeToggle(0);
                   });
                   $(".game-btn").bind("touchend",function () {
                       $(this).find("div").fadeToggle(0);
                   });
               },
               _init:function () {
                   this.bindeEvent();
                   this.gameInit();
                   this.game();
               }

           };


           for(var i=0;i<=3;i++){
               setTimeout(function () {
                   i--;
                   $(".game-time img").eq(i).fadeIn(500).siblings().fadeOut(0);
                   if(i==0){
                       setTimeout(function () {
                           $coverZhao.fadeOut(400);
                           $(".game-start").fadeOut(500);
                           game._init();
                       },1000);
                   }
               }, i * 1000);
           }


       },
        /*二、考验好友，藏月亮*/
       step2:function () {
           var $targetObj = $('#targetObj');
           cat.touchjs.drag($targetObj, function (left, top) {
               $coverCang.fadeIn(200);
               $resultCang.fadeIn(200);

           });
       },
        /*三、送出心意，拖月亮*/
       step3:function () {
           var $dragMoon = $('#dragMoon');
           var eleBox = $(".box");
           var minTop = eleBox.offset().top;
           var minLeft = eleBox.offset().left;
           var boxW = eleBox.width();

           cat.touchjs.drag($dragMoon, function (left, top) {
               if(top > minTop && left > minLeft && left < (boxW/2+minLeft) ){
                   $(".s3-moon").fadeOut(200);
                   $(".s3-moonbing").fadeIn(500,function () {
                       location.href="http://m.mcake.com/hd/2017/moon_festival.html?clickpoint=banner";
                   });
               }

           });
       },

       bindEvent:function () {
           var self = this;
           /*步骤一*/
           $step0.on('click', function(){
               $sec0.fadeOut();
               $sec1.fadeIn();
               $coverZhao.fadeIn(0);
               $(".game-start").fadeIn(0);
               self.step1();
           });
           /*步骤二*/
           /*考验好友*/
           $btnKy.click(function () {
               $step1.fadeOut(200);
               $step2.fadeIn(200);
               self.step2();
           });
           /*步骤三*/
           /*送出心意*/
           $btnSc.click(function () {
               $step1.fadeOut(200);
               $step3.fadeIn(200);
               self.step3();
           });

           /*邀请好友*/
           $(".yaoqing,.share").click(function () {
               $shares.fadeIn(200);
               $(".share-1").fadeIn(200);
           });

           /*隐藏分享*/
           $shares.click(function () {
               $(this).fadeOut(500);
               $(".share-1").fadeOut(200);
           });
       },
        _Init:function () {
            //this.step1();

            if(jiayou){
                this.step1Ani();
            }
            this.bindEvent();
        }
   };



    /*领奖*/
    function rewarded() {
        $lingjiang.fadeIn(200);
        $(".cover-jiang").fadeIn(10,function () {
            $(".hongbao-gai").addClass("flipoutX");
            $(".hongbao-zhi").delay(1000).animate({
                height:px2rem(333)+'rem'
            },400,function () {
                $(".text").fadeIn(200);
            });
        });
    }


    /*分享成功页面*/
    function successShare(n) {
        $('.sec').hide(0);
        $step1.fadeIn(500);
        $coverZhao.fadeIn(0);
        $resultZhao.fadeIn(800,rewarded);
        textNum(n);
        $(".success").fadeIn(100);

    }
    /*分享失败页面*/

    function failShare(n) {
        $('.sec').fadeOut(0);
        $step1.fadeIn(0);
        $coverZhao.fadeIn(0);
        $resultZhao.fadeIn(0);
        $(".fail-3").fadeIn(200);

    }

    function textNum(num,cb) {
        $(".text span").text(num);
        cb();
    }


    function zhuli() {
        $('.sec').fadeOut(0);
        $(".zhuli").fadeIn(0);
        $(".z-btn").click(function () {
            $(".zl-cover,.zl").fadeIn(500);
        });

        $(".z-start").click(function () {
            $('.sec').fadeOut(0);
            $('.sec-s0').fadeIn(0);
            App.step1Ani();
        });
    }

   window.successShare=successShare;
   window.failShare=failShare;
   window.textNum=textNum;
   window.zhuli=zhuli;
   window.rewarded=rewarded;

})();

