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



        new Price('.js_price',{
            add:'.add',
            reduce:'.reduce'
        },[0,0,0,0],1);

        $(".huangou").each(function () {
            var huangou = false;
            var cakeSku =  $(this).parents(".price").find("li.cur").attr("data-sku");  /*蛋糕*/
            var sku = $(this).data("sku"); /*换购sku*/
            $(this).parents(".price").find(".go-buy").attr("data-sku",cakeSku);
            $(this).parents(".price").find(".go-buy").attr("data-num",1);
            var self = $(this)
            $(this).click(function () {
                cakeSku =  $(this).parents(".price").find("li.cur").attr("data-sku");  /*蛋糕*/
                $(this).addClass("on").siblings().removeClass("on");
                /*新版wap需要配置data*/
                if(huangou){
                    $(this).parents(".price").find(".go-buy").attr("data-sku",cakeSku);
                    $(this).parents(".price").find(".go-buy").attr("data-num",1);
                    $(this).find("icon").removeClass("on");
                    huangou = false;
                }else{
                    $(this).parents(".price").find(".go-buy").attr("data-sku",cakeSku+","+sku);
                    $(this).parents(".price").find(".go-buy").attr("data-num",1+","+1);
                    $(this).find("icon").addClass("on");
                    huangou = true;
                }
            });
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




