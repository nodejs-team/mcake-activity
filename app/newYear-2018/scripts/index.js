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

        var swiper1 = new Swiper('.swiper1', {
            slidesPerView: 1,
            speed:300,
            autoplay : {
                delay:3000
            },
            loop:true,
            pagination: {
                el: '.swiper-pagination1',
                clickable: true
            },
            on: {
                slideChangeTransitionEnd: function(){
                    $(".fudai li").eq(this.realIndex).addClass("on").siblings().removeClass("on");

                },
            }
        });

        $(".fudai li").click(function () {
            var idx = $(this).index();

            $(this).addClass("on").siblings().removeClass("on");
            var len = $(".swiper1 .swiper-slide").length;

            swiper1.autoplay.stop();
            if(idx ==0){
                swiper1.slideTo(len-1, 1000, false);
            }else {
                swiper1.slideTo(len-2, 1000, false);
            }

            setTimeout( swiper1.autoplay.start(),3000);
        });

        $(".buys span").hover(function () {
            $(this).addClass("on").siblings().removeClass("on");
        });


        initScroll();

    }

    var initScroll = function (){
        window.scrollAnimate('#evt_container', [
             {dom: '.b-1',x:0, y:-50,duration:500,delay:200},
             {dom: '.b-2',x:0, y:50,duration:500,delay:400},
             {dom: '.b-3',x:0, y:50,duration:500,delay:200},

             {dom: '.t1',x:0, y:-50,duration:500,delay:200},
             {dom: '.card',x:0, y:50,duration:500,delay:200},
             {dom: '.t2',x:0, y:50,duration:500,delay:400},


             {dom: '.t3',x:0, y:-50,duration:500,delay:200},
             {dom: '.t4',x:0, y:-50,duration:500,delay:200},
             {dom: '.wnl',x:0, y:50,duration:500,delay:200},
             {dom: '.products',x:0, y:50,duration:500,delay:200},
             {dom: '.coffee',x:-100, y:0,duration:500,delay:200},
             {dom: '.more',x:100, y:0,duration:500,delay:200}



        ])
    };


    var $Select = $(".Select"),
        $bangshu = $Select.find(".s-bangshu"),
        $price = $Select.find(".s-price");
    var num = 1,
        pond = 2,
        price = 0,
        postid = 0,
        totaPrice=0;
    /*数量选择*/
    function SelectShow(ele) {
        var ponds = [];
        var prices = [];
        var postids = [];
        var pondsingle = $(ele).data("pond").indexOf(",");

        /*只有1盒*/
        if(pondsingle<0){
            ponds = $(ele).data("pond").split(',');
            prices = $(ele).data("price");
            postids = $(ele).data("postid");

            /*初始化默认*/
            $price.html(prices);
            $(".postid").data('postid',postids);
            $Select.find("li").eq(1).addClass("on").siblings().removeClass("on");
            $(".num").val(1);
            price = prices;

            var str = '';
            str = '<li class="on" data-pond="'+ponds+'">'+ponds+'</li>';
            $bangshu.find("ul").append(str);


        }else{  /*多磅数选择*/
            ponds = $(ele).data("pond").split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")});
            prices = $(ele).data("price").split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")});
            postids = $(ele).data("postid").split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")});


            /*初始化默认*/
            $price.html(prices[1]);
            $(".postid").data('postid',postids[1]);
            $Select.find("li").eq(1).addClass("on").siblings().removeClass("on");
            $(".num").val(1);
            price = prices[1];


            var len = ponds.length;

            for(var i=0; i<len; i++){
                var str = '';
                if(i==1){
                    str = '<li class="on" data-pond="'+ponds[i]+'">'+ponds[i]+'</li>';
                }else{
                    str += '<li data-pond="'+ponds[i]+'">'+ponds[i]+'</li>';
                }

                $bangshu.find("ul").append(str);

                $bangshu.find("li").each(function (i) {  /*磅数选择*/
                    var self = $(this);
                    $(this).data("price",prices[i]);
                    $(this).data("postid",postids[i]);

                    $(this).click(function () {
                        postid = self.data("postid");
                        $(".postid").data('postid',postid);

                        price = self.data("price");
                        totaPrice = price * num;
                        $price.html(totaPrice);
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
        $price.html(totaPrice);
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
        $price.html(totaPrice);
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

})();