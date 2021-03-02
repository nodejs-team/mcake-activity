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
        var winPrize = {
            num:0,
            $winCover:$(".win-cover"),
            $win:$(".win"),
            $winaward:$(".win-award"),
            callback:function () {

            },
            event:function () {
                var self = this;
                $(".prize li").each(function (i) {
                    $(this).find(".select").click(function () {
                        $(".select").removeClass("on");
                        $(this).parent("li").siblings().removeClass("on");
                        $(this).parent("li").addClass("on");
                        $(this).addClass("on");
                        self.num=i+1;
                    });

                });
            },
            confirm:function () {
                var self = this;
                $(".confirm").click(function () {
                    console.log(self.num);
                    QuanDialog(self.num);
                });
            },
            init:function () {
                this.event();
                //this.confirm();

            }
        }

        winPrize.init();
        window.winPrize = winPrize;

        /*指定锚点跳转位置*/
        function scrollTopAni(ele,callback) {
            var sTop = $(ele).offset().top-80;
            $("html,body").animate({scrollTop:sTop},500,function () {
                callback && callback();
            });
        }
        $(".go-use").click(function () {
            scrollTopAni("#cake");
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


