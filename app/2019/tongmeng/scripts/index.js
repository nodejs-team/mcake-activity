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


    var loadComplete = function () {

        var swiper1 = new Swiper('.swiper1', {
            observer:true,
            observeParents:true,
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





    };
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




})();



;(function () {
    function choujiang(data) {  /* n<=$item的length */
        this.$DialogCover = $(data.DialogCover);
        this.$DialogBox = $(data.DialogBox);
        this.$close = $(data.DialogBox).find(".closes");
        this._Init(data.n);
    }
    choujiang.prototype={
        DialogTipShow:function (n) {
            this.$DialogCover.fadeIn(500);
            this.$DialogBox.fadeIn(500);
            this.$DialogBox.find(".quan-"+n).fadeIn(300).siblings().not(".closes").hide();
        },
        DialogTipHide:function () {
            this.$DialogCover.fadeOut(20);
            this.$DialogBox.fadeOut(20);
        },
        _Init:function (n) {
            var self = this;
            self.DialogTipShow(n);
            this.$close.click(function () {
                self.DialogTipHide();
            });

        }
    };
    window.choujiang = choujiang;
})();






!(function () {

    /*领取优惠券*/
    var $Dialogbg = $(".Dialogbg-quan"),
        $Dialog=$(".Dialog-quan"),
        $rules=$(".quan"),
        $goUse=$(".go-use"),
        $closes=$(".closes");

    function QuanDialog(data) {
        $Dialogbg.delay(200).fadeIn(300);
        $Dialog.delay(200).fadeIn(300);
        $Dialog.find(".quan-"+data.n).fadeIn(300).siblings().not(".closes").hide();
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

})();

/*砸蛋*/

var breakEgg={
    $egg:$(".egg"),
    $ele:$(".chuizi"),
    move:function (ele) {
        var self = this;
        var eX = ele.position().left;
        var eY = ele.position().top;
        self.$ele.animate({
            "left":(eX+30)+"px",
            "top":(eY+50)+"px"
        },100);
        //self.$ele.addClass("on");
        console.log(eX);
    },
    init:function () {
        var self = this;
        $(".egg").click(function () {
            self.move($(this));
        });
    }
}
//breakEgg.init();