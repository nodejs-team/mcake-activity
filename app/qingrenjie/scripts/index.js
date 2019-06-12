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
        $(".floater").fadeIn(100);

        initScroll();

        $('#js_recording').bind('click',function(e){;
            recording();
        })
        audioPlay();



        
    };
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


    var recording = function () {
        var $elIco = $('#js_ioc');
        var $elGif = $('#js_gif');

        if($elGif.is(":hidden")) {
            $elIco.hide();
            $('.recording-hd').find('em').hide();
            $elGif.show();
        } else {
            $elIco.show();
            $('.recording-hd').find('em').show();
            $elGif.hide();
        }
    };

    var audioPlay = function () {
        var post_id = '10853';
        var audio;
        var timer = null;
        $(function(){
            audio = document.getElementById('audio');

            //播放录音
            $(".recording").click(function(){
                var $elIco = $('#js_ioc');
                var $elGif = $('#js_gif');

                if (audio.paused){
                    audio.play();
                    /*countdown(230);*/
                    $elIco.hide();
                    $elGif.show();

                }else{
                    $elIco.show();
                    $elGif.hide();
                    audio.pause();
                    audio.currentTime = 0.0;
                    clearInterval(timer);
                    //$("#countdown_id").html('240s');
                }
                $(".recording-hd em").hide();
            });
        });

        function countdown(time){

            timer = setInterval(function(){
                if(time - 1 >= 0){
                    time = time - 1;
                    $("#countdown_id").html(time + 's');
                }else{
                    $("#countdown_id").html('240s');
                    var $elIco = $('#js_ioc');
                    var $elGif = $('#js_gif');
                    $elIco.show();
                    $elGif.hide();
                    audio.pause();
                    audio.currentTime = 0.0;
                    clearInterval(timer);
                }
            }, 1000);
        }
    }


    var initScroll = function (){
        window.scrollAnimate('#evt_container', [
            {dom: '.sec-top',x:0, y:100,duration:500,delay:200}

             ,{dom: '.sec-1 .s-sction-1',x:0, y:50,duration:500,delay:400}
             ,{dom: '.sec-2 .s-sction-2',x:0, y:50,duration:500,delay:400}
             ,{dom: '.sec-2 .buy-btn',x:0, y:50,duration:500,delay:400}
             ,{dom: '.sec-3 .section-3-title',x:0, y:50,duration:500,delay:400}
             ,{dom: '.sec-4 .s-sction-4',x:0, y:50,duration:500,delay:400}
             ,{dom: '.sec-4 .piaodai',x:-50, y:50,duration:500,delay:400}
             ,{dom: '.sec-5 .s-sction-5',x:0, y:50,duration:500,delay:400}
             ,{dom: '.recording',x:0, y:50,duration:500,delay:400}
             ,{dom: '.more-bg',x:0, y:50,duration:500,delay:400}
        ])
    };


})();


