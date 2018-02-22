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
        animates.boy();
        animates.girl();
    }

    var initScroll = function (){
        window.scrollAnimate('#evt_container', [
             {dom: '.x-title',x:0, y:0,duration:500,delay:200}
             ,{dom: '.gao-line',x:0, y:0,duration:200,delay:200}
             ,{dom: '.buliao',x:0, y:-50,duration:500,delay:200}
             ,{dom: '.zuhe',x:0, y:0,duration:500,delay:500}
             ,{dom: '.boy',x:0, y:0,duration:500,delay:500}
             ,{dom: '.girl',x:0, y:0,duration:500,delay:500}


             ,{dom: '.start',x:0, y:-50,duration:500,delay:200}
             ,{dom: '.jiantou-1',x:0, y:0,duration:500,delay:200}
             ,{dom: '.pic-1',x:100, y:-30,duration:500,delay:200}
             ,{dom: '.cake-1',x:-100, y:50,duration:500,delay:500}
             ,{dom: '.dc-1',x:2000, y:50,duration:800,delay:500}
             ,{dom: '.words-1',x:0, y:100,duration:500,delay:500}

             ,{dom: '.pic-2',x:-100, y:-30,duration:500,delay:200}
             ,{dom: '.mocha',x:0, y:0,duration:500,delay:800}
             ,{dom: '.cake-2',x:100, y:0,duration:500,delay:600}
             ,{dom: '.dc-2',x:-100, y:-100,duration:500,delay:1000}
             ,{dom: '.words-2',x:0, y:0,duration:500,delay:200}
             ,{dom: '.jiage-1',x:0, y:100,duration:500,delay:500}

             ,{dom: '.xiaoren',x:0, y:0,duration:500,delay:500}
             ,{dom: '.jiantou-2',x:0, y:0,duration:500,delay:500}
             ,{dom: '.pic-3',x:100, y:200,duration:500,delay:500}
             ,{dom: '.cake-3',x:100, y:0,duration:500,delay:500}
             ,{dom: '.dc-3',x:-100, y:50,duration:500,delay:800}
             ,{dom: '.words-3',x:100, y:0,duration:500,delay:800}

             ,{dom: '.youhui-1',x:-100, y:0,duration:500,delay:200}
             ,{dom: '.youhui-2',x:100, y:0,duration:500,delay:200}
             ,{dom: '.jiantou-3',x:0, y:0,duration:500,delay:200}
             ,{dom: ' .words-4',x:0, y:100,duration:500,delay:200}
             ,{dom: '.line-1',x:-50, y:0,duration:500,delay:200}
             ,{dom: '.line-2',x:50, y:0,duration:500,delay:200}

             ,{dom: '.pic-3',x:-50, y:-20,duration:500,delay:200}
             ,{dom: '.dc-3',x:50, y:100,duration:500,delay:600}
             ,{dom: '.words-3',x:0, y:100,duration:500,delay:800}
             ,{dom: '.go-btn',x:0, y:100,duration:500,delay:600}
            
        ])
    };


    var animates = {

        boy:function () {
            //图片配置
            var mcConfig = {
                "boy-1":{"x":0,"y":0,"w":179,"h":204,"offX":0,"offY":17,"sourceW":191,"sourceH":239,"duration":2},
                "boy-2":{"x":0,"y":216,"w":179,"h":170,"offX":0,"offY":29,"sourceW":191,"sourceH":239,"duration":0},
                "boy-3":{"x":191,"y":215,"w":179,"h":170,"offX":0,"offY":29,"sourceW":191,"sourceH":239,"duration":0},
                "boy-4":{"x":191,"y":397,"w":179,"h":170,"offX":0,"offY":29,"sourceW":191,"sourceH":239,"duration":5},
                "boy-5":{"x":191,"y":0,"w":175,"h":203,"offX":0,"offY":29,"sourceW":191,"sourceH":239,"duration":2},
                "boy-6":{"x":0,"y":579,"w":184,"h":118,"offX":0,"offY":114,"sourceW":191,"sourceH":239,"duration":2}
            };
            // MovieClip 可以通过duration控制两张图片轮播的速度。duration:0.2*10=2
            new MovieClip('el_boy', loader.get('boy_png').data,formatResData(mcConfig)).play();
        },
        girl:function () {
            //图片配置
            var mcConfig = {
                "girl-1":{"x":184,"y":233,"w":175,"h":174,"offX":9,"offY":45,"sourceW":184,"sourceH":250,"duration":2},
                "girl-2":{"x":0,"y":233,"w":172,"h":221,"offX":12,"offY":11,"sourceW":184,"sourceH":250,"duration":0},
                "girl-3":{"x":184,"y":0,"w":172,"h":221,"offX":12,"offY":11,"sourceW":184,"sourceH":250,"duration":0},
                "girl-4":{"x":0,"y":0,"w":172,"h":221,"offX":12,"offY":11,"sourceW":184,"sourceH":250,"duration":5},
                "girl-5":{"x":184,"y":419,"w":178,"h":151,"offX":6,"offY":67,"sourceW":184,"sourceH":250,"duration":2},
                "girl-6":{"x":0,"y":466,"w":169,"h":155,"offX":15,"offY":81,"sourceW":184,"sourceH":250,"duration":2}
                };
            // MovieClip 可以通过duration控制两张图片轮播的速度。duration:0.2*10=2
            new MovieClip('el_girl', loader.get('girl_png').data,formatResData(mcConfig)).play();
        }
    }
})();