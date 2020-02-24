;(function(){


    function initTopIcon(){
        var icon = $('.top_icon'),
            winWidth = $(window).width();
        icon.css('top', 150 * (winWidth<1280? 1280 : winWidth) / 1920);
    }

    function startLoading(){
        var loader = new Loader('images/'), domLoad = document.getElementById('evt_loading');
        loader.addGroup('preload', resData);
        loader.on('progress', function(groupName, ix, len){
         
            domLoad.innerHTML = parseInt(ix/len*100) + '%';
        })
        loader.on('complete', function(groupName){
            domLoad.style.display = 'none';
            document.getElementById('evt_container').style.display = 'block';
            isIE();


            initTopIcon();

            $(".floater").fadeOut(10);
            $("html,body").animate({scrollTop: 0},500,function () {
                floater();
            });

        });
        loader.loadGroup('preload');
    }
    startLoading();




    function isIE(){
        if ((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)){

            $(".ftitle,.pro-num,.slideOuter").addClass("ieCss");

        }
    }


    function floater(){
        var floater = $('.floater');
        var headerHeight = $(".header").height();
        var floaterHeight = $('.floater').height();
        var msTop =$(".top_quality").offset().top+180;
        var fTop = 110; /*导航高度*/
        var floaterPosition =floater.css("position") ;  /*'fixed'*/


        $(".floater").fadeIn(500);


        /*初始化位置*/
        floater.css({
            top:msTop-headerHeight,
            position: "absolute"
        });


        floater.find("li").hover(function () {
            $(this).addClass("on").siblings().removeClass("on");
        });

        floater.find("li").click(function () {
            var index=$(this).index();
            var hotspot=$('.sec-hotspot').eq(index).offset().top;
            $("html,body").animate({scrollTop: hotspot-100}, 1000);
        });




        scrollFun();
        function scrollFun() {
            $(window).on("scroll", function(){
                var sTop = $(this).scrollTop();
                if(floaterPosition === 'fixed' &&  sTop < msTop-floaterHeight ){
                    floater.css({
                        position: "absolute",
                        top: msTop-headerHeight
                    });
                    floaterPosition = 'absolute';
                }
                if(floaterPosition === 'absolute' && sTop > msTop-floaterHeight){
                    floater.css({
                        position: "fixed",
                        top: fTop
                    });
                    floaterPosition = 'fixed';
                }
            });
        };
    }


})()