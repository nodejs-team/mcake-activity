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

        var on = true;

        $(window).bind("load scroll resize beforeunload touchmove",scrollFun);
        function scrollFun(){

            var img2H = $(".naiyou").offset().top;
            var scrollTop = $(window).scrollTop();


            if(scrollTop>img2H){
                if(on){
                    animates.ad();
                    on = false;
                }
            }
        }



    }

    var initScroll = function (){
        window.scrollAnimate('#evt_container', [

             {dom: '.line',x:-200, y:0,duration:200,delay:1000}
             ,{dom: '.word-1',x:100, y:0,duration:500,delay:200}
             ,{dom: '.word-l-1',x:-50, y:0,duration:500,delay:800}
             ,{dom: '.word-l-2',x:-50, y:0,duration:500,delay:1200}
             ,{dom: '.word-l-3',x:-50, y:0,duration:500,delay:1500}
             ,{dom: '.cake',x:0, y:50,duration:800,delay:800}

        ])
    };


    var animates = {

        ad:function () {
            //图片配置
            var mcConfig = {
                "00013":{"x":0,"y":430,"w":758,"h":74,"offX":114,"offY":13,"sourceW":979,"sourceH":101,"duration":2},
                "00000":{"x":660,"y":688,"w":5,"h":5,"offX":0,"offY":0,"sourceW":979,"sourceH":101,"duration":2},
                "00001":{"x":737,"y":602,"w":5,"h":5,"offX":0,"offY":0,"sourceW":979,"sourceH":101,"duration":2},
                "00002":{"x":0,"y":805,"w":5,"h":5,"offX":0,"offY":0,"sourceW":979,"sourceH":101,"duration":2},
                "00003":{"x":770,"y":0,"w":38,"h":19,"offX":472,"offY":40,"sourceW":979,"sourceH":101,"duration":2},
                "00004":{"x":0,"y":774,"w":382,"h":19,"offX":324,"offY":40,"sourceW":979,"sourceH":101,"duration":2},
                "00005":{"x":0,"y":688,"w":648,"h":74,"offX":172,"offY":13,"sourceW":979,"sourceH":101,"duration":2},
                "00006":{"x":0,"y":602,"w":725,"h":74,"offX":131,"offY":13,"sourceW":979,"sourceH":101,"duration":2},
                "00007":{"x":0,"y":516,"w":754,"h":74,"offX":116,"offY":13,"sourceW":979,"sourceH":101,"duration":2},
                "00008":{"x":0,"y":344,"w":758,"h":74,"offX":114,"offY":13,"sourceW":979,"sourceH":101,"duration":2},
                "00009":{"x":0,"y":258,"w":758,"h":74,"offX":114,"offY":13,"sourceW":979,"sourceH":101,"duration":2},
                "00010":{"x":0,"y":172,"w":758,"h":74,"offX":114,"offY":13,"sourceW":979,"sourceH":101,"duration":2},
                "00011":{"x":0,"y":86,"w":758,"h":74,"offX":114,"offY":13,"sourceW":979,"sourceH":101,"duration":2},
                "00012":{"x":0,"y":0,"w":758,"h":74,"offX":114,"offY":13,"sourceW":979,"sourceH":101,"duration":2}
            };
            // MovieClip 可以通过duration控制两张图片轮播的速度。duration:0.2*10=2
            var Movie = new MovieClip('ad', loader.get('ad_png').data,formatResData(mcConfig)).play(1);

        }

    }



})();