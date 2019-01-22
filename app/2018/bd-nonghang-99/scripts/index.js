;(function(){

    function Slider(container, opts){
        this.$outer = $(container);

        this.$inner = this.$outer.children();
        this.$prev = $(opts.prev);
        this.$next = $(opts.next);
        this.$els = this.$inner.children();
        this.total = this.$els.length;
        this.w = this.$els.outerWidth(true);
        this.timer = null;
        this.isSliding = false;
        this.autoplay = opts.autoplay || false;
        this.init();
    }
    var proto = Slider.prototype;
    proto.init = function(){
        var self = this;
        var $last = this.$els.eq(this.total-1);
        if(this.total<6){
            $last = this.$els.clone().appendTo(this.$inner).eq(this.total-1);
            this.total *= 2;
        }
        $last.prependTo(this.$inner);
        this.$inner.css('marginLeft', -this.w);
        this.$prev.on('click', function(){
            self.prev();
        })
        this.$next.on('click', function(){
            self.next();
        })
        this.$outer.on('mouseenter', function(){
            clearTimeout(self.timer);
        })
        this.$outer.on('mouseleave', function(){
            self.auto();
        })
        this.auto();
    }
    proto.prev = function(){
        if(this.isSliding) return;
        this.isSliding = true;
        var self = this;
        this.$inner.animate({
            marginLeft: 0
        }, 500, function(){
            self.$inner.children().eq(self.total-1).prependTo(self.$inner);
            self.$inner.css('marginLeft', -self.w);
            self.isSliding = false;
        })
    }
    proto.next = function(){
        if(this.isSliding) return;
        this.isSliding = true;
        var self = this;
        this.$inner.animate({
            marginLeft: -this.w*2
        }, 500, function(){
            self.$inner.children().eq(0).appendTo(self.$inner);
            self.$inner.css('marginLeft', -self.w);
            self.isSliding = false;
        })
    }
    proto.auto = function(){
        if(!this.autoplay) return;
        var self = this;
        function delay(){
            self.timer = setTimeout(function(){
                self.next();
                delay();
            }, 5000)
        }
        delay();
    }

    function initTopIcon(){
        var icon = $('.top_icon'),
            winWidth = $(window).width();
        icon.css('top', 200 * (winWidth<1280? 1280 : winWidth) / 1920);
    }

    function startLoading(){
        var loader = new Loader('images/'), domLoad = document.getElementById('evt_loading');
        loader.addGroup('preload', resData);
        loader.on('progress', function(groupName, ix, len){
         
            domLoad.innerHTML = parseInt(ix/len*100) + '%';
        })
        loader.on('complete', function(groupName){
            domLoad.style.display = 'none';
            document.getElementById('evt_container').style.display = 'block';
            isIE();
            new Slider('.slideOuter1',{
                prev: '.prev1',
                next: '.next1',
                autoplay: true
            });
            new Slider('.slideOuter2',{
                prev: '.prev2',
                next: '.next2',
                autoplay: true
            });

            initTopIcon();
            initDisprice();
            initNum();

            $(".floater").fadeOut(10);
            $("html,body").animate({scrollTop: 0},500,function () {
                floater();
            });

        });
        loader.loadGroup('preload');
    }
    startLoading();

    var discount = 100;
    //初始化折扣价
    function initDisprice() {
        $('.products li').each(function () {
            var val= $(this).find('.price').val();
            $(this).find(".dis-price").html(val-discount);
        })

    }

    function initNum() {
        var items = [];
        $(".products li").each(function(i,el){
            var ponds = $(el).attr('data-pond');
            var ids = $(el).attr('data-price');
            var postId = $(el).attr('data-postid');

            if(ponds){
                items.push({
                    ponds: ponds.split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")}),
                    ix: 0,
                    ids: ids.split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")}),
                    postId: postId.split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")})
                })
            }

            var index = i;
            var currentItem = items[index];
            
            

            /*
             *蛋糕磅数加
             */
            $(this).find(".plus").on('click', function(){

                var ix = ++currentItem.ix;
                if(ix>=currentItem.ponds.length-1){
                    ix =currentItem.ix = currentItem.ponds.length-1;
                }

                $(this).parents("li").find("input").val(currentItem.ponds[ix]+' / ￥'+currentItem.ids[ix]);

                $(this).parents("li").find(".postid").data("postid", currentItem.postId[ix]);
                $(this).parents("li").find(".price").val(currentItem.ids[ix]);


                $(this).parents("li").find(".dis-price").html(currentItem.ids[ix]-discount);

            });
            /*
             *蛋糕磅数减少
             */
            $(this).find(".minus").on('click', function(){
                var ix = --currentItem.ix;
                if(ix<=0){
                    ix=currentItem.ix = 0;
                }

                $(this).parents("li").find("input").val(currentItem.ponds[ix]+' / ￥'+currentItem.ids[ix]);
                $(this).parents("li").find(".postid").data("postid", currentItem.postId[ix]);
                $(this).parents("li").find(".price").val(currentItem.ids[ix]);
                $(this).parents("li").find(".dis-price").html(currentItem.ids[ix]-discount);
            });


        });
    };



    function isIE(){
        if ((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)){

            $(".ftitle,.pro-num,.slideOuter").addClass("ieCss");

        }
    }


    function floater(){
        var floater = $('.floater');
        var headerHeight = $(".header").height();
        var floaterHeight = $('.floater').height();
        var msTop =$(".top_quality").offset().top+180;
        var fTop = 110; /*导航高度*/
        var floaterPosition =floater.css("position") ;  /*'fixed'*/


        $(".floater").fadeIn(500);


        /*初始化位置*/
        floater.css({
            top:msTop-headerHeight,
            position: "absolute"
        });


        floater.find("li").hover(function () {
            $(this).addClass("on").siblings().removeClass("on");
        });

        floater.find("li").click(function () {
            var index=$(this).index();
            var hotspot=$('.sec-hotspot').eq(index).offset().top;
            $("html,body").animate({scrollTop: hotspot-100}, 1000);
        });




        scrollFun();
        function scrollFun() {
            $(window).on("scroll", function(){
                var sTop = $(this).scrollTop();
                if(floaterPosition === 'fixed' &&  sTop < msTop-floaterHeight ){
                    floater.css({
                        position: "absolute",
                        top: msTop-headerHeight
                    });
                    floaterPosition = 'absolute';
                }
                if(floaterPosition === 'absolute' && sTop > msTop-floaterHeight){
                    floater.css({
                        position: "fixed",
                        top: fTop
                    });
                    floaterPosition = 'fixed';
                }
            });
        };
    }


})()