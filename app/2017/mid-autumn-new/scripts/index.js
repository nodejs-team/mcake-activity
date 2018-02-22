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


    var selectNum = {
        num:0,
        add:function (ele) {
            var self = this;
            ele.find(".add").click(function () {
                self.num =ele.find(".num").val();
                if(self.num>=50){
                    return;
                }else{
                    self.num++;
                }
                ele.find(".num").val(self.num);
            });
        },
        reduce:function (ele) {
            var self = this;
            ele.find(".reduce").click(function () {
                self.num =ele.find(".num").val();
                if(self.num<=1){
                    return;
                }else{
                    self.num--;
                }
                ele.find(".num").val(self.num);
            });
        },

        _init:function () {
            var self = this;
            $(".slideItem").each(function () {
                self.add($(this));
                self.reduce($(this));

            });


        }
    };
    
    var loadComplete = function () {

        initScroll();
        /*selectNum._init();*/
        var swiper = new Swiper('.swiper-container', {
            loop: true,
            autoplayDisableOnInteraction:false,
            initialSlide: 0,
            autoplay: 5000  /*5000*/

        });

        $('.arrow-left').on('click', function (e) {
            e.preventDefault()
            swiper.swipePrev();
        });
        $('.arrow-right').on('click', function (e) {
            e.preventDefault()
            swiper.swipeNext();
        });



    }

    var initScroll = function (){
        window.scrollAnimate('#evt_container', [
             {dom: '.banner-title',x:100, y:0,duration:500,delay:200}

             ,{dom: '.banner-box',x:-100, y:50,duration:500,delay:600}
             ,{dom: '.banner-815',x:0, y:0,duration:500,delay:800}

             ,{dom: '.banner-c-2',x:0, y:-50,duration:500,delay:600}
             ,{dom: '.banner-c-3',x:50, y:0,duration:500,delay:800}
             ,{dom: '.banner-c-5',x:50, y:0,duration:500,delay:800}


            ,{dom: '.banner-moon',x:0, y:100,duration:500,delay:1000}
            ,{dom: '.word-1',x:0, y:100,duration:800,delay:1000}
            ,{dom: '.word-2',x:0, y:100,duration:1000,delay:1000}


        ])
    };






})();