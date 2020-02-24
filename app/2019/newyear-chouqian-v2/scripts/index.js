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
       /* $("html,body").animate({scrollTop: 0},500);*/
        /**蛋糕*/
        $(".sec-cake").each(function () {
            var self = this;
            $(this).find('.buy-btn').click(function () {
                SelectShow(self,[0,0,0,0],1,true,1,0);
            });
        });
        $(".go-car").click(function () {
            SelectHide();
        });
        $(".go-buy,.s-closes").click(function () {
            SelectHide();
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



/*弹窗提示*/
(function () {
    var $Dialogbg = $(".Dialogbg-quan"),
        $Dialog=$(".Dialog-quan"),
        $rules=$(".quan"),
        $goUse=$(".go-use"),
        $closes=$(".closes");

    function QuanDialog(n) {
        $Dialogbg.fadeIn(100);
        //$Dialog.delay(500).show(500);
        $Dialog.delay(500).addClass("show").fadeIn();


        $Dialog.find(".jieqian").attr("src","https://act.mcake.com/fangli/2019/wap/newyear-chouqian/images/jieqian-"+n+".png");
        $(".sec-cake .cake").attr("class","cake cake-"+n);
        $(".buy-btn").fadeIn();
    }
    /*关闭*/
    $closes.click(function () {
        $Dialogbg.fadeOut(300);
       // $Dialog.fadeOut(300);
        $Dialog.delay(500).removeClass("show");
        $(".cake-cover").delay(500).fadeOut(500);
    });

    $goUse.click(function () {
        $Dialogbg.fadeOut(300);
        //$Dialog.fadeOut(300);
        $Dialog.delay(500).removeClass("show");
        $(".cake-cover").delay(500).fadeOut(500);
    });
    window.QuanDialog = QuanDialog;
})();

/*摇奖*/
var yaoyao = function (random) {
    $(".qian-tong").addClass("yaodong");
    $(".qian").each(function (i) {
        $(this).addClass("yaoyao"+(i+1));
    });

    setTimeout(function () {
        $(".qian-tong").delay(1000).removeClass("yaodong");
        $(".qian").each(function (i) {
            $(this).delay(1000).removeClass("yaoyao"+(i+1))
        });
    },2500)

    setTimeout(function () {
        //choujiang(data);
       QuanDialog(random); /*摇摇结束后，弹出优惠券*/
    },2000)
}


/*choujiang抽奖通用方法，抽奖效果和结果都应该写在这个方法里面 !!!!!!!
 * obj是this，data是返回的结果
 * 手机端抽奖，返回结果的通用方法
 * 后续抽奖结果都写在这个方法里面
 * */

var arr = [{"data-pond":"1磅,2磅,3磅,5磅",
    "data-weight":"454g,908g,1.36kg,2.27kg",
    "data-price":"218,318,458,750",
    "data-time":"提示：提前5小时预定,提示：提前5小时预定,提示：提前5小时预定,提示：提前5小时预定",
    "data-postid":"01,02,03,04",
    "data-tips":"尺寸：2-3人食 16cm*10cm*8cm,尺寸：4-7人食 23cm*14cm*8cm,尺寸：8-12人食 28cm*18cm*8cm,尺寸：12-20人食 36cm*22cm*8cm",
    "data-sku":"n0201,n0202,n0203,n0205",
    "data-method":"1,1,1,1",
    "data-pid":"1571,1571,1571,1571",
    "data-ptype":"2,2,2,2",
    "data-channel":"1028,1028,1028,1028"},
    {"data-pond":"2磅",
        "data-weight":"908g",
        "data-price":"298",
        "data-time":"提示：提前5小时预定",
        "data-postid":"01",
        "data-tips":"尺寸：4-7人食 15cm*9cm(直径*高度)",
        "data-sku":"R0329",
        "data-method":"1",
        "data-pid":"1571",
        "data-ptype":"2",
        "data-channel":"1028"},
    {"data-pond":"1磅,2磅,3磅,5磅",
        "data-weight":"454g,908g,1.36kg,2.27kg",
        "data-price":"198,298,428,728",
        "data-time":"提示：提前5小时预定,提示：提前5小时预定,提示：提前5小时预定,提示：提前5小时预定",
        "data-postid":"01,02,03,04",
        "data-tips":"尺寸：2-3人食 16cm*10cm*4.5cm,尺寸：4-7人食 23cm*14cm*5cm,尺寸：8-12人食 28cm*18cm*5cm,尺寸：12-20人食 36cm*22cm*6cm",
        "data-sku":"N0501,N0502,N0503,N0505",
        "data-method":"1,1,1,1",
        "data-pid":"1571,1571,1571,1571",
        "data-ptype":"2,2,2,2",
        "data-channel":"1028,1028,1028,1028"},
    {"data-pond":"1磅,2磅,3磅,5磅",
        "data-weight":"454g,908g,1.36kg,2.27kg",
        "data-price":"198,298,428,728",
        "data-time":"提示：提前5小时预定,提示：提前5小时预定,提示：提前5小时预定,提示：提前5小时预定",
        "data-postid":"01,02,03,04",
        "data-tips":"尺寸：2-3人食 16cm*7cm,尺寸：4-7人食 21cm*7cm,尺寸：8-12人食 26cm*7cm,尺寸：12-20人食 32cm*7cm",
        "data-sku":"c0301,c0302,c0303,c0305",
        "data-method":"1,1,1,1",
        "data-pid":"1571,1571,1571,1571",
        "data-ptype":"2,2,2,2",
        "data-channel":"1028,1028,1028,1028"},
    {"data-pond":"1.5磅,2.5磅",
        "data-weight":"681g,1.14kg",
        "data-price":"298,398",
        "data-time":"提示：提前5小时预定,提示：提前5小时预定",
        "data-postid":"01,02",
        "data-tips":"尺寸：2-3人食 15cm*8.2cm,尺寸：4-7人食 16.5cm*9.5cm(直径*高)",
        "data-sku":"R0102,R0103",
        "data-method":"1,1",
        "data-pid":"1571,1571",
        "data-ptype":"2,2",
        "data-channel":"1028,1028"},
    {"data-pond":"1磅,2磅,3磅,5磅",
        "data-weight":"454g,908g,1.36kg,2.27kg",
        "data-price":"198,298,428,728",
        "data-time":"提示：提前5小时预定,提示：提前5小时预定,提示：提前5小时预定,提示：提前5小时预定",
        "data-postid":"01,02,03,04",
        "data-tips":"尺寸：2-3人食 16cm*10cm*5cm,尺寸：4-7人食 23cm*14cm*5cm,尺寸：8-12人食 28cm*18cm*5cm,尺寸：12-20人食 36cm*22cm*5.5cm",
        "data-sku":"n0301,n0302,n0303,n0305",
        "data-method":"1,1,1,1",
        "data-pid":"1571,1571,1571,1571",
        "data-ptype":"2,2,2,2",
        "data-channel":"1028,1028,1028,1028"},
    {"data-pond":"1磅,2磅,3磅,5磅",
        "data-weight":"454g,908g,1362g,2270g",
        "data-price":"198,298,428,728",
        "data-time":"提示：提前5小时预定,提示：提前5小时预定,提示：提前24小时预定,提示：提前24小时预定",
        "data-postid":"01,02,03,04",
        "data-tips":"尺寸：2-3人食 13cm*6cm(直径*高),尺寸：4-7人食 18cm*8cm（直径*高）,尺寸：8-12人食 22cm*8cm（直径*高）,尺寸： 25cm*9cm(直径*高）",
        "data-sku":"R0391,R0392,R0393,R0395",
        "data-method":"1,1,1,1",
        "data-pid":"1571,1571,1571,1571",
        "data-ptype":"2,2,2,2",
        "data-channel":"1028,1028,1028,1028"},
];
var prize = {'好运签':1,'美貌签':2,'发财签':3,'升职签':4,'桃花签':5,'健康签':6,'瘦身签':7};

function choujiang(obj, data){

    var random = parseInt(prize[data['title']]); /*中奖id*/

    $(".sec-cake").data("pond",arr[random-1]["data-pond"]);
    $(".sec-cake").data("weight",arr[random-1]["data-weight"]);
    $(".sec-cake").data("price",arr[random-1]["data-price"]);
    $(".sec-cake").data("time",arr[random-1]["data-time"]);
    $(".sec-cake").data("postid",arr[random-1]["data-postid"]);
    $(".sec-cake").data("tips",arr[random-1]["data-tips"]);
    $(".sec-cake").data("sku",arr[random-1]["data-sku"]);
    $(".sec-cake").data("method",arr[random-1]["data-method"]);
    $(".sec-cake").data("pid",arr[random-1]["data-pid"]);
    $(".sec-cake").data("ptype",arr[random-1]["data-ptype"]);
    $(".sec-cake").data("channel",arr[random-1]["data-channel"]);
    /*摇一摇*/
    yaoyao(random);

    /*显示抽奖结果*/

    //QuanDialog(random);

}