;(function(){
    var resData = {
        "groups":[
            {
                "keys":"christmas_png,lg_title_png,lg_price_png,lighter_png,banner-bg_jpg,christmas2_png",
                "name":"preload"
            }],
        "resources":[
            {
                "name":"christmas_png",
                "type":"image",
                "url":"http://edm.mcake.com/shuxy/2016/christmas/images/christmas.png"
            },
            {
                "name":"christmas2_png",
                "type":"image",
                "url":"http://edm.mcake.com/weifengwang/christmas/images/christmas2.png"
            },
            {
                "name":"lg_title_png",
                "type":"image",
                "url":"http://edm.mcake.com/shuxy/2016/christmas/images/lg_title.png"
            },
            {
                "name":"lg_price_png",
                "type":"image",
                "url":"http://edm.mcake.com/shuxy/2016/christmas/images/lg_price.png"
            },
            {
                "name":"lighter_png",
                "type":"image",
                "url":"http://edm.mcake.com/shuxy/2016/christmas/images/lighter.png"
            },
            {
                "name":"christ_logo",
                "type":"image",
                "url":"http://edm.mcake.com/shuxy/2016/christmas/images/christ_logo.png"
            },
            {
                "name":"banner-bg_jpg",
                "type":"image",
                "url":"http://edm.mcake.com/weifengwang/christmas/images/banner-bg.jpg"
            }]
    };
    var aniMap = {
        "fade-in": function(el, delay, cb){
            var $el = $(el);
            $el.css({
                opacity: 0
            });

            setTimeout(function(){
                $el.animate({
                    opacity: 1
                }, 800, cb);
            }, delay);
        },
        "slide-right": function(el, delay, cb){
            var $el = $(el);
            $el.css({
                opacity: 0,
                marginLeft: -el.offsetWidth*0.5
            });

            setTimeout(function(){
                $el.animate({
                    opacity: 1,
                    marginLeft: 0
                }, 1000, 'easeOutCubic', function(){
                    cb && cb();
                });
            }, delay);

        }
    }
    var isSupportCss3 = (function(){
        var ret = /MSIE (\d+\.\d+)/.exec(navigator.userAgent);
        if( !ret || ret[1] > 9 ){
            return true;
        }
        return false;
    })();
    var throttle = function(fn, delay){
        var timer = null;
        return function(){
            var args = arguments;
            if(timer){
                clearTimeout(timer);
            }
            timer = setTimeout(function(){
                fn.apply(window, args)
            }, delay)
        }
    }
    var setLighterMc = function () {
        var mc = new MovieClip('lighter_png', {
            "l1":{"x":0,"y":214,"w":194,"h":105,"offX":0,"offY":0,"sourceW":194,"sourceH":105,duration:2},
            "l2":{"x":196,"y":214,"w":194,"h":105,"offX":0,"offY":0,"sourceW":194,"sourceH":105,duration:2},
            "l3":{"x":196,"y":107,"w":194,"h":105,"offX":0,"offY":0,"sourceW":194,"sourceH":105,duration:2},
            "l5":{"x":196,"y":0,"w":194,"h":105,"offX":0,"offY":0,"sourceW":194,"sourceH":105,duration:2},
            "l6":{"x":0,"y":0,"w":194,"h":105,"offX":0,"offY":0,"sourceW":194,"sourceH":105,duration:2}}, 'lighter_mc', "lighter");
        mc.gotoAndPlay(1, -1);
        return mc;
    };
    var setCrisMC = function(){
        var christmas = document.getElementById('christmas');
        var christmas2 = document.getElementById('christmas2');
        var mc = null;
        var $cris = $('.christmas'),
            $win = $(window);
        // if(christmas){
        //     mc = new MovieClip('christmas_png', {
        //         "c1":{"x":0,"y":0,"w":224,"h":230,"offX":2,"offY":2,"sourceW":232,"sourceH":235,duration:18},
        //         "c2":{"x":0,"y":232,"w":224,"h":223,"offX":6,"offY":2,"sourceW":232,"sourceH":235,duration:30}
        //     }, 'christmas_mc', christmas);
        //     $cris.append('<div class="mc-logo"></div>')
        // }
        if(christmas2){
            mc = new MovieClip('christmas2_png', {
                "b":{"x":117,"y":0,"w":115,"h":138,"offX":4,"offY":0,"sourceW":119,"sourceH":150, duration:18},
                "a":{"x":0,"y":0,"w":115,"h":150,"offX":0,"offY":0,"sourceW":119,"sourceH":150, duration:30}
            }, 'christmas2_mc', christmas2);
        }
        if(mc){
            mc.gotoAndPlay(1, -1);
            $cris.append('<a href="'+$('#bannerLink').attr('href')+'" style="position:absolute; top:0; left:0; width:100%; height:100%;"></a>');
            $win.on('scroll', throttle(function(){
                var st = $win.scrollTop();
                if(st>700){
                    $cris.fadeOut();
                } else {
                    $cris.fadeIn();
                }
            }, 300))
        }

        return mc;
    };
    function bindAnimate(el, hasDelay){
        var anim = el.getAttribute('data-anim');
        var delay = Number(el.getAttribute('data-delay')||0)*1000;
        var delayAdjust = Number(el.getAttribute('data-delay-adjust')||0)*1000;
        var chain = el.getAttribute('data-chain');

        delay = hasDelay ? delay : 0;
        delay += delayAdjust;
        if( isSupportCss3 ){

            el.className = [el.className, anim].join(" ");
            el.style['-webkit-animation-delay'] = delay + "ms";
            el.style['animationDelay'] = delay + "ms";
        } else {
            if( aniMap[anim] ) {
                aniMap[anim].call(el, el, delay);
            }
        }
    }


    Function.prototype.bind = Function.prototype.bind || function(){
            var self = this,
                context = [].shift.call(arguments),
                args = [].slice.call(arguments);
            return function(){
                return self.apply(context, [].concat.call(args, [].slice.call(arguments)));
            }
        };

    function getRandom(min, max) {
        return min + Math.random()*(max-min);
    }

    function getWindowSize() {
        return {
            clientW: window.innerWidth || document.documentElement.clientWidth,
            clientH: window.innerHeight || document.documentElement.clientHeight
        }
    }

    var clientSize = getWindowSize();
    var body = document.body;

    function Snow(container, opts) {
        this.container = container;
        this.opts = opts;
        this.create();
    }

    Snow.prototype = {
        create: function () {
            this.el = document.createElement("div");
            this.el.className = 'snow';
            this.el.style["width"] = this.opts.snowWidth + "px";
            this.el.style["height"] = this.opts.snowHeight + "px";
            this.el.style["top"] = -this.opts.snowHeight + "px";
            this.el.style["-webkit-transition"] = "all " + this.opts.speed + "ms linear";
            this.el.style["transition"] = "all " + this.opts.speed + "ms linear";

            this.container.appendChild(this.el);
            this.fall();
        },
        fall: function () {
            var self = this;
            var left = getRandom(0, clientSize.clientW - this.opts.snowWidth);
            var destLeft = getRandom(-300, 300);
            var scale = getRandom(0.6, 1);

            this.el.style["left"] = left + "px";
            this.el.style["-ms-transform"] = "scale("+ scale +")";
            this.el.style["-webkit-transform"] = "scale("+ scale +")";
            this.el.style["transform"] = "scale("+ scale +")";

            body.offsetWidth;
            var transformStyle = "scale("+ scale +") translate3d("+ destLeft +"px,"+ (clientSize.clientH + this.opts.snowHeight)*2 +"px,0px)";
            this.el.style["-webkit-transform"] = transformStyle;
            this.el.style["transform"] = transformStyle;

            //当前页面失去焦点时，通过transitionend的方式移除this.el会有问题，因此通过这种方式移除
            $({y: -this.opts.snowHeight, left: left}).animate({
                y: (clientSize.clientH + this.opts.snowHeight)*(1/scale),
                left: left + destLeft
            }, {
                easing: 'linear',
                duration: this.opts.speed,
                step: function ( value, obj) {
                    if( !isSupportCss3 ){
                        if( obj.prop == 'y' ) {
                            self.el.style.top = obj.now + "px";
                        }
                        if( obj.prop == 'left' ){
                            self.el.style.left = obj.now + "px";
                        }
                    }
                },
                complete: function () {
                    self.reset();
                }
            });
        },
        reset: function () {
            try {
                this.container.removeChild(this.el);
            } catch (e){
                console.error(e.message);
            }
        }
    };

    function SnowFall(opts){
        this.opts = $.extend({
            interval: 100,
            speed: 5000,
            snowWidth: 15,
            snowHeight: 15
        }, opts||{});

        this.timer = null;
        this.body = document.body;

        this.init();
    }

    SnowFall.prototype = {
        init: function () {
            this.createLayout();
            this.start();
        },
        start: function () {
            new Snow(this.container, this.opts);
            this.timer = setTimeout(function () {
                this.start();
            }.bind(this), this.opts.interval);
        },
        createLayout:function () {
            this.container = document.createElement("div");
            this.container.className = 'snow-container';
            this.body.appendChild(this.container);
        },
        destroy: function () {
            if( this.timer ) clearTimeout(this.timer);
            this.container.parentNode.removeChild(this.container);
        }
    };

    $(function () {
        $(window).on("resize", function () {
            clientSize = getWindowSize();
        });
    });


    var loadResource = function(){
        var DomLoad = Resource.el('#evt_loading');
        var loadComplete = function () {
//                DomLoad.style.display = "none";
//                Resource.el('#evt_container').style.display = 'block';
            bindAnimate($('#evt_content .lg-price').get(0), false);
            bindAnimate($('#evt_content .lg-title').get(0), false);
            setCrisMC();
            setLighterMc();
            new SnowFall();
        };
        var loader = new Resource.loadGroup("preload", resData);


        loader.addEvent("progress", function (loaded, total) {
//                DomLoad.innerHTML = "loading: " + Math.floor(loaded / total * 100) + "%";
        });

        loader.addEvent("complete", loadComplete);
    };
    $(function(){
        loadResource();
    })
})()