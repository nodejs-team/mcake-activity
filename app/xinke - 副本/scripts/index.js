/**
 * Created by shimily on 2017/10/12.
 */

+!(function () {
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
        //var domLoad = document.getElementById('evt_loading');

        loader.addGroup('preload', resData);

        loader.on('complete', function(groupName){
            fixImageSrc(loader.getAll());

            loadComplete();
        });
        loader.loadGroup('preload');
    }
    startLoading();


    var loadComplete = function () {


    };


    var animates = {
        xinke:function () {
            //图片配置
            var mcConfig = {
                "xinke-1":{"x":2001,"y":0,"w":5,"h":5,"offX":0,"offY":0,"sourceW":750,"sourceH":971,"duration":4},
                "xinke-2":{"x":631,"y":1704,"w":243,"h":119,"offX":270,"offY":0,"sourceW":750,"sourceH":971,"duration":4},
                "xinke-3":{"x":1618,"y":1060,"w":253,"h":357,"offX":264,"offY":0,"sourceW":750,"sourceH":971,"duration":4},
                "xinke-4":{"x":1292,"y":437,"w":253,"h":452,"offX":264,"offY":0,"sourceW":750,"sourceH":971,"duration":4},
                "xinke-5":{"x":1029,"y":657,"w":253,"h":546,"offX":264,"offY":0,"sourceW":750,"sourceH":971,"duration":4},
                "xinke-6":{"x":398,"y":2691,"w":321,"h":290,"offX":230,"offY":308,"sourceW":750,"sourceH":971,"duration":1},
                "xinke-7":{"x":345,"y":3591,"w":268,"h":268,"offX":256,"offY":330,"sourceW":750,"sourceH":971,"duration":0},
                "xinke-8":{"x":1618,"y":760,"w":321,"h":290,"offX":226,"offY":307,"sourceW":750,"sourceH":971,"duration":1},
                "xinke-9":{"x":0,"y":3662,"w":321,"h":343,"offX":226,"offY":255,"sourceW":750,"sourceH":971,"duration":1},
                "xinke-10":{"x":396,"y":2391,"w":366,"h":290,"offX":227,"offY":308,"sourceW":750,"sourceH":971,"duration":0},
                "xinke-11":{"x":345,"y":3291,"w":321,"h":290,"offX":227,"offY":308,"sourceW":750,"sourceH":971,"duration":0},
                "xinke-12":{"x":398,"y":2991,"w":321,"h":290,"offX":227,"offY":308,"sourceW":750,"sourceH":971,"duration":4},
                "xinke-13":{"x":1292,"y":899,"w":316,"h":311,"offX":204,"offY":287,"sourceW":750,"sourceH":971,"duration":4},
                "xinke-14":{"x":1555,"y":446,"w":320,"h":304,"offX":255,"offY":294,"sourceW":750,"sourceH":971,"duration":4},
                "xinke-15":{"x":631,"y":657,"w":388,"h":598,"offX":187,"offY":0,"sourceW":750,"sourceH":971,"duration":0},
                "xinke-16":{"x":0,"y":2825,"w":388,"h":381,"offX":187,"offY":217,"sourceW":750,"sourceH":971,"duration":0},
                "xinke-17":{"x":1262,"y":0,"w":388,"h":427,"offX":187,"offY":294,"sourceW":750,"sourceH":971,"duration":1},
                "xinke-18":{"x":1660,"y":0,"w":331,"h":436,"offX":189,"offY":287,"sourceW":750,"sourceH":971,"duration":1},
                "xinke-19":{"x":396,"y":1947,"w":329,"h":434,"offX":191,"offY":287,"sourceW":750,"sourceH":971,"duration":0},
                "xinke-20":{"x":0,"y":3216,"w":335,"h":436,"offX":185,"offY":287,"sourceW":750,"sourceH":971,"duration":0},
                "xinke-21":{"x":0,"y":2386,"w":386,"h":429,"offX":189,"offY":294,"sourceW":750,"sourceH":971,"duration":0},
                "xinke-22":{"x":631,"y":1265,"w":386,"h":429,"offX":189,"offY":294,"sourceW":750,"sourceH":971,"duration":0},
                "xinke-23":{"x":0,"y":1947,"w":386,"h":429,"offX":189,"offY":294,"sourceW":750,"sourceH":971,"duration":4},
                "xinke-24":{"x":0,"y":0,"w":621,"h":656,"offX":80,"offY":287,"sourceW":750,"sourceH":971,"duration":1},
                "xinke-25":{"x":0,"y":666,"w":621,"h":647,"offX":80,"offY":287,"sourceW":750,"sourceH":971,"duration":1},
                "xinke-26":{"x":631,"y":0,"w":621,"h":647,"offX":80,"offY":287,"sourceW":750,"sourceH":971,"duration":1},
                "xinke-27":{"x":0,"y":1323,"w":621,"h":614,"offX":80,"offY":294,"sourceW":750,"sourceH":971,"duration":50}
            };
            // MovieClip 可以通过duration控制两张图片轮播的速度。duration:0.2*10=2
            new MovieClip('xinker', loader.get('xinke_png').data,formatResData(mcConfig)).play(1);
        }
    }

    window.animates = animates;


})(window);
