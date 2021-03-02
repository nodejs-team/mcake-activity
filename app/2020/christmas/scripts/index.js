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


var audioPlay = function () {
    var audio = document.getElementById('audio');

    audio.play();
    var on = true;

    if(!audio.paused){
        on=false;
        $(".music-btn").removeClass("on");
    }else{
        on=true;
        $(".music-btn").addClass("on");
    }

    $(".music-btn").click(function () {
        if(on){
            on=false;
            audio.play();
            $(this).removeClass("on");
        }else {
            on=true;
            audio.pause();
            $(this).addClass("on");
        }
    });

}
/*微信加载完成自动播放*/
document.addEventListener('WeixinJSBridgeReady', function() {
    audioPlay();
}, false);


/*choujiang
 * obj是this，data是返回的结果
* 手机端抽奖，返回结果的通用方法
* 后续抽奖结果都写在这个方法里面
* */
function choujiang(obj, data){
    var prize = {
        '1等奖':[5,"圣诞老人正快马加鞭赶来，活动结束后15个工作日内寄出"],
        '2等奖':[3,"红包和优惠券藏在账户里，请到'个人中心'-'红包/优惠券'查看"],
        '3等奖':[1,"红包和优惠券藏在账户里，请到'个人中心'-'红包/优惠券'查看"],
        '4等奖':[2,"红包和优惠券藏在账户里，请到'个人中心'-'红包/优惠券'查看"],
        '5等奖':[4,"红包和优惠券藏在账户里，请到'个人中心'-'红包/优惠券'查看"]};
    var random = parseInt(prize[data['title']][0]);
    /*显示抽奖结果*/
    $(obj).find(".jiang").addClass("jiang-"+random);
    $(".tips").text(prize[data['title']][1]);
    $(obj).addClass("hover");

}