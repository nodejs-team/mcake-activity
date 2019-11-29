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
        $(".row").each(function () {
            var self = this;
            $(this).find('.m-btn').click(function () {
                SelectShow(self,[0,0,0,0],1,true,1,0);
            });
        });
        $(".go-car").click(function () {
            SelectHide();
        });
        $(".go-buy,.s-closes").click(function () {
            SelectHide();
        });




        /*initScroll();  新版wap端跳转新页面再返回来之后，页面无法滑动了*/
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


    var initScroll = function (){
        window.scrollAnimate('#evt_container', [
            ,{dom: '.banner-t',x:0, y:100,duration:500,delay:200}
        ])
    };


})();

/*抽奖*/
;(function () {
    function choujiang(data) {  /* n<=$item的length */
        this.$DialogCover = $(data.DialogCover);
        this.$DialogBox = $(data.DialogBox);
        this.$item = $(data.DialogBox).find(".box-item");
        this.$close = $(data.DialogBox).find(".closes");
        this.$wait = $(data.DialogBox).find(".go-wait");
        this._Init(data.n,data.arr);
    }
    choujiang.prototype={
        DialogTipShow:function (n,arr) {
            this.$DialogCover.fadeIn(500);
            this.$DialogBox.fadeIn(500);

            this.$DialogBox.find(".jp-name").html(arr[n].name);
            this.$DialogBox.find(".tip1").html(arr[n].tip1);
            this.$DialogBox.find(".tip2").html(arr[n].tip2);

            this.$DialogBox.find(".jp").css({"background":"url('https://act.mcake.com/fangli/2019/wap/ThanksgivingDay/images/jiang-"+arr[n].imgNum+"-on.png') center","background-size":"cover"});
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



