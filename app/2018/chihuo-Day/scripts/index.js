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



    $(".voteItem").each(function (i) {
        var tHTML = $(this).html();
        if(i===0){
            $(this).html('<div class="mark mark-1 top-ns"><span>'+(i+1)+'</span></div>'+'<div class="guan guan-1"></div>'+ tHTML);
            $(this).find(".buy_btn_box").before('<h2><p class="p-new">吃货价<i>￥</i><span class="now-price">298</span></p><p class="p-old  delete"> ￥<b class="old-price">298</b>.00</p></h2>');
        }else if(i===1){
            $(this).html('<div class="mark mark-2 top-ns"><span>'+(i+1)+'</span></div>'+'<div class="guan guan-2"></div>'+ tHTML);
            $(this).find(".buy_btn_box").before('<h2><p class="p-new">吃货价<i>￥</i><span class="now-price">298</span></p><p class="p-old delete"> ￥<b class="old-price">298</b>.00</p></h2>');
        }else if(i===2){
            $(this).html('<div class="mark mark-3 top-ns"><span>'+(i+1)+'</span></div>'+'<div class="guan guan-3"></div>'+ tHTML);
            $(this).find(".buy_btn_box").before('<h2><p class="p-new">吃货价<i>￥</i><span class="now-price">298</span></p><p class="p-old delete"> ￥<b class="old-price">298</b>.00</p></h2>');
        }else if(i<8){
            $(this).html('<div class="mark"><span>'+(i+1)+'</span></div>'+tHTML);
            $(this).find(".buy_btn_box").before('<h2><p class="p-old bigfont"><i>￥</i><b class="old-price">298</b>.00</p></h2>');
        }
    });



    /*投票*/
    var Vote = {
        totalNum:MaxVoteNum,
        voteNum:0,
        percent: 0,
        vote:function (ele) {

            this.voteNum = ele.parent(".voteItem").find('.ptxt').find(".voteNum").text()-0;
            this.voteNum++;
            Vote.percent = this.voteNum / Vote.totalNum;

            if(Vote.percent >=1){
                Vote.percent=1;
            }

            ele.parent(".voteItem").find('.ptxt').find(".voteNum").text(this.voteNum);
            ele.parent(".voteItem").find(".percent").stop().animate({
                width:(Vote.percent*100)+"%"
            },500);

        },

        init:function () {
            var self = this;

            /* $(".vote-btn").click(function () {
             self.vote($(this));
             });*/
            /*刷新初始化*/
            $(".voteItem").each(function () {
                self.voteNum = $(this).find(".voteNum").text()-0;
                self.percent = self.voteNum / self.totalNum;
                $(this).find(".voteNum").text(self.voteNum);
                $(this).find('.percent').stop().animate({
                    width:(self.percent*100)+"%"
                },500);
            });
        }
    };
    window.voteFun = Vote.vote;
    Vote.init();

    /*点击复制地址*/
    function copyUrl(str){
        var Url = document.getElementById(str);
        Url.select();
        document.execCommand("Copy");
        alert("已复制好，可贴粘。");
    }

    var loadComplete = function () {
        $(".vote-txt li").each(function () {
            var mobile = $(this).find('.tel-phone').text();
            var reg = new RegExp("(\\d{3})(\\d{4})(\\d{4})");
            var tel = mobile.replace(reg, "$1****$3");
            $(this).find('.tel-phone').text(tel);
        });

        $(".vote-btn,.more,.buy_btn_box li").hover(function () {
            $(this).addClass("hover");
        },function () {
            $(this).removeClass("hover");
        });

        $(".copyBtn1").click(function () {
            copyUrl("ewmUrl1");
        });
        $(".copyBtn2").click(function () {
            copyUrl("ewmUrl2");
        });

        initScroll();

        $(".fuli-1-hover,.fuli-2-hover").removeClass("DBlock");
        $(".fuli-btn-1").click(function () {
            $(".fuli-2-hover").removeClass("DBlock");
            $(".fuli-1-hover").toggleClass("DBlock");
            return false;
        });

        $(".fuli-btn-2,.fuli-2-hover").click(function () {
            $(".fuli-1-hover").removeClass("DBlock");
            $(".fuli-2-hover").toggleClass("DBlock");
            return false;
        });
        $(document).click(function () {
            $(".fuli-1-hover,.fuli-2-hover").removeClass("DBlock");
        });

    }
    var initScroll = function (){
        window.scrollAnimate('#evt_container', [
             {dom: '.sec-top .c-logo',x:0, y:-50,duration:500,delay:200}
             ,{dom: '.sec-top .c-title',x:0, y:-50,duration:500,delay:400}
             ,{dom: '.sec-top .banner-cake-1',x:100, y:0,duration:500,delay:600}
             ,{dom: '.sec-top .banner-cake-2',x:100, y:50,duration:500,delay:800}
             ,{dom: '.sec-top .banner-cake-3',x:100, y:50,duration:500,delay:1200}
             ,{dom: '.sec-fuli',x:0, y:0,duration:500,delay:200}
             ,{dom: '.chihuo-title',x:0, y:50,duration:500,delay:200}
             ,{dom: '.sec-shareCode',x:0, y:0,duration:500,delay:200}

        ])
    };




    /*弹窗选择磅数*/
    var $Select = $(".Select"),
        $bangshu = $Select.find(".s-bangshu"),
        $price = $Select.find(".s-price");
    var $oldprice = $Select.find(".old-price");
    var num = 1,
        pond = 2,
        price = 0,
        postid = 0,
        totaPrice=0,
        discount = 69; /*立减69*/
    /*数量选择*/
    function SelectShow(ele,dis) {  /*dis折扣*/
        var ponds = [];
        var prices = [];
        var postids = [];
        var pondsingle = $(ele).data("pond").indexOf(",");


        /*只有1盒*/
        if(pondsingle<0){
            ponds = $(ele).data("pond").split(',');
            prices = $(ele).data("price");
            postids = $(ele).data("postid");

            /*初始化默认*/
            $price.html((prices * dis).toFixed(2));
            $oldprice.html(prices);
            $(ele).find(".now-price").html((prices * dis).toFixed(2));
            $(ele).find(".old-price").html(prices);

            $(".postid").data('postid',postids);
            $Select.find("li").eq(1).addClass("on").siblings().removeClass("on");
            $(".num").val(1);
            price = prices;

            var str = '';
            str = '<li class="on" data-pond="'+ponds+'">'+ponds+'</li>';
            $bangshu.find("ul").append(str);


        }else{  /*多磅数选择*/
            ponds = $(ele).data("pond").split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")});
            prices = $(ele).data("price").split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")});
            postids = $(ele).data("postid").split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")});


            /*初始化默认*/
            $price.html((prices[1] * dis).toFixed(2));
            $oldprice.html(prices[1]);

            $(ele).find(".now-price").html((prices[1] * dis).toFixed(2));
            $(ele).find(".old-price").html(prices[1]);

            $(".postid").data('postid',postids[1]);
            $Select.find("li").eq(1).addClass("on").siblings().removeClass("on");
            $(".num").val(1);
            price = prices[1];


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

                    $(this).click(function () {
                        postid = self.data("postid");
                        $(".postid").data('postid',postid);

                        price = self.data("price");
                        totaPrice = price * num;
                        $price.html((totaPrice * dis).toFixed(2));
                        $oldprice.html(totaPrice);

                        $(ele).find(".now-price").html((totaPrice * dis).toFixed(2));
                        $(ele).find(".old-price").html(totaPrice);

                        self.addClass("on").siblings().removeClass("on");
                    });
                });

            }
        }

        $(".Dialogbg-Select,.Dialog-Select").fadeIn(200);
    }

    /*加*/
    $(".plus").click(function (dis) {
        if(num>=50){
            return;
        }else{
            num+=1;
        }
        $(".num").val(num);

        totaPrice = price * num;
        $price.html((totaPrice * dis).toFixed(2));
    });

    /*减*/
    $(".minus").click(function (dis) {
        if(num<=1){
            return;
        }else{
            num-=1;
        }
        $(".num").val(num);
        totaPrice = price * num;
        $price.html((totaPrice * dis).toFixed(2));
    });

    function SelectHide() {
        num = 1;
        $bangshu.find("ul").empty();
        $(".Dialogbg-Select,.Dialog-Select").fadeOut(0);
    }

    $(".Dialogbg-Select,.s-closes").click(function () {
        SelectHide();
    });

    window.SelectShow = SelectShow;
    window.SelectHide = SelectHide;


})();






/*滚动显示投票信息*/
function AutoScroll(obj){
    $(obj).find("ul").animate({
        marginTop:-px2rem(36)+'rem'
    },500,function(){
        $(this).css({marginTop:0}).find("li:first").appendTo(this);
    });
}

setInterval('AutoScroll("#scrollDiv")',2000);