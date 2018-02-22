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
        animates.renBox();
        animates.renTi();
        animates.renPao();
        animates.renYou();
        animates.renYao();
        animates.renQuqi();
        animates.renHs();
    }


    var animates = {
        renBox:function () {
            //图片配置
            var mcConfig = {
                "ren-box-1":{"x":250,"y":1,"w":247,"h":233,"offX":0,"offY":53,"sourceW":310,"sourceH":339,"duration":8},
                "ren-box-2":{"x":1,"y":1,"w":247,"h":233,"offX":0,"offY":53,"sourceW":310,"sourceH":339,"duration":10}
            };
            // MovieClip 可以通过duration控制两张图片轮播的速度。duration:0.2*10=2
            new MovieClip('ren-box', loader.get('ren-box_png').data,formatResData(mcConfig)).play();
        },
        renTi:function () {
            //图片配置
            var mcConfig = {
                "ren-ti-1":{"x":221,"y":1,"w":218,"h":207,"offX":2,"offY":0,"sourceW":220,"sourceH":207,"duration":3},
                "ren-ti-2":{"x":1,"y":1,"w":218,"h":207,"offX":2,"offY":0,"sourceW":220,"sourceH":207,"duration":10}
            };
            // MovieClip 可以通过duration控制两张图片轮播的速度。duration:0.2*10=2
            new MovieClip('ren-ti', loader.get('ren-ti_png').data,formatResData(mcConfig)).play();
        }
        ,renPao:function () {
            //图片配置
            var mcConfig = {
                "ren-pao-1":{"x":1,"y":1,"w":157,"h":277,"offX":0,"offY":0,"sourceW":162,"sourceH":280,"duration":1},
                "ren-pao-2":{"x":303,"y":1,"w":137,"h":275,"offX":0,"offY":0,"sourceW":162,"sourceH":280,"duration":1},
                "ren-pao-3":{"x":139,"y":556,"w":126,"h":265,"offX":0,"offY":0,"sourceW":162,"sourceH":280,"duration":1},
                "ren-pao-4":{"x":1,"y":280,"w":136,"h":275,"offX":0,"offY":0,"sourceW":162,"sourceH":280,"duration":1},
                "ren-pao-5":{"x":160,"y":1,"w":141,"h":276,"offX":0,"offY":0,"sourceW":162,"sourceH":280,"duration":1},
                "ren-pao-6":{"x":160,"y":279,"w":136,"h":275,"offX":0,"offY":0,"sourceW":162,"sourceH":280,"duration":1},
                "ren-pao-7":{"x":298,"y":555,"w":126,"h":274,"offX":0,"offY":0,"sourceW":162,"sourceH":280,"duration":1},
                "ren-pao-8":{"x":303,"y":278,"w":137,"h":275,"offX":0,"offY":0,"sourceW":162,"sourceH":280,"duration":1}
            };
            // MovieClip 可以通过duration控制两张图片轮播的速度。duration:0.2*10=2
            new MovieClip('ren-pao', loader.get('ren-pao_png').data,formatResData(mcConfig)).play();
        }
        ,renYou:function () {
            //图片配置
            var mcConfig = {
                "ren-you-1":{"x":1,"y":1,"w":105,"h":178,"offX":4,"offY":2,"sourceW":112,"sourceH":183,"duration":4},
                "ren-you-2":{"x":108,"y":1,"w":103,"h":178,"offX":6,"offY":2,"sourceW":112,"sourceH":183,"duration":8}
            };
            // MovieClip 可以通过duration控制两张图片轮播的速度。duration:0.2*10=2
            new MovieClip('ren-you', loader.get('ren-you_png').data,formatResData(mcConfig)).play();
        }
        ,renYao:function () {
            //图片配置
            var mcConfig = {
                "ren-yao-1":{"x":1,"y":299,"w":252,"h":147,"offX":1,"offY":3,"sourceW":258,"sourceH":154,"duration":2},
                "ren-yao-2":{"x":255,"y":150,"w":252,"h":147,"offX":1,"offY":3,"sourceW":258,"sourceH":154,"duration":2},
                "ren-yao-3":{"x":1,"y":150,"w":252,"h":147,"offX":1,"offY":3,"sourceW":258,"sourceH":154,"duration":5},
                "ren-yao-4":{"x":255,"y":1,"w":252,"h":147,"offX":1,"offY":3,"sourceW":258,"sourceH":154,"duration":0},
                "ren-yao-5":{"x":1,"y":1,"w":252,"h":147,"offX":1,"offY":3,"sourceW":258,"sourceH":154,"duration":10}
            };
            // MovieClip 可以通过duration控制两张图片轮播的速度。duration:0.2*10=2
            new MovieClip('ren-yao', loader.get('ren-yao_png').data,formatResData(mcConfig)).play();
        }
        ,renQuqi:function () {
            //图片配置
            var mcConfig = {
                "qiqiu-1":{"x":1601,"y":1,"w":318,"h":731,"offX":0,"offY":10,"sourceW":318,"sourceH":745,"duration":1},
                "qiqiu-2":{"x":1281,"y":1,"w":318,"h":731,"offX":0,"offY":10,"sourceW":318,"sourceH":745,"duration":1},
                "qiqiu-3":{"x":961,"y":1,"w":318,"h":731,"offX":0,"offY":10,"sourceW":318,"sourceH":745,"duration":1},
                "qiqiu-4":{"x":641,"y":1,"w":318,"h":733,"offX":0,"offY":8,"sourceW":318,"sourceH":745,"duration":1},
                "qiqiu-5":{"x":321,"y":1,"w":318,"h":735,"offX":0,"offY":6,"sourceW":318,"sourceH":745,"duration":1},
                "qiqiu-6":{"x":1,"y":738,"w":318,"h":735,"offX":0,"offY":6,"sourceW":318,"sourceH":745,"duration":1},
                "qiqiu-7":{"x":1,"y":1,"w":318,"h":735,"offX":0,"offY":6,"sourceW":318,"sourceH":745,"duration":1},
                "qiqiu-8":{"x":321,"y":738,"w":318,"h":734,"offX":0,"offY":7,"sourceW":318,"sourceH":745,"duration":1},
                "qiqiu-9":{"x":641,"y":736,"w":318,"h":731,"offX":0,"offY":10,"sourceW":318,"sourceH":745,"duration":1}
            };
            // MovieClip 可以通过duration控制两张图片轮播的速度。duration:0.2*10=2
            new MovieClip('ren-quqi', loader.get('ren-quqi_png').data,formatResData(mcConfig)).play();
        }
        ,renHs:function () {
            //图片配置
            var mcConfig = {
                "ren-hs-1":{"x":1,"y":146,"w":64,"h":87,"offX":1,"offY":3,"sourceW":133,"sourceH":90,"duration":2},
                "ren-hs-2":{"x":107,"y":1,"w":104,"h":79,"offX":1,"offY":11,"sourceW":133,"sourceH":90,"duration":2},
                "ren-hs-3":{"x":1,"y":82,"w":129,"h":62,"offX":1,"offY":28,"sourceW":133,"sourceH":90,"duration":2},
                "ren-hs-4":{"x":1,"y":1,"w":104,"h":79,"offX":1,"offY":11,"sourceW":133,"sourceH":90,"duration":2}
            };
            // MovieClip 可以通过duration控制两张图片轮播的速度。duration:0.2*10=2
            new MovieClip('ren-hs', loader.get('ren-hs_png').data,formatResData(mcConfig)).play();
        }

    };

    var initScroll = function (){
        window.scrollAnimate('#evt_container', [
            {dom: '.ren-box',x:0, y:0,duration:500,delay:200}
            ,{dom: '.ren-ti',x:0, y:0,duration:800,delay:400}
            ,{dom: '.ren-pao',x:-100, y:0,duration:800,delay:1000}
            ,{dom: '.ren-you',x:0, y:0,duration:800,delay:800}

            ,{dom: '.b-title',x:0, y:0,opacity:0,duration:500}
            ,{dom: '.quqi-1',x:100, y:0,opacity:0,duration:800,delay:1000}
            ,{dom: '.quqi-2',x:-100, y:0,opacity:0,duration:800,delay:1200}
            ,{dom: '.quqi-3',x:50, y:0,opacity:0,duration:800,delay:1400}

            ,{dom: '.words-1',x:-50, y:0,opacity:0,duration:800,delay:500}
            ,{dom: '.q-cake',x:50, y:0,opacity:0,duration:800,delay:800}
            ,{dom: '.ren-yao',x:-50, y:0,opacity:0,duration:800,delay:1000}
            ,{dom: '.gobtn-1',x:0, y:0,opacity:0,duration:800,delay:1000}

            ,{dom: '.more',x:0, y:0,opacity:0,duration:800,delay:1100}
            ,{dom: '.words-2-bg',x:100, y:0,opacity:0,duration:800,delay:800}
            ,{dom: '.words-2',x:50, y:0,opacity:0,duration:800,delay:800}
            ,{dom: '.gobtn-2',x:50, y:0,opacity:0,duration:800,delay:800}
            ,{dom: '.words-3',x:100, y:0,opacity:0,duration:800,delay:1000}
            ,{dom: '.flower',x:-100, y:0,opacity:0,duration:800,delay:1000}
            ,{dom: '.ren-quqi',x:-100, y:0,opacity:0,duration:800,delay:1000}
            ,{dom: '.ren-hs',x:0, y:50,opacity:0,duration:800,delay:1000}







        ])
    };

})();