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
            {dom: '.b-title',x:0, y:-50,opacity:0,duration:800}
            ,{dom: '.cloud-1',x:50, y:-0,opacity:0,duration:800,delay:500}
            ,{dom: '.line-cloud',x:50, y:-0,opacity:0,duration:800,delay:500}
            ,{dom: '.line',x:0, y:-0,opacity:0,duration:800,delay:1000}
            ,{dom: '.ricotta',x:0, y:-0,opacity:0,duration:800,delay:1000}
            ,{dom: '.cake-ricotta',x:50, y:-0,opacity:0,duration:800,delay:500}
            ,{dom: '.words-1-bg',x:0, y:-0,opacity:0,duration:800,delay:500}
            ,{dom: '.words-1',x:-50, y:-0,opacity:0,duration:800,delay:500}
            ,{dom: '.hetao',x:0, y:-0,opacity:0,duration:800,delay:500}
            ,{dom: '.words-2',x:50, y:-0,opacity:0,duration:800,delay:500}
            ,{dom: '.shuidi',x:50, y:-0,opacity:0,duration:800,delay:500}
            ,{dom: '.cake-2',x:-50, y:-0,opacity:0,duration:800,delay:500}
            ,{dom: '.buybtn',x:0, y:-0,opacity:0,duration:800,delay:500}
            ,{dom: '.shengbang',x:0, y:-0,opacity:0,duration:800,delay:500}

            ])
    }
    
    var loadComplete = function () {

        initScroll();
    }

})();