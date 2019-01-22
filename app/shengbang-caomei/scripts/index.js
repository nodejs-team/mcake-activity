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
            autoplay : {
                delay:3000,
                disableOnInteraction: false,
            },
            loop: true,

            pagination: {
                el: '.swiper-pagination1',
                clickable: true
            }
        });
        $(".select li").click(function () {
            $(this).addClass("on").siblings().removeClass("on");
            /*新版wap需要配置data*/
            var self = $(this);
            $(this).each(function() {
                var thisele = $(this);
                $.each(this.attributes, function() {
                    if(this.specified) {
                        var attrs = thisele.attr(this.name);
                        if(this.name =='class'){
                            return;
                        }else{
                            self.parents(".select").next(".price").find('.go-btn').attr(this.name,attrs);
                        }
                    }
                });
            });
        });
        initScroll();
    }
    var initScroll = function (){
        window.scrollAnimate('#evt_container', [
             {dom: '.sec-banner',x:0, y:0,duration:500,delay:500}
             ,{dom: '.sec-0',x:0, y:50,duration:500,delay:800}
             ,{dom: '.sec-1 .title-1',x:100, y:0,duration:500,delay:200}
             ,{dom: '.sec-1 .cake',x:-100, y:0,duration:500,delay:200}
             ,{dom: '.sec-1 .cake-2',x:100, y:0,duration:500,delay:200}
             ,{dom: '.sec-1 .word',x:100, y:0,duration:500,delay:200}
             ,{dom: '.sec-1 .select',x:-100, y:0,duration:500,delay:200}
             ,{dom: '.sec-1 .price',x:-100, y:0,duration:500,delay:200}

             ,{dom: '.sec-2 .cake',x:-100, y:0,duration:500,delay:200}
             ,{dom: '.sec-2 .price',x:100, y:0,duration:500,delay:200}
             ,{dom: '.sec-2 .select',x:100, y:0,duration:500,delay:200}

            ,{dom: '.sec-3 .cake',x:-100, y:0,duration:500,delay:200}
            ,{dom: '.sec-3 .price',x:100, y:0,duration:500,delay:200}
            ,{dom: '.sec-3 .select',x:100, y:0,duration:500,delay:200}
            ,{dom: '.more',x:0, y:100,duration:500,delay:200}

        ])
    };


})();