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
                delay:3000,
                disableOnInteraction:false
            },
            loop: true

        });
        $('.arrow-left').click(function(){
            swiper1.slidePrev();
            swiper1.autoplay.start();
        });
        $('.arrow-right').click(function(){
            swiper1.slideNext();
            swiper1.autoplay.start();
        });

        $('.num-minus,.num-add').click(function(){
            swiper1.autoplay.stop();
            setTimeout(function () {
                swiper1.autoplay.start();
            },5000);
        })


        initScroll();
        initNum();
    }

    var initScroll = function (){
        window.scrollAnimate('#evt_container', [
             {dom: '.baner-cake',x:100, y:0,duration:500,delay:200}
             ,{dom: '.baner-ren',x:-100, y:50,duration:500,delay:400}
             ,{dom: '.baner-title',x:0, y:50,duration:500,delay:400}
             ,{dom: '.baner-box',x:0, y:50,duration:500,delay:600}

        ])
    };

    function initNum() {
        $(".swiper-container  .pro-li").each(function () {
            var self = $(this);
            var ponds = $(this).attr('data-pond');
            var ids = $(this).attr('data-postID');
            var pondsInit= 0;
            var idsInit= 0;
            pondsInit = ponds.split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")});
            idsInit = ids.split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")})

            /*初始化*/
            $(this).find(".num").html(pondsInit[0]);
            $(this).find(".postID").val(idsInit[0]);

            var num = 0;
            var len = pondsInit.length;
            //var currentItem = items[0];
            /*数量减少*/
            $(this).find('.num-minus').click(function () {
                --num;
                if(num <= 0){
                    num=0;
                    // ix = currentItem.ix = currentItem.ponds.length-1;
                }
                self.find(".num").html(pondsInit[num]);
                self.find(".postID").val(idsInit[num]);

            });

            /*数量增加*/

            $(this).find('.num-add').click(function () {
                ++num;
                if(num >= len){
                    num = len-1;
                }
                self.find(".num").html(pondsInit[num]);
                self.find(".postID").val(idsInit[num]);

            });



        });
    }



})();