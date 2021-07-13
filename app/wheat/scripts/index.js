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
            observer:true,
            observeParents:true,
            speed:300,
            loop: true,
            pagination: {
             el: '.swiper-pagination1',
             clickable: true
             },
            autoplay : {
                delay:5000,
                disableOnInteraction: false
            }
        });

        function imgShow(ele){
            var i=-1;
            var len=ele.children("p").length;
            function imgAnimate(){   //设置动画
                i++; console.log(i)
                if(i<len){
                    setTimeout(function(){
                        ele.children("p").eq(i).show().siblings().hide();
                        imgAnimate(); //内部回调
                    },500);   //间隔时间
                }else{
                    //动画执行一次完成后
                }
            }
            imgAnimate();  //执行一次动画,否则其他动画不隐藏
        }

        imgShow($(".piont"));  //执行一次
        setInterval(function(){imgShow($(".piont"))},2000);  //循环执行

    };

})();



/*领取优惠券*/
var $Dialogbg = $(".Dialogbg-quan"),
    $Dialog=$(".Dialog-quan"),
    $rules=$(".quan"),
    $card=$(".card"),
    $goUse=$(".go-use"),
    $closes=$(".closes");

function QuanDialog(n) {
    $Dialogbg.fadeIn(300);
    $Dialog.fadeIn(300);
    $Dialog.find(".quan-"+n).fadeIn(300).siblings().not(".closes").hide();
    /* $card.find("img").attr("src","https://act.mcake.com/fangli/2019/pc/memberDay-7yue/images/card-"+n+".png");*/

   /* $Dialog.find(".quan").fadeIn(300).siblings().not(".closes").hide();*/
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


window.QuanDialog = QuanDialog;


