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
        function xiaoshi(els,opts,disArr) {
            this.$els = $(els);
            this.$add = this.$els.find(opts.add);
            this.$reduce = this.$els.find(opts.reduce);
            this.num=1;
            this.max=50;
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

                self.newPrice = self.totalPrice-self.oldPrice*(Math.floor((self.num/2))*(1-self.disArr[1]));
                /* self.newPrice = self.totalPrice-self.oldPrice*(Math.floor((self.num/2))*0.3+Math.floor((self.num/3))*0.4);  第二件7折，第三件6折*/
                ele.parents("li").find('.old-price').html(self.totalPrice.toFixed(2));  /*原价*/
                ele.parents("li").find('.new-price').html(self.newPrice.toFixed(2)); /*现价*/
                ele.parents("li").find('.go-btn').attr("data-num",self.num);
            },
            /*初始化*/
            initialize:function () {
                var self = this;
                this.$els.find("li").each(function () {
                    self.oldPrice = $(this).data('oldprice');
                    self.num = $(this).find(".num").text()-0;
                    self.totalPrice = self.oldPrice*self.num;
                    self.newPrice = self.totalPrice-self.oldPrice*(Math.floor((self.num/2))*(1-self.disArr[1]));
                    $(this).find(".old-price").text(self.totalPrice);
                    $(this).find(".new-price").text(self.newPrice.toFixed(2));
                    $(this).find('.go-btn').attr("data-num",self.num); /*现价*/
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
        new xiaoshi('.select-li',{
            add:'.add',
            reduce:'.reduce'
        },[1,0.6]);  /*第二件6折*/

    };

})();



(function () {
    /*领取优惠券*/
    var $Dialogbg = $(".Dialogbg-quan"),
        $Dialog=$(".Dialog-quan"),
        $goUse=$(".go-use"),
        $closes=$(".closes");

    function QuanDialog(n) {
        $Dialogbg.fadeIn(300);
        $Dialog.fadeIn(300);
        $Dialog.find(".quan-"+n).fadeIn(300).siblings().not(".closes").hide();
        /* $card.find("img").attr("src","https://act.mcake.com/fangli/2020/pc/memberDay-2yue/images/card-"+n+".png");*/

        /*$Dialog.find(".quan").fadeIn(300).siblings().not(".closes").hide();*/
    }

    /*关闭*/
    $closes.click(function () {
        $Dialogbg.fadeOut(300);
        $Dialog.fadeOut(300);
    });

    $goUse.click(function () {
        $Dialogbg.fadeOut(300);
        $Dialog.fadeOut(300);
    });
    $Dialogbg.click(function () {
        $Dialogbg.fadeOut(300);
        $Dialog.fadeOut(300);
    });

    window.QuanDialog = QuanDialog;

})(window);

/*余赞从后端给的方法*/
var num = 0;
function choujiang(obj, data){
    var timer = setInterval(function () {
        if(num>=9){
            num=0;
        }
        $(".choujiang li.award-"+num+"").addClass("on").siblings().removeClass("on");
        num++;
    },100);
    setTimeout(function () {
        num = data.describe;
        clearInterval(timer);
        /*获得奖品*/
        QuanDialog(num);
        $(".choujiang li.award-"+num+"").addClass("on").siblings().removeClass("on");
    },2000);
}