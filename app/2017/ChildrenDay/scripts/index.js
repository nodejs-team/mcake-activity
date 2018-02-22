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
        animates.baozi();
        animates.longmogu();
        animates.chezi();
        animates.tuzi();


    };

    var animates = {
        baozi:function () {
            //图片配置
            var mcConfig = {
                "baozi-1":{"x":1,"y":163,"w":190,"h":160,"offX":1,"offY":3,"sourceW":199,"sourceH":163,"duration":1},
                "baozi-2":{"x":1,"y":325,"w":185,"h":163,"offX":1,"offY":0,"sourceW":199,"sourceH":163,"duration":1},
                "baozi-3":{"x":193,"y":1,"w":190,"h":160,"offX":1,"offY":3,"sourceW":199,"sourceH":163,"duration":1},
                "baozi-4":{"x":188,"y":325,"w":185,"h":163,"offX":1,"offY":0,"sourceW":199,"sourceH":163,"duration":1},
                "baozi-5":{"x":1,"y":1,"w":190,"h":160,"offX":1,"offY":3,"sourceW":199,"sourceH":163,"duration":5}
            };
            // MovieClip 可以通过duration控制两张图片轮播的速度。duration:0.2*10=2
            new MovieClip('baozi', loader.get('baozi_png').data,formatResData(mcConfig)).play();
        }
        ,longmogu:function () {
            //图片配置
            var mcConfig = {
                "longmogu-1":{"x":1,"y":1,"w":47,"h":163,"offX":2,"offY":2,"sourceW":52,"sourceH":166,"duration":2},
                "longmogu-2":{"x":50,"y":1,"w":47,"h":160,"offX":2,"offY":5,"sourceW":52,"sourceH":166,"duration":2},
                "longmogu-3":{"x":148,"y":1,"w":47,"h":156,"offX":2,"offY":9,"sourceW":52,"sourceH":166,"duration":2},
                "longmogu-4":{"x":99,"y":1,"w":47,"h":160,"offX":2,"offY":5,"sourceW":52,"sourceH":166,"duration":2}
            };
            // MovieClip 可以通过duration控制两张图片轮播的速度。duration:0.2*10=2
            new MovieClip('long-mogu', loader.get('longmogu_png').data,formatResData(mcConfig)).play();
        }
        ,chezi:function () {
            //图片配置
            var mcConfig = {
                "che-1":{"x":185,"y":1,"w":174,"h":158,"offX":6,"offY":10,"sourceW":188,"sourceH":170,"duration":2},
                "che-2":{"x":1,"y":1,"w":182,"h":168,"offX":6,"offY":0,"sourceW":188,"sourceH":170,"duration":2}
            };
            // MovieClip 可以通过duration控制两张图片轮播的速度。duration:0.2*10=2
            new MovieClip('chezi', loader.get('chezi_png').data,formatResData(mcConfig)).play();
        }
        ,tuzi:function () {
            //图片配置
            var mcConfig = {
                "tuzi-10":{"x":751,"y":637,"w":248,"h":316,"offX":4,"offY":0,"sourceW":461,"sourceH":327,"duration":3},
                "tuzi-1":{"x":501,"y":637,"w":248,"h":316,"offX":4,"offY":9,"sourceW":461,"sourceH":327,"duration":3},
                "tuzi-2":{"x":751,"y":319,"w":248,"h":316,"offX":4,"offY":0,"sourceW":461,"sourceH":327,"duration":3},
                "tuzi-3":{"x":501,"y":319,"w":248,"h":316,"offX":4,"offY":9,"sourceW":461,"sourceH":327,"duration":3},
                "tuzi-4":{"x":251,"y":637,"w":248,"h":316,"offX":4,"offY":0,"sourceW":461,"sourceH":327,"duration":3},
                "tuzi-5":{"x":251,"y":319,"w":248,"h":316,"offX":4,"offY":9,"sourceW":461,"sourceH":327,"duration":3},
                "tuzi-6":{"x":1,"y":637,"w":248,"h":316,"offX":4,"offY":0,"sourceW":461,"sourceH":327,"duration":3},
                "tuzi-7":{"x":451,"y":1,"w":448,"h":316,"offX":4,"offY":0,"sourceW":461,"sourceH":327,"duration":1},
                "tuzi-8":{"x":1,"y":319,"w":248,"h":316,"offX":4,"offY":0,"sourceW":461,"sourceH":327,"duration":1},
                "tuzi-9":{"x":1,"y":1,"w":448,"h":316,"offX":4,"offY":0,"sourceW":461,"sourceH":327,"duration":1}
            };
            // MovieClip 可以通过duration控制两张图片轮播的速度。duration:0.2*10=2
            new MovieClip('tuzi', loader.get('tuzi_png').data,formatResData(mcConfig)).play();
        }
    };

    function initScroll(){
        window.scrollAnimate('#evt_container', [
            {dom: '.t1',x:0, y:-100,opacity:0,duration:200}
            ,{dom: '.tree',x:-100, y:0,opacity:0,duration:800,delay:300}
            ,{dom: '.xiaocao',x:0, y:0,opacity:0,duration:800,delay:800}
            ,{dom: '.cake-1',x:0, y:0,opacity:0,duration:800,delay:500}
            ,{dom: '.dadi',x:-50, y:0,opacity:0,duration:800,delay:800}
            ,{dom: '.che',x:-100, y:0,opacity:0,duration:800,delay:800}
            ,{dom: '.long-mogu',x:0, y:30,opacity:0,duration:800,delay:800}
            ,{dom: '.baozi',x:100, y:0,opacity:0,duration:800,delay:500}
            ,{dom: '.word-1',x:100, y:0,opacity:0,duration:800,delay:500}
            ,{dom: '.across',x:0, y:-50,opacity:0,duration:800,delay:500}
            ,{dom: '.small-pic-1',x:0, y:0,opacity:0,duration:800,delay:1000}
            ,{dom: '.small-pic-2',x:0, y:0,opacity:0,duration:800,delay:1000}
            ,{dom: '.small-pic-3',x:0, y:0,opacity:0,duration:800,delay:1000}
            ,{dom: '.pic',x:-100, y:0,opacity:0,duration:800,delay:500}
            ,{dom: '.cake-2',x:100, y:0,opacity:0,duration:800,delay:500}
            ,{dom: '.tuzi',x:-100, y:0,opacity:0,duration:800,delay:500}
            ,{dom: '.jieshao',x:50, y:0,opacity:0,duration:800,delay:500}
            ,{dom: '.kuai',x:0, y:0,opacity:0,duration:800,delay:500}
        ]);
    }

})();