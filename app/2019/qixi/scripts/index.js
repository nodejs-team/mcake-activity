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


        $(".cakes.prolist  dd:not('.onlyOne')").each(function () {
            var self = this;
            $(this).find('.m-btn').click(function () {
                $(".go-car").hide(0).siblings().show(0);
                SelectShow(self,[0,0,0,0],1,true,0,0);
            });
        });

        $(".cakes.prolist  dd.onlyOne").each(function () {
            var self = this;
            $(this).find('.m-btn').click(function () {
                $(".go-car").hide(0).siblings().show(0);
                SelectShow(self,[0,0,0,0],1,true,0,0);
            });
        });




        $(".go-car").click(function () {
            SelectHide();
        });
        $(".go-buy,.s-closes").click(function () {
            SelectHide();
        });


        /*活动时间从10点开始*/
        var hour = new Date().getHours();
        if(hour<10){
            $(".btn-n").addClass("end").html("<span>未开始</span>");
        }

    };



})();



