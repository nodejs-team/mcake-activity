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

        var swiper1 = new Swiper('.swiper1', {
            slidesPerView: 1,
            speed:300,
            autoplay : {
                delay:3000
            },
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next1',
                prevEl: '.swiper-button-prev1',
            }
        });
        var swiper2 = new Swiper('.swiper2', {
            slidesPerView: 1,
            speed:300,
            autoplay : {
                delay:3000
            },
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next2',
                prevEl: '.swiper-button-prev2',
            }
        });

        new Price('.price',{
            add:'.add',
            reduce:'.reduce'
        });


        initScroll();
    }
    var initScroll = function (){
        window.scrollAnimate('#evt_container', [
             {dom: '.rose-1',x:100, y:0,duration:500,delay:500}
             ,{dom: '.rose-2',x:-100, y:0,duration:500,delay:500}
             ,{dom: '.rose-3',x:100, y:0,duration:500,delay:500}
             ,{dom: '.rose-4',x:-100, y:0,duration:500,delay:500}
             ,{dom: '.rose-5',x:100, y:0,duration:500,delay:500}
             ,{dom: '.rose-6',x:-100, y:0,duration:500,delay:500}
             ,{dom: '.rose-7',x:100, y:0,duration:500,delay:500}
             ,{dom: '.rose-8',x:0, y:100,duration:500,delay:500}
             ,{dom: '.sec-1 .title',x:0, y:100,duration:500,delay:500}
             ,{dom: '.sec-1 .word',x:0, y:100,duration:500,delay:500}
             ,{dom: '.sec-1 .row-cake',x:0, y:100,duration:500,delay:500}
             ,{dom: '.sec-1 .price',x:0, y:100,duration:500,delay:500}
             ,{dom: '.sec-1 .w-2',x:0, y:100,duration:500,delay:500}
             ,{dom: '.sec-2 .cake-slides',x:0, y:100,duration:500,delay:500}
             ,{dom: '.sec-2 .bar',x:0, y:0,duration:500,delay:500}
             ,{dom: '.sec-2 .price',x:0, y:100,duration:500,delay:500}
             ,{dom: '.sec-3 .title',x:0, y:100,duration:500,delay:500}
             ,{dom: '.sec-3 .row-cake',x:0, y:100,duration:500,delay:500}
             ,{dom: '.sec-3 .word',x:0, y:100,duration:500,delay:500}
             ,{dom: '.sec-3 .ad',x:0, y:100,duration:500,delay:500}
             ,{dom: '.sec-3 .word',x:0, y:100,duration:500,delay:500}
             ,{dom: '.sec-3 .ewm',x:0, y:100,duration:500,delay:500}
             ,{dom: '.sec-3 .tips',x:0, y:100,duration:500,delay:500}


        ])
    };




    function Price(els,opts) {
        this.$els = $(els);
        this.$add = this.$els.find(opts.add);
        this.$reduce = this.$els.find(opts.reduce);
        this.num=0;
        this.max=50;
        this.oldPrice =0;
        this.totalOldprice =0;
        this.totalPrice =0;
        this.discount = 0; /*立减69*/
        this._init();
    }
    Price.prototype= {
        add: function (ele) {
            var self = this;
            self.num = ele.parents(".price").find('.num').text()-0;
            if (self.num < self.max) {
                self.num++;
            }

            ele.siblings().find('.num').text(self.num);
            self.numCounts(ele);
        },
        reduce: function (ele) {
            var self = this;
            self.num = ele.parents(".price").find('.num').text()-0;
            if (self.num > 1) {
                self.num--;
            }
            ele.siblings().find('.num').text(self.num);
            self.numCounts(ele);
        },
        numCounts:function (ele) {  /*加减计算价格*/
            var self = this;
            self.oldPrice = ele.parents(".price").find('.old-price').data("price");
            self.nowPrice = ele.parents(".price").find('.now-price').data("price");

            self.num = ele.parents(".price").find('.num').text()-0;
            self.totalOldprice =self.oldPrice * self.num ;
            self.totalnowPrice =self.nowPrice * self.num ;
            ele.parents(".price").find('.old-price').html(self.totalOldprice);
            ele.parents(".price").find('.now-price').html(self.totalnowPrice+".00");
        },
        _init:function () {
            var self = this;

            //this.numInit();


            this.$add.click(function () {
                self.add($(this));
            });
            this.$reduce.click(function () {
                self.reduce($(this));
            });
        }
    }

})();