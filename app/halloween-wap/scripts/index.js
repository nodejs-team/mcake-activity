;(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
            || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());


;(function(){

    function sliding(callback, duration){
        //模拟setTimeout
        var starttime;
        function animate(timestamp){
            var runtime = timestamp - starttime;
            if(runtime<duration){
                requestAnimationFrame(function(timestamp){
                    animate(timestamp || new Date().getTime())
                })
            } else {
                callback();
            }
        }
        requestAnimationFrame(function(timestamp){
            starttime = timestamp || new Date().getTime();
            animate(starttime);
        })
    }
    function getRandom(start, end, isInt){
        var rdm = Math.random()*(end-start)+start;
        return isInt === false ? rdm : parseInt(Math.random()*(end-start)+start);
    }
    function animateDarkCake(){
        var $cakeContain = $('.cakeContain');
        // $.Velocity.hook($cakeContain, 'translateZ', -4000);
        // $cakeContain.velocity({
        //     translateZ: 0
        // }, {
        //     duration: 1000,
        //     easing: [0.230, 0.330, 0.000, 1.230],
        //     complete: function(){
        //         $.Velocity.hook($cakeContain, 'translateZ', 0);
        //     }
        // })
        $.Velocity.hook($cakeContain, 'opacity', 0);
        $cakeContain.velocity({
            opacity:1
        }, {
            duration: 1000,
            complete: function(){}
        })
    }
    function animateLighting(){
        var $lightLeft = $('.light-left'),
            $lightRight = $('.light-right');
        $.Velocity.hook($lightLeft, 'rotateZ', '20deg');
        $.Velocity.hook($lightRight, 'rotateZ', '-20deg');
        $lightLeft.css('display', 'block')
            .velocity({
                rotateZ: 0
            }, {
                duration: 1000,
                complete: function(){
                    $lightRight.css('display', 'block')
                        .velocity({
                            rotateZ: 0
                        }, {
                            duration: 1000
                        })
                }
            })

    }
    function animatePumpkin(){
        var $pump = $('.pump');
        function pumpLighting(ticks){
            $pump.toggleClass('light');
            if(ticks>0){
                sliding(function(){
                    pumpLighting(ticks-1);
                }, getRandom(50, 400))
            }
        }
        function pumpShinning(){
            pumpLighting(7);
            sliding(pumpShinning, getRandom(6000,10000))
        }
        pumpShinning();
    }
    function animateGlitch(){
        var $glitch = $('.glitch');
        var $glitchCake=$('.glitchCake');
        //参考http://whoareyoubeing.today/
        function glitchStep(ticks){
            for(var i=0; i<getRandom(0,ticks); i++){
                sliding(function(){
                    var css,dir;
                    dir=Math.random()<0.5?'horizontal':'vertical';
                    if(dir=='vertical'){
                        css = {top: getRandom(0, 40)}
                    } else {
                        css = {left: getRandom(0,30)}
                    }
                    $glitchCake.css(css);
                    $glitch.css({
                        'opacity': getRandom(0, 0.1, false),
                        'background-position': getRandom(0,600)+'px '+getRandom(0,600)+'px'
                    })
                }, getRandom(0, 400));
            }
            sliding(function(){
                $glitch.css('opacity',0);
                $glitchCake.css({
                    top:0,
                    left:0
                })
            }, 500);
            // $glitch.css({
            //     'background-position': getRandom(0,500)+'px '+getRandom(0,500)+'px',
            //     'opacity': getRandom(0.05, 0.2, false)
            // });
            // $glitchCake.css({
            //     'top':getRandom(-100,100),
            //     'left':getRandom(-100,100),
            //     opacity: 1
            // })
            // if(ticks>0){
            //     sliding(function(){
            //         glitchStep(ticks-1);
            //     }, 100)
            // } else {
            //     $glitch.css('opacity',0);
            //     $glitchCake.css('opacity', 0);
            // }
        }
        function glitch(){
            glitchStep(100);
            sliding(glitch, getRandom(3000,3500))
        }
        glitch();
    }

    function bindScrollAnimation(){
        var $boxText = $('.boxText'),
            $boxbang = $('.boxbang'),
            scrollItem = [
                {$dom: $boxText, x:0, y:-80},
                {$dom: $boxbang, x:0, y:300}
            ];
        scrollAnimate('.lightCakeWrap', scrollItem);
    }
    function cakeMovieClip(){
        new MovieClip(document.getElementById('cakeMovieClip'), false, {"frameRate":10,"frames":[
            {img: loader.get('heart1_png').data, duration:3}
            ,{img: loader.get('heart2_png').data}
            ,{img: loader.get('heart3_png').data}
            ,{img: loader.get('heart4_png').data}
            ,{img: loader.get('heart5_png').data}
            ,{img: loader.get('heart6_png').data}
            ,{img: loader.get('heart7_png').data}
            ,{img: loader.get('heart8_png').data}
            ,{img: loader.get('ghost1_png').data}
            ,{img: loader.get('ghost2_png').data}
            ,{img: loader.get('ghost3_png').data}
            ,{img: loader.get('ghost4_png').data}
            ,{img: loader.get('ghost5_png').data}
            ,{img: loader.get('ghost6_png').data}
            ,{img: loader.get('ghost7_png').data}
            ,{img: loader.get('ghost8_png').data}
            ,{img: loader.get('eye1_png').data}
            ,{img: loader.get('eye2_png').data}
            ,{img: loader.get('eye3_png').data}
            ,{img: loader.get('eye4_png').data}
            ,{img: loader.get('eye5_png').data}
            ,{img: loader.get('eye6_png').data}
            ,{img: loader.get('eye7_png').data}
            ,{img: loader.get('eye8_png').data}
            ,{img: loader.get('pumpkin1_png').data}
            ,{img: loader.get('pumpkin2_png').data}
            ,{img: loader.get('pumpkin3_png').data}
            ,{img: loader.get('pumpkin4_png').data}
            ,{img: loader.get('pumpkin5_png').data}
            ,{img: loader.get('pumpkin6_png').data}
            ,{img: loader.get('pumpkin7_png').data}
            ,{img: loader.get('pumpkin8_png').data}
        ]}, {repeatCount:1}).play();
    }
    function showLightCake(){
        var $lightCakeWrap = $('.lightCakeWrap');
        $lightCakeWrap.velocity('fadeIn', {
            complete: function(){
                $('.darkCake').hide();
                bindScrollAnimation();
                cakeMovieClip();
            }
        })
    }

    function animateBtnGlitch(){
        var $glitch = $('.btn-glitch');
        var $glitchedBtn=$('.glitchedBtn');
        function glitchStep(ticks){
            $glitch.css({
                'background-position': getRandom(0,100)+'px '+getRandom(0,100)+'px',
                'opacity': getRandom(0.05,0.1,false)
            });
            $glitchedBtn.css({
                'top':getRandom(-20,20),
                'left':getRandom(-30,30),
                opacity: 1
            })
            if(ticks>0){
                sliding(function(){
                    glitchStep(ticks-1);
                }, 100)
            } else {
                $glitch.css('opacity',0);
                $glitchedBtn.css('opacity', 0);
            }
        }
        function glitch(){
            glitchStep(4);
            sliding(glitch, getRandom(1000,10000))
        }
        glitch();
    }

    function start(){
        var $darkCake = $('.darkCake');
        $darkCake.velocity('fadeIn', {
            complete: function(){
                animateDarkCake();
                animateLighting();
                sliding(animatePumpkin, 2500);
                sliding(animateGlitch, 2000);
                sliding(animateBtnGlitch, 2000);
                $darkCake.find('.careBtn').on('click', function(){
                    showLightCake();
                })
            }
        })
    }
    function loadPreload(){
        var isLoadingAnimationEnd = false,
            isLoadingResourceEnd = false,
            loadingNumber = 0;
        var $progressText = $('.loader .text'),
            $progressBar = $('.loader .progress span');
        function loadAnimation(){
            var percent = loadingNumber + '%';
            $progressText.html(percent);
            $progressBar.width(percent);
            loadingNumber+= 4;
            if(loadingNumber>95){
                isLoadingAnimationEnd = true;
                loadEnd()
            } else {
                sliding(loadAnimation, 80)
            }

        }
        function loadEnd(){
            if(isLoadingAnimationEnd && isLoadingResourceEnd){
                $progressText.html('100%');
                $progressBar.width('100%');
                start();
            }
        }
        loader.on('complete', function(groupName){
            if(groupName == 'preload'){
                isLoadingResourceEnd = true;
                loadEnd();
            }
        })
        loader.loadGroup('preload');
        // isLoadingAnimationEnd = true;
        loadAnimation();
    }
    function loadLoading(){
        var $loading = $('#loading');
        loader.on('complete', function(groupName){
            if(groupName == 'loading'){
                $loading.show();
                new MovieClip(document.getElementById('slide'), this.get('loading-slide_png').data, {
                    "frameRate":10,
                    "frames":[
                        {"x":0,"y":0,"w":618,"h":311, duration:1},
                        {"x":618,"y":0,"w":618,"h":311, duration:1},
                        {"x":0,"y":311,"w":618,"h":311, duration:1}
                    ]}).play();
                loadPreload();
            }
        })
        loader.loadGroup('loading');
    }
    var loader = new Loader('images/');
    loader.addGroup('loading', loadingData)
        .addGroup('preload', preloadData);
    loadLoading();
})();