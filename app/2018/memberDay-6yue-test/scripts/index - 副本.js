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

        /*initScroll();*/
    }
    function startLoading(){
       /* loader = new Loader('images/');
        var domLoad = document.getElementById('evt_loading');
        domLoad.style.display = 'block';
        loader.addGroup('preload', resData);
        loader.on('progress', function(groupName, ix, len){
            domLoad.innerHTML = parseInt(ix/len*100) + '%';
        });
        loader.on('complete', function(groupName){

        });
        loader.loadGroup('preload');*/

       /* fixImageSrc(loader.getAll());*/
       /* domLoad.style.display = 'none';*/
        document.getElementById('evt_content').style.display = 'block';
        loadComplete();

        /*resdata.js 使用https加载图片有问题*/
    }
    startLoading();






    var initScroll = function (){
        window.scrollAnimate('#evt_container', [
           {dom: '.sec-main .hy-title',x:0, y:50,duration:500,delay:400}
             ,{dom: '.row1 .cake',x:-100, y:50,duration:500,delay:400}
             ,{dom: '.row1 .price',x:0, y:50,duration:500,delay:400}

            ,{dom: '.row2 .cake',x:100, y:50,duration:500,delay:400}
            ,{dom: '.row2 .price',x:0, y:50,duration:500,delay:400}

            ,{dom: '.row3 .cake',x:-100, y:50,duration:500,delay:400}
            ,{dom: '.row3 .price',x:0, y:50,duration:500,delay:400}

            ,{dom: '.row4 .cake',x:100, y:50,duration:500,delay:400}
            ,{dom: '.row4 .price',x:0, y:50,duration:500,delay:400}


            ,{dom: '.zp',x:0, y:50,duration:500,delay:400}

        ])
    };


})();