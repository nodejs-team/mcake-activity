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


    /*活动规则*/
    var guize = {
        bg:0,
        index:0,
        $haoli:$("#sec-haoli"),
        $haoliItem:$(".guize-btn"),
        $Dialogbg:$(".Dialogbg-rules"),
        $Dialog:$(".Dialog-rules"),
        $rules:$(".rules"),
        $closes:$(".closes"),
        Dialog:function (ele) {
            var self = this;
            this.$Dialogbg.fadeIn(300);
            this.$Dialog.fadeIn(300);
            var str = ele.find(".txtHtml").html();
            this.$rules.html(str);

        },
        init:function () {
            var self = this;

            this.$haoliItem.click(function () {
                self.Dialog($(this));
            });

            /*关闭*/
            this.$closes.click(function () {
                self.$Dialogbg.fadeOut(300);
                self.$Dialog.fadeOut(300);
                self.$rules.empty();
            });
            this.$Dialogbg.click(function () {
                self.$Dialogbg.fadeOut(300);
                self.$Dialog.fadeOut(300);
                self.$rules.empty();
            });

        }
    };

    /*排行榜滚动显示*/
    function roll(){
        var ul1=document.getElementById("ul1");
        var ul2=document.getElementById("ul2");
        var box=document.getElementById("box");
        ul2.innerHTML=ul1.innerHTML;
        box.scrollTop = 18;
        var timer=setInterval(rollStart,30);
        box.onmouseover=function(){
            clearInterval(timer)
        }
        box.onmouseout=function(){
            timer=setInterval(rollStart,30);
        }


    }
    function rollStart(){
        if (box.scrollTop>=ul1.scrollHeight) {//scrollTop属性既是scroll最上端和box的距离
            box.scrollTop=18;
        }else{
            box.scrollTop++;
        }

    }

    function roll2(){
        var ul3=document.getElementById("ul3");
        var ul4=document.getElementById("ul4");
        var box2=document.getElementById("box2");
        ul4.innerHTML=ul3.innerHTML;
        box2.scrollTop = 0;
        var timer2=setInterval(rollStart2,20);
        box2.onmouseover=function(){
            clearInterval(timer2)
        }
        box2.onmouseout=function(){
            timer2=setInterval(rollStart2,20);
        }


    }
    function rollStart2(){
        if (box2.scrollTop>=ul3.scrollHeight) {//scrollTop属性既是scroll最上端和box的距离
            box2.scrollTop=0;
        }else{
            box2.scrollTop++;
        }

    }
    /*判断活动是否开始*/
    function ActStart(ele,n) {
        if(n){
            $(ele).find('.not-startbg').fadeOut(0);
            $(ele).find('.not-start').fadeOut(0);
        }else{
            $(ele).find('.not-startbg').fadeIn(0);
            $(ele).find('.not-start').fadeIn(0);
        }
    }

    window.ActStart = ActStart;

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

        if($("#ul1 li").length>3){
            roll();
        }
        if($("#ul3 li").length>3){
            roll2();
        }

        /*活动规则*/
        guize.init();

        /*Top 消费 奖品切换*/
        $(".prize-nub li").click(function () {
            var idx = $(this).index();
            $(this).addClass("on").siblings().removeClass("on");
            $(".prize .prizeImg").eq(idx).fadeIn(10).siblings().fadeOut(0);
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

        $(".whdlink").click(function () {
            scrollTopAni("#whd");
        });
        $(".zuhelink").click(function () {
            $(".zuhecard").fadeOut(0);
            scrollTopAni("#zuhe",function () {
                $(".zuhe-1").slideDown(300,function () {
                    $(".zuhe-3").slideDown(500,function () {
                        $(".zuhe-2").slideDown(300,function () {
                            $(".zuhe-4").slideDown(500,function () {
                                $(".zuhe-5").slideDown(600);
                            });
                        });
                    });
                });
            });
        });
        $(".xplink").click(function () {
            scrollTopAni("#xp");
        });
        
        $(".zclink").click(function () {
            scrollTopAni("#zc");
        });

        $(".toplink").click(function () {
            scrollTopAni("#top");
        });

        $(".manzenglink").click(function () {
            scrollTopAni("#manzeng");
        });

        $(".yuan1link").click(function () {
            scrollTopAni("#yuan1");
        });
        $(".qingshenglink").click(function () {
            scrollTopAni("#qingsheng");
        });

        /*滚动到当前位置，卡包出现*/
        var zuheTop = $(".ewm").offset().top;
        var ani = false;
        $(window).on("scroll", function handle(){
            var scrollTop = $(this).scrollTop();
            $(".zuhecard").fadeOut(0);
            if(scrollTop>=zuheTop && ani == false){
                ani=true;
            }
            if(ani){
                $(window).off("scroll", handle);
                $(".zuhe-1").stop().slideDown(500,function () {
                    $(".zuhe-3").stop().slideDown(500,function () {
                        $(".zuhe-2").stop().slideDown(300,function () {
                            $(".zuhe-4").stop().slideDown(500,function () {
                                $(".zuhe-5").stop().slideDown(600);
                            });
                        });
                    });
                });
            }
        });
        /* initScroll();*/
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

;(function () {
    function choujiang(DialogCover,DialogBox,n,arr) {  /* n<=$item的length */
        this.$DialogCover = $(DialogCover);
        this.$DialogBox = $(DialogBox);
        this.$item = $(DialogBox).find(".box-item");
        this.$close = $(DialogBox).find(".closes");
        this.$wait = $(DialogBox).find(".go-wait");
        this._Init(n,arr);
    }
    choujiang.prototype={
        DialogTipShow:function (n,arr) {
            this.$DialogCover.fadeIn(500);
            this.$DialogBox.fadeIn(500);
            this.$DialogBox.find(".jp-leve").html(arr[n].leve);
            this.$DialogBox.find(".jp-name").html(arr[n].name);
            this.$DialogBox.find(".jp-price").html(arr[n].price);
            this.$DialogBox.find(".jp").css({"background":"url('https://act.mcake.com/fangli/2018/wap/zhou-nian/images/jiang-"+(n+1)+".png') center","background-size":"cover"});
        },
        DialogTipHide:function () {
            this.$DialogCover.fadeOut(20);
            this.$DialogBox.fadeOut(20);
        },
        _Init:function (n,arr) {
            var self = this;
            self.DialogTipShow(n,arr);
            this.$close.click(function () {
                self.DialogTipHide();
            });
            this.$wait.click(function () {
                self.DialogTipHide();
            });
        }
    };
    window.choujiang = choujiang;
})();

<!--蛋糕选择弹窗-->
;(function () {
    var $Select = $(".Select"),
        $bangshu = $Select.find(".s-bangshu"),
        $price = $Select.find(".s-price"),
        $newprice = $Select.find(".s-new-price");
    var num = 1,
        pond = 2,
        price = 0,
        postid = 0,
        totaPrice=0,
        dis = 0; /*9折优惠*/
    /*数量选择*/
    function SelectShow(ele,d,isShow,n) {
        var ponds = [];
        var prices = [];
        var postids = [];
        var tips = [];
        var time = [];
        var pondsingle = $(ele).data("pond").indexOf(",");
        dis=d;
        /*d为1，说明不打折*/
        if(d==1){
            $(".old-p").hide(0);
        }else{
            $(".old-p").show(0);
        }

        if(!isShow){
            $(".s-num").hide(0);
        }else{
            $(".s-num").show(0);
        }
        /*只有1盒*/
        if(pondsingle<0){
            ponds = $(ele).data("pond").split(',');
            prices = $(ele).data("price");
            postids = $(ele).data("postid");
            tips = $(ele).data("tips");
            time = $(ele).data("time");


            /*初始化默认*/
            $price.html(prices.toFixed(2));
            $newprice.html((prices*dis).toFixed(2));

            $(".postid").data('postid',postids);
            $Select.find("li").eq(1).addClass("on").siblings().removeClass("on");
            $(".num").val(1);
            $(".tips").html(tips);
            $(".time").html(time);
            price = prices;

            var str = '';
            str = '<li class="on" data-pond="'+ponds+'">'+ponds+'</li>';
            $bangshu.find("ul").append(str);


        }else{  /*多磅数选择*/
            ponds = $(ele).data("pond").split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")});
            prices = $(ele).data("price").split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")});
            postids = $(ele).data("postid").split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")});
            tips = $(ele).data("tips").split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")});
            time = $(ele).data("time").split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")});


            /*初始化默认*/
            $price.html((prices[n]-0).toFixed(2));
            $newprice.html((prices[n]*dis).toFixed(2));
            $(".postid").data('postid',postids[n]);
            $Select.find("li").eq(n).addClass("on").siblings().removeClass("on");
            $(".num").val(1);
            $(".tips").html(tips[n]);
            $(".time").html(time[n]);
            price = prices[n];


            var len = ponds.length;

            for(var i=0; i<len; i++){
                var str = '';
                if(i==n){
                    str = '<li class="on" data-pond="'+ponds[i]+'">'+ponds[i]+'</li>';
                }else{
                    str += '<li data-pond="'+ponds[i]+'">'+ponds[i]+'</li>';
                }

                $bangshu.find("ul").append(str);

                $bangshu.find("li").each(function (i) {  /*磅数选择*/
                    var self = $(this);
                    $(this).data("price",prices[i]);
                    $(this).data("postid",postids[i]);
                    $(this).data("tips",tips[i]);
                    $(this).data("time",time[i]);

                    $(this).click(function () {
                        postid = self.data("postid");
                        tips = self.data("tips");
                        time = self.data("time");
                        $(".postid").data('postid',postid);

                        price = self.data("price");
                        totaPrice = price * num;
                        $price.html(totaPrice.toFixed(2));
                        $newprice.html((totaPrice*dis).toFixed(2));
                        $(".tips").html(tips);
                        $(".time").html(time);
                        self.addClass("on").siblings().removeClass("on");
                    });
                });

            }
        }

        $(".Dialogbg-Select,.Dialog-Select").fadeIn(500);
    }

    /*加*/
    $(".plus").click(function () {
        if(num>=50){
            return;
        }else{
            num+=1;
        }
        $(".num").val(num);

        totaPrice = price * num;
        $price.html(totaPrice.toFixed(2));
        $newprice.html((totaPrice*dis).toFixed(2));
    });

    /*减*/
    $(".minus").click(function () {
        if(num<=1){
            return;
        }else{
            num-=1;
        }
        $(".num").val(num);
        totaPrice = price * num;
        $price.html(totaPrice.toFixed(2));
        $newprice.html((totaPrice*dis).toFixed(2));
    });

    function SelectHide() {
        num = 1;
        $bangshu.find("ul").empty();
        $(".Dialogbg-Select,.Dialog-Select").fadeOut(0);
    }

    $(".Dialogbg-Select").click(function () {
        SelectHide();
    });


    window.SelectShow = SelectShow;
    window.SelectHide = SelectHide;


    /*使用方法：
     $(".prolist li").each(function () {
     var self = this;
     $(this).find('.m-btn,.m-car').click(function () {
     SelectShow(self);
     })
     });
     $(".go-car").click(function () {
     SelectHide();
     });
     $(".go-buy,.s-closes").click(function () {
     SelectHide();
     });*/

})();