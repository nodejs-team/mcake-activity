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
        animates.girl_a();
        animates.girl_b();
        initScroll();
    }
    
    var animates = {
        girl_a:function () {
            //图片配置
            var mcConfig = {
                "girl-a-1":{"x":0,"y":134,"w":149,"h":132,"offX":6,"offY":4,"sourceW":164,"sourceH":140,"duration":5},
                "girl-a-2":{"x":151,"y":134,"w":148,"h":131,"offX":6,"offY":5,"sourceW":164,"sourceH":140,"duration":1},
                "girl-a-3":{"x":0,"y":0,"w":154,"h":132,"offX":6,"offY":4,"sourceW":164,"sourceH":140,"duration":1},
                "girl-a-4":{"x":151,"y":267,"w":131,"h":134,"offX":3,"offY":2,"sourceW":164,"sourceH":140,"duration":30}
            };
            // MovieClip 可以通过duration控制两张图片轮播的速度。duration:0.2*10=2
            new MovieClip('girl-a', loader.get('girl-a_png').data,formatResData(mcConfig)).play();
        },
        girl_b:function () {
            //图片配置
            var mcConfig = {
                "girl-b-1":{"x":0,"y":0,"w":122,"h":233,"offX":0,"offY":3,"sourceW":122,"sourceH":238,"duration":5},
                "girl-b-2":{"x":124,"y":0,"w":95,"h":223,"offX":26,"offY":13,"sourceW":122,"sourceH":238,"duration":30}
            };
            // MovieClip 可以通过duration控制两张图片轮播的速度。duration:0.2*10=2
            new MovieClip('girl-b', loader.get('girl-b_png').data,formatResData(mcConfig)).play();
        }
    }

    var initScroll = function (){
        window.scrollAnimate('#evt_container', [
            {dom: '.s-title',x:0, y:-500,duration:800}
            ,{dom: '.cake',x:0, y:200,opacity:0,duration:800,delay:500}
            ,{dom: '.acrow1',opacity:0,duration:800,delay:1000}
            ,{dom: '.r-clod1',opacity:0,duration:1500,delay:800}
            ,{dom: '.r-clod2',opacity:0,duration:2000,delay:500}
            ,{dom: '.s-cake1',x:-200,duration:500,delay:1000}
            ,{dom: '.s-cake2',opacity:0,duration:500,delay:1300}
            ,{dom: '.s-cake3',opacity:0,duration:500,delay:1600}
            ,{dom: '.s-cake4',opacity:0,duration:500,delay:2000}
            ,{dom: '.word-1',x:500,duration:1300,delay:1000}
            ,{dom: '.word-2',x:-500,duration:1000,delay:800}
            ,{dom: '.girl-a',opacity:0,duration:500,delay:2000}
            ,{dom: '.girl-b',opacity:0,duration:500,delay:1300}
            ,{dom: '.girl-c',x:200, y:-100,opacity:0,duration:1000,delay:1500}
            ,{dom: '.girl-d',x:-200, y:-100,opacity:0,duration:1000,delay:1500}
            ,{dom: '.girl-e',x:300, y:200,opacity:0,duration:1000,delay:800}
            ,{dom: '.product-1',opacity:0,duration:1000,delay:1000}
            ,{dom: '.acrow',opacity:0,duration:800,delay:1500}
            ,{dom: '.details',opacity:0,y:200,duration:800,delay:800}
            ,{dom: '.product-2',opacity:0,y:200,duration:800,delay:800}

        ])
    }

})();