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
        execJs();
    };


    var $step0 = $('#js_step0')
        ,$step1 = $('#js_step1')
        ,$step2 = $('#js_step2')
        ,$step3 = $('#js_step3')
        ,$sec0=$('.sec-s0')
        ,$sec1=$('.sec-s1')
        ,$sec2=$('.sec-s2')
        ,$fangdajing=$('#fangdajing')
        ,$zhaoMoon=$('#zhaoMoon')

        ,$coverZhao=$('.cover-zhao')
        ,$resultZhao=$('.result-zhao')

        ,$coverCang=$('.cover-cang')
        ,$resultCang=$('.result-cang')
        ,$lingjiang=$('#lingjiang')

        ,$close=$('.close')
        ,$btnKy=$('.btn-ky')
        ,$btnSc=$('.btn-sc')
        ,$shares=$('#shares')
        ,time = 3;

    function execJs() {
        var effct = {
            step1Ani:function () {
                setTimeout(function () {
                    $(".sec-s0 .content").fadeOut(1000,function () {
                        $(".sec-s0 .s0-words").fadeIn(1000);
                    });
                },2000);
            }
         };

        /*一、找月亮*/
        function step1(){

            var startX, startY;
            var jingW = $fangdajing.width();
            var jingH = $fangdajing.height();
            var random;
            $zhaoMoon.on("touchstart", function(e) {
                time--;
                startX = e.originalEvent.changedTouches[0].pageX,
                startY = e.originalEvent.changedTouches[0].pageY;
                random = parseInt(10*Math.random())+1;   /*parseInt(10*Math.random())+1*/

                $fangdajing.animate({
                    left:startX-jingW/2,
                    top:startY-jingH/2
                },500,function () {
                    $coverZhao.fadeIn(400);
                    $resultZhao.fadeIn(500);
                    console.log(time+"----"+random);

                    if(random <= 3){  /*成功*/
                        if(time){
                            $(".success").fadeIn(200);
                            $("#lingqu").click(function () {
                                $lingjiang.fadeIn(200);
                                $(".cover-jiang").fadeIn(200);
                            });
                        }else if(time==0){
                            /*console.log('没有机会了');*/
                            $(".fail-3").fadeIn(200);   /*机会用完了*/
                        }
                    }else{   /*失败*/
                        if(time==2){
                            $(".fail-1").fadeIn(200);  /*余2次机会*/
                            goOn(); /*继续游戏*/
                        }else if(time==1){
                            $(".fail-2").fadeIn(200);  /*余1次机会*/
                            goOn(); /*继续游戏*/
                        }else if(time==0){
                            /*console.log('没有机会了');*/
                            $(".fail-3").fadeIn(200);   /*机会用完了*/

                        }
                    }


                });
            });

            function goOn() {
                $(".go-on").click(function () { /*继续游戏*/
                    $coverZhao.fadeOut(200);
                    $resultZhao.fadeOut(200);
                    $(this).parent().fadeOut(200);
                });
            }


        }

        /*二、考验好友，藏月亮*/
        function step2() {
            var $targetObj = $('#targetObj');

            cat.touchjs.drag($targetObj, function (left, top) {
                $coverCang.fadeIn(200);
                $resultCang.fadeIn(200);
                console.log(left);
            });

            $(".share").click(function () {
                $shares.fadeIn(200);
                $(".share-2").fadeIn(200);
            });

        }

        /*三、送出心意，拖月亮*/
        function step3() {
            var $dragMoon = $('#dragMoon');
            var eleBox = $(".box");
            var minTop = eleBox.offset().top;
            var minLeft = eleBox.offset().left;
            var boxW = eleBox.width();
           /* console.log(minTop+"----"+minLeft);*/
            cat.touchjs.drag($dragMoon, function (left, top) {
                if(top > minTop && left > minLeft && left < (boxW/2+minLeft) ){
                    $(".s3-moon").fadeOut(200);
                    $(".s3-moonbing").fadeIn(500,function () {
                       location.href="http://m.mcake.com";
                    });
                }
                /*console.log(top+"----"+left);*/
            });
        }


        (function bindEvent () {
            effct.step1Ani();

             /*步骤一*/
            $step0.on('click', function(){
                $sec0.fadeOut();
                $sec1.fadeIn();
                step1();
            });
             /*步骤二*/
            /*考验好友*/
            $btnKy.click(function () {
                $step1.fadeOut(200);
                $step2.fadeIn(200);
                step2();
            });
             /*步骤三*/
            /*送出心意*/
            $btnSc.click(function () {
                $step1.fadeOut(200);
                $step3.fadeIn(200);
                step3();
            });

            $close.click(function () {
                $lingjiang.fadeOut(200);
                $coverZhao.fadeOut(200);
                $resultZhao.fadeOut(200);
                $(".success").fadeOut(200);
                $(".cover-jiang").fadeOut(200);
            });

            /*邀请好友*/
            $(".yaoqing").click(function () {
                $shares.fadeIn(200);
                $(".share-1").fadeIn(200);
            });

            /*隐藏分享*/
            $shares.click(function () {
                $(this).fadeOut(500);
                $(".share-1,.share-2").fadeOut(200);
            });


        })();
    }


    /*藏月亮，分享之后返回的页面*/
    function sharePage() {

        $('.sec').fadeOut(200);
        $step1.fadeIn(200);
        $coverZhao.fadeIn(200);
        $resultZhao.fadeIn(200);
        $(".success").fadeIn(200);
        $(".cover-jiang").fadeIn(200);
        $lingjiang.fadeIn(200);
    }

   window.sharePage=sharePage;

})();

