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
        /*解决：当前页面点击“立即订购”后跳转到新页面后，再返回当前页，会出现页面里的弹窗定位不准确的问题。*/
        $("html,body").animate({scrollTop:0},100);

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

        /*指定锚点跳转位置*/
        function scrollTopAni(ele,callback) {
            var sTop = $(ele).offset().top-80;
            $("html,body").animate({scrollTop:sTop},500,function () {
                callback && callback();
            });
        }

        /*使用红包*/
        $(".fls2,.go-use").click(function () {
            $(".modal,.shade,.hob-inlet,.shade1").fadeOut(10);
            scrollTopAni("#zhekou"); /*锚点定位*/
            return false;
        });

        /*关闭红包*/
        $(".mod-close").click(function () {
            $(".hob-inlet,.shade1").fadeOut(10);
            $(".modal,.shade").fadeOut(10);
            return false;
        });

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



})();




