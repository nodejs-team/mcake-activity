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


    var audioPlay = function () {
        var audio;
        var timer = null;
        var timers = null;
        var time = 0;
        $(function(){
            audio = document.getElementById('audio');
            var $elIco = $('#js_ioc');
            var $elGif = $('#js_gif');
            //播放录音
            $(".recording").click(function(){
                time = 0;

                if (audio.paused){
                    audio.play();
                    /*countdown(230);*/
                    $elIco.hide();
                    $elGif.show();
                    timers = setInterval(func, 1000);
                }else{
                    $elIco.show();
                    $elGif.hide();
                    audio.pause();
                    audio.currentTime = 0.0;
                    clearInterval(timers);
                    //$("#countdown_id").html('240s');
                }
                $(".recording-hd em").hide();
            });

            function func(){
                time +=1;
                if(time >= 76){
                    audio.pause();
                    $elIco.show();
                    $elGif.hide();
                    clearInterval(timers);
                }
            }
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



    var loadComplete = function () {

        audioPlay();

        var cakeSku = $(".roseCake").data("sku");
        var sku=0;
        var newSku=[cakeSku];
        $('.huangou').each(function () {
            $(this).click(function () {
                sku = $(this).find(".icon-hg").data("sku");
                if($(this).find(".icon-hg").hasClass("on")){
                    $(this).find(".icon-hg").removeClass("on");
                    var index = newSku.indexOf(sku);
                    newSku.splice(index, 1);/*删除*/
                }else{
                    newSku.push(sku);  /*追加*/
                    $(this).find(".icon-hg").addClass("on");
                }
                $(this).parents(".xiaoshi").next().attr("data-sku",newSku);
            });
            $(this).parents(".xiaoshi").next().attr("data-sku",newSku);
        });

    };

})();


