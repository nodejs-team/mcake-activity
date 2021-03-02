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



        /*自动聚焦*/
        $(".iphone,.pic-code,.code").click(function () {
            $(this).find("input").focus();
            return false;
        });

        /*弹框fixd定位后，键盘收起后，位置不对应*/
        document.body.addEventListener('focusout', function () {
            setTimeout(function() {
                var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
                window.scrollTo(0, Math.max(scrollHeight - 1, 0));
            }, 100);
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




function Letter(bg,els,opts,n,money) {
    this.$Dialog = $(els);
    this.$Dialogbg = $(bg);
    this.$close = this.$Dialog.find(opts.close);
    this.$btn = this.$Dialog.find(opts.btn);
    this.n = n;
    this.money = money;
    this._init();
}
Letter.prototype={
    _init:function () {
        var self = this;
        this.show();
        /*this.$Dialogbg.click(function () {
            self.hide();
        });*/
        this.$close.click(function () {
            self.hide();
        });
        /*this.$btn.click(function () {
            self.hide();

        });*/
    },
    show:function () {
        this.$Dialogbg.fadeIn(300);
        this.$Dialog.fadeIn(300);
        this.$Dialog.find(".hb").text(this.money);
        this.$Dialog.find(".quan-"+this.n).fadeIn(300).siblings().not(".closes").hide();
    },
    hide:function () {
        this.$Dialogbg.fadeOut(300);
        this.$Dialog.fadeOut(300);
        $(".sec-qingshu .content,.sec-qingshu .qs-btn").addClass("open");
    }
};
