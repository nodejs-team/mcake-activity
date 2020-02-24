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

    var initScroll = function (){
        window.scrollAnimate('#evt_container', [
           {dom: '.banner-title',x:0, y:50,duration:500,delay:400}

        ])
    };



    // 倒计时
    var _ordertimer = null;
    var _ordertimer2 = null;
    function leftTimer(enddate,ele,callback) {
        var leftTime = (new Date(enddate)) - new Date(); //计算剩余的毫秒数
        var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
        var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
        var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟
        var seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数
        days = checkTime(days);
        hours = checkTime(hours);
        minutes = checkTime(minutes);
        seconds = checkTime(seconds);
        if(days > 0  && hours >= 0 && minutes >= 0 && seconds >= 0){
            $(ele).html(days + "天  " + hours + ":" + minutes + ":" + seconds);
        }
        else if(days==0 && hours >= 0 && minutes >= 0 && seconds >= 0){
            $(ele).html(hours + ":" + minutes + ":" + seconds);
        }else if(days<=0 || hours <= 0 || minutes <= 0 || seconds <= 0){
            $(ele).html('已结束');
            callback && callback();
            clearInterval(_ordertimer);
            _ordertimer = null;
        }
        else{
            $(ele).html('已结束');
            callback && callback();
            clearInterval(_ordertimer);
            _ordertimer = null;
        }

    }
    function leftTimer2(enddate,ele,callback) {
        var leftTime = (new Date(enddate)) - new Date(); //计算剩余的毫秒数
        var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
        var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
        var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟
        var seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数
        days = checkTime(days);
        hours = checkTime(hours);
        minutes = checkTime(minutes);
        seconds = checkTime(seconds);
        if(days > 0  && hours >= 0 && minutes >= 0 && seconds >= 0){
            $(ele).html(days + "天  " + hours + ":" + minutes + ":" + seconds);
        }
        else if(days==0 && hours >= 0 && minutes >= 0 && seconds >= 0){
            $(ele).html(hours + ":" + minutes + ":" + seconds);
        }else if(days<=0 || hours <= 0 || minutes <= 0 || seconds <= 0){
            $(ele).html('已结束222');
            callback && callback();
            clearInterval(_ordertimer2);
            _ordertimer2 = null;
        }
        else{
            $(ele).html('已结束');

            callback && callback();
            clearInterval(_ordertimer2);
            _ordertimer2 = null;
        }

    }
    function checkTime(i) { //将0-9的数字前面加上0，例1变为01
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
    function goTime(v,ele,callback){
        var date1=new Date(),data2=new Date(v);
        if(data2<date1){

            $(ele).html('已结束！');
            callback && callback();
            clearInterval(_ordertimer);
            return;
        }/*设置的时间小于现在时间退出*/
        _ordertimer = setInterval(function(){leftTimer(data2,ele,callback)}, 1000);

    }

    function timeLast(v,ele,callback){
        var date1=new Date(),data2=new Date(v);
        if(data2<date1){

            $(ele).html('已结束！');
            callback && callback();
            clearInterval(_ordertimer2);
            return;
        }/*设置的时间小于现在时间退出*/
        _ordertimer2 = setInterval(function(){leftTimer2(data2,ele,callback)}, 1000);

    }

    window.goTime = goTime;
    window.timeLast = timeLast;


    var loadComplete = function () {


        /*规则*/
        var $Dialogbg = $(".Dialogbg-guize"),
            $Dialog=$(".Dialog-guize"),
            $rules=$(".quan"),
            $goUse=$(".go-use"),
            $closes=$(".closes");

        function guizeDialog(n) {
            $Dialogbg.fadeIn(300);
            $Dialog.fadeIn(300);
            $Dialog.find(".quan-"+n).fadeIn(300).siblings().not(".closes").hide();
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

        
        $(".guize-btn").click(function () {
            guizeDialog(1);
        });

        /*砍价*/
        var MaxVoteNum = 100;
        var oldPrice = 198;
        var kanjia = {
            totalNum:MaxVoteNum,
            curPrice:0,
            percent: 0,

            vote:function (ele,callback) {
                this.curPrice = ele.parents(".kj-percent").find(".curPrice").text()-0;
                this.curPrice++;
                kanjia.percent = this.curPrice / kanjia.totalNum;
                if(kanjia.percent >=1){
                    kanjia.percent=1;
                     this.curPrice = kanjia.totalNum;
                }
                ele.parents(".kj-percent").find(".percent").stop().animate({
                    width:(kanjia.percent*100)+"%"
                },0,function () {
                    callback && callback();
                });
                ele.parents(".kj-percent").find(".curPrice").text(this.curPrice);
                ele.parents(".kj-percent").find(".end-price").text(oldPrice - self.curPrice);
            },

            init:function () {
                var self = this;

                /* $(".vote-btn").click(function () {
                 self.vote($(this));
                 });*/
                /*刷新初始化*/
                $(".piao-num").each(function () {
                    self.curPrice = $(this).find(".curPrice").text()-0;
                    self.percent = self.curPrice / self.totalNum;
                    $(this).find(".curPrice").text(self.curPrice);
                    $(this).find(".end-price").text(oldPrice - self.curPrice);
                    $(this).find('.percent').stop().animate({
                        width:(self.percent*100)+"%"
                    },500);
                });
            }
        };
        window.kanjiaFun = kanjia.vote;
        kanjia.init();





    }



})();