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


    var animates = {

        girl:function () {
            //图片配置
            var mcConfig = {
                "girl-1":{"x":263,"y":262,"w":257,"h":246,"offX":8,"offY":65,"sourceW":271,"sourceH":320,"duration":3},
                "girl-2":{"x":263,"y":0,"w":257,"h":252,"offX":8,"offY":59,"sourceW":271,"sourceH":320,"duration":3},
                "girl-3":{"x":0,"y":313,"w":253,"h":303,"offX":8,"offY":8,"sourceW":271,"sourceH":320,"duration":3},
                "girl-4":{"x":0,"y":0,"w":253,"h":303,"offX":8,"offY":8,"sourceW":271,"sourceH":320,"duration":3}
            };
            // MovieClip 可以通过duration控制两张图片轮播的速度。duration:0.2*10=2
            new MovieClip('girl', loader.get('girl_png').data,formatResData(mcConfig)).play();
        },
        lanmei:function () {
            //图片配置
            var mcConfig = {

                "lanmei-1":{"x":778,"y":774,"w":379,"h":248,"offX":145,"offY":156,"sourceW":662,"sourceH":519,"duration":6},
                "lanmei-2":{"x":389,"y":1032,"w":379,"h":248,"offX":145,"offY":156,"sourceW":662,"sourceH":519,"duration":2},
                "lanmei-3":{"x":0,"y":1290,"w":379,"h":248,"offX":145,"offY":156,"sourceW":662,"sourceH":519,"duration":2},
                "lanmei-4":{"x":1556,"y":0,"w":379,"h":248,"offX":145,"offY":156,"sourceW":662,"sourceH":519,"duration":2},
                "lanmei-5":{"x":1167,"y":258,"w":379,"h":248,"offX":145,"offY":156,"sourceW":662,"sourceH":519,"duration":2},
                "lanmei-6":{"x":778,"y":516,"w":379,"h":248,"offX":145,"offY":156,"sourceW":662,"sourceH":519,"duration":2},

                "lanmei-7":{"x":389,"y":774,"w":379,"h":248,"offX":145,"offY":156,"sourceW":662,"sourceH":519,"duration":10},
                "lanmei-8":{"x":0,"y":1032,"w":379,"h":248,"offX":145,"offY":156,"sourceW":662,"sourceH":519,"duration":10},
                "lanmei-9":{"x":1167,"y":0,"w":379,"h":248,"offX":145,"offY":156,"sourceW":662,"sourceH":519,"duration":10},

                "lanmei-10":{"x":778,"y":258,"w":379,"h":248,"offX":145,"offY":156,"sourceW":662,"sourceH":519,"duration":2},
                "lanmei-11":{"x":389,"y":516,"w":379,"h":248,"offX":145,"offY":156,"sourceW":662,"sourceH":519,"duration":2},
                "lanmei-12":{"x":0,"y":774,"w":379,"h":248,"offX":145,"offY":156,"sourceW":662,"sourceH":519,"duration":2},
                "lanmei-13":{"x":778,"y":0,"w":379,"h":248,"offX":145,"offY":156,"sourceW":662,"sourceH":519,"duration":2},
                "lanmei-14":{"x":389,"y":258,"w":379,"h":248,"offX":145,"offY":156,"sourceW":662,"sourceH":519,"duration":2},
                "lanmei-15":{"x":0,"y":516,"w":379,"h":248,"offX":145,"offY":156,"sourceW":662,"sourceH":519,"duration":2},
                "lanmei-16":{"x":389,"y":0,"w":379,"h":248,"offX":145,"offY":156,"sourceW":662,"sourceH":519,"duration":2},
                "lanmei-17":{"x":0,"y":258,"w":379,"h":248,"offX":145,"offY":156,"sourceW":662,"sourceH":519,"duration":2},
                "lanmei-18":{"x":0,"y":0,"w":379,"h":248,"offX":145,"offY":156,"sourceW":662,"sourceH":519,"duration":2},
                "lanmei-19":{"x":1167,"y":516,"w":379,"h":248,"offX":145,"offY":156,"sourceW":662,"sourceH":519,"duration":2}
            };
            // MovieClip 可以通过duration控制两张图片轮播的速度。duration:0.2*10=2
            new MovieClip('lanmei', loader.get('lanmei_png').data,formatResData(mcConfig)).play();
        },
        hongmei:function () {
            //图片配置
            var mcConfig = {
                "hongmei-1":{"x":820,"y":471,"w":400,"h":222,"offX":103,"offY":99,"sourceW":648,"sourceH":417,"duration":5},
                "hongmei-2":{"x":410,"y":717,"w":400,"h":222,"offX":103,"offY":99,"sourceW":648,"sourceH":417,"duration":0},
                "hongmei-3":{"x":0,"y":0,"w":400,"h":229,"offX":103,"offY":99,"sourceW":648,"sourceH":417,"duration":0},
                "hongmei-4":{"x":1230,"y":0,"w":400,"h":222,"offX":103,"offY":99,"sourceW":648,"sourceH":417,"duration":0},
                "hongmei-5":{"x":820,"y":703,"w":400,"h":222,"offX":103,"offY":99,"sourceW":648,"sourceH":417,"duration":0},
                "hongmei-6":{"x":1230,"y":232,"w":400,"h":222,"offX":103,"offY":99,"sourceW":648,"sourceH":417,"duration":0},
                "hongmei-7":{"x":410,"y":478,"w":400,"h":229,"offX":103,"offY":99,"sourceW":648,"sourceH":417,"duration":0},
                "hongmei-8":{"x":0,"y":717,"w":400,"h":229,"offX":103,"offY":99,"sourceW":648,"sourceH":417,"duration":0},
                "hongmei-9":{"x":820,"y":0,"w":400,"h":229,"offX":103,"offY":99,"sourceW":648,"sourceH":417,"duration":0},

                "hongmei-10":{"x":410,"y":239,"w":400,"h":229,"offX":103,"offY":99,"sourceW":648,"sourceH":417,"duration":5},
                "hongmei-11":{"x":0,"y":478,"w":400,"h":229,"offX":103,"offY":99,"sourceW":648,"sourceH":417,"duration":1},
                "hongmei-12":{"x":410,"y":0,"w":400,"h":229,"offX":103,"offY":99,"sourceW":648,"sourceH":417,"duration":1},
                "hongmei-13":{"x":0,"y":239,"w":400,"h":229,"offX":103,"offY":99,"sourceW":648,"sourceH":417,"duration":1},
                "hongmei-14":{"x":820,"y":239,"w":400,"h":222,"offX":103,"offY":99,"sourceW":648,"sourceH":417,"duration":1}
            };
            // MovieClip 可以通过duration控制两张图片轮播的速度。duration:0.2*10=2
            new MovieClip('hongmei', loader.get('hongmei_png').data,formatResData(mcConfig)).play();
        },
        more1:function () {
            //图片配置
            var mcConfig = {
                "more1-7":{"x":667,"y":0,"w":657,"h":230,"offX":57,"offY":42,"sourceW":737,"sourceH":393,"duration":2},
                "more1-8":{"x":1334,"y":194,"w":657,"h":183,"offX":57,"offY":89,"sourceW":737,"sourceH":393,"duration":2},
                "more1-9":{"x":667,"y":240,"w":657,"h":184,"offX":57,"offY":89,"sourceW":737,"sourceH":393,"duration":2},
                "more1-10":{"x":0,"y":796,"w":657,"h":183,"offX":57,"offY":89,"sourceW":737,"sourceH":393,"duration":2},
                "more1-1":{"x":667,"y":627,"w":657,"h":183,"offX":57,"offY":89,"sourceW":737,"sourceH":393,"duration":2},
                "more1-2":{"x":0,"y":282,"w":657,"h":272,"offX":57,"offY":0,"sourceW":737,"sourceH":393,"duration":2},
                "more1-3":{"x":0,"y":564,"w":657,"h":222,"offX":57,"offY":50,"sourceW":737,"sourceH":393,"duration":2},
                "more1-4":{"x":667,"y":434,"w":657,"h":183,"offX":57,"offY":89,"sourceW":737,"sourceH":393,"duration":2},
                "more1-5":{"x":1334,"y":0,"w":657,"h":184,"offX":57,"offY":89,"sourceW":737,"sourceH":393,"duration":2},
                "more1-6":{"x":0,"y":0,"w":657,"h":272,"offX":57,"offY":0,"sourceW":737,"sourceH":393,"duration":2}};
            // MovieClip 可以通过duration控制两张图片轮播的速度。duration:0.2*10=2
            new MovieClip('more1', loader.get('more1_png').data,formatResData(mcConfig)).play();
        },
        more2:function () {
            //图片配置
            var mcConfig = {
                "more2-5":{"x":706,"y":1378,"w":696,"h":331,"offX":0,"offY":96,"sourceW":696,"sourceH":427,"duration":2},
                "more2-6":{"x":706,"y":1037,"w":696,"h":331,"offX":0,"offY":96,"sourceW":696,"sourceH":427,"duration":2},
                "more2-7":{"x":0,"y":437,"w":696,"h":427,"offX":0,"offY":0,"sourceW":696,"sourceH":427,"duration":2},
                "more2-8":{"x":706,"y":0,"w":696,"h":345,"offX":0,"offY":82,"sourceW":696,"sourceH":427,"duration":2},
                "more2-9":{"x":0,"y":1218,"w":696,"h":331,"offX":0,"offY":96,"sourceW":696,"sourceH":427,"duration":2},
                "more2-10":{"x":706,"y":355,"w":696,"h":331,"offX":0,"offY":96,"sourceW":696,"sourceH":427,"duration":2},
                "more2-1":{"x":0,"y":1559,"w":696,"h":331,"offX":0,"offY":96,"sourceW":696,"sourceH":427,"duration":2},
                "more2-2":{"x":0,"y":0,"w":696,"h":427,"offX":0,"offY":0,"sourceW":696,"sourceH":427,"duration":2},
                "more2-3":{"x":0,"y":874,"w":696,"h":334,"offX":0,"offY":93,"sourceW":696,"sourceH":427,"duration":2},
                "more2-4":{"x":706,"y":696,"w":696,"h":331,"offX":0,"offY":96,"sourceW":696,"sourceH":427,"duration":2}};
            // MovieClip 可以通过duration控制两张图片轮播的速度。duration:0.2*10=2
            new MovieClip('more2', loader.get('more2_png').data,formatResData(mcConfig)).play();
        }
    }


    var loadComplete = function () {
        animates.girl();
        animates.lanmei();
        animates.hongmei();
        animates.more1();
        animates.more2();

        initScroll();

        new Price('.price',{
            add:'.add',
            reduce:'.reduce'
        });


    }

    var initScroll = function (){
        window.scrollAnimate('#evt_container', [
              {dom: '.banner-title',x:0, y:-50,duration:500,delay:200}
             ,{dom: '.banner-w',x:50, y:0,duration:500,delay:200}
             ,{dom: '.banner-girl',x:-50, y:0,duration:500,delay:200}
             ,{dom: '.banner-cf',x:50, y:50,duration:500,delay:200}
             ,{dom: '.banner-cake',x:0, y:100,duration:500,delay:200}

             ,{dom: '.cake-1',x:-50, y:-50,duration:500,delay:200}
             ,{dom: '.cake-2',x:50, y:-50,duration:500,delay:200}
             ,{dom: '.cake-3',x:50, y:-50,duration:500,delay:200}
             ,{dom: '.cake-4',x:50, y:-50,duration:500,delay:200}
             ,{dom: '.cake-5',x:50, y:-50,duration:500,delay:200}

            ,{dom: '.w-1',x:0, y:50,duration:500,delay:200}
            ,{dom: '.w-2',x:0, y:50,duration:500,delay:200}
            ,{dom: '.w-3',x:0, y:50,duration:500,delay:200}

             ,{dom: '.sec-1 .price',x:0, y:50,duration:500,delay:200}
             ,{dom: '.sec-2 .price',x:0, y:50,duration:500,delay:200}
             ,{dom: '.sec-3 .price',x:0, y:50,duration:500,delay:200}
             ,{dom: '.sec-4 .price',x:0, y:50,duration:500,delay:200}
             ,{dom: '.sec-5 .price',x:0, y:50,duration:500,delay:200}
             ,{dom: '.sec-ad',x:0, y:0,duration:500,delay:200}


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
        this._init();
    }

    Price.prototype={
        add:function (ele) {
            var self = this;
            self.num = ele.parents(".price").find('.num').val();
            if(self.num<self.max){
                self.num++;
            }
            ele.siblings().find('.num').val(self.num);
            ele.siblings().find('.num-span').html(self.num);
            self.numCounts(ele);
        },
        reduce:function (ele) {
            var self = this;
            self.num = ele.parents(".price").find('.num').val();
            if(self.num>1){
                self.num--;
            }
            ele.siblings().find('.num').val(self.num);
            ele.siblings().find('.num-span').html(self.num);
            self.numCounts(ele);
        },
        numCounts:function (ele) {
            var self = this;
            var cur = ele.parents(".price").find('.price_p li.cur');
            self.oldPrice = cur.data('oldprice');
            self.num = ele.parents(".price").find('.num').val();
            var ix = parseInt(self.num / 2);
            self.totalOldprice =self.oldPrice * self.num;
            self.totalPrice =(self.oldPrice * self.num) - (self.oldPrice/2 * ix);
            ele.parents(".price").find('.old-price').html(self.totalOldprice);
            ele.parents(".price").find('.now-price').html(self.totalPrice);
        },
        counts:function (ele) {
            var self = this;
            self.oldPrice = ele.data('oldprice');
            self.num = ele.parents(".price").find('.num').val();
            var ix = parseInt(self.num / 2);
            self.totalOldprice =self.oldPrice * self.num;
            self.totalPrice =(self.oldPrice * self.num) - (self.oldPrice/2 * ix);
            ele.parents(".price").find('.old-price').html(self.totalOldprice);
            ele.parents(".price").find('.now-price').html(self.totalPrice);
        },
        /*初始化*/
        numInit:function () {
            var self = this;
            var Oldprice =0;
            $(".num").val(1);
            this.$els.each(function () {

                Oldprice = $(this).find('.price_p li.cur').data('oldprice');
                var totalNum = $(this).find(".num").val();
                var totalOldprice = Oldprice * totalNum;
                var ix = parseInt(totalNum / 2);
                var totalPrice =(Oldprice * totalNum) - (Oldprice/2 * ix);
                $(this).find('.old-price').html(totalOldprice);
                $(this).find('.now-price').html(totalPrice);

            });

        },
        /*磅数选择*/
        bsSelect:function (ele) {
            var self = this;
            ele.click(function () {
                ele.addClass('cur').siblings().removeClass('cur');
                self.counts($(this));
            });
        },
        _init:function () {
            var self = this;

            this.numInit();

            this.$els.find('.price_p li').each(function () {
                self.bsSelect($(this));
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
    }




})();