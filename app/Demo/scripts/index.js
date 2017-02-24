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
    function initAnimate(){
        window.scrollAnimate('#evt_container', [
            {dom: '.sec2-step1', x:-400, y:-200}

            ,{dom: '.sec2-step2', x:200, y:200, delay: 800}
            ,{dom: '.sec2-step3', x:0, y:100, delay: 1200}

        ])
    }

    function animGif() {
        //图片配置
        var config = {
            "gif-1":{"x":296,"y":73,"w":72,"h":71,"offX":22,"offY":31,"sourceW":102,"sourceH":109,duration:2},
            "gif-2":{"x":222,"y":73,"w":72,"h":71,"offX":22,"offY":29,"sourceW":102,"sourceH":109,duration:2},
            "gif-3":{"x":148,"y":73,"w":72,"h":71,"offX":22,"offY":28,"sourceW":102,"sourceH":109,duration:2},
            "gif-4":{"x":74,"y":73,"w":72,"h":71,"offX":22,"offY":26,"sourceW":102,"sourceH":109,duration:2},
            "gif-5":{"x":0,"y":73,"w":72,"h":71,"offX":22,"offY":24,"sourceW":102,"sourceH":109,duration:2},
            "gif-6":{"x":370,"y":0,"w":72,"h":71,"offX":22,"offY":23,"sourceW":102,"sourceH":109,duration:2},
            "gif-7":{"x":296,"y":0,"w":72,"h":71,"offX":22,"offY":21,"sourceW":102,"sourceH":109,duration:2},
            "gif-8":{"x":222,"y":0,"w":72,"h":71,"offX":22,"offY":24,"sourceW":102,"sourceH":109,duration:2},
            "gif-9":{"x":148,"y":0,"w":72,"h":71,"offX":22,"offY":26,"sourceW":102,"sourceH":109,duration:2},
            "gif-10":{"x":74,"y":0,"w":72,"h":71,"offX":22,"offY":29,"sourceW":102,"sourceH":109,duration:2},
            "gif-11":{"x":0,"y":0,"w":72,"h":71,"offX":22,"offY":31,"sourceW":102,"sourceH":109,duration:2}
        };
        // MovieClip 可以通过duration控制两张图片轮播的速度。
        new MovieClip("images/gif.png", config, 'mc', 'anim-gif').gotoAndPlay(1,-1);


    }
    function startLoading(){
        var loader = new Loader('images/'), domLoad = document.getElementById('evt_loading');
        domLoad.style.display = 'block';
        loader.addGroup('preload', resData);
        loader.on('progress', function(groupName, ix, len){
            domLoad.innerHTML = parseInt(ix/len*100) + '%';
        })
        loader.on('complete', function(groupName){
            fixImageSrc(loader.getAll());
            domLoad.style.display = 'none';
            document.getElementById('evt_content').style.display = 'block';
            initAnimate();
            animGif();

        });
        loader.loadGroup('preload');
    }
    startLoading();
})()