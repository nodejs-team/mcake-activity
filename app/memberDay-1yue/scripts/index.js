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
        $(".floater").fadeIn(100);
        new Price('.js_price',{
            add:'.add',
            reduce:'.reduce'
        },[20,40,60,0],1);

        initScroll();
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





    var initScroll = function (){
        window.scrollAnimate('#evt_container', [
            ,{dom: '.banner-t',x:0, y:100,duration:500,delay:200}
            ,{dom: '.sec-0 .quanyi',x:0, y:50,duration:500,delay:200}
            ,{dom: '.sec-0 .hongbao',x:0, y:50,duration:500,delay:400}

             ,{dom: '.sec-main .hy-title',x:0, y:50,duration:500,delay:400}
             ,{dom: '.row1 .cake',x:-100, y:50,duration:500,delay:400}
             ,{dom: '.row1 .price',x:0, y:50,duration:500,delay:400}

            ,{dom: '.row2 .cake',x:100, y:50,duration:500,delay:400}
            ,{dom: '.row2 .price',x:0, y:50,duration:500,delay:400}

            ,{dom: '.row3 .cake',x:-100, y:50,duration:500,delay:400}
            ,{dom: '.row3 .price',x:0, y:50,duration:500,delay:400}

            ,{dom: '.row4 .cake',x:100, y:50,duration:500,delay:400}
            ,{dom: '.row4 .price',x:0, y:50,duration:500,delay:400}

            ,{dom: '.row5 .cake',x:-100, y:50,duration:500,delay:400}
            ,{dom: '.row5 .price',x:0, y:50,duration:500,delay:400}

            ,{dom: '.row6 .cake',x:100, y:50,duration:500,delay:400}
            ,{dom: '.row6 .price',x:0, y:50,duration:500,delay:400}

            ,{dom: '.more',x:0, y:50,duration:500,delay:400}


        ])
    };


})();

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}


+!(function () {

    var Stamp;
    Stamp = new Date();

    if (Stamp.getDay() == 2){
        __END_DATE__ = getNowFormatDate() +' 10:00:00';
    } else {
        var num = 7-Stamp.getDay()+2;
        Stamp.setDate(Stamp.getDate() + num);

        var year = Stamp.getFullYear(); //获取完整的年份(4位,1970-????)
        var month = Stamp.getMonth() +1; //获取当前月份(0-11,0代表1月)
        var mvar ='';
        if(month<10){
            mvar = '0' + month;
        }else{
            mvar = month+'';
        }
        var day = Stamp.getDate();
        var dvar ='';
        if(day<10){
            dvar = '0' + day;
        }else{
            dvar = day+'';
        }
        __END_DATE__ = year+"-"+mvar+'-'+dvar +' 10:00:00';    /*手机上需要转换成时间戳*/
    }


    var data = new Date(__END_DATE__).getTime();
    /*console.log(__END_DATE__);*/
    function actEnd1() {
        status = 1;
        $(".no-buy1").fadeOut(0);
        $(".now-buy1").fadeIn(0);
        $(".no-buy2").fadeOut(0);
        $(".now-buy2").fadeIn(0);
    }
    goTime(data,'#timer1',actEnd1);


})();
