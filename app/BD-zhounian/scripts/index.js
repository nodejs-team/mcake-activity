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

    function conunt(p1,p2,dis) {
        $(".zuhe .price").data('price',p1+p2-dis);
        $(".zuhe .price").html(p1+p2-dis);
    }

    function postId(id1,id2) {
        $(".zuhe .pond").data('postId1',id1);
        $(".zuhe .pond").data('postId2',id2);
    }

    var loadComplete = function () {
        var swiper1 = new Swiper('.swiper1', {
            observer:true,
            observeParents:true,
            speed:300,
            autoplay:false,
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next1',
                prevEl: '.swiper-button-prev1',
            },
            on: {
                slideChangeTransitionEnd: function(){
                    var index = this.activeIndex;
                    price1 = $(".cake-zh .p-old-price").eq(index).data("price");
                    postId1 = $(".cake-zh .p-old-price").eq(index).data("postid");
                    conunt(price1,price2,77);
                    postId(postId1,postId2);
                }
            }
        });

        var swiper2 = new Swiper('.swiper2', {
            observer:true,
            observeParents:true,
            speed:300,
            autoplay:false,
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next2',
                prevEl: '.swiper-button-prev2',
            },
            on: {
                slideChangeTransitionEnd: function(){
                    var index = this.activeIndex;
                    price2 = $(".xiaoshi-zh .p-old-price").eq(index).data("price");
                    postId2 = $(".xiaoshi-zh .p-old-price").eq(index).data("postid");
                    conunt(price1,price2,77);
                    postId(postId1,postId2);
                }
            }
        });

        var price1 = $(".cake-zh .swiper-slide-active").find(".p-old-price").data("price")-0;
        var price2 = $(".xiaoshi-zh .swiper-slide-active").find(".p-old-price").data("price")-0;

        var postId1 = $(".cake-zh .swiper-slide-active").find(".p-old-price").data("postid")-0;
        var postId2 = $(".xiaoshi-zh .swiper-slide-active").find(".p-old-price").data("postid")-0;

        conunt(price1,price2,77);
        postId(postId1,postId2);

        initScroll();
    }

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
           {dom: '.banner-1',x:-50, y:0,duration:500,delay:400}
             ,{dom: '.banner-2',x:50, y:0,duration:500,delay:600}
             ,{dom: '.banner-3',x:-50, y:0,duration:500,delay:800}
             ,{dom: '.banner-4',x:50, y:0,duration:500,delay:1000}
             ,{dom: '.banner-title',x:0, y:50,duration:500,delay:200}
             ,{dom: '.s-title',x:0, y:50,duration:500,delay:200}
             ,{dom: '.zuhe',x:0, y:50,duration:500,delay:400}
             ,{dom: '.sec-haoli',x:0, y:50,duration:500,delay:200}
        ])
    };


})();