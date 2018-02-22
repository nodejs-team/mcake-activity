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

        animates.quanBaoShou();

    }



    var initScroll = function (){
        window.scrollAnimate('#evt_container', [
             {dom: '.b-title',x:0, y:-50,duration:800,delay:200}
            ,{dom: '.b-des-1',x:-50, y:-10,duration:800,delay:400}
            ,{dom: '.b-cake-1',x:50, y:0,duration:800,delay:400}
            ,{dom: '.b-words-1',x:0, y:20,duration:800,delay:600}
            ,{dom: '.gobtn-1',x:0, y:20,duration:800,delay:600}

            ,{dom: '.yhq-icon',x:-50, y:-50,duration:800,delay:400}
            ,{dom: '.quan-bao-shou',x:0, y:0,duration:800,delay:400}
            ,{dom: '.youhui',x:0, y:0,duration:800,delay:400}
            ,{dom: '.ling-hongbao',x:0, y:20,duration:800,delay:400}

            ,{dom: '.b-cake-2',x:-50, y:0,duration:800,delay:200}
            ,{dom: '.b-des-2',x:0, y:0,duration:800,delay:400}
            ,{dom: '.b-words-2',x:0, y:20,duration:800,delay:400}
            ,{dom: '.gobtn-2',x:0, y:20,duration:800,delay:400}


        ])
    };

    var animates = {

        quanBaoShou:function () {
            //图片配置
            var mcConfig = {
                "quan-bao-shou-1":{"x":239,"y":482,"w":237,"h":232,"offX":7,"offY":5,"sourceW":247,"sourceH":248,"duration":1},
                "quan-bao-shou-2":{"x":239,"y":0,"w":237,"h":240,"offX":7,"offY":5,"sourceW":247,"sourceH":248,"duration":1},
                "quan-bao-shou-3":{"x":0,"y":242,"w":237,"h":238,"offX":7,"offY":5,"sourceW":247,"sourceH":248,"duration":1},
                "quan-bao-shou-4":{"x":0,"y":0,"w":237,"h":240,"offX":7,"offY":5,"sourceW":247,"sourceH":248,"duration":1},
                "quan-bao-shou-5":{"x":239,"y":242,"w":237,"h":238,"offX":7,"offY":5,"sourceW":247,"sourceH":248,"duration":1},
                "quan-bao-shou-6":{"x":0,"y":482,"w":237,"h":232,"offX":7,"offY":5,"sourceW":247,"sourceH":248,"duration":1}
            };
            // MovieClip 可以通过duration控制两张图片轮播的速度。duration:0.2*10=2
            new MovieClip('quan-bao-shou', loader.get('quan-bao-shou_png').data,formatResData(mcConfig)).play();
        }

    }

})();