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

        $(".barrage1").animate({right: "9rem"},12000);

        $(".message-txt").click(function () {
            $(this).fadeOut(0);
            $(".messageInput").focus();
        });



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

var  window_height=$('.message-content').height();
var n = 0;
var mathBottom=0;
/*发弹幕*/
function run(id,text){
    var  speed=22;
    //mathBottom=Math.floor(Math.random() * (window_height - 100) + 100);
    mathBottom=window_height-40;
    bottom=mathBottom;
    var info=$('input[name=info]').val();
    if(info == ''){
        return;
    }else {
        var  item={
            // 'img':'img/heisenberg.png',
            'info':info,
            'close':false,
            'speed':speed,
            'bottom':bottom,
            'color':'#d69990',
            'old_ie_color':'#d69990'
        };
        $('.message-content').barrager(item);
        text.push(info);
    }
    /*抽奖弹窗*/
    QuanDialog(1);
}


function retfun(text) {
    if (n%2 == 0){
        mathBottom = window_height-110;  //偶数
    } else {
        mathBottom = window_height-20;//奇数
    }
    if (n < text.length){
        var item={
            info:text[n],
            close:false, //显示关闭按钮
            speed:25, //延迟,单位秒,默认6
            bottom:mathBottom, //距离底部高度,单位px,默认随机
            color:'#d69990', //颜色,默认白色
            old_ie_color:'#d69990', //ie低版兼容色,不能与网页背景相同,默认黑色
        }
        $('.message-content').barrager(item);
        n++;
    } else {
        n=0;
    }
    //弹幕数量多时页面会变慢，删除一部分
    if ($(".barrage").length > 20) {
        for (var s = 0; s < 5; s++) {
            $(".barrage").eq(s).remove();
        }
    }
}


$("input").blur(function () {
    setTimeout(function() {
        var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
    }, 100);
});
