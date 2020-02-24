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
        $(".floater").fadeIn(100);

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


(function () {
    function xiaoshi(els,opts,disArr) {
        this.$els = $(els);
        this.$add = this.$els.find(opts.add);
        this.$reduce = this.$els.find(opts.reduce);
        this.num=1;
        this.max=2;
        this.oldPrice =0;
        this.totalPrice =0;
        this.newPrice =0;
        this.disArr = disArr;
        this.dis = 0;
        this._init();
    }

    xiaoshi.prototype={
        add:function (ele) {
            var self = this;
            self.num = ele.parents("li").find('.num').text()-0;

            if(self.num<self.max){
                self.num++;
            }
            ele.siblings().find('.num').text(self.num);
            self.counts(ele);
        },
        reduce:function (ele) {
            var self = this;
            self.num = ele.parents("li").find('.num').text()-0;
            if(self.num>1){
                self.num--;
            }
            ele.siblings().find('.num').text(self.num);
            self.counts(ele);
        },
        /*价格计算*/
        counts:function (ele) {
            var self = this;
            self.oldPrice = ele.parents("li").data('oldprice');
            self.totalPrice =self.oldPrice * self.num;

            self.newPrice = self.totalPrice-self.oldPrice*(Math.floor((self.num/2))*(1-this.disArr[1])+Math.floor((self.num/3))*(1-this.disArr[2]));


            /*循环所有的attribute*/
            var eleCur = ele;
            eleCur.each(function() {
                var thisele = $(this);
                $.each(this.attributes, function() {
                    if(this.specified) {
                        var attrs = thisele.attr(this.name);
                        if(this.name =='class'){
                            return;
                        }else{
                            ele.parents("li").find('.go-buy').attr(this.name,attrs);
                        }
                    }
                });
            });
            ele.parents("li").find('.go-buy').attr("data-num",self.num);

            ele.parents("li").find('.old-price').html(self.totalPrice.toFixed(2));  /*原价*/
            ele.parents("li").find('.new-price').html(self.newPrice.toFixed(2)); /*现价*/
        },
        /*初始化*/
        initialize:function () {
            var self = this;
            this.$els.find("li").each(function () {
                self.oldPrice = $(this).data('oldprice');
                self.num = $(this).find(".num").text()-0;
                self.totalPrice = self.oldPrice*self.num;
                self.newPrice = self.totalPrice-self.oldPrice*(Math.floor((self.num/2))*(1-self.disArr[1])+Math.floor((self.num/3))*(1-self.disArr[2]));
                $(this).find(".old-price").text(self.totalPrice.toFixed(2));
                $(this).find(".new-price").text(self.newPrice.toFixed(2));

                var that = $(this);
                var eleCur = $(this);
                /*循环所有的attribute*/
                eleCur.each(function() {
                    var thisele = $(this);

                    $.each(this.attributes, function() {
                        if(this.specified) {
                            var attrs = thisele.attr(this.name);

                            if(this.name =='class'){
                                return;
                            }else{
                                that.find('.go-buy').attr(this.name,attrs);
                            }
                        }
                    });
                });
                $(this).find('.go-buy').attr("data-num",self.num);

            });
        },
        _init:function () {
            var self = this;
            this.initialize();
            this.$add.click(function () {
                self.add($(this));
            });
            this.$reduce.click(function () {
                self.reduce($(this));
            });
        }
    };
    new xiaoshi('.xiaoshi',{
        add:'.add',
        reduce:'.reduce'
    },[1,0.7,0.6]);

})();


