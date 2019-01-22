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

        $(".cakes li").each(function () {
            var self = this;
            $(this).find('.buy-btn').bind("click",function () {
                $(".go-car").hide(0).siblings().show(0);
                SelectShow(self);
                /*$(this).unbind('click');*/
                return false;
            });
        });

        $(".go-car").click(function () {
            SelectHide();
        });
        $(".go-buy,.s-closes").click(function () {
            SelectHide();
        });

        $(".s-closes").click(function () {
            SelectHide();
        });

        initScroll();
    }
    var initScroll = function (){
        window.scrollAnimate('#evt_container', [
            {dom: '.sec-0 .t-1',x:0, y:50,duration:500,delay:400}
             ,{dom: '.sec-0 .cakes',x:0, y:50,duration:500,delay:400}
             ,{dom: '.sec-0 .t-2',x:0, y:50,duration:500,delay:400}
             ,{dom: '.sec-0 .quan',x:0, y:50,duration:500,delay:400}
             ,{dom: '.sec-footer',x:0, y:50,duration:500,delay:400}
        ])
    };


})();

<!--蛋糕选择弹窗-->
(function () {
    var $Select = $(".Select"),
        $bangshu = $Select.find(".s-bangshu"),
        $price = $Select.find(".s-price"),
        $newprice = $Select.find(".s-new-price");
    var num = 1,
        pond = 2,
        price = 0,
        postid = 0,
        totaPrice=0,
        dis = 1,
        discount = 69;
    /*磅数选择*/
    function SelectShow(ele) {



        var ponds = [];
        var prices = [];
        var postids = [];
        var tips = [];
        var time = [];

        var sku = [];
        var method = [];
        var pid = [];
        var ptype = [];
        var channel = [];

        var pondsingle = $(ele).data("pond").indexOf(",");



        /*只有1盒*/
        if(pondsingle<0){
            ponds = $(ele).data("pond").split(',');
            prices = $(ele).data("price");
            postids = $(ele).data("postid");
            tips = $(ele).data("tips");
            time = $(ele).data("time");

            sku = $(ele).data("sku");
            method = $(ele).data("method");
            pid = $(ele).data("pid");
            ptype = $(ele).data("ptype");
            channel = $(ele).data("channel");


            /*初始化默认*/
            $price.html(prices.toFixed(2));
            $newprice.html(((prices - discount)*dis).toFixed(2));

            $(".postid").data('postid',postids);
            $Select.find("li").eq(1).addClass("on").siblings().removeClass("on");
            $(".num").val(1);
            $(".tips").html(tips);
            $(".time").html(time);
            price = prices;

            /*新版wap添加data属性*/
            dataEach(sku,method,pid,ptype,channel,1);

            var str = '';
            str = '<li class="on" data-pond="'+ponds+'">'+ponds+'</li>';
            $bangshu.find("ul").append(str);



        }else{  /*多磅数选择*/
            ponds = $(ele).data("pond").split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")});
            prices = $(ele).data("price").split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")});
            postids = $(ele).data("postid").split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")});
            tips = $(ele).data("tips").split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")});
            time = $(ele).data("time").split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")});

            sku = $(ele).data("sku").split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")});
            method = $(ele).data("method").split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")});
            pid = $(ele).data("pid").split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")});
            ptype = $(ele).data("ptype").split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")});
            channel = $(ele).data("channel").split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")});



            /*初始化默认*/
            $price.html((prices[1]-0).toFixed(2));
            $newprice.html(((prices[1]-discount)*dis).toFixed(2));
            $(".postid").data('postid',postids[1]);
            $Select.find("li").eq(1).addClass("on").siblings().removeClass("on");
            $(".num").val(1);
            $(".tips").html(tips[1]);
            $(".time").html(time[1]);

            $(".sku").html(sku[1]);
            $(".method").html(method[1]);
            $(".pid").html(pid[1]);
            $(".ptype").html(ptype[1]);
            $(".channel").html(channel[1]);
            price = prices[1];

            /*新版wap添加data属性*/
            dataEach(sku[1],method[1],pid[1],ptype[1],channel[1],1);


            var len = ponds.length;

            for(var i=0; i<len; i++){
                var str = '';
                if(i==1){
                    str = '<li class="on" data-pond="'+ponds[i]+'">'+ponds[i]+'</li>';
                }else{
                    str += '<li data-pond="'+ponds[i]+'">'+ponds[i]+'</li>';
                }


                $bangshu.find("ul").append(str);

                $bangshu.find("li").each(function (i) {  /*磅数选择*/
                    var self = $(this);
                    $(this).data("price",prices[i]);
                    $(this).data("postid",postids[i]);
                    $(this).data("tips",tips[i]);
                    $(this).data("time",time[i]);

                    $(this).data("sku",sku[i]);
                    $(this).data("method",method[i]);
                    $(this).data("pid",pid[i]);
                    $(this).data("ptype",ptype[i]);
                    $(this).data("channel",channel[i]);

                    $(this).click(function () {
                        postid = self.data("postid");
                        tips = self.data("tips");
                        time = self.data("time");

                        sku = self.data("sku");
                        method = self.data("method");
                        pid = self.data("pid");
                        ptype = self.data("ptype");
                        channel = self.data("channel");

                        $(".postid").data('postid',postid);

                        /*新版wap添加data属性*/
                        dataEach(sku,method,pid,ptype,channel,num);

                        price = self.data("price");
                        totaPrice = price * num;
                        $price.html(totaPrice.toFixed(2));
                        $newprice.html(((totaPrice-discount)*dis).toFixed(2));
                        $(".tips").html(tips);
                        $(".time").html(time);
                        self.addClass("on").siblings().removeClass("on");
                    });
                });

            }
        }

        $(".Dialogbg-Select,.Dialog-Select").fadeIn(500);
    }

    /*加*/
    $(".plus").click(function () {
        if(num>=50){
            return;
        }else{
            num+=1;
        }

        /*新版wap添加data属性*/
        $(".Dialog-Select").find('.go-buy').attr("data-num",num);

        $(".num").val(num);

        totaPrice = price * num;
        $price.html(totaPrice.toFixed(2));
        $newprice.html(((totaPrice-discount)*dis).toFixed(2));
    });

    /*减*/
    $(".minus").click(function () {
        if(num<=1){
            return;
        }else{
            num-=1;
        }

        /*新版wap添加data属性*/
        $(".Dialog-Select").find('.go-buy').attr("data-num",num);

        $(".num").val(num);
        totaPrice = price * num;
        $price.html(totaPrice.toFixed(2));
        $newprice.html(((totaPrice-discount)*dis).toFixed(2));
    });

    function dataEach(sku,method,pid,ptype,channel,num){
       $(".Dialog-Select").find('.go-buy').attr("data-sku",sku);
       $(".Dialog-Select").find('.go-buy').attr("data-method",method);
       $(".Dialog-Select").find('.go-buy').attr("data-pid",pid);
       $(".Dialog-Select").find('.go-buy').attr("data-ptype",ptype);
       $(".Dialog-Select").find('.go-buy').attr("data-channel",channel);
       $(".Dialog-Select").find('.go-buy').attr("data-num",num);

    }

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