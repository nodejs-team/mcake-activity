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
        var imageBackground=$("#imageBackground").attr("src");
        var pictureOver=$("#pictureOver").attr("src");
      /*  console.log(imageBackground);*/

        /*刮刮卡*/
        var scratch = new Scratch({
            canvasId: 'js-scratch-canvas',
            imageBackground: imageBackground,
            pictureOver: pictureOver,
            cursor: {
                x: '-20',
                y: '-20'
            },

            radius: 40,
            nPoints: 1000,
            percent: 30,
            callback: function () {/*刮刮之后的函数*/
                $(".guaguaka").fadeOut(100);
            },
            pointSize: { x: 5, y: 5}
        });

        $('.guaguaka,.cover').on('touchstart',function(e) {
            $(".cover").fadeOut(100);
        });

        /*答题*/
       /* $(".pct .cover").click(function () {
            $(this).fadeOut(500);
        });*/


        $(".qt").each(function () {
            $(this).find("span").click(function () {
                $(this).parents(".qt").attr("data-answer",1);
                var id = $(this).attr("data-id");
                $(this).find(".select").addClass("on");
                $(this).siblings().find(".select").removeClass("on");
                $(this).parents(".qt").attr("data-id",id);
            });


            $(".next").click(function () {
                var as = $(this).parent(".qt").attr("data-answer");
                if(as==1){
                    $(this).parent(".qt").fadeOut(0).next().fadeIn(100);
                }
                var ids = $(this).parents(".qt").attr("data-id");

                $(".submit").attr("data-answer",ids);
            });

        });


        /*商品组合价格*/
        var cakesku = $(".products li").eq(0).data("sku"); /*巧克力牌*/
        var xsSku = $(".select-li li").data("sku");  /*蛋糕*/
        var cakePrice = $(".products li").eq(0).data("price")-0; /*巧克力牌*/
        var xsPrice = $(".select-li li").data("price")-0; /*巧克力牌*/

        var dis=0;
        var disXs=48;
        /*$(".buy-btn").attr("data-sku",cakesku+","+xsSku);*/
        $(".zuhe").html(cakePrice-dis+xsPrice-disXs);
        $(".zuhe-old").html(cakePrice+xsPrice);


        $(".products li").each(function () {
            $(this).find(".m-car").click(function () {
                cake=true;
                cakesku= $(this).parents("li").attr("data-sku");
                cakePrice= $(this).parents("li").attr("data-price")-0;
                $(this).addClass("on").siblings().removeClass("on");
                $(this).parents("li").siblings().find(".m-car").removeClass("on");
                $(".buy-btn").attr("data-sku",cakesku+","+xsSku);
                $(".zuhe").html(cakePrice-dis+xsPrice-disXs);
                $(".zuhe-old").html(cakePrice+xsPrice);
            });

        });

        $(".select-li li").each(function () {
            $(this).find(".m-car").click(function () {
                xiaoshi=true;
                xsSku= $(this).parents("li").attr("data-sku");
                xsPrice= $(this).parents("li").attr("data-price")-0;
                $(this).addClass("on").siblings().removeClass("on");
                $(this).parents("li").siblings().find(".m-car").removeClass("on");
                $(".buy-btn").attr("data-sku",cakesku+","+xsSku);
                $(".zuhe").html(cakePrice-dis+xsPrice-disXs);
                $(".zuhe-old").html(cakePrice+xsPrice);
            });

        });


       /* var cake=false;
        var xiaoshi=false;
        $(".buy-btn").click(function () {
            if(cake==false&&xiaoshi==false){
                alert("产品还未勾选");
                return false;
            }
            else if(cake==false){
                alert("蛋糕还未勾选");
                return false;
            }else if(xiaoshi==false){
                alert("小食还未勾选");
                return false;
            }

        });*/

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



(function () {
    /*领取优惠券*/
    var $Dialogbg = $(".Dialogbg-quan"),
        $Dialog=$(".Dialog-quan"),
        $card=$(".card"),
        $rules=$(".quan"),
        $goUse=$(".go-use"),
        $closes=$(".closes");

    function QuanDialog(n) {
        $Dialogbg.fadeIn(300);
        $Dialog.fadeIn(300);

       /* $card.find("img").attr("src","https://act.mcake.com/fangli/2019/wap/memberDay-7yue/images/card-"+n+".png");*/
        $Dialog.find(".quan").fadeIn(300).siblings().not(".closes").hide();
    }

    /*关闭*/
    $closes.click(function () {
        $Dialogbg.fadeOut(300);
        $Dialog.fadeOut(300);
    });

    $goUse.click(function () {
        $Dialogbg.fadeOut(300);
        $Dialog.fadeOut(300);
    });


    window.QuanDialog = QuanDialog;

})();

