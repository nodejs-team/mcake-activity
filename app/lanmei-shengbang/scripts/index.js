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
        initScroll();
        $(".price li").click(function () {
            $(this).addClass('on').siblings().removeClass('on');
        });
    }
    var initScroll = function (){
        window.scrollAnimate('#evt_container', [
           {dom: '.banner-xiong',x:-100, y:0,duration:500,delay:500}
            ,{dom: '.banner-shu',x:-50, y:0,duration:500,delay:500}
            ,{dom: '.banner-title',x:0, y:-100,duration:500,delay:400}
            ,{dom: '.banner-cake',x:100, y:50,duration:500,delay:800}

            ,{dom: '.s1-cloud1',x:-100, y:0,duration:500,delay:800}
            ,{dom: '.s1-cloud2',x:100, y:0,duration:500,delay:800}
            ,{dom: '.s1-w',x:0, y:-100,duration:500,delay:600}
            ,{dom: '.s1-w2',x:-100, y:0,duration:500,delay:900}
            ,{dom: '.s1-xiong',x:100, y:0,duration:500,delay:500}
            ,{dom: '.s1-cake',x:-100, y:50,duration:500,delay:400}

            ,{dom: '.s2-line',x:0, y:0,duration:500,delay:400}
            ,{dom: '.s2-ny',x:100, y:50,duration:500,delay:600}
            ,{dom: '.s2-w',x:0, y:100,duration:500,delay:800}
            ,{dom: '.s2-w2',x:-100, y:0,duration:500,delay:400}
            ,{dom: '.s2-xiong',x:-100, y:0,duration:500,delay:600}
            ,{dom: '.s2-cake',x:-100, y:0,duration:500,delay:400}
            ,{dom: '.price',x:0, y:100,duration:500,delay:800}

            ,{dom: '.s3-title',x:0, y:100,duration:500,delay:400}
            ,{dom: '.s3-xiong',x:100, y:0,duration:500,delay:600}
            ,{dom: '.s3-cake',x:-100, y:0,duration:500,delay:400}
            ,{dom: '.more',x:-50, y:0,duration:500,delay:800}




        ])
    };


})();