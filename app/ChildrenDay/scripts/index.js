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

        $(".prolistLi").each(function () {
            var self = this;
            $(this).find('.buy-btn2').click(function () {
                /* $(".go-buy").hide(0).siblings().show(0);*/
                SelectShow(self,[0,0,0,0],1,true,0,0);
            });
            $(this).find('.m-btn').click(function () {
                /* $(".go-car").hide(0).siblings().show(0);*/
                SelectShow(self,[20,20,20,20],1,true,0,0);
            });
        });
        $(".go-car").click(function () {
            SelectHide();
        });
        $(".go-buy,.s-closes").click(function () {
            SelectHide();
        });

        var game = {
            $Dialogbg:$(".Dialogbg-bubble"),
            $Dialog:$(".Dialog-bubble"),
            $closes:$(".closes"),
            $quan:$(".Dialog-quan"),
            $goUse:$(".go-use"),
            num:0,
            uimg:0,
            a:false,
            time:null,
            result:1,
            bubblesW:parseFloat($(".bubbleBig").width()),
            bubblesH:parseFloat($(".bubbleBig").height()),
            quanFade:function (n) {
                this.$Dialogbg.fadeIn(100);
                this.$Dialog.fadeIn(100);
                this.$Dialog.find(".bubble-"+n).fadeIn(100).siblings(".bubble").not(".closes").hide();
            },
            select:function () {
                var self = this;
                $(".uimg li").each(function (i) {
                    $(this).find(".select").click(function () {
                        $(".select").removeClass("on");
                        $(this).addClass("on");
                        self.uimg = i+1;
                    })
                })
            },
            closeFun:function () {
                this.$Dialogbg.fadeOut(300);
                this.$Dialog.fadeOut(300);
                this.$quan.fadeOut(300);
            },
            choujiang:function (n) {
                if(!this.a){
                    this.$quan.fadeIn(100);
                    this.$quan.find(".quan-"+n).fadeIn(100).siblings().not(".closes").hide();
                    this.a=true;
                }
            },
            step1:function () {
                this.quanFade(1);

            },
            step2:function () {
                var self = this;
                this.quanFade(2);
                this.select();
            },
            gameStart:function () {
                var self = this;
                self.num+=15;
                if(self.num>=80){
                    self.num=80;
                    $(".bubbleBig").addClass("p");
                    setTimeout(function () {
                        // self.closeFun();
                        this.a=false;
                        clearTimeout(self.time);
                        $(".bubble-time").fadeOut(10);

                         self.choujiang(self.result);
                        /*choujiang();*/
                    },500)
                }

                $(".bubbleBig").stop().animate({width:"+="+self.num+"px",height:"+="+self.num+"px",top:"-="+self.num/2+"px",left:"-="+self.num/2+"px"},500);
            },
            step3:function () {
                var self = this;
                this.quanFade(3);

            },
            countdown:function () {
                var self = this;
                var countdown=10;
                function settime(obj) {
                    if (countdown < 0) {
                        //self.closeFun();
                        self.choujiang(self.result);
                        /*choujiang();*/
                        countdown = 10;
                        return;
                    } else {
                        obj.text("倒计时："+countdown+"s");
                        countdown--;
                    }
                    self.time = setTimeout(function() {
                        settime(obj);
                    },1000);
                }
                settime($(".bubble-time"));
            },
            event:function () {
                var self = this;
                $(".bubble-1 .go").click(function () {
                    self.step2();
                });
                $(".bubble-2 .confirm").click(function () {
                    self.step3();
                    $(this).attr("data-uimg",self.uimg);
                    $(".uimg-big").addClass("uimg-big-"+self.uimg);
                });
                this.$closes.click(function () {
                    self.closeFun();
                })
                this.$goUse.click(function () {
                    self.closeFun();
                })
            },
            init:function () {
                /*this.step1();*/
                this.event();

            }
        }


        window.game = game;
        game.init();

        /*指定锚点跳转位置*/
        function scrollTopAni(ele,callback) {
            var sTop = $(ele).offset().top;
            $("html,body").animate({scrollTop:sTop-60},500,function () {
                callback && callback();
            });
        }
        $(".go-use1").click(function () {
            scrollTopAni("#cake1");
        });

        $(".go-use2").click(function () {
            scrollTopAni("#cake2");
        });

    };

})();



/*领取优惠券*/
var $Dialogbg = $(".Dialogbg-quan"),
    $Dialog=$(".Dialog-quan"),
    $rules=$(".quan"),
    $card=$(".card"),
    $goUse=$(".go-use"),
    $closes=$(".closes");

function QuanDialog(n) {
    $Dialogbg.fadeIn(300);
    $Dialog.fadeIn(300);
    $Dialog.find(".quan-"+n).fadeIn(300).siblings().not(".closes").hide();
    /* $card.find("img").attr("src","https://act.mcake.com/fangli/2019/pc/memberDay-7yue/images/card-"+n+".png");*/

   /* $Dialog.find(".quan").fadeIn(300).siblings().not(".closes").hide();*/
}

/*关闭*/
$closes.click(function () {
    $Dialogbg.fadeOut(300);
    $Dialog.fadeOut(300);
});

$goUse.click(function () {
    $Dialogbg.fadeOut(300);
    $Dialog.fadeOut(300);
});


window.QuanDialog = QuanDialog;

function choujiang(obj,data) {
    $(".clow").addClass(game.catchs);
    setTimeout(function () {
        $(".clow").removeClass(game.catchs);
    },1500);
    setTimeout(function () {
        QuanDialog(parseInt(data.describe));/*12345*/
    },800);
}