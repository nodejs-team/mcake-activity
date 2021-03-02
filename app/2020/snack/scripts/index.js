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

        var swiper1 = new Swiper('.swiper1', {
            observer:true,
            observeParents:true,
            speed:300,
            loop: true,
            pagination: {
                el: '.swiper-pagination1',
                clickable: true
            },
            autoplay : {
                delay:3000,
                disableOnInteraction: false
            }
        });

        var swiper2 = new Swiper('.swiper2', {
            observer:true,
            observeParents:true,
            speed:300,
            loop: true,
            pagination: {
                el: '.swiper-pagination2',
                clickable: true
            },
            autoplay : {
                delay:3000,
                disableOnInteraction: false
            }
        });

        var swiper3 = new Swiper('.swiper3', {
            observer:true,
            observeParents:true,
            speed:300,
            loop: true,
            pagination: {
                el: '.swiper-pagination3',
                clickable: true
            },
            autoplay : {
                delay:3000,
                disableOnInteraction: false
            }
        });

        $(".row").each(function (i) {
            var num = 1;
            $(this).find(".minus").click(function () {
                num--;
                if(num<=1){
                    num = 1;
                }
                $(this).parents(".row").find(".num").html(num);
                $(this).parents(".row").find(".num").attr("data-num", num);
                $(this).parents(".row").find(".num").attr("data-num", num);
                $(this).parents(".row").find(".buy_btn").attr("data-num", num);
            });
            $(this).find(".plus").click(function () {
                num++;
                if(num>=50){
                    num=50;
                }
                $(this).parents(".row").find(".num").html(num);
                $(this).parents(".row").find(".num").attr("data-num", num);
                $(this).parents(".row").find(".buy_btn").attr("data-num", num);
            });
        });


       /* initScroll();*/
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

             ,{dom: '.sec-0 .hy-title',x:0, y:50,duration:500,delay:400}
             ,{dom: '.row1 .cake',x:100, y:50,duration:500,delay:400}
             ,{dom: '.row1 .price',x:0, y:50,duration:500,delay:400}

            ,{dom: '.row2 .cake',x:-100, y:50,duration:500,delay:400}
            ,{dom: '.row2 .price',x:0, y:50,duration:500,delay:400}

            ,{dom: '.row3 .cake',x:100, y:50,duration:500,delay:400}
            ,{dom: '.row3 .price',x:0, y:50,duration:500,delay:400}

            ,{dom: '.row4 .cake',x:-100, y:50,duration:500,delay:400}
            ,{dom: '.row4 .price',x:0, y:50,duration:500,delay:400}


        ])
    };


})();


