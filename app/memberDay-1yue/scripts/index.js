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
        /**蛋糕*/
        $(".pro-list  li:not(.one)").each(function () {
            var self = this;
            /*立即购买*/
            $(this).find('.go-btn').click(function () {
                $(".s-prices-t").html("会员日专享价：");
                $(".go-car").fadeOut(0);
                $(".go-buy").fadeIn(0);
                $(".d-p").removeClass("dh");
                $(".s-num").fadeIn(0);
                SelectShow(self,[15,30,0,0],1,true,1,0);
            });
            /*立即兑换*/
            $(this).find('.go-dh').click(function () {
                $(".s-prices-t").html("兑换价：");
                $(".d-p").addClass("dh");
                $(".go-car").fadeIn(0);
                $(".go-buy").fadeOut(0);
                SelectShow(self,[30,60,0,0],1,true,1,0);
                $(".s-num").fadeOut(0);
            });
        });
        $(".pro-list  li.one").each(function () {
            var self = this;
            /*立即购买*/
            $(this).find('.go-btn').click(function () {
                $(".s-prices-t").html("会员日专享价：");
                $(".go-car").fadeOut(0);
                $(".go-buy").fadeIn(0);
                $(".d-p").removeClass("dh");
                $(".s-num").fadeIn(0);
                SelectShow(self,[30],1,true,1,0);
            });
            /*立即兑换*/
            $(this).find('.go-dh').click(function () {
                $(".s-prices-t").html("兑换价：");
                $(".d-p").addClass("dh");
                $(".go-car").fadeIn(0);
                $(".go-buy").fadeOut(0);
                SelectShow(self,[60],1,true,1,0);
                $(".s-num").fadeOut(0);
            });
        });
        $(".go-car").click(function () {
            SelectHide();
        });
        $(".go-buy,.s-closes").click(function () {
            SelectHide();
        });


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




