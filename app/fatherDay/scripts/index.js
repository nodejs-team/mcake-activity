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

        var game={
            $clow:$(".clow"),
            $left:$(".machine-btn-left"),
            $start:$(".machine-btn-start"),
            $right:$(".machine-btn-right"),
            distance:10,
            maxdistance:90,
            moveDistance:0,
            catchs:"catch1",
            left:parseFloat($(".clow").css("marginLeft")),
            moveLeft:function (n) {
                this.moveDistance=this.left+n;
                this.$clow.stop().animate({marginLeft:this.moveDistance+"px"},100);
            },
            moveRight:function (n) {
                this.moveDistance=this.left+n;
                this.$clow.stop().animate({marginLeft:this.moveDistance+"px"},100);
            },
            event:function () {
                var self = this;

                this.$left.click(function () {

                    self.distance-=20;
                    console.log(self.distance)
                    if(self.distance<=-self.maxdistance){
                        self.distance=-self.maxdistance;

                    }
                    if(self.distance>=-self.maxdistance && self.distance<=-self.maxdistance+40){
                        self.catchs="catch2";
                    }else{
                        self.catchs="catch1";
                    }

                    self.moveLeft(self.distance);
                });
                this.$right.click(function () {
                    self.distance+=20;
                    console.log(self.distance)
                    if(self.distance>=self.maxdistance){
                        self.distance=self.maxdistance;
                    }
                    if(self.distance>=self.maxdistance-40 && self.distance<=self.maxdistance){
                        self.catchs="catch2";
                    }else{
                        self.catchs="catch1";
                    }
                    self.moveRight(self.distance);
                });
            },
            gameStart:function () {
                var self = this;
                /*this.$start.click(function () {
                    $(".clow").addClass(self.catchs);
                    setTimeout(function () {
                        self.$clow.removeClass(self.catchs);
                    },1500);
                });*/
                this.event();
            }
        };
        window.game = game;
        game.gameStart();



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