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

        $("html,body").animate({scrollTop: 0},500);
        var money = [];
        $(".row").each(function (i) {
            var self = $(this);
            money.push(arr[Math.floor(Math.random()*(3-0+1))+0]);
            /*刮刮卡*/
            var imageBackground=$(this).find(".imageBackground").attr("src");   /*刮开之后的底图*/
            var pictureOver=$(this).find(".pictureOver").attr("src");  /*覆盖图*/
            var canvasId=$(this).find('js-canvas'+i).selector;
            var scratch = new Scratch({
                canvasId: 'js-canvas'+i,
                imageBackground: imageBackground,
                pictureOver: pictureOver,
                cursor: {
                    x: '-20',
                    y: '-20'
                },
                radius: 20,
                nPoints: 1000,
                percent: 30,
                pointSize: { x: 5, y: 5},
                callback: function () {/*刮刮之后的函数*/
                    self.find(".scratch_container").fadeOut(100);
                    self.find(".sb").html(money[i]);
                    self.find(".money").html(money[i]);
                    self.find(".buy_btn").attr("data-money",money[i]);
                    self.find(".shou").fadeOut(100);
                    guaguaEnd(canvasId);
                }
            });
        });








        /*$('.guaguaka,.cover').on('touchstart',function(e) {
            $(".cover").fadeOut(100);
        });*/



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


})();




