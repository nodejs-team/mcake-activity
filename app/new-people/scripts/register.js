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

        $(".sexWrap .kind-sex").click(function () {
            $(this).addClass("hot").siblings(".kind-sex").removeClass("hot");
        });

        $(".flavorWrap .kind").click(function () {
            if($(this).hasClass("hot")){
                $(this).removeClass("hot");
            }else {
                $(this).addClass("hot");
            }
        });

        /*var mydate = new Date();
        var maxDate = mydate.getFullYear() + '-' + (mydate.getMonth()+1) + '-' + mydate.getDate()
        var calendar = new datePicker();
        calendar.init({
            trigger: ".js-date-picker" /!*按钮选择器，用于触发弹出插件*!/,
            type: "date" /!*模式：date日期；datetime日期时间；time时间；ym年月；year:年*!/,
            minDate: "1900-1-1" /!*最小日期*!/,
            maxDate: maxDate /!*最大日期*!/,
            onSubmit: function() {
                /!*确认时触发事件*!/
               // let theSelectData = calendar.value
            },
            onClose: function() {
                /!*取消时触发事件*!/
            }
        });*/

        /*initScroll();  新版wap端跳转新页面再返回来之后，页面无法滑动了*/
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
        ])
    };


})();


$("input").blur(function () {
    setTimeout(function() {
        var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
    }, 100);
});

