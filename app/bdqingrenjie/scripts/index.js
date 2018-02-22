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

        initScroll();

        var swiper1 = new Swiper('.swiper1', {
            slidesPerView: 1,
            speed:300,
            autoplay : {
                delay:5000
            },
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }
        });

        $(".swiper-button").click(function () {
            swiper1.autoplay.start();
        });

        /*定时刷新剩余蛋糕数*/
        window.setInterval(function(){

            var num_a=new Array();
            var num=$("#num").attr("data-name");
            var img="";
            num_a=(''+num).split('');

            for(i=0;i<num_a.length;i++){
                img+="<li><img src='http://edm.mcake.com/fangli/2018-wap/bdqingrenjie/images/number_"+num_a[i]+".png'></li>"
                $("#num").html(img);
            }
        }, 1000);

        /*限制textarea字数*/
        String.prototype.len = function()
        {
            return this.replace(/[^\x00-\xff]/g, "xx").length;
        }

        $(document).on("keyup","textarea",function(){
            $(this).val(sub($(this).val(),400));
            console.log();
            $(".love_letters samp").html("最多可输入200个字("+parseInt(($("textarea").val().len())/2)+"\/200)");
        });

        /*点击磅数*/
        $(".swiper1 dl dd").on("click",function(){
            swiper1.autoplay.stop();
            $(this).siblings().removeClass("cur");
            $(this).addClass("cur");
            $(this).parents(".swiper1 .swiper-slide").find(".cake_price_buy b").html($(this).attr("data-price"));
        });

    };

    var initScroll = function (){
        window.scrollAnimate('#evt_container', [])
    };


    var sub=function(str,n){
        var r=/[^\x00-\xff]/g;
        if(str.replace(r,"mm").length<=n){return str;}
        var m=Math.floor(n/2);
        for(var i=m;i<str.length;i++){
            if(str.substr(0,i).replace(r,"mm").length>=n){
                return str.substr(0,i);
            }
        }
        return str;
    }



})();

/*判断手机横竖屏状态：*/
!+(function () {

    function hengshuping() {
        if (window.orientation == 180 || window.orientation == 0) {
            window.location.reload();
        }
        if (window.orientation == 90 || window.orientation == -90) {
            window.location.reload();
        }
    }
    window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);
})();