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

    var initScroll = function (){
        window.scrollAnimate('#evt_container', [
            {dom: '.s-title',x:0, y:-0,opacity:0,duration:800,delay:500}
            ,{dom: '.mountain',x:0, y:0,opacity:0,duration:800,delay:500}
            ,{dom: '.cake',x:0, y:0,opacity:0,duration:800,delay:800}
            ,{dom: '.cloud-1',x:0, y:0,opacity:0,duration:800,delay:500}
            ,{dom: '.cloud-2',x:0, y:0,opacity:0,duration:800,delay:500}
            ,{dom: '.floader',x:0, y:0,opacity:0,duration:800,delay:500}
            ,{dom: '.tips',x:0, y:0,opacity:0,duration:800,delay:800}
            ,{dom: '.across',x:0, y:0,opacity:0,duration:800,delay:800}
            ,{dom: '.line',x:0, y:0,opacity:0,duration:800,delay:1200}

            ,{dom: '.cake-1',x:200, y:0,opacity:0,duration:800,delay:1300}
            ,{dom: '.cake-w-1',x:-200, y:0,opacity:0,duration:800,delay:1300}

            ,{dom: '.cake-2',x:-200, y:0,opacity:0,duration:800,delay:1500}
            ,{dom: '.cake-w-2',x:200, y:0,opacity:0,duration:800,delay:1500}

            ,{dom: '.cake-3',x:200, y:0,opacity:0,duration:800,delay:1500}
            ,{dom: '.cake-w-3',x:-200, y:0,opacity:0,duration:800,delay:1800}
        ])
    }

    
    var loadComplete = function () {
        initScroll();
    }

})();