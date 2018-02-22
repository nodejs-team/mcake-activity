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
        $(".quan-guize").click(function () {
            $(".yong-rules").stop().fadeIn();
        });

        $(".yong-rules").click(function () {
            $(".yong-rules").stop().fadeOut();
        });
        initScroll();
    }

    var initScroll = function (){
        window.scrollAnimate('#evt_container', [
             {dom: '.x-title',x:0, y:-50,duration:500,delay:200}
            ,{dom: '.xbg-1',x:0, y:0,duration:800,delay:400}
            ,{dom: '.cake-1',x:-50, y:0,duration:800,delay:400}
            ,{dom: '.xwords-1',x:50, y:0,duration:800,delay:400}
            ,{dom: '.xwords-btn-1',x:50, y:0,duration:800,delay:600}



            ,{dom: '.xbg-3',x:0, y:0,duration:800,delay:400}
            ,{dom: '.cake-3',x:50, y:0,duration:800,delay:200}
            ,{dom: '.xwords-3',x:-50, y:0,duration:800,delay:400}
            ,{dom: '.xwords-btn-3',x:-50, y:0,duration:800,delay:600}

            ,{dom: '.xbg-4',x:0, y:0,duration:800,delay:400}
            ,{dom: '.pic',x:0, y:0,duration:800,delay:800}
            ,{dom: '.car-1',x:-100, y:0,duration:800,delay:400}
            ,{dom: '.car-2',x:-50, y:0,duration:800,delay:1000}
            ,{dom: '.girl',x:50, y:0,duration:800,delay:800}
            ,{dom: '.boy',x:50, y:0,duration:800,delay:800}
            ,{dom: '.cake-4',x:-50, y:-30,duration:800,delay:200}
            ,{dom: '.xwords-4',x:50, y:0,duration:800,delay:400}
            ,{dom: '.xwords-btn-4',x:100, y:0,duration:800,delay:1000}




        ])
    };



})();