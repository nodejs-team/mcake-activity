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


    function refreshNumber(ix){}
    function initNum(){
        var $input = $('.pro-num input'),
            $minus = $input.siblings('.minus'),
            $plus = $input.siblings('.plus');
        var items = [];
        $('.slideItem').each(function(ix, el){
            var ponds = $(el).attr('data-pond');
            var prices = $(el).attr('data-price');
            var ids = $(el).attr('data-postID');
            var titles = $(el).attr('data-title');

            var posts1 = $(el).attr('data-posts1');
            var posts2 = $(el).attr('data-posts2');



            if(ponds){
                items.push({
                    ponds: ponds.split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")}),
                    prices: prices.split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")}),
                    ix: 0,
                    ids: ids.split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")}),
                    titles: titles.split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")}),
                    posts1: posts1,
                    posts2: posts2
                })
            }
        });
        var currentItem = items[0];

        /*数量减*/
        $minus.on('click', function(){

            var ix = --currentItem.ix;

            if(ix<0){
                ix = currentItem.ix = currentItem.ponds.length-1;
            }
            $input.val(currentItem.ponds[ix]).attr('data-postID', currentItem.ids[ix]);


        });
        /*数量加*/
        $plus.on('click', function(){
            var ix = ++currentItem.ix;
            if(ix>currentItem.ponds.length-1){
                ix = currentItem.ix = 0;
            }
            $input.val(currentItem.ponds[ix]).attr('data-postID', currentItem.ids[ix]);

        });


        /*数量选择*/


        return function(ix){

            currentItem = items[ix];


            $(".des-title").html(currentItem.titles).data("posts1",currentItem.posts1).data("posts2",currentItem.posts2);


            if(currentItem.ponds.length>1){
                $input.val(currentItem.ponds[1]).attr('data-postID', currentItem.ids[1]);
                $(".des-title").html(currentItem.titles[1]);
                currentItem.ix=1;
            }else {
                $input.val(currentItem.ponds[currentItem.ix]).attr('data-postID', currentItem.ids[currentItem.ix]);

                //$(".des-title").html(currentItem.titles[ix]);
                $(".des-title").html(currentItem.titles[currentItem.ix]);
            }

        }
    }


    function BDSlider(el, options){
        this.$wrapper = $(el);
        this.$items = this.$wrapper.children();
        this.percentage = 0.8;
        this.$next = $(options.next);
        this.$prev = $(options.prev);
        this.wrapWidth = this.$wrapper.width();
        this.wrapHeight = this.$wrapper.height();
        this.itemWidth = this.$items.width();
        this.itemHeight = this.$items.height();
        this.isSliding = false;
        this.slideEnd = options.slideEnd || function(ix){};
        // console.log(this.wrapHeight,this.itemHeight)
        this.position = {
            center: {
                top:0,
                left:(this.wrapWidth-this.itemWidth)/2,
                width: this.itemWidth,
                height: this.itemHeight
            },
            left: {
                top: (this.wrapHeight - this.itemHeight*this.percentage) / 2,
                left: 0,
                width: this.itemWidth * this.percentage,
                height: this.itemHeight * this.percentage
            },
            right: {
                top: (this.wrapHeight - this.itemHeight*this.percentage) / 2,
                left: this.wrapWidth - this.itemWidth * this.percentage,
                width: this.itemWidth * this.percentage,
                height: this.itemHeight * this.percentage
            },
            hide: {
                top: (this.wrapHeight - this.itemHeight*this.percentage) / 2,
                left: (this.wrapWidth - this.itemWidth*this.percentage) /2,
                width: this.itemWidth * this.percentage,
                height: this.itemHeight * this.percentage
            }
        };
        this.current = 0;
        this.total = this.$items.length;
        this.autoplay = options.autoplay || false;
        this.init();
    }
    BDSlider.prototype = {
        constructor: BDSlider,
        next: function(){
            if(this.isSliding) return;
            this.current--;
            if(this.current<0){
                this.current = this.total-1;
            }
            this.sliding('right');


        },
        prev: function(){
            if(this.isSliding) return;
            this.current++;
            if(this.current>=this.total){
                this.current = 0;
            }
            this.sliding('left');
        },
        auto:function () {
            if(!this.autoplay) return;
            var self = this;
            function delay(){
                self.timer = setTimeout(function(){
                    self.next();
                    delay();
                }, 5000)
            }
            delay();
        },
        sliding: function(direction){

            this.isSliding = true;
            var self = this;


            this.$items.each(function(ix, el){

                if(ix == self.current){
                    $(el).css('z-index',4).animate(self.position.center,500, function(){
                        self.isSliding = false;
                        self.slideEnd(self.current);
                    }).removeClass('slideRight slideLeft slideHide').addClass('slideCenter').find('span').animate({
                        bottom:px2rem(43)+'rem',
                        'font-size': px2rem(20)+'rem'
                    });
                    return;
                }
                if(ix == (self.current+1)%self.total){
                    $(el).css('z-index', direction=='right' ? 3 : 2).animate(self.position.right,500)
                        .removeClass('slideCenter slideLeft slideHide').addClass('slideRight').find('span').animate({
                        bottom: px2rem(35)+'rem',
                        'font-size': px2rem(11)+'rem'
                    });
                    return;
                }
                if(ix == (self.current-1+self.total)%self.total){
                    $(el).css('z-index', direction=='left' ? 3 : 2).animate(self.position.left, 500)
                        .removeClass('slideCenter slideRight slideHide').addClass('slideLeft').find('span').animate({
                        bottom: px2rem(35)+'rem',
                        'font-size': px2rem(11)+'rem'
                    });
                    return;
                }
                $(el).css('z-index', 1).animate(self.position.hide, 500)
                    .removeClass('slideCenter slideRight slideLeft').addClass('slideHide')

            })
        },
        init: function(){
            var self = this;
            this.sliding('right');
            this.$next.on('click', function(){
                self.next();
            })
            this.$prev.on('click', function(){
                self.prev();
            })
            this.$wrapper.on('mouseenter', function(){
                clearTimeout(self.timer);
            })
            this.$wrapper.on('mouseleave', function(){
                self.auto();
            })
            this.auto();
        }
    }

    function initSlider(){
        new BDSlider('#bdSlider', {
            prev: '.slidePrev',
            next: '.slideNext',
            autoplay: true,
            slideEnd: function(ix){
                refreshNumber(ix);
            }
        })
    }





    function  Select() {
        var discount = 0.8;
        var price = 0;
        var postid = 0;
        $(".selects-l").on("change",function(){
            price= $("option:selected",this).data("price");
            postid = $("option:selected",this).data("postid");
            $(".pro-price").text(price*discount);
            $(".postid").data("postid",postid);
        });
    }


    var loadComplete = function () {


        initSlider();
        refreshNumber = initNum();

       Select();





        $(".sel-li dd").click(function () {
            $(this).addClass("on").siblings().removeClass("on");
        });



        initScroll();
    }
    var initScroll = function (){
        window.scrollAnimate('#evt_container', [

             {dom: '.row1 .cake',x:-100, y:0,duration:500,delay:200}
            ,{dom: '.row2 .cake',x:100, y:0,duration:500,delay:200}
            ,{dom: '.row3 .cake',x:-100, y:0,duration:500,delay:200}

            ,{dom: '.logos',x:100, y:0,duration:500,delay:100}

            ,{dom: '.row1 .price',x:0, y:50,duration:500,delay:600}
            ,{dom: '.row2 .price',x:0, y:50,duration:500,delay:600}
            ,{dom: '.row3 .price',x:0, y:50,duration:500,delay:600}

        ])
    };


})();