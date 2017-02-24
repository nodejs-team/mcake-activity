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

    var loader;
    function startLoading(){
        var domLoad = document.getElementById('evt_loading');
        loader = new Loader('images/');
        domLoad.style.display = 'block';
        loader.addGroup('preload', resData);
        loader.on('progress', function(groupName, ix, len){
            domLoad.innerHTML = parseInt(ix/len*100) + '%';
        })
        loader.on('complete', function(groupName){
            fixImageSrc(loader.getAll());
            domLoad.style.display = 'none';
            document.getElementById('evt_content').style.display = 'block';
            loadComplete();

        });
        loader.loadGroup('preload');
    }

    var loadComplete = function () {
        initScroll();
        animtion.heart();
        animtion.gezi();
        animtion.fly();
        animtion.dog();
        animtion.arrow();
        animtion.girl();
        events.reelClick();
    };


    var animtion = {
        heart:function () {
            //图片配置
            var mcConfig = [
                {"x":133,"y":1,"w":130,"h":81,"offX":0,"offY":10,"sourceW":130,"sourceH":99,"duration":2},
                {"x":265,"y":1,"w":130,"h":75,"offX":0,"offY":14,"sourceW":130,"sourceH":99,"duration":0},
                {"x":1,"y":1,"w":130,"h":99,"offX":0,"offY":0,"sourceW":130,"sourceH":99,"duration":4},
                {"x":1,"y":102,"w":130,"h":91,"offX":0,"offY":4,"sourceW":130,"sourceH":99,"duration":20}
            ];
            // MovieClip 可以通过duration控制两张图片轮播的速度。
            new MovieClip('heart', loader.get('heart_png').data, mcConfig).play();
        },
        gezi:function () {
            //图片配置
            var mcConfig = [
               {"x":644,"y":1,"w":213,"h":213,"offX":0,"offY":9,"sourceW":213,"sourceH":222,"duration":20},
               {"x":214,"y":1,"w":213,"h":215,"offX":0,"offY":7,"sourceW":213,"sourceH":222,"duration":3},
               {"x":429,"y":1,"w":213,"h":213,"offX":0,"offY":9,"sourceW":213,"sourceH":222,"duration":3},
               {"x":1,"y":225,"w":213,"h":215,"offX":0,"offY":7,"sourceW":213,"sourceH":222,"duration":3},
               {"x":431,"y":216,"w":213,"h":213,"offX":0,"offY":9,"sourceW":213,"sourceH":222,"duration":10},
               {"x":1,"y":1,"w":211,"h":222,"offX":0,"offY":0,"sourceW":213,"sourceH":222,"duration":4},
               {"x":646,"y":216,"w":213,"h":210,"offX":0,"offY":12,"sourceW":213,"sourceH":222,"duration":2},
               {"x":216,"y":218,"w":213,"h":213,"offX":0,"offY":9,"sourceW":213,"sourceH":222,"duration":20}
            ];
            // MovieClip 可以通过duration控制两张图片轮播的速度。
            new MovieClip('gezi', loader.get('gezi_png').data, mcConfig).play();
        },
        fly:function () {
            //图片配置
            var mcConfig = [
                {"x":1,"y":1,"w":200,"h":210,"offX":0,"offY":0,"sourceW":243,"sourceH":210,"duration":4},
                {"x":1,"y":213,"w":201,"h":148,"offX":42,"offY":60,"sourceW":243,"sourceH":210,"duration":4}
            ];
            // MovieClip 可以通过duration控制两张图片轮播的速度。
            new MovieClip('fly', loader.get('fly_png').data, mcConfig).play();
        },
        dog:function () {
            //图片配置
            var mcConfig = [
                {"x":1,"y":1,"w":227,"h":347,"offX":0,"offY":0,"sourceW":227,"sourceH":350,"duration":6},
                {"x":230,"y":1,"w":220,"h":350,"offX":7,"offY":0,"sourceW":227,"sourceH":350,"duration":6}
            ];
            // MovieClip 可以通过duration控制两张图片轮播的速度。
            new MovieClip('dog', loader.get('dog_png').data, mcConfig).play();
        },
        arrow:function () {
            //图片配置
            var mcConfig = [
                {"x":77,"y":1,"w":36,"h":57,"offX":0,"offY":0,"sourceW":36,"sourceH":57,"duration":14},
                {"x":39,"y":1,"w":36,"h":57,"offX":0,"offY":0,"sourceW":36,"sourceH":57,"duration":8},
                {"x":1,"y":1,"w":36,"h":57,"offX":0,"offY":0,"sourceW":36,"sourceH":57,"duration":8}
            ];
            // MovieClip 可以通过duration控制两张图片轮播的速度。
            new MovieClip('arrow', loader.get('arrow_png').data, mcConfig).play();
        },
        girl:function () {
            //图片配置
            var mcConfig = [
                {"x":187,"y":1,"w":184,"h":171,"offX":0,"offY":0,"sourceW":184,"sourceH":171,"duration":10},
                {"x":1,"y":1,"w":184,"h":171,"offX":0,"offY":0,"sourceW":184,"sourceH":171,"duration":10}
            ];
            // MovieClip 可以通过duration控制两张图片轮播的速度。
            new MovieClip('girl', loader.get('girl_png').data, mcConfig).play();
        }
    };

    var events = {
        reelClick:function () {
            var $reel1 = $("#reel-1");
            var $reel2 = $("#reel-2");
            var $arrow = $(".arrow");
            $reel2.click(function () {
                $reel1.toggleClass("on");
                $arrow.toggleClass("on");
            });
        }
    };
    var initScroll = function (){
        window.scrollAnimate('#evt_container', [
            {dom: '.s1_anim', y:-200,duration:800}
            ,{dom: '.s2_computer',x:-200, y:-50,duration:1300}
            ,{dom: '.gezi',x:-200, y:-50,duration:1300}
            ,{dom: '.s2_office',x:100, y:-50,duration:1800}
            ,{dom: '.reel',x:300,duration:2000}
            ,{dom: '.s2_cake',x:-100,y:-50,duration:2000}
            ,{dom: '.s2_lichi',x:100,y:50}
            ,{dom: '.s2_scoop',x:-100}
            ,{dom: '.s2_word',x:20}
            ,{dom: '.fly',x:-50}
            ,{dom: '.girl',x:100,y:-50}
            ,{dom: '.sec3_whiteLover',x:-200}
            ,{dom: '.sec3_word',x:20}
            ,{dom: '.sec3_cici1',x:-200}
            ,{dom: '.sec3_cici2',x:200}
            ,{dom: '.pan',x:-300,y:-50}
            ,{dom: '.sec3_word3',x:-20}
            ,{dom: '.box',x:200,y:-50}
            ,{dom: '.sec3_gezi',x:-100}
            ,{dom: '.bottom',x:-100}
        ])
    }

    startLoading();

})();