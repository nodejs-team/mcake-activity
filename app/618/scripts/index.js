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
        $(".prolist li").each(function () {
            var self = this;
            $(this).find('.btns').click(function () {
                $(".go-car").hide(0).siblings().show(0);
                SelectShow(self,[0,0,0,0],1,true,0,0);
            });
            $(this).find('.cart').click(function () {
                $(".go-buy").hide(0).siblings().show(0);
                SelectShow(self,[0,0,0,0],1,true,0,0);
            });
        });
        $(".go-car").click(function () {
            SelectHide();
        });
        $(".go-buy,.s-closes").click(function () {
            SelectHide();
        });

        floater();
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



function floater(){
    var height = $(".part-2").offset().top;
    var secheight = $(".part-2").outerHeight();
    var fHeight = 177;
    var fTop = 100;
    var fRight = 10;
    var floater = $('#floater');
    var floaterPosition = 'absolute';
    var winWidth = $(window).width();
    var absRight = winWidth<1280 ? (1280-winWidth+fRight) : fRight;

    $(window).on("scroll", function(){
        var sTop = $(this).scrollTop();

        if(floaterPosition === 'fixed' &&  sTop <= height ){
            floater.css({position: "absolute"});
            floaterPosition = 'absolute';
        }

        if(floaterPosition === 'absolute' &&  sTop > height && sTop <= height+secheight-330){
            floater.css({position: "fixed"});
            floaterPosition = 'fixed';
        }

        if(floaterPosition === 'fixed' && sTop > height+secheight-330){
            floater.css({position: "absolute"});
            floaterPosition = 'absolute';

        }
    });


};