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
        var sub=function(str,n){

            var r=/[^\x00-\xff]/g;
            if(str.replace(r,"mm").length<=n){return str;}
            var m=Math.floor(n/2);
            for(var i=m;i<str.length;i++){
                if(str.substr(0,i).replace(r,"mm").length>=n){
                    return str.substr(0,i);
                }
            }
            return str;
        }
        String.prototype.len = function()
        {
            return this.replace(/[^\x00-\xff]/g, "xx").length;
        }
        /*获取当前日期*/
        var vDate = new Date();
        var myDate = vDate.getFullYear() + '.' + (vDate.getMonth() + 1) + '.' + vDate.getDate(); /*解决安卓浏览器时间显示问题*/
        $(".data-time").text(myDate);


        $(document).on("keyup","textarea",function(){
            $(this).val(sub($(this).val(),180));
            $(".tips samp").html("最多可输入90个字("+parseInt(($("textarea").val().len())/2)+"\/90)");
        });

        var swiper1 = new Swiper('.swiper1', {
            observer:true,
            observeParents:true,
            speed:300,
            loop: true,
            autoplay : {
                delay:3000,
                disableOnInteraction: false,
            }
        });

        $(".chakan").click(function () {
            new Dialog(".Dialogbg",'.DialogBox',{
                close:'.closes',
                btn:'.go-use'
            },1,10);
        });
        /*换购*/
        $(".row").find('.huangou').each(function () {
            var cakePrice = $(this).parents(".row").find(".dis-old").data("price");
            var hgPrice = $(this).parents(".row").find(".hg").data("price");
            $(this).parents(".row").find(".dis-price").text(cakePrice+hgPrice);
            $(this).parents(".row").find(".buy_btn").attr("data-price",cakePrice+hgPrice);
            var a = true;
            $(this).click(function () {
                if(!a){
                    $(this).find(".icon").addClass("on");
                    $(this).parents(".row").find(".jia").fadeIn(100);
                    $(this).parents(".row").find(".dis-price").text(cakePrice+hgPrice);
                    $(this).parents(".row").find(".buy_btn").attr("data-price",cakePrice+hgPrice);
                    $(this).parents(".row").find(".buy_btn").attr("data-repurchase",1);
                    a = !a;
                }else{
                    $(this).find(".icon").removeClass("on");
                    $(this).parents(".row").find(".jia").fadeOut(0);
                    $(this).parents(".row").find(".dis-price").text(cakePrice);
                    $(this).parents(".row").find(".buy_btn").attr("data-price",cakePrice);
                    $(this).parents(".row").find(".buy_btn").attr("data-repurchase",0);
                    a = !a;
                }
            });
        });

        /*自动聚焦*/
        $(".sec-letter textarea").click(function () {
            $(this).focus();
            return false;
        });

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



})();




