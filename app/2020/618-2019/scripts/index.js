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





    /*页面加载完成*/
    var loadComplete = function () {

        $("html,body").animate({scrollTop:0},500);

        $(".moon.prolist li").each(function () {
            var self = this;
            $(this).find('.m-car').click(function () {
                $(".go-buy").hide(0).siblings().show(0);
                SelectShow(self,[0,0,0,0],1,true,1,0);
            });
            $(this).find('.m-btn').click(function () {
                $(".go-car").hide(0).siblings().show(0);
                SelectShow(self,[0,0,0,0],1,true,1,0);
            });
        });

        $(".cakes.prolist dd").each(function () {
            var self = this;
            $(this).find('.m-btn').click(function () {
                $(".go-car").hide(0).siblings().show(0);
                SelectShow(self,[0,0,0,0],0.88,true,1,0);
            });
        });

        $(".cakes-list.prolist dd").each(function () {
            var self = this;
            $(this).find('.m-btn').click(function () {
                $(".go-car").hide(0).siblings().show(0);
                SelectShow(self,[0,0,0,0],0.9,true,1,0);
            });
        });
        $(".go-car").click(function () {
            SelectHide();
        });
        $(".go-buy,.s-closes").click(function () {
            SelectHide();
        });

        /*按钮变色*/
        $(".zn-btn,.buy-yuanbtn,.m-car,.m-btn,.go-buy,go-car").hover(function () {
            $(this).addClass("on");
        },function () {
            $(this).removeClass("on");
        });

        $(".buy-btn").hover(function () {
            $(this).addClass("on").siblings().removeClass("on");
        });


    };






})();



