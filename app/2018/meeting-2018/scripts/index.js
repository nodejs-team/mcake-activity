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
        /*var wh = $(window).height();
        console.log(wh);
        $("#evt_content,.step").height(wh);
*/


        /*返回主页*/
        $(".back").click(function () {
            $(".step").fadeOut(0);
            $(".home-page").fadeIn(0);
            $(".vote-btn").fadeOut(0);
        });

        $(".step").fadeOut(0);

       /* $(".home-page").fadeOut(0);
        $(".step-wish-list").fadeIn(0);*/

        $(".home-page li").not(".disabled").click(function () {
            var index = $(this).index();

            $(".home-page,.step").fadeOut(0);
            $(".step").eq(index).fadeIn(0);
            if(index == 0){
                $(".blessing").focus();
            }
            else if(index == 3){
                $(".vote-btn").fadeIn(10);
            }
        });


        $(".my-Award").click(function () {
            $(".home-page,.step").fadeOut(0);
            $(".step-award").fadeIn(0);
        });
        selectItem ();

        /*initScroll();*/
    }
    var initScroll = function (){
        window.scrollAnimate('#evt_container', [
             {dom: '.home-page .word',x:0, y:100,duration:500,delay:200}
        ])
    };

    /*弹幕*/
    function barrage() {
        var bragH = $(".barrage-item").offset().top;
        var bragL = $(".barrage-item").offset().left;
        var space = 10;
        
        $(".barrages li").each(function () {
            space+=50;
            $(this).css({top:bragH + space,left:bragL+(space*2)});

        });
    }


    /*选择节目*/
    function selectItem() {
        $(".step-vote .list li").click(function () {
            $(this).toggleClass('on');
        });
    }

    /*弹窗*/
    var Dialogs = {
        $DialogBg:$(".Dialogbg"),
        $Dialog:$(".Dialog"),
        time:0,
        success:function () {
            var self = this;
            this.$Dialog.find(".D-success").fadeIn(0);
            this.$DialogBg.fadeIn(200);
            this.$Dialog.fadeIn(200);
            this.time = setTimeout(function () {
                self.hide();
            },2000);
        },
        fail:function (msg) {
            var self = this;
            this.$Dialog.find(".txt").html(msg);
            this.$Dialog.find(".D-fail").fadeIn(0);
            this.$DialogBg.fadeIn(0);
            this.$Dialog.fadeIn(0);
            this.time = setTimeout(function () {
                self.hide();
            },2000);
        },
        hide:function () {
            var self = this;
            this.$Dialog.find(".content").fadeOut(0);
            this.$DialogBg.fadeOut(0);
            this.$Dialog.fadeOut(0);
            this.$DialogBg.click(function () {
                self.$DialogBg.fadeOut(0);
                self.$Dialog.fadeOut(0);
                self.$Dialog.find(".content").fadeOut(0);
                clearTimeout( self.time );
            });

        },
        init:function () {
            this.hide();
        }

    }



    var Dtime = 0;
    function publicShow(ele) {
        $(".public-Dialogbg,.public-Dialog").fadeIn(500);
        Dtime = setTimeout(function () {
            publicHide();
        },5000);
    }

    function publicHide() {
        $(".public-Dialogbg,.public-Dialog").fadeOut(0);
    }
    $(".public-Dialogbg,.d-close").click(function () {
        publicHide();
        clearTimeout(Dtime);
    });



    window.publicShow = publicShow;
    window.publicHide = publicHide;

    window.Dialogs = Dialogs;


})();