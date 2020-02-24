;(function(){


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

    function refreshNumber(ix){}
    function initNum(ele){
        var $ele = $(ele);
           /*磅数加减*/
        var $input = $ele.find('.pro-num .input-num'),
            $minus = $input.siblings('.minus'),
            $plus = $input.siblings('.plus'),

            /*数量加减*/
            $inputNumber = $ele.find('.pro-number .input-number'),
            Number = $ele.find('.pro-number .input-number').val()-0,
            $minusNumber = $inputNumber.siblings('.minus-number'),
            $plusNumber = $inputNumber.siblings('.plus-number');


        var items = [];
        $ele.find('.slideItem').each(function(ix, el){
            var ponds = $(el).attr('data-pond');
            var ids = $(el).attr('data-postID');

            var sku = $(el).attr('data-sku');
            var method = $(el).attr('data-method');
            var pid = $(el).attr('data-pid');
            var ptype = $(el).attr('data-ptype');
            var channel = $(el).attr('data-channel');



            if(ponds){
                items.push({
                    ponds: ponds.split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")}),
                    ix: 0,
                    ids: ids.split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")}),

                    sku: sku.split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")}),
                    method: method.split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")}),
                    pid: pid.split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")}),
                    ptype: ptype.split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")}),
                    channel: channel.split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")})
                })
            }
        });
        var currentItem = items[0];

        /*磅数减少*/
        $minus.on('click', function(){
            var ix = --currentItem.ix;
            if(ix<0){
                ix = currentItem.ix = currentItem.ponds.length-1;
            }
            $input.val(currentItem.ponds[ix]).attr('data-postID', currentItem.ids[ix]);
            /*新版wap增加data属性*/
            $(this).parents(".slides").find(".buybtn").attr("data-sku",currentItem.sku[ix]);
            $(this).parents(".slides").find(".buybtn").attr("data-method",currentItem.method[ix]);
            $(this).parents(".slides").find(".buybtn").attr("data-pid",currentItem.pid[ix]);
            $(this).parents(".slides").find(".buybtn").attr("data-ptype",currentItem.ptype[ix]);
            $(this).parents(".slides").find(".buybtn").attr("data-channel",currentItem.channel[ix]);

        });
       /*磅数增加*/
        $plus.on('click', function(){
            var ix = ++currentItem.ix;
            if(ix>currentItem.ponds.length-1){
                ix = currentItem.ix = 0;
            }
            $input.val(currentItem.ponds[ix]).attr('data-postID', currentItem.ids[ix]);

            $(this).parents(".slides").find(".buybtn").attr("data-sku",currentItem.sku[ix]);
            $(this).parents(".slides").find(".buybtn").attr("data-method",currentItem.method[ix]);
            $(this).parents(".slides").find(".buybtn").attr("data-pid",currentItem.pid[ix]);
            $(this).parents(".slides").find(".buybtn").attr("data-ptype",currentItem.ptype[ix]);
            $(this).parents(".slides").find(".buybtn").attr("data-channel",currentItem.channel[ix]);

        });

        /*数量减少*/
        $minusNumber.on('click',function () {
            if(Number>1){
                Number--;
            }else {
                Number=1;
            }
            $inputNumber.val(Number);
            $(this).parents(".slides").find(".buybtn").attr("data-num",Number);
        });
        /*数量增加*/
        $plusNumber.on('click',function () {

            if(Number<50){
                Number++;
            }else{
                Number=50;
            }
            $inputNumber.val(Number);
            $(this).parents(".slides").find(".buybtn").attr("data-num",Number);
        });

        /*循环postID*/
        return function(ix){
            currentItem = items[ix];
            if(currentItem.ponds.length>1){
                /*修改默认磅数1磅  2018.4.1*/
                $input.val(currentItem.ponds[0]).attr('data-postID', currentItem.ids[0]);
                currentItem.ix=0;

                $inputNumber.attr('data-postID', currentItem.ids[1]);
                $inputNumber.val(1);
                Number=1;
                $(".buybtn").attr("data-sku",currentItem.sku[1]);
                $(".buybtn").attr("data-method",currentItem.method[1]);
                $(".buybtn").attr("data-pid",currentItem.pid[1]);
                $(".buybtn").attr("data-ptype",currentItem.ptype[1]);
                $(".buybtn").attr("data-channel",currentItem.channel[1]);

            }else {
                $input.val(currentItem.ponds[currentItem.ix]).attr('data-postID', currentItem.ids[currentItem.ix]);
                $inputNumber.attr('data-postID', currentItem.ids[currentItem.ix]);
                $inputNumber.val(1);
                Number=1;
                $(".buybtn").attr("data-data-sku",currentItem.sku[currentItem.ix]);
                $(".buybtn").attr("data-data-method",currentItem.method[currentItem.ix]);
                $(".buybtn").attr("data-data-pid",currentItem.pid[currentItem.ix]);
                $(".buybtn").attr("data-data-ptype",currentItem.ptype[currentItem.ix]);
                $(".buybtn").attr("data-data-channel",currentItem.channel[currentItem.ix]);
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
                        bottom:px2rem(40)+'rem',
                        'font-size': px2rem(16)+'rem'
                    });
                    return;
                }
                if(ix == (self.current+1)%self.total){
                    $(el).css('z-index', direction=='right' ? 3 : 2).animate(self.position.right,500)
                        .removeClass('slideCenter slideLeft slideHide').addClass('slideRight').find('span').animate({
                        bottom: px2rem(25)+'rem',
                        'font-size': px2rem(11)+'rem'
                    });
                    return;
                }
                if(ix == (self.current-1+self.total)%self.total){
                    $(el).css('z-index', direction=='left' ? 3 : 2).animate(self.position.left, 500)
                        .removeClass('slideCenter slideRight slideHide').addClass('slideLeft').find('span').animate({
                        bottom: px2rem(25)+'rem',
                        'font-size': px2rem(13)+'rem'
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
        new BDSlider('#bdSlider1', {
            prev: '.slidePrev1',
            next: '.slideNext1',
            autoplay: true,
            slideEnd: function(ix){
                refreshNumber = initNum(".slides1");
                refreshNumber(ix);
            }
        });
        new BDSlider('#bdSlider2', {
            prev: '.slidePrev2',
            next: '.slideNext2',
            autoplay: true,
            slideEnd: function(ix){
                refreshNumber = initNum(".slides2");
                refreshNumber(ix);
            }
        });

        new BDSlider('#bdSlider3', {
            prev: '.slidePrev3',
            next: '.slideNext3',
            autoplay: true,
            slideEnd: function(ix){
                refreshNumber = initNum(".slides3");
                refreshNumber(ix);
            }
        });
    }


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





    function startLoading(){
        var loader = new Loader('images/');
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
        initSlider();

        Select();

    }

    function Select() {
        $(".product .pro-li").each(function(){
            var self = $(this);
            $(this).find(".selects-l").on("change",function(){
                self.find(".price span").text($("option:selected",this).data("price"));
                self.find(".postid").data("postid",$("option:selected",this).data("postid"));

                self.find(".go-btn").attr("data-sku",$("option:selected",this).data("sku"));
                self.find(".go-btn").attr("data-method",$("option:selected",this).data("method"));
                self.find(".go-btn").attr("data-pid",$("option:selected",this).data("pid"));
                self.find(".go-btn").attr("data-ptype",$("option:selected",this).data("ptype"));
                self.find(".go-btn").attr("data-channel",$("option:selected",this).data("channel"));
            });
        });
    }













})();