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
        /*日期判断，更换日历*/
        var vDate = new Date();
        var myDate = vDate.getFullYear() + '-' + (vDate.getMonth() + 1) + '-' + vDate.getDate(); /*解决安卓浏览器时间显示问题*/
        var myDay = vDate.getDate();
        $(".xiaoshiBox li").find(".noStartbox").fadeIn(0);
        $(".xiaoshiBox li").find(".btn-hg").fadeOut(0);
        $(".xiaoshiBox li").find(".noStart").fadeIn(0);
        switch (myDay){
            case 4:
                $(".xiaoshiBox li").eq(0).find(".noStartbox").fadeOut(0);
                $(".xiaoshiBox li").eq(0).find(".btn-hg").fadeIn(0);
                $(".xiaoshiBox li").eq(0).find(".noStart").fadeOut(0);
                break;
            case 11:
                $(".xiaoshiBox li").eq(1).find(".noStartbox").fadeOut(0);
                $(".xiaoshiBox li").eq(1).find(".btn-hg").fadeIn(0);
                $(".xiaoshiBox li").eq(1).find(".noStart").fadeOut(0);
                break;
            case 18:
                $(".xiaoshiBox li").eq(2).find(".noStartbox").fadeOut(0);
                $(".xiaoshiBox li").eq(2).find(".btn-hg").fadeIn(0);
                $(".xiaoshiBox li").eq(2).find(".noStart").fadeOut(0);
                break;
            case 25:
                $(".xiaoshiBox li").eq(3).find(".noStartbox").fadeOut(0);
                $(".xiaoshiBox li").eq(3).find(".btn-hg").fadeIn(0);
                $(".xiaoshiBox li").eq(3).find(".noStart").fadeOut(0);
                break;
        }

        if(myDay>=4 && myDay<11){
            $(".xiaoshiBox li:lt(1)").find(".time").text("已结束");
        }else if(myDay>=11 && myDay<18){
            $(".xiaoshiBox li:lt(2)").find(".time").text("已结束");
        }else if(myDay>=18 && myDay<25){
            $(".xiaoshiBox li:lt(3)").find(".time").text("已结束");
        }if(myDay>=25){
            $(".xiaoshiBox li").find(".time").text("已结束");
        }
    };

})();




