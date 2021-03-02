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


    function initNum() {
        var items = [];
        $(".products li").each(function(i,el){
            var ponds = $(el).attr('data-pond');
            var ids = $(el).attr('data-price');
            var postId = $(el).attr('data-postid');

            if(ponds){
                items.push({
                    ponds: ponds.split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")}),
                    ix: 0,
                    ids: ids.split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")}),
                    postId: postId.split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")})
                })
            }

            var index = i;
            var currentItem = items[index];

            /*
             *蛋糕磅数加
             */
            $(this).find(".plus").on('click', function(){
                var ix = ++currentItem.ix;
                if(ix>=currentItem.ponds.length-1){
                    ix =currentItem.ix = currentItem.ponds.length-1;
                }

                $(this).parents("li").find("input").val(currentItem.ponds[ix]+' / ￥'+currentItem.ids[ix]);
                $(this).parents("li").find(".postid").data("postid", currentItem.postId[ix]);

            });
            /*
             *蛋糕磅数减少
             */
            $(this).find(".minus").on('click', function(){
                var ix = --currentItem.ix;
                if(ix<=0){
                    ix=currentItem.ix = 0;
                }

                $(this).parents("li").find("input").val(currentItem.ponds[ix]+' / ￥'+currentItem.ids[ix]);
                $(this).parents("li").find(".postid").data("postid", currentItem.postId[ix]);

            });

            return function(ix){
                currentItem = items[ix];
                $input.val(currentItem.ponds[currentItem.ix]).attr('data-postID', currentItem.ids[currentItem.ix])
            }


        });
    };

    var initScroll = function (){
        window.scrollAnimate('#evt_container', [
            {dom: '.sec-banner .b-title',x:0, y:100,duration:500,delay:200}
            ,{dom: '.sec-banner .cake',x:0, y:50,duration:500,delay:400}
            ,{dom: '.sec-banner .bu',x:0, y:0,duration:500,delay:200}
            ,{dom: '.sec-banner .momu',x:-100, y:0,duration:500,delay:400}
            ,{dom: '.sec-banner .girl',x:100, y:0,duration:500,delay:600}

            ,{dom: '.photo-title',x:0, y:50,duration:500,delay:600}
            ,{dom: '.photo-word',x:0, y:50,duration:500,delay:600}
            ,{dom: '.photo-btn',x:0, y:100,duration:500,delay:600}
            ,{dom: '.photo-txt',x:0, y:100,duration:500,delay:600}

            ,{dom: '.jp-title',x:0, y:100,duration:500,delay:600}
            ,{dom: '.jp-content',x:0, y:100,duration:500,delay:600}
            ,{dom: '.vote-btn',x:0, y:100,duration:500,delay:600}
            ,{dom: '.cake-title',x:0, y:100,duration:500,delay:600}
            ,{dom: '.foot-girl',x:-100, y:0,duration:500,delay:600}
            ,{dom: '.foot-xin',x:100, y:0,duration:500,delay:600}
        ])
    };


    /*领取优惠券*/
    var $Dialogbg = $(".Dialogbg-quan"),
        $Dialog=$(".Dialog-quan"),
        $rules=$(".quan"),
        $goUse=$(".go-use"),
        $closes=$(".closes");

    function QuanDialog(n) {
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


    window.QuanDialog = QuanDialog;


    var loadComplete = function () {
        var swiper1 = new Swiper('.swiper1', {
            slidesPerView: 1,
            speed:300,
            autoplay : {
                delay:3000
            },
            loop: true
        });
        initNum();
       /* initScroll();*/
        $("html,body").animate({scrollTop:0},200);
    }

})();