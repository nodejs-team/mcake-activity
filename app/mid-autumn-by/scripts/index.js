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
    }

    var initScroll = function (){
        window.scrollAnimate('#evt_container', [
             {dom: '.mon',x:0, y:-100,duration:500,delay:200}
             ,{dom: '.sicon',x:0, y:0,duration:500,delay:400}
             ,{dom: '.b-title',x:0, y:50,duration:800,delay:600}
             ,{dom: '.word',x:0, y:100,duration:1000,delay:800}

             ,{dom: '.ws-1-q',x:0, y:0,duration:500,delay:800}
             ,{dom: '.ws-1',x:100, y:0,duration:500,delay:600}
             ,{dom: '.ka-1',x:0, y:0,duration:500,delay:400}

             ,{dom: '.cloud-1-1',x:-50, y:0,duration:500,delay:800}
             ,{dom: '.cloud-1-2',x:50, y:0,duration:500,delay:800}
             ,{dom: '.c3',x:0, y:50,duration:500,delay:900}
             ,{dom: '.pic-1',x:-50, y:0,duration:500,delay:400}
             ,{dom: '.cake-1',x:100, y:0,duration:500,delay:600}
             ,{dom: '.w-1',x:-50, y:0,duration:500,delay:600}

             ,{dom: '.w-2',x:100, y:0,duration:500,delay:800}
             ,{dom: '.cloud-2-1',x:50, y:0,duration:500,delay:900}
             ,{dom: '.cloud-2-2',x:50, y:0,duration:500,delay:900}
             ,{dom: '.pic-2',x:-50, y:0,duration:500,delay:400}
             ,{dom: '.cake-2',x:-50, y:0,duration:500,delay:600}


             ,{dom: '.w-3',x:-50, y:0,duration:500,delay:800}
             ,{dom: '.cloud-3-1',x:-50, y:0,duration:500,delay:900}
             ,{dom: '.cloud-3-2',x:50, y:0,duration:500,delay:900}
             ,{dom: '.cake-3',x:50, y:0,duration:500,delay:600}
             ,{dom: '.pic-3',x:50, y:0,duration:500,delay:400}

             ,{dom: '.w-4',x:50, y:0,duration:500,delay:800}
             ,{dom: '.c-1',x:50, y:0,duration:500,delay:900}
             ,{dom: '.c-2',x:-20, y:0,duration:500,delay:900}
             ,{dom: '.pic-4',x:-50, y:0,duration:500,delay:400}
             ,{dom: '.cake-4',x:-50, y:0,duration:500,delay:600}
             ,{dom: '.more',x:0, y:0,duration:800,delay:900}

        ])
    };

})();