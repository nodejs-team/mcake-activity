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

    /*计算banner整平的高度*/
    function bannerHeight() {
        var winH = $(window).height();
        return winH;
    }

    /*banner整屏幕自适应*/
    function banner() {
        var bannerH= bannerHeight();
        $(".sec-top").height(bannerH);
    }


    var game = {
        /*开门*/
        openDoor:function (ele,open) {
            var self = this;
            ele.find(".room").delay(200).fadeIn(500);
            ele.find(".door-left").delay(200).animate({"left":px2rem(-190)+"rem"},800);
            ele.find(".door-right").delay(200).animate({"right":px2rem(-190)+"rem"},800,function () {
                if(open){
                    self.openBox();
                }
            });
        },
        /*开箱子*/
        openBox:function () {
            $(".box-1").fadeOut(0);
            $(".box-2").fadeIn(100);
            $(".card").addClass("fly");
        },
        /*蛋糕下落*/
        cakeDrop:function () {
            $(".cake-0").animate({"top":"0"},800);
        },
        /*进行抽奖*/
        award:function (card,callback) {
            card.addClass("a-flip");
            setTimeout(function () {
                callback && callback();
                card.removeClass("a-flip");
            },800);
        },

        init:function () {
            var self = this;
            /*敲门*/

            $(".sec-1 .qm-shou").click(function () {
                var that = $(this);
                playVid();
                $(this).addClass('qiaomen');
                $(this).parents(".sec-1").find(".qm-word").delay(1000).fadeIn(500,function () {
                    that.parents(".sec-1").find(".qm-shou,.qm-word,.qm-acrow").delay(500).fadeOut(400,function () {
                        self.openDoor(that.parents(".sec-1"),true);
                    });
                });
            });

            $(".sec-2 .qm-shou").click(function () {

                var that = $(this);
                playVid();
                $(this).addClass('qiaomen');
                $(this).parents(".sec-2").find(".qm-word").delay(1000).fadeIn(500,function () {
                    that.parents(".sec-2").find(".qm-shou,.qm-word,.qm-acrow").delay(500).fadeOut(400,function () {
                        self.openDoor(that.parents(".sec-2"),false);
                    });
                });
            });


            $(".yanjing").click(function () {
                self.cakeDrop();
            });

        }
    };

    window.game = game;

    var knock = document.getElementById("knock");
    function playVid()
    {

        knock.play();

    }
    function pauseVid()
    {
        knock.pause();

    }

    var loadComplete = function () {
        pauseVid();
        /*头屏计算*/
        banner();
        game.init();

        var swiper1 = new Swiper('.swiper1', {
            speed:300,
            autoplay : {
                delay:3000,
                disableOnInteraction: false,
            },
            loop: true,
            pagination: {
                el: '.swiper-pagination1',
                clickable: true
            }
        });


        $(".Dialog-tip").hide(200);
        var swiper2 = new Swiper('.swiper2', {
            observer:true,
            observeParents:true,
            speed:300,
            autoplay : {
                delay:3000,
                disableOnInteraction: false,
            },
            loop: true,
            pagination: {
                el: '.swiper-pagination2',
                clickable: true
            }

        });

        /*initScroll();*/

    };



    var initScroll = function (){
        window.scrollAnimate('#evt_container', [
             {dom: '.b-ys',x:0, y:0,duration:800,delay:800}
             ,{dom: '.moun-1',x:0, y:100,duration:500,delay:400}
             ,{dom: '.moun-2',x:0, y:100,duration:500,delay:800}
             ,{dom: '.b-title',x:0, y:-100,duration:800,delay:600}

        ])
    };


})();

;(function () {
    function choujiang(DialogCover,DialogBox,n,arr) {  /* n<=$item的length */
        this.$DialogCover = $(DialogCover);
        this.$DialogBox = $(DialogBox);
        this.$item = $(DialogBox).find(".box-item");
        this.$close = $(DialogBox).find(".closes");
        this.$wait = $(DialogBox).find(".go-btn");
        this._Init(n,arr);
    }
    choujiang.prototype={
        DialogTipShow:function (n,arr) {
            this.$DialogCover.fadeIn(500);
            this.$DialogBox.fadeIn(500).addClass("on");
            this.$DialogBox.find(".jp-leve").addClass("leve-"+n);
            this.$DialogBox.find(".jp-quan").addClass("quan-"+n);

            if(n==0){
                $(".tips-word").css({top:px2rem(500)+"rem",opacity:0});
                $(".quans-1").fadeOut(0);
                $(".quans-2").fadeIn(100,function () {
                    $(".tips-word").animate({top:px2rem(70)+"rem",opacity:0.8},800);
                    $(".tips-word").delay(3000).animate({opacity:0},500,function () {
                        $(".tips-word").css({top:px2rem(500)+"rem",opacity:0});
                    });
                });
            }else{
                $(".quans-1").fadeIn(0);
                $(".quans-2").fadeOut(0);
                this.$DialogBox.find(".jp-name").html(arr[n].name);
            }
        },
        DialogTipHide:function () {
            this.$DialogCover.fadeOut(20);
            this.$DialogBox.fadeOut(20);
        },
        _Init:function (n,arr) {
            var self = this;
            self.DialogTipShow(n,arr);
            this.$close.click(function () {
                self.DialogTipHide();
            });
            this.$wait.click(function () {
                self.DialogTipHide();
            });
        }
    };
    window.choujiang = choujiang;
})();