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
        var sTop = $(ele).offset().top-80;
        $("html,body").animate({scrollTop:sTop},500,function () {
            callback && callback();
        });
    }

    /*页面加载完成*/
    var loadComplete = function () {

        $("html,body").animate({scrollTop:0},500);

        /*根据日期判断进度条*/
        var vDate = new Date();
        var myDate = '';
        if((vDate.getMonth() + 1)<10){
            if(vDate.getDate()<10){
                myDate = vDate.getFullYear() + '-' +'0'+ (vDate.getMonth() + 1) + '-' +'0'+  vDate.getDate();
            }else {
                myDate = vDate.getFullYear() + '-' +'0'+  (vDate.getMonth() + 1) + '-' + vDate.getDate();
            }

        }else{
            if(vDate.getDate()<10){
                myDate = vDate.getFullYear() + '-' + (vDate.getMonth() + 1) + '-' +'0'+  vDate.getDate();
            }else {
                myDate = vDate.getFullYear() + '-' + (vDate.getMonth() + 1) + '-' + vDate.getDate();
            }
        }



       /* console.log('您的当前时间：',myDate);*/

        if(myDate<'2020-10-22'){
            $(".progress span").width("10%");
            $(".progress i").css("left","10%");

        }else if(myDate>='2020-10-22' && myDate<'2020-10-26') {
            $(".progress span").width("34%");
            $(".progress i").css("left","34%");
        }else if(myDate>='2020-10-26' && myDate<'2020-10-29') {
            $(".progress span").width("60%");
            $(".progress i").css("left","60%");
        }else if(myDate>='2020-10-29') {
            $(".progress span").width("87%");
            $(".progress i").css("left","87%");
            $(".icon").addClass("icon-100");
        }


        if(myDate>='2020-10-30' && myDate<='2020-11-05'){
            $(".mcake-1").find(".buy-btn").removeClass("on").html("立即购买");
        }else if(myDate>='2020-11-06' && myDate<='2020-11-10'){
            $(".mcake-1").find(".buy-btn").addClass("on").html("已结束");
            $(".mcake-2").find(".buy-btn").removeClass("on").html("立即购买");
        }else if(myDate>'2020-11-10'){
            $(".mcake-1").find(".buy-btn").addClass("on").html("已结束");
            $(".mcake-2").find(".buy-btn").addClass("on").html("已结束");
        }



      /*  $(".tab-bar span").click(function () {
            var index = $(this).index();
            $(this).addClass("cur").siblings().removeClass("cur");
            $(".tab-box .part").eq(index).fadeIn(100).siblings().fadeOut(10);
            $(".sub-bar .sec-title").eq(index).fadeIn(100).siblings().fadeOut(10);
            $(".sec-cakes").fadeIn(0);
            if(index == 2){
                $(".sec-cakes").fadeOut(0);
            }
        });*/



        /*奖品*/
        var swiper1 = new Swiper('.swiper1', {
            observer:true,
            observeParents:true,
            speed:300,
            direction : 'vertical',
            loop: true,
            autoplay : {
                delay:5000,
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
        $(".hllink").click(function () {
            scrollTopAni("#hl");
        });

        $(".quanlink").click(function () {
            scrollTopAni("#quan");
        });
        $(".cakelink").click(function () {
            scrollTopAni("#cake");
        });
        $(".wxlink").click(function () {
            scrollTopAni("#wx");
        });



        $(".shengbanglink").click(function () {
            scrollTopAni("#shengbang");
        });


        $(".wxCodelink").click(function () {
            scrollTopAni("#wxCode");
        });


        $(".zuhelink").click(function () {
            scrollTopAni("#zuhe");
        });


        $(".cake99link").click(function () {
            scrollTopAni("#cake99");
        });

        $(".cake86link").click(function () {
            scrollTopAni("#cake86");
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


        /*弹出红包*/
        setTimeout(function () {
            $(".hob-inlet").fadeIn(200);
        },1000);

        /**排行榜*/
        var len = $(".bangList ul li").length;
        if(len <= 0){
            $(".bangList ul").html('暂无数据');
        }
        else if(len > 4){
            $(".mores").fadeIn(0);
            $(".bangList ul li:gt(3)").hide();
        }

        var more = true;
        $(".mores").click(function () {
            if(more){
                $(this).addClass('on');
                $(".bangList ul li:gt(3)").show();
                more=!more;
            }else {
                $(this).removeClass('on');
                $(".bangList ul li:gt(3)").hide();
                more=!more;
            }
        });


        /*使用红包*/
        $(".go-use").click(function () {
            $('.hongbaoCj').fadeOut();
            $(".modal,.shade").fadeOut(10);
            /*scrollTopAni("#zhekou");*/
            return false;
        });

        /*关闭红包*/
        $(".mod-close").click(function () {
            $(".hob-inlet").fadeOut();
            $(".modal,.shade").fadeOut(10);
            $('.hongbaoCj').fadeOut(0);
            return false;
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


;(function () {
    function hbchoujiang(data) {  /* n<=$item的length */
        this.$DialogCover = $(data.DialogCover);
        this.$DialogBox = $(data.DialogBox);
        this.$item = $(data.DialogBox).find(".box-item");
        this.$close = $(data.DialogBox).find(".closes");
        this.$wait = $(data.DialogBox).find(".go-wait");
        this._Init(data.arr);
    }
    hbchoujiang.prototype={
        DialogTipShow:function (arr) {
            this.$DialogCover.fadeIn(500);
            this.$DialogBox.fadeIn(500);
            this.$DialogBox.find(".txt ul").html(arr);

           /* this.$DialogBox.find(".jp-leve").html(arr[n].leve);
            this.$DialogBox.find(".jp-name").html(arr[n].name);
            this.$DialogBox.find(".jp-price").html(arr[n].price);
            this.$DialogBox.find(".txt").html(arr[n].txt);
            this.$DialogBox.find(".jp").css({"background":"url('https://act.mcake.com/fangli/2019/wap/38jie-wap/images/jiang-"+arr[n].imgNum+".png') center","background-size":"cover"});*/
        },
        DialogTipHide:function () {
            this.$DialogCover.fadeOut(20);
            this.$DialogBox.fadeOut(20);
        },
        _Init:function (arr) {
            var self = this;
            self.DialogTipShow(arr);
            this.$close.click(function () {
                self.DialogTipHide();
            });
            this.$wait.click(function () {
                self.DialogTipHide();
            });
        }
    };
    window.hbchoujiang = hbchoujiang;
})();


/*获取排行榜*/
/*(function () {
    $.ajax({
        type: "POST",
        url: "http://betaweb.mcake.com/ajax-shop/activity/choujiang.ajax?operFlg=4",
        dataType: "JSON",
        data:{
            config_code : 'anniversary_2019'
        },
        success: function (o) {
           /!* console.log(o);
            console.log(o.data.length);*!/

            var str = '';
            str = '<li class="clearfix"><b>'+1+'</b><span class="tel-phone">'+'134****8521'+'</span><span class="price"><i>￥</i>'+'*45.00'+'</span></li>';
            $(".bangList ul").append(str);

           /!* for(var i=0; i<o.data.length;i++){
                str = '<li class="clearfix"><b>'+(i+1)+'</b><span class="tel-phone">'+o.data[i].custid+'</span><span class="price"><i>￥</i>'+o.data[i].sum_money+'</span></li>';
                $(".bangList ul").append(str);
            }*!/

            var len = $(".bangList ul li").length;
            if(len <= 0){
                $(".bangList ul").html('暂无数据');
            }
            else if(len > 2){
                $(".more").fadeIn(0);
                $(".bangList ul li:gt(1)").hide();
            }

            $(".more").click(function () {
                $(this).fadeOut(200);
                $(".bangList ul li:gt(1)").show();
            });


        }
    });
})();*/

