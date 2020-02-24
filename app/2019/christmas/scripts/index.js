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

        /*换购*/
       $('.huangou').each(function () {
            var a = false;
            $(this).click(function () {
                if(a){
                    $(this).find(".icon").addClass("on");
                    a = false;
                }else{
                    $(this).find(".icon").removeClass("on");
                    a = true;
                }
            });
        });

        initScroll();
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
            ,{dom: '.sec-top',x:0, y:0,duration:500,delay:200}
            ,{dom: '.sec-1 .tree-txt',x:0, y:50,duration:500,delay:200}
            ,{dom: '.sec-1 .tree',x:0, y:50,duration:500,delay:400}
            ,{dom: '.sec-1 .box',x:0, y:50,duration:500,delay:600}

            ,{dom: '.sec-2 .hy-title',x:0, y:50,duration:500,delay:400}
            ,{dom: '.sec-2 .cake',x:0, y:50,duration:500,delay:400}
            ,{dom: '.sec-2 .price-1',x:0, y:50,duration:500,delay:600}
            ,{dom: '.sec-2 .buy-btn',x:0, y:50,duration:500,delay:600}
            ,{dom: '.sec-2 .huangou',x:0, y:50,duration:500,delay:600}

            ,{dom: '.sec-3 .hy-title',x:0, y:50,duration:500,delay:400}
            ,{dom: '.sec-3 .cake',x:0, y:50,duration:500,delay:400}
            ,{dom: '.sec-3 .price-1',x:0, y:50,duration:500,delay:600}
            ,{dom: '.sec-3 .buy-btn',x:0, y:50,duration:500,delay:600}
            ,{dom: '.sec-3 .dis-1',x:-50, y:0,duration:500,delay:800}

            ,{dom: '.sec-4 .hy-title',x:0, y:50,duration:500,delay:400}
            ,{dom: '.sec-4 .code',x:0, y:50,duration:500,delay:400}
            ,{dom: '.sec-4 .dis-2',x:-50, y:0,duration:500,delay:400}
            ,{dom: '.sec-4 .dis-3',x:50, y:0,duration:500,delay:400}

        ])
    };


})();


;(function () {
    function choujiang(DialogCover,DialogBox,n,arr) {  /* n<=$item的length */
        this.$DialogCover = $(DialogCover);
        this.$DialogBox = $(DialogBox);
        this.$item = $(DialogBox).find(".box-item");
        this.$close = $(DialogBox).find(".closes");
        this.$wait = $(DialogBox).find(".go-wait");
        this._Init(n,arr);
    }
    choujiang.prototype={
        DialogTipShow:function (n,arr) {
            this.$DialogCover.fadeIn(500);
            this.$DialogBox.fadeIn(500);
            $(".tip-wrap").fadeOut(0);
            if(n<0){ /*未中奖*/
                $(".tip-2").fadeIn(20);
            }else{

                $(".tip-1").fadeIn(20);
                this.$DialogBox.find(".jp-name").html(arr[n].name);
                this.$DialogBox.find(".jp").css({"background":"url('https://act.mcake.com/fangli/2018/pc/christmas/images/jiang-"+(n+1)+".png') center","background-size":"cover"});
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
