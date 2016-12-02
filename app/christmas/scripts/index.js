;(function(){
    function sliding(callback, duration){
        //模拟setTimeout
        var starttime = Date.now();
        function animate(timestamp){
            var runtime = timestamp - starttime;
            if(runtime<duration){
                requestAnimationFrame(function(){
                    animate(Date.now())
                })
            } else {
                callback();
            }
        }
        requestAnimationFrame(function(){
            animate(Date.now());
        })
    }
    function initTitle(){
        $('.title').fadeIn(3000)
    }
    function initNum(){
        var $input = $('.pro-num input');
        var cc = '个';
        $input.each(function(ix, input){
            var $el = $(this);
            var min = $el.attr('data-min') || 0;
            var max = $el.attr('data-max') || 10;
            var $minu = $el.siblings('.minus');
            var $plus = $el.siblings('.plus');
            $el.on('blur', function(){
                var val = parseInt(this.value);
                if(!val){
                    this.value = min+cc;
                } else if(val>max){
                    this.value = max+cc;
                } else {
                    this.value = val+cc;
                }
            });
            $minu.on('click', function(){
                var val = parseInt($el.val());
                if(val>min){
                    $el.val((--val)+cc);
                }
            });
            $plus.on('click', function(){
                var val = parseInt($el.val());
                if(val<max){
                    $el.val((++val)+cc);
                }
            })
        })
    }
    function initScroll(){
        scrollAnimate('#evt_container', [
            {$dom: $('.cake1'), x:-300, y:-300}
            ,{$dom: $('.fruit1'), x:300, y:300}
            ,{$dom: $('.word1'), x:-300, y:300}
            ,{$dom: $('.ar1'), x:300, y:-300}
            ,{$dom: $('.ar2'), x:-300, y:300}
            ,{$dom: $('.word2'), x:300, y:300}
            ,{$dom: $('.photo1'), x:-300, y:-300}
            ,{$dom: $('.cake3'), x:300, y:300}
            ,{$dom: $('.word3'), x:-300, y:300}
            ,{$dom: $('.ar3'), x:300, y:-300}
            ,{$dom: $('.ar4'), x:300, y:0}
            ,{$dom: $('.word4'), x:300, y:300}
            ,{$dom: $('.ar5'), x:300, y:300}
            ,{$dom: $('.cake5'), x:-300, y:-300}
            ,{$dom: $('.word5'), x:-300, y:300}
            ,{$dom: $('.fruit4'), x:300, y:-300}
        ])
    }
    function initMovieClip(res){
        new MovieClip('candle', res['candle_png'].data, [
            {"x":0,"y":0,"w":245,"h":128,"offX":0,"offY":0,"sourceW":245,"sourceH":128, duration:2},
            {"x":0,"y":130,"w":245,"h":128,"offX":0,"offY":0,"sourceW":245,"sourceH":128, duration:2},
            {"x":0,"y":260,"w":245,"h":128,"offX":0,"offY":0,"sourceW":245,"sourceH":128, duration:2},
            {"x":247,"y":130,"w":245,"h":128,"offX":0,"offY":0,"sourceW":245,"sourceH":128, duration:2},
            {"x":247,"y":0,"w":245,"h":128,"offX":0,"offY":0,"sourceW":245,"sourceH":128, duration:2}
        ]).play();
        new MovieClip('cris', res['cris_png'].data, [
            {"x":0,"y":0,"w":291,"h":275,"offX":0,"offY":0,"sourceW":291,"sourceH":275, duration:9},
            {"x":293,"y":0,"w":291,"h":264,"offX":0,"offY":0,"sourceW":291,"sourceH":275, duration:15}
        ]).play();
    }
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
    function initSnow(){
        //http://thecodeplayer.com/walkthrough/html5-canvas-snow-effect
        var W = window.innerWidth;
        var H = window.innerHeight;
        var canvas = document.getElementById('snow');
        canvas.width = W;
        canvas.height = H;
        var ctx = canvas.getContext("2d");

        var mp = 30;
        var particles = [];
        for(var i = 0; i < mp; i++){
            particles.push({
                x: Math.random()*W,
                y: Math.random()*H,
                r: Math.random()*4+1,
                d: Math.random()*mp
            })
        }
        function draw()
        {
            ctx.clearRect(0, 0, W, H);
            ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
            ctx.beginPath();
            for(var i = 0; i < mp; i++){
                var p = particles[i];
                ctx.moveTo(p.x, p.y);
                ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
            }
            ctx.fill();
            update();
            // requestAnimationFrame(draw);
            sliding(draw, 10);
        }
        var angle = 0;
        function update()
        {
            angle += 0.01;
            for(var i = 0; i < mp; i++)
            {
                var p = particles[i];
                //Updating X and Y coordinates
                //We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
                //Every particle has its own density which can be used to make the downward movement different for each flake
                //Lets make it more random by adding in the radius
                p.y += 0.5*Math.cos(angle+p.d) + 0.5 + p.r/2;
                p.x += Math.sin(angle);

                //Sending flakes back from the top when it exits
                //Lets make it a bit more organic and let flakes enter from the left and right also.
                if(p.x > W+5 || p.x < -5 || p.y > H)
                {
                    if(i%3 > 0) //66.67% of the flakes
                    {
                        particles[i] = {x: Math.random()*W, y: -10, r: p.r, d: p.d};
                    }
                    else
                    {
                        //If the flake is exitting from the right
                        if(Math.sin(angle) > 0)
                        {
                            //Enter from the left
                            particles[i] = {x: -5, y: Math.random()*H, r: p.r, d: p.d};
                        }
                        else
                        {
                            //Enter from the right
                            particles[i] = {x: W+5, y: Math.random()*H, r: p.r, d: p.d};
                        }
                    }
                }
            }
        }

        //animation loop
        // setInterval(draw, 20);
        draw();
    }
    function startLoading(){
        document.getElementById('evt_container').style.display = 'block';
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
            initScroll();
            initTitle();
            initMovieClip(loader.getAll());
            initNum();
            initSnow();
        });
        loader.loadGroup('preload');
    }
    startLoading();
})()