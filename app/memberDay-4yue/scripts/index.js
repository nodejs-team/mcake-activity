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
        /*根据日期判断进度条*/
        var vDate = new Date();
        var myDate = '';
        if((vDate.getMonth() + 1)<10){
            if(vDate.getDate()<10){
                myDate = vDate.getFullYear() + '-' +'0'+ (vDate.getMonth() + 1) + '-' +'0'+  vDate.getDate();
            }else {
                myDate = vDate.getFullYear() + '-' +'0'+  (vDate.getMonth() + 1) + '-' + vDate.getDate();
            }

        }else{
            if(vDate.getDate()<10){
                myDate = vDate.getFullYear() + '-' + (vDate.getMonth() + 1) + '-' +'0'+  vDate.getDate();
            }else {
                myDate = vDate.getFullYear() + '-' + (vDate.getMonth() + 1) + '-' + vDate.getDate();
            }
        }



         console.log('您的当前时间：',myDate);

        if(myDate<'2021-04-06'){

            $(".progress span").width("7%");
            $(".progress i").css("left","7%");

        }else if(myDate>='2021-04-06' && myDate<'2021-04-13') {

            $(".progress span").width("25%");
            $(".progress i").css("left","25%");
        }else if(myDate>='2021-04-13' && myDate<'2021-04-20') {
            $(".progress span").width("48%");
            $(".progress i").css("left","48%");
        }else if(myDate>='2021-04-20' && myDate<'2021-04-27') {
            $(".progress span").width("69%");
            $(".progress i").css("left","69%");
        }else if(myDate>='2021-04-27') {

            $(".progress span").width("91%");
            $(".progress i").css("left","91%");
        }

    };

})();


function choujiang(obj, data){

    $(obj).find(".scratch_container").delay(200).fadeOut(500);
    /*显示抽奖结果*/
    $(obj).find(".cover").fadeOut("1000");
    $(".sb").html(data.money);
    $(".youhuiquan").addClass("quan-"+data.money);
    /*    $(".money").html(data.money);*/
    $(".buy_btn").attr("data-money",data.money);
    $(".buy_btn").attr("data-pid",data.pid);
    $(".shou").fadeOut(100);

}


