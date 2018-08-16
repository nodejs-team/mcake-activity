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
            observer:true,
            observeParents:true,
            speed:300,
            autoplay : {
                delay:3000,
                disableOnInteraction: false,
            },
            loop: true,

            pagination: {
                el: '.swiper-pagination1',
                clickable: true
            }
        });


        var swiper2 = new Swiper('.swiper2', {
            observer:true,
            observeParents:true,
            speed:300,
            autoplay : {
                delay:3000,
                disableOnInteraction: false,
            },

            pagination: {
                el: '.swiper-pagination2',
                clickable: true
            }

        });


        $(".moonHide").hide();

        var Tab = {
            _init:function () {
                $('.tab-top li').click(function () {
                    $(this).removeClass("on").siblings().addClass('on');
                    var idx = $(this).index();
                    //$(".tab-box").eq(idx).fadeIn(0).siblings(".tab-box").fadeOut(0);
                    $(".moon").eq(idx).fadeIn(0).siblings(".moon").fadeOut(0);

                    /*swiper4 当display:none 后 再次显示 无法自动滑动问题解决方案：可以通过更改z-index的层级来解决*/
                    $(".tab-box").eq(idx).addClass("on").siblings(".tab-box").removeClass("on");

                });
            }
        };


        Tab._init();

        var open = true;
        $(".guize-more").click(function () {
            if(!open){
                open = true;
                $(".card-guize").slideDown(500);
            }else {
                open = false;
                $(".card-guize").slideUp(600);
                /* $(".card-guize").fadeOut(100);*/
            }

        });

        $(".cardList li").click(function () {
            $(".duihuan-btn").removeClass("on");
            $(this).find(".duihuan-btn").addClass("on");
        });



    };



    var initScroll = function (){
        window.scrollAnimate('#evt_container', [
            {dom: '.sec-0 .quanyi',x:0, y:50,duration:500,delay:200}

             ,{dom: '.sec-main .hy-title',x:0, y:50,duration:500,delay:400}
             ,{dom: '.row1 .cake',x:-100, y:50,duration:500,delay:400}
             ,{dom: '.row1 .price',x:0, y:50,duration:500,delay:400}

            ,{dom: '.row2 .cake',x:100, y:50,duration:500,delay:400}
            ,{dom: '.row2 .price',x:0, y:50,duration:500,delay:400}

            ,{dom: '.row3 .cake',x:-100, y:50,duration:500,delay:400}
            ,{dom: '.row3 .price',x:0, y:50,duration:500,delay:400}

            ,{dom: '.row4 .cake',x:100, y:50,duration:500,delay:400}
            ,{dom: '.row4 .price',x:0, y:50,duration:500,delay:400}


            ,{dom: '.zp',x:0, y:50,duration:500,delay:400}

        ])
    };


})();