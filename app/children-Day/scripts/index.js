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


    /*主页磅数选择
     * 1磅减40元，
     * 2磅减60元，
     * 3磅减80元，
     * 5磅减140元
     * */
    function Price(els,opts,disArr,disPoint) {
        this.$els = $(els);
        this.$add = this.$els.find(opts.add);
        this.$reduce = this.$els.find(opts.reduce);
        this.num=0;
        this.max=50;
        this.oldPrice =0;
        self.bs = 0;
        this.totalOldprice =0;
        this.totalPrice =0;
        this.dis = 0;
        this.disArr=disArr;
        this.disCount = 0;
        this.disPoint = disPoint;
        this._init();
    }

    Price.prototype={
        add:function (ele) {
            var self = this;
            self.num = ele.parents(".price").find('.num').text()-0;
            if(self.num<self.max){
                self.num++;
            }
            ele.siblings().find('.num').text(self.num);
            self.numCounts(ele);
        },
        reduce:function (ele) {
            var self = this;
            self.num = ele.parents(".price").find('.num').text()-0;
            if(self.num>1){
                self.num--;
            }
            ele.siblings().find('.num').text(self.num);
            self.numCounts(ele);
        },
        /*数量加减后计算价格*/
        numCounts:function (ele) {
            var self = this;
            var cur = ele.parents(".price").find('.price_p li.cur');
            self.oldPrice = cur.data('oldprice');
            self.num = ele.parents(".price").find('.num').text()-0;
            var ix = parseInt(self.num / 2);

            self.bs = cur.data('bs');
            self.disCount = self.disFun(self.bs,self.disArr); /*计算折扣*/
            self.totalOldprice =self.oldPrice * self.num;
            self.totalPrice =(self.oldPrice-self.disCount) *self.disPoint * self.num;
            ele.parents(".price").find('.old-price').html(self.totalOldprice);  /*原价*/
            ele.parents(".price").find('.now-price').html(self.totalPrice.toFixed(2)); /*现价*/
        },
        /*磅数选择后计算价格*/
        counts:function (ele) {
            var self = this;
            self.oldPrice = ele.data('oldprice');
            self.num = ele.parents(".price").find('.num').text()-0;
            /* var ix = parseInt(self.num / 2);*/

            self.bs = ele.data('bs');
            self.disCount = self.disFun(self.bs,self.disArr); /*计算折扣*/

            self.totalOldprice =self.oldPrice * self.num;
            self.totalPrice =(self.oldPrice-self.disCount) * self.disPoint * self.num;
            ele.parents(".price").find('.old-price').html(self.totalOldprice);
            ele.parents(".price").find('.now-price').html(self.totalPrice.toFixed(2));
        },
        /*折扣：通过判断磅数决定减多少*/
        disFun:function (bs,discount) {
            switch (bs){
                case 1:
                    this.dis = discount[0];
                    break;
                case 2:
                    this.dis = discount[1];
                    break;
                case 3:
                    this.dis = discount[2];
                    break;
                case 5:
                    this.dis = discount[3];
                    break;
            }
            return this.dis;
        },
        /*磅数选择*/
        bsSelect:function (ele) {
            var self = this;

            ele.hover(function () {
                ele.addClass('hover').siblings().removeClass('hover');
            },function () {
                ele.removeClass('hover');
            });
            ele.click(function () {
                ele.addClass('cur').siblings().removeClass('cur');
                self.counts($(this));
            });
        },
        /*初始化数量和价格*/
        numInit:function () {
            var self = this;
            var Oldprice = 0;



            this.$els.each(function () {
                Oldprice = $(this).find('.price_p li.cur').data('oldprice');
                var totalNum = $(this).find(".num").text()-0;
                var totalOldprice = Oldprice * totalNum;
                /*var ix = parseInt(totalNum / 2);*/

                self.bs = $(this).find('.price_p li.cur').data('bs');
                self.disCount = self.disFun(self.bs,self.disArr); /*计算折扣*/
                var totalPrice =(Oldprice-self.disCount) * self.disPoint * totalNum;

                $(this).find('.old-price').html(totalOldprice);
                $(this).find('.now-price').html(totalPrice.toFixed(2));
            });

        },

        _init:function () {
            var self = this;
            this.numInit();

            this.$els.find('.price_p li').each(function () {
                self.bsSelect($(this));
            });

            /*换购*/
            this.$els.find('.huangou').each(function () {
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

            this.$add.hover(function () {
                $(this).addClass("on");
            },function () {
                $(this).removeClass("on");
            });
            this.$reduce.hover(function () {
                $(this).addClass("on");
            },function () {
                $(this).removeClass("on");
            });

            this.$add.click(function () {
                self.add($(this));
            });
            this.$reduce.click(function () {
                self.reduce($(this));
            });
        }
    };




    var loadComplete = function () {
        animtion.banner_cake();

        $(".select li").click(function () {
            $(this).addClass("on").siblings().removeClass("on");
        });

        var swiper1 = new Swiper('.swiper1', {
            slidesPerView: 1,
            speed:300,
            autoplay : {
                delay:4000
            },
            loop: true
        });

        new Price('.js_price',{
            add:'.add',
            reduce:'.reduce'
        },[0,0,0,0],0.8);


        initScroll();
    }

    var animtion = {
        banner_cake:function () {
            //图片配置
            var mcConfig = {
                "banner-cake-1":{"x":462,"y":1072,"w":452,"h":526,"offX":0,"offY":0,"sourceW":637,"sourceH":526,"duration":2},
                "banner-cake-2":{"x":1138,"y":0,"w":452,"h":526,"offX":0,"offY":0,"sourceW":637,"sourceH":526,"duration":1},
                "banner-cake-3":{"x":520,"y":536,"w":452,"h":526,"offX":0,"offY":0,"sourceW":637,"sourceH":526,"duration":1},
                "banner-cake-4":{"x":0,"y":1072,"w":452,"h":526,"offX":0,"offY":0,"sourceW":637,"sourceH":526,"duration":1},
                "banner-cake-5":{"x":647,"y":0,"w":481,"h":526,"offX":0,"offY":0,"sourceW":637,"sourceH":526,"duration":1},
                "banner-cake-6":{"x":0,"y":536,"w":510,"h":526,"offX":0,"offY":0,"sourceW":637,"sourceH":526,"duration":1},
                "banner-cake-7":{"x":0,"y":0,"w":637,"h":526,"offX":0,"offY":0,"sourceW":637,"sourceH":526,"duration":5}
            };
            // MovieClip 可以通过duration控制两张图片轮播的速度。duration:0.2*10=2
            new MovieClip('banner_cake', loader.get('banner-cake_png').data, formatResData(mcConfig)).play();
        }
    }

})();