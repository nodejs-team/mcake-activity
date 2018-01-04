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


    function fadeChange(container){
        var $c = $(container);
        var i = 0;
        var $d = $c.children();

        function change(i){
            $d.eq(i).addClass("active").siblings().removeClass('active');
        }

        change(i);

        setInterval(function(){
            if(++i > $d.length - 1){
                i = 0;
            }
            change(i);
        }, 2000 + Math.floor(Math.random()*1000));
    }

    function initChange(){
      $(".wm-p1-container").on("animate-done", function () {
        fadeChange(this);
      });
      $(".wm-p2-container").on("animate-done", function () {
        fadeChange(this);
      });
    }

  function initAudio(){
    var audio = document.createElement('audio');
    var audioCtrl = document.getElementById('evt_audio_ctrl');
    var body = document.body;
    var audioHandler = function(){
      if( audio.paused ){
        audio.play();
        this.className = 'audio-control play';
      } else {
        audio.pause();
        this.className = 'audio-control pause';
      }
    };

    audio.autoplay = 'true';
    audio.src = 'http://edm.mcake.com/fangli/2017-wap/withwheat-mcake/media/mcake-benison.mp3';
    body.appendChild(audio);

    audioCtrl.addEventListener('click', audioHandler, false);

    return {
      destroy: function(){
        audioCtrl.removeEventListener('click', audioHandler, false);
        audio.pause();
        body.removeChild(audio);
      }
    };

  }

  var loadComplete = function () {
    initScroll();
    initChange();
    initAudio();
  };


  function initScroll(){
    window.scrollAnimate('#evt_container', [
      {dom: '.wm-maintext',opacity:0,duration:1000}
      ,{dom: '.wm-p1-container',x:300, y:100,opacity:0,duration:1000, delay: 200}
      ,{dom: '.wm-p1-text',opacity:0,duration:500, delay: 1200}
      ,{dom: '.wm-p1-price',opacity:0,duration:1000, delay: 1700}
      ,{dom: '.wm-p2-container',x:-300, y:0,opacity:0,duration:1000}
      ,{dom: '.wm-p2-t2',opacity:0,duration:1000, delay: 1200}
      ,{dom: '.wm-p2-text',opacity:0,duration:500, delay: 1000}
      ,{dom: '.wm-ps',opacity:0,duration:1000, delay: 1200}
    ]);
  }

})();