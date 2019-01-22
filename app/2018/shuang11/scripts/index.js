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





    /*页面加载完成*/
    var loadComplete = function () {

        $("html,body").animate({scrollTop:0},500);







        /*按钮变色*/
        $(".zn-btn,.buy-yuanbtn,.m-car,.m-btn,.go-buy,go-car").hover(function () {
            $(this).addClass("on");
        },function () {
            $(this).removeClass("on");
        });

        $(".buy-btn").hover(function () {
            $(this).addClass("on").siblings().removeClass("on");
        });

        /* initScroll();*/
    };



    var initScroll = function (){
        window.scrollAnimate('#evt_container', [
            {dom: '.banner-logo',x:0, y:50,duration:500,delay:600}
            ,{dom: '.banner-word',x:0, y:50,duration:500,delay:200}

            ,{dom: '.sec-zuhe .title',x:0, y:50,duration:500,delay:400}
            ,{dom: '.sec-zuhe .zuhe-1',x:0, y:50,duration:500,delay:200}
            ,{dom: '.sec-zuhe .zuhe-2',x:0, y:50,duration:500,delay:1000}
            ,{dom: '.sec-zuhe .zuhe-3',x:0, y:50,duration:500,delay:600}
            ,{dom: '.sec-zuhe .zuhe-4',x:0, y:50,duration:500,delay:1400}
            ,{dom: '.sec-zuhe .zuhe-5',x:0, y:50,duration:500,delay:1800}


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
            this.$DialogBox.find(".jp-leve").html(arr[n].leve);
            this.$DialogBox.find(".jp-name").html(arr[n].name);
            this.$DialogBox.find(".jp-price").html(arr[n].price);
            this.$DialogBox.find(".jp").css({"background":"url('https://act.mcake.com/fangli/2018/wap/zhou-nian/images/jiang-"+(n+1)+".png') center","background-size":"cover"});
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

<!--蛋糕选择弹窗-->
;(function () {
    var $Select = $(".Select"),
        $bangshu = $Select.find(".s-bangshu"),
        $price = $Select.find(".s-price"),
        $newprice = $Select.find(".s-new-price");
    var num = 1,
        pond = 2,
        price = 0,
        postid = 0,
        totaPrice=0,
        newPrice=0,
        dis = 0,  /*通过传值获得折扣*/
        double=0;
    /*d：折扣，
     *isShow:是否显示数量加减按钮，
     *n:默认显示第几磅数
     *db:是否享第二件半价
     */
    function SelectShow(ele,d,isShow,n,db) {
        var ponds = [];
        var prices = [];
        var postids = [];
        var tips = [];
        var time = [];
        var pondsingle = $(ele).data("pond").indexOf(",");
        dis=d;
        double = db;

        /*d为1，说明不打折  db第二件是否半价*/
        if(d==1 && db==0){
            $(".old-p").hide(0);
        }else{
            $(".old-p").show(0);
        }

        /*是否有数量加减项*/
        if(!isShow){
            $(".s-num").hide(0);
        }else{
            $(".s-num").show(0);
        }
        /*只有1盒*/
        if(pondsingle<0){
            ponds = $(ele).data("pond").split(',');
            prices = $(ele).data("price");
            postids = $(ele).data("postid");
            tips = $(ele).data("tips");
            time = $(ele).data("time");


            /*初始化默认*/
            $price.html(prices.toFixed(2));
            $newprice.html((prices*dis).toFixed(2));

            $(".postid").data('postid',postids);
            $Select.find("li").eq(1).addClass("on").siblings().removeClass("on");
            $(".num").val(1);
            $(".tips").html(tips);
            $(".time").html(time);
            price = prices;

            var str = '';
            str = '<li class="on" data-pond="'+ponds+'">'+ponds+'</li>';
            $bangshu.find("ul").append(str);


        }else{  /*多磅数选择*/
            ponds = $(ele).data("pond").split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")});
            prices = $(ele).data("price").split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")});
            postids = $(ele).data("postid").split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")});
            tips = $(ele).data("tips").split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")});
            time = $(ele).data("time").split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")});

            /*初始化默认*/
            $price.html((prices[n]-0).toFixed(2));
            $newprice.html((prices[n]*dis).toFixed(2));
            $(".postid").data('postid',postids[n]);
            $Select.find("li").eq(n).addClass("on").siblings().removeClass("on");
            $(".num").val(1);
            $(".tips").html(tips[n]);
            $(".time").html(time[n]);
            price = prices[n];

            var len = ponds.length;

            for(var i=0; i<len; i++){
                var str = '';
                if(i==n){
                    str = '<li class="on" data-pond="'+ponds[i]+'">'+ponds[i]+'</li>';
                }else{
                    str += '<li data-pond="'+ponds[i]+'">'+ponds[i]+'</li>';
                }

                $bangshu.find("ul").append(str);


                /*****磅数选择******/
                $bangshu.find("li").each(function (i) {
                    var self = $(this);
                    $(this).data("price",prices[i]);
                    $(this).data("postid",postids[i]);
                    $(this).data("tips",tips[i]);
                    $(this).data("time",time[i]);

                    $(this).click(function () {
                        postid = self.data("postid");
                        tips = self.data("tips");
                        time = self.data("time");
                        $(".postid").data('postid',postid);

                        price = self.data("price");
                        totaPrice = price * num;

                        if(double){ /*第二件半价*/
                            var ix = parseInt(num / 2);  /*向下取整*/
                            newPrice = (totaPrice - price/2 * ix)*dis;
                        }else{
                            newPrice = totaPrice*dis;
                        }

                        $price.html(totaPrice.toFixed(2));
                        $newprice.html((newPrice).toFixed(2));

                        $(".tips").html(tips);
                        $(".time").html(time);
                        self.addClass("on").siblings().removeClass("on");
                    });
                });

            }
        }

        $(".Dialogbg-Select,.Dialog-Select").fadeIn(500);
    }

    /*加数量*/
    $(".plus").click(function () {
        if(num>=50){
            return;
        }else{
            num+=1;
        }
        $(".num").val(num);

        totaPrice = price * num;

        if(double){ /*第二件半价*/
            var ix = parseInt(num / 2);  /*向下取整*/
            newPrice = (totaPrice - price/2 * ix)*dis;
        }else{
            newPrice = totaPrice*dis;
        }

        $price.html(totaPrice.toFixed(2));
        $newprice.html((newPrice).toFixed(2));
    });

    /*减数量*/
    $(".minus").click(function () {
        if(num<=1){
            return;
        }else{
            num-=1;
        }
        $(".num").val(num);
        totaPrice = price * num;

        if(double){ /*第二件半价*/
            var ix = parseInt(num / 2);  /*向下取整*/
            newPrice = (totaPrice - price/2 * ix)*dis;
        }else{
            newPrice = totaPrice*dis;
        }

        $price.html(totaPrice.toFixed(2));
        $newprice.html((newPrice).toFixed(2));
    });

    function SelectHide() {
        num = 1;
        $bangshu.find("ul").empty();
        $(".Dialogbg-Select,.Dialog-Select").fadeOut(0);
    }

    $(".Dialogbg-Select").click(function () {
        SelectHide();
    });


    window.SelectShow = SelectShow;
    window.SelectHide = SelectHide;


    /*使用方法：
     $(".prolist li").each(function () {
     var self = this;
     $(this).find('.m-btn,.m-car').click(function () {
     SelectShow(self);
     })
     });
     $(".go-car").click(function () {
     SelectHide();
     });
     $(".go-buy,.s-closes").click(function () {
     SelectHide();
     });*/

})();