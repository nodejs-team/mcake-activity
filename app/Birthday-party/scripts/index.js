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


    function initNum() {
        var items = [];
        $(".products li").each(function(i,el){
            var ponds = $(el).attr('data-pond');
            var ids = $(el).attr('data-price');
            var postId = $(el).attr('data-postid');

            if(ponds){
                items.push({
                    ponds: ponds.split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")}),
                    ix: 0,
                    ids: ids.split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")}),
                    postId: postId.split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")})
                })
            }

            var index = i;
            var currentItem = items[index];

            /*
             *蛋糕磅数加
             */
            $(this).find(".plus").on('click', function(){
                var ix = ++currentItem.ix;
                if(ix>=currentItem.ponds.length-1){
                    ix =currentItem.ix = currentItem.ponds.length-1;
                }


                $(this).parents("li").find(".price").text(currentItem.ids[ix]);
                $(this).parents("li").find(".bangshu").text(currentItem.ponds[ix]);
                $(this).parents("li").find(".postid").data("postid", currentItem.postId[ix]);

            });
            /*
             *蛋糕磅数减少
             */
            $(this).find(".minus").on('click', function(){
                var ix = --currentItem.ix;
                if(ix<=0){
                    ix=currentItem.ix = 0;
                }

                $(this).parents("li").find(".price").text(currentItem.ids[ix]);
                $(this).parents("li").find(".bangshu").text(currentItem.ponds[ix]);
                $(this).parents("li").find(".postid").data("postid", currentItem.postId[ix]);

            });


        });
    };


    var initScroll = function (){
        window.scrollAnimate('#evt_container', [
            {dom: '.sec1-bg',x:0, y:-100,duration:500}
            ,{dom: '.b-title',x:0, y:-200,duration:800}
            ,{dom: '.light',x:0, y:0,opacity:0,duration:800,delay:1000}
            ,{dom: '.cake-nino',x:100, y:0,opacity:0,duration:800,delay:500}
            ,{dom: '.word-1',x:-100, y:0,opacity:0,duration:800,delay:500}
            ,{dom: '.cake-xm',x:-100, y:0,opacity:0,duration:800,delay:500}
            ,{dom: '.word-2',x:100, y:0,opacity:0,duration:800,delay:500}
            ,{dom: '.party',x:0, y:0,opacity:0,duration:800,delay:500}


        ])
    };

    var animates = {
        light:function () {
            //图片配置
            var mcConfig = {
                "light-1":{"x":136,"y":1,"w":61,"h":76,"offX":53,"offY":31,"sourceW":160,"sourceH":131,"duration":5},
                "light-2":{"x":1,"y":90,"w":133,"h":87,"offX":12,"offY":25,"sourceW":160,"sourceH":131,"duration":5},
                "light-3":{"x":1,"y":179,"w":133,"h":76,"offX":12,"offY":31,"sourceW":160,"sourceH":131,"duration":5},
                "light-4":{"x":1,"y":1,"w":133,"h":87,"offX":12,"offY":25,"sourceW":160,"sourceH":131,"duration":5}
            };
            // MovieClip 可以通过duration控制两张图片轮播的速度。duration:0.2*10=2
            new MovieClip('light', loader.get('light_png').data,formatResData(mcConfig)).play();
        }
    }

    var loadComplete = function () {
        animates.light();
        initNum();
        initScroll();
    }

})();