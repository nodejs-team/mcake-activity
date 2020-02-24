
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

        /**蛋糕*/
        $(".sec-cake").each(function () {
            var self = this;
            $(this).find('.buy-btn').click(function () {
                SelectShow(self,[0,0,0,0],1,true,1,0);
            });
        });
        $(".go-car").click(function () {
            SelectHide();
        });
        $(".go-buy,.s-closes").click(function () {
            SelectHide();
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



/*抽奖通用弹窗*/
;(function () {
    function choujiang(data) {  /* n<=$item的length */
        this.$DialogCover = $(data.DialogCover);
        this.$DialogBox = $(data.DialogBox);
        this.$close = $(data.DialogBox).find(".closes");
        this.$use = $(data.DialogBox).find(".go-use");
        this._Init(data.n,data.arr);
    }
    choujiang.prototype={
        DialogTipShow:function (n,arr,prize) {
            this.$DialogCover.fadeIn(500);
            this.$DialogBox.delay(500).addClass("show").fadeIn();
            console.log(n,arr,prize);
            this.$DialogBox.find(".jieqian").attr("src","https://act.mcake.com/fangli/2019/wap/newyear-chouqian/images/jieqian-"+n+".png");
            $(".sec-cake .cake").attr("class","cake cake-"+n);
            $(".buy-btn").fadeIn();


            $(".sec-cake").data("pond",arr[n-1]["data-pond"]);
            $(".sec-cake").data("weight",arr[n-1]["data-weight"]);
            $(".sec-cake").data("price",arr[n-1]["data-price"]);
            $(".sec-cake").data("time",arr[n-1]["data-time"]);
            $(".sec-cake").data("postid",arr[n-1]["data-postid"]);
            $(".sec-cake").data("tips",arr[n-1]["data-tips"]);
            $(".sec-cake").data("sku",arr[n-1]["data-sku"]);
            $(".sec-cake").data("method",arr[n-1]["data-method"]);
            $(".sec-cake").data("pid",arr[n-1]["data-pid"]);
            $(".sec-cake").data("ptype",arr[n-1]["data-ptype"]);
            $(".sec-cake").data("channel",arr[n-1]["data-channel"]);

        },
        DialogTipHide:function () {
            this.$DialogCover.fadeOut(20);
            this.$DialogBox.delay(500).removeClass("show");
            $(".cake-cover").delay(500).fadeOut(500);
        },
        _Init:function (n,arr,prize) {
            var self = this;
            self.DialogTipShow(n,arr,prize);
            this.$close.click(function () {
                self.DialogTipHide();
            });

            this.$use.click(function () {
                self.DialogTipHide();
            });
        }
    };
    window.choujiang = choujiang;
})();

