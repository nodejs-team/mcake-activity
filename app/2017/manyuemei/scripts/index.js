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
        animates.mymA();
        animates.mymB();
        animates.mymC();
    }

    var initScroll = function (){
        window.scrollAnimate('#evt_container', [
             {dom: '.x-title',x:0, y:-50,duration:500,delay:200}
            ,{dom: '.q1',x:0, y:0,duration:500,delay:200}
            ,{dom: '.q2',x:0, y:0,duration:500,delay:400}
            ,{dom: '.q3',x:0, y:0,duration:500,delay:600}
            ,{dom: '.cake',x:0, y:100,duration:800,delay:500}
            ,{dom: '.mym-top',x:0, y:-100,duration:500,delay:400}
            ,{dom: '.cake-samll',x:0, y:100,duration:800,delay:1000}

            ,{dom: '.words-1',x:-50, y:0,duration:800,delay:400}
            ,{dom: '.cake-2',x:50, y:0,duration:800,delay:400}
            ,{dom: '.cake-1',x:-50, y:0,duration:800,delay:400}
            ,{dom: '.words-2',x:-50, y:0,duration:800,delay:400}
            ,{dom: '.ren',x:100, y:0,duration:800,delay:400}
            ,{dom: '.words-3',x:-100, y:0,duration:800,delay:400}
            ,{dom: '.mym',x:50, y:0,duration:800,delay:400}
            ,{dom: '.cl-1',x:0, y:0,duration:800,delay:400}
            ,{dom: '.cl-2',x:0, y:0,duration:800,delay:400}
            ,{dom: '.btn-1',x:0, y:0,duration:800,delay:400}
            ,{dom: '.btn-2',x:0, y:0,duration:800,delay:400}


        ])
    };


    var animates = {

        mymA:function () {
            //图片配置
            var mcConfig = {
                "mym-a-1":{"x":420,"y":975,"w":208,"h":193,"offX":11,"offY":23,"sourceW":240,"sourceH":241},
                "mym-a-2":{"x":210,"y":975,"w":208,"h":193,"offX":11,"offY":24,"sourceW":240,"sourceH":241},
                "mym-a-3":{"x":0,"y":975,"w":208,"h":193,"offX":11,"offY":24,"sourceW":240,"sourceH":241},
                "mym-a-4":{"x":1680,"y":780,"w":208,"h":193,"offX":11,"offY":25,"sourceW":240,"sourceH":241},
                "mym-a-5":{"x":1470,"y":780,"w":208,"h":193,"offX":11,"offY":26,"sourceW":240,"sourceH":241},
                "mym-a-6":{"x":1260,"y":780,"w":208,"h":193,"offX":11,"offY":27,"sourceW":240,"sourceH":241},
                "mym-a-7":{"x":1050,"y":780,"w":208,"h":193,"offX":11,"offY":27,"sourceW":240,"sourceH":241},
                "mym-a-8":{"x":840,"y":780,"w":208,"h":193,"offX":11,"offY":28,"sourceW":240,"sourceH":241},
                "mym-a-9":{"x":630,"y":780,"w":208,"h":193,"offX":11,"offY":29,"sourceW":240,"sourceH":241},
                "mym-a-10":{"x":420,"y":780,"w":208,"h":193,"offX":11,"offY":29,"sourceW":240,"sourceH":241},
                "mym-a-11":{"x":210,"y":780,"w":208,"h":193,"offX":11,"offY":30,"sourceW":240,"sourceH":241},
                "mym-a-12":{"x":0,"y":780,"w":208,"h":193,"offX":11,"offY":31,"sourceW":240,"sourceH":241},
                "mym-a-13":{"x":1680,"y":585,"w":208,"h":193,"offX":11,"offY":32,"sourceW":240,"sourceH":241},
                "mym-a-14":{"x":1470,"y":585,"w":208,"h":193,"offX":11,"offY":32,"sourceW":240,"sourceH":241},
                "mym-a-15":{"x":1260,"y":585,"w":208,"h":193,"offX":11,"offY":33,"sourceW":240,"sourceH":241},
                "mym-a-16":{"x":1050,"y":585,"w":208,"h":193,"offX":11,"offY":34,"sourceW":240,"sourceH":241},
                "mym-a-17":{"x":840,"y":585,"w":208,"h":193,"offX":11,"offY":34,"sourceW":240,"sourceH":241},
                "mym-a-18":{"x":630,"y":585,"w":208,"h":193,"offX":11,"offY":35,"sourceW":240,"sourceH":241},
                "mym-a-19":{"x":420,"y":585,"w":208,"h":193,"offX":11,"offY":36,"sourceW":240,"sourceH":241},
                "mym-a-20":{"x":210,"y":585,"w":208,"h":193,"offX":11,"offY":37,"sourceW":240,"sourceH":241},
                "mym-a-21":{"x":0,"y":585,"w":208,"h":193,"offX":11,"offY":37,"sourceW":240,"sourceH":241},
                "mym-a-22":{"x":1680,"y":390,"w":208,"h":193,"offX":11,"offY":38,"sourceW":240,"sourceH":241},
                "mym-a-23":{"x":1470,"y":390,"w":208,"h":193,"offX":11,"offY":39,"sourceW":240,"sourceH":241},
                "mym-a-24":{"x":1260,"y":390,"w":208,"h":193,"offX":11,"offY":39,"sourceW":240,"sourceH":241},
                "mym-a-25":{"x":1050,"y":390,"w":208,"h":193,"offX":11,"offY":40,"sourceW":240,"sourceH":241},
                "mym-a-26":{"x":840,"y":390,"w":208,"h":193,"offX":11,"offY":41,"sourceW":240,"sourceH":241},
                "mym-a-27":{"x":630,"y":390,"w":208,"h":193,"offX":11,"offY":42,"sourceW":240,"sourceH":241},
                "mym-a-28":{"x":420,"y":390,"w":208,"h":193,"offX":11,"offY":42,"sourceW":240,"sourceH":241},
                "mym-a-29":{"x":210,"y":390,"w":208,"h":193,"offX":11,"offY":43,"sourceW":240,"sourceH":241},
                "mym-a-30":{"x":0,"y":390,"w":208,"h":193,"offX":11,"offY":42,"sourceW":240,"sourceH":241},
                "mym-a-31":{"x":1680,"y":195,"w":208,"h":193,"offX":11,"offY":41,"sourceW":240,"sourceH":241},
                "mym-a-32":{"x":1470,"y":195,"w":208,"h":193,"offX":11,"offY":40,"sourceW":240,"sourceH":241},
                "mym-a-33":{"x":1260,"y":195,"w":208,"h":193,"offX":11,"offY":39,"sourceW":240,"sourceH":241},
                "mym-a-34":{"x":1050,"y":195,"w":208,"h":193,"offX":11,"offY":38,"sourceW":240,"sourceH":241},
                "mym-a-35":{"x":840,"y":195,"w":208,"h":193,"offX":11,"offY":37,"sourceW":240,"sourceH":241},
                "mym-a-36":{"x":630,"y":195,"w":208,"h":193,"offX":11,"offY":36,"sourceW":240,"sourceH":241},
                "mym-a-37":{"x":420,"y":195,"w":208,"h":193,"offX":11,"offY":35,"sourceW":240,"sourceH":241},
                "mym-a-38":{"x":210,"y":195,"w":208,"h":193,"offX":11,"offY":34,"sourceW":240,"sourceH":241},
                "mym-a-39":{"x":0,"y":195,"w":208,"h":193,"offX":11,"offY":33,"sourceW":240,"sourceH":241},
                "mym-a-40":{"x":1680,"y":0,"w":208,"h":193,"offX":11,"offY":32,"sourceW":240,"sourceH":241},
                "mym-a-41":{"x":1470,"y":0,"w":208,"h":193,"offX":11,"offY":31,"sourceW":240,"sourceH":241},
                "mym-a-42":{"x":1260,"y":0,"w":208,"h":193,"offX":11,"offY":30,"sourceW":240,"sourceH":241},
                "mym-a-43":{"x":1050,"y":0,"w":208,"h":193,"offX":11,"offY":29,"sourceW":240,"sourceH":241},
                "mym-a-44":{"x":840,"y":0,"w":208,"h":193,"offX":11,"offY":28,"sourceW":240,"sourceH":241},
                "mym-a-45":{"x":630,"y":0,"w":208,"h":193,"offX":11,"offY":27,"sourceW":240,"sourceH":241},
                "mym-a-46":{"x":420,"y":0,"w":208,"h":193,"offX":11,"offY":26,"sourceW":240,"sourceH":241},
                "mym-a-47":{"x":210,"y":0,"w":208,"h":193,"offX":11,"offY":25,"sourceW":240,"sourceH":241},
                "mym-a-48":{"x":0,"y":0,"w":208,"h":193,"offX":11,"offY":24,"sourceW":240,"sourceH":241}
            };
            // MovieClip 可以通过duration控制两张图片轮播的速度。duration:0.2*10=2
            new MovieClip('mym-a', loader.get('mym-a_png').data,formatResData(mcConfig)).play();
        },
        mymB:function () {
            //图片配置
            var mcConfig = {
                "mym-b-40":{"x":226,"y":430,"w":111,"h":84,"offX":2,"offY":8,"sourceW":118,"sourceH":109},
                "mym-b-41":{"x":113,"y":430,"w":111,"h":84,"offX":2,"offY":9,"sourceW":118,"sourceH":109},
                "mym-b-42":{"x":0,"y":430,"w":111,"h":84,"offX":2,"offY":9,"sourceW":118,"sourceH":109},
                "mym-b-43":{"x":904,"y":344,"w":111,"h":84,"offX":2,"offY":10,"sourceW":118,"sourceH":109},
                "mym-b-44":{"x":791,"y":344,"w":111,"h":84,"offX":2,"offY":11,"sourceW":118,"sourceH":109},
                "mym-b-45":{"x":678,"y":344,"w":111,"h":84,"offX":2,"offY":11,"sourceW":118,"sourceH":109},
                "mym-b-46":{"x":565,"y":344,"w":111,"h":84,"offX":2,"offY":12,"sourceW":118,"sourceH":109},
                "mym-b-47":{"x":452,"y":344,"w":111,"h":84,"offX":2,"offY":12,"sourceW":118,"sourceH":109},
                "mym-b-48":{"x":339,"y":344,"w":111,"h":84,"offX":2,"offY":13,"sourceW":118,"sourceH":109},
                "mym-b-1":{"x":226,"y":344,"w":111,"h":84,"offX":2,"offY":13,"sourceW":118,"sourceH":109},
                "mym-b-2":{"x":113,"y":344,"w":111,"h":84,"offX":2,"offY":13,"sourceW":118,"sourceH":109},
                "mym-b-3":{"x":0,"y":344,"w":111,"h":84,"offX":2,"offY":12,"sourceW":118,"sourceH":109},
                "mym-b-4":{"x":904,"y":258,"w":111,"h":84,"offX":2,"offY":12,"sourceW":118,"sourceH":109},
                "mym-b-5":{"x":791,"y":258,"w":111,"h":84,"offX":2,"offY":11,"sourceW":118,"sourceH":109},
                "mym-b-6":{"x":678,"y":258,"w":111,"h":84,"offX":2,"offY":11,"sourceW":118,"sourceH":109},
                "mym-b-7":{"x":565,"y":258,"w":111,"h":84,"offX":2,"offY":10,"sourceW":118,"sourceH":109},
                "mym-b-8":{"x":452,"y":258,"w":111,"h":84,"offX":2,"offY":10,"sourceW":118,"sourceH":109},
                "mym-b-9":{"x":339,"y":258,"w":111,"h":84,"offX":2,"offY":9,"sourceW":118,"sourceH":109},
                "mym-b-10":{"x":226,"y":258,"w":111,"h":84,"offX":2,"offY":9,"sourceW":118,"sourceH":109},
                "mym-b-11":{"x":113,"y":258,"w":111,"h":84,"offX":2,"offY":8,"sourceW":118,"sourceH":109},
                "mym-b-12":{"x":0,"y":258,"w":111,"h":84,"offX":2,"offY":8,"sourceW":118,"sourceH":109},
                "mym-b-13":{"x":904,"y":172,"w":111,"h":84,"offX":2,"offY":7,"sourceW":118,"sourceH":109},
                "mym-b-14":{"x":791,"y":172,"w":111,"h":84,"offX":2,"offY":7,"sourceW":118,"sourceH":109},
                "mym-b-15":{"x":678,"y":172,"w":111,"h":84,"offX":2,"offY":7,"sourceW":118,"sourceH":109},
                "mym-b-16":{"x":565,"y":172,"w":111,"h":84,"offX":2,"offY":6,"sourceW":118,"sourceH":109},
                "mym-b-17":{"x":452,"y":172,"w":111,"h":84,"offX":2,"offY":6,"sourceW":118,"sourceH":109},
                "mym-b-18":{"x":339,"y":172,"w":111,"h":84,"offX":2,"offY":5,"sourceW":118,"sourceH":109},
                "mym-b-19":{"x":226,"y":172,"w":111,"h":84,"offX":2,"offY":5,"sourceW":118,"sourceH":109},
                "mym-b-20":{"x":113,"y":172,"w":111,"h":84,"offX":2,"offY":4,"sourceW":118,"sourceH":109},
                "mym-b-21":{"x":0,"y":172,"w":111,"h":84,"offX":2,"offY":4,"sourceW":118,"sourceH":109},
                "mym-b-22":{"x":904,"y":86,"w":111,"h":84,"offX":2,"offY":3,"sourceW":118,"sourceH":109},
                "mym-b-23":{"x":791,"y":86,"w":111,"h":84,"offX":2,"offY":3,"sourceW":118,"sourceH":109},
                "mym-b-24":{"x":678,"y":86,"w":111,"h":84,"offX":2,"offY":2,"sourceW":118,"sourceH":109},
                "mym-b-25":{"x":565,"y":86,"w":111,"h":84,"offX":2,"offY":2,"sourceW":118,"sourceH":109},
                "mym-b-26":{"x":452,"y":86,"w":111,"h":84,"offX":2,"offY":1,"sourceW":118,"sourceH":109},
                "mym-b-27":{"x":339,"y":86,"w":111,"h":84,"offX":2,"offY":1,"sourceW":118,"sourceH":109},
                "mym-b-28":{"x":226,"y":86,"w":111,"h":84,"offX":2,"offY":1,"sourceW":118,"sourceH":109},
                "mym-b-29":{"x":113,"y":86,"w":111,"h":84,"offX":2,"offY":1,"sourceW":118,"sourceH":109},
                "mym-b-30":{"x":0,"y":86,"w":111,"h":84,"offX":2,"offY":2,"sourceW":118,"sourceH":109},
                "mym-b-31":{"x":904,"y":0,"w":111,"h":84,"offX":2,"offY":2,"sourceW":118,"sourceH":109},
                "mym-b-32":{"x":791,"y":0,"w":111,"h":84,"offX":2,"offY":3,"sourceW":118,"sourceH":109},
                "mym-b-33":{"x":678,"y":0,"w":111,"h":84,"offX":2,"offY":4,"sourceW":118,"sourceH":109},
                "mym-b-34":{"x":565,"y":0,"w":111,"h":84,"offX":2,"offY":4,"sourceW":118,"sourceH":109},
                "mym-b-35":{"x":452,"y":0,"w":111,"h":84,"offX":2,"offY":5,"sourceW":118,"sourceH":109},
                "mym-b-36":{"x":339,"y":0,"w":111,"h":84,"offX":2,"offY":6,"sourceW":118,"sourceH":109},
                "mym-b-37":{"x":226,"y":0,"w":111,"h":84,"offX":2,"offY":6,"sourceW":118,"sourceH":109},
                "mym-b-38":{"x":113,"y":0,"w":111,"h":84,"offX":2,"offY":7,"sourceW":118,"sourceH":109},
                "mym-b-39":{"x":0,"y":0,"w":111,"h":84,"offX":2,"offY":7,"sourceW":118,"sourceH":109}
            };
            // MovieClip 可以通过duration控制两张图片轮播的速度。duration:0.2*10=2
            new MovieClip('mym-b', loader.get('mym-b_png').data,formatResData(mcConfig)).play();
        }
        ,
        mymC:function () {
            //图片配置
            var mcConfig = {
                "mym-c-1":{"x":1316,"y":676,"w":186,"h":167,"offX":12,"offY":27,"sourceW":207,"sourceH":209},
                "mym-c-2":{"x":1128,"y":676,"w":186,"h":167,"offX":12,"offY":26,"sourceW":207,"sourceH":209},
                "mym-c-3":{"x":940,"y":676,"w":186,"h":167,"offX":12,"offY":25,"sourceW":207,"sourceH":209},
                "mym-c-4":{"x":752,"y":676,"w":186,"h":167,"offX":12,"offY":24,"sourceW":207,"sourceH":209},
                "mym-c-5":{"x":564,"y":676,"w":186,"h":167,"offX":12,"offY":23,"sourceW":207,"sourceH":209},
                "mym-c-6":{"x":376,"y":676,"w":186,"h":167,"offX":12,"offY":22,"sourceW":207,"sourceH":209},
                "mym-c-7":{"x":188,"y":676,"w":186,"h":167,"offX":12,"offY":21,"sourceW":207,"sourceH":209},
                "mym-c-8":{"x":0,"y":676,"w":186,"h":167,"offX":12,"offY":21,"sourceW":207,"sourceH":209},
                "mym-c-9":{"x":1692,"y":507,"w":186,"h":167,"offX":12,"offY":20,"sourceW":207,"sourceH":209},
                "mym-c-10":{"x":1504,"y":507,"w":186,"h":167,"offX":12,"offY":19,"sourceW":207,"sourceH":209},
                "mym-c-11":{"x":1316,"y":507,"w":186,"h":167,"offX":12,"offY":18,"sourceW":207,"sourceH":209},
                "mym-c-12":{"x":1128,"y":507,"w":186,"h":167,"offX":12,"offY":17,"sourceW":207,"sourceH":209},
                "mym-c-13":{"x":940,"y":507,"w":186,"h":167,"offX":12,"offY":16,"sourceW":207,"sourceH":209},
                "mym-c-14":{"x":752,"y":507,"w":186,"h":167,"offX":12,"offY":15,"sourceW":207,"sourceH":209},
                "mym-c-15":{"x":564,"y":507,"w":186,"h":167,"offX":12,"offY":14,"sourceW":207,"sourceH":209},
                "mym-c-16":{"x":376,"y":507,"w":186,"h":167,"offX":12,"offY":13,"sourceW":207,"sourceH":209},
                "mym-c-17":{"x":188,"y":507,"w":186,"h":167,"offX":12,"offY":12,"sourceW":207,"sourceH":209},
                "mym-c-18":{"x":0,"y":507,"w":186,"h":167,"offX":12,"offY":11,"sourceW":207,"sourceH":209},
                "mym-c-19":{"x":1692,"y":338,"w":186,"h":167,"offX":12,"offY":10,"sourceW":207,"sourceH":209},
                "mym-c-20":{"x":1504,"y":338,"w":186,"h":167,"offX":12,"offY":9,"sourceW":207,"sourceH":209},
                "mym-c-21":{"x":1316,"y":338,"w":186,"h":167,"offX":12,"offY":8,"sourceW":207,"sourceH":209},
                "mym-c-22":{"x":1128,"y":338,"w":186,"h":167,"offX":12,"offY":8,"sourceW":207,"sourceH":209},
                "mym-c-23":{"x":940,"y":338,"w":186,"h":167,"offX":12,"offY":7,"sourceW":207,"sourceH":209},
                "mym-c-24":{"x":752,"y":338,"w":186,"h":167,"offX":12,"offY":6,"sourceW":207,"sourceH":209},
                "mym-c-25":{"x":564,"y":338,"w":186,"h":167,"offX":12,"offY":5,"sourceW":207,"sourceH":209},
                "mym-c-26":{"x":376,"y":338,"w":186,"h":167,"offX":12,"offY":4,"sourceW":207,"sourceH":209},
                "mym-c-27":{"x":188,"y":338,"w":186,"h":167,"offX":12,"offY":3,"sourceW":207,"sourceH":209},
                "mym-c-28":{"x":0,"y":338,"w":186,"h":167,"offX":12,"offY":2,"sourceW":207,"sourceH":209},
                "mym-c-29":{"x":1692,"y":169,"w":186,"h":167,"offX":12,"offY":3,"sourceW":207,"sourceH":209},
                "mym-c-30":{"x":1504,"y":169,"w":186,"h":167,"offX":12,"offY":4,"sourceW":207,"sourceH":209},
                "mym-c-31":{"x":1316,"y":169,"w":186,"h":167,"offX":12,"offY":6,"sourceW":207,"sourceH":209},
                "mym-c-32":{"x":1128,"y":169,"w":186,"h":167,"offX":12,"offY":7,"sourceW":207,"sourceH":209},
                "mym-c-33":{"x":940,"y":169,"w":186,"h":167,"offX":12,"offY":8,"sourceW":207,"sourceH":209},
                "mym-c-34":{"x":752,"y":169,"w":186,"h":167,"offX":12,"offY":9,"sourceW":207,"sourceH":209},
                "mym-c-35":{"x":564,"y":169,"w":186,"h":167,"offX":12,"offY":10,"sourceW":207,"sourceH":209},
                "mym-c-36":{"x":376,"y":169,"w":186,"h":167,"offX":12,"offY":12,"sourceW":207,"sourceH":209},
                "mym-c-37":{"x":188,"y":169,"w":186,"h":167,"offX":12,"offY":13,"sourceW":207,"sourceH":209},
                "mym-c-38":{"x":0,"y":169,"w":186,"h":167,"offX":12,"offY":14,"sourceW":207,"sourceH":209},
                "mym-c-39":{"x":1692,"y":0,"w":186,"h":167,"offX":12,"offY":15,"sourceW":207,"sourceH":209},
                "mym-c-40":{"x":1504,"y":0,"w":186,"h":167,"offX":12,"offY":16,"sourceW":207,"sourceH":209},
                "mym-c-41":{"x":1316,"y":0,"w":186,"h":167,"offX":12,"offY":17,"sourceW":207,"sourceH":209},
                "mym-c-42":{"x":1128,"y":0,"w":186,"h":167,"offX":12,"offY":19,"sourceW":207,"sourceH":209},
                "mym-c-43":{"x":940,"y":0,"w":186,"h":167,"offX":12,"offY":20,"sourceW":207,"sourceH":209},
                "mym-c-44":{"x":752,"y":0,"w":186,"h":167,"offX":12,"offY":21,"sourceW":207,"sourceH":209},
                "mym-c-45":{"x":564,"y":0,"w":186,"h":167,"offX":12,"offY":22,"sourceW":207,"sourceH":209},
                "mym-c-46":{"x":376,"y":0,"w":186,"h":167,"offX":12,"offY":23,"sourceW":207,"sourceH":209},
                "mym-c-47":{"x":188,"y":0,"w":186,"h":167,"offX":12,"offY":25,"sourceW":207,"sourceH":209},
                "mym-c-48":{"x":0,"y":0,"w":186,"h":167,"offX":12,"offY":26,"sourceW":207,"sourceH":209}};
            // MovieClip 可以通过duration控制两张图片轮播的速度。duration:0.2*10=2
            new MovieClip('mym-c', loader.get('mym-c_png').data,formatResData(mcConfig)).play();
        }

    }



})();