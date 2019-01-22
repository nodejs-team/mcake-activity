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

        initScroll();

        var swiper1 = new Swiper('.swiper1', {
            slidesPerView: 1,
            speed:300,
            autoplay : {
                delay:3000
            },
            loop: true,
            pagination: {
                el: '.swiper-pagination1',
                clickable: true
            }
        });


        var swiper2 = new Swiper('.swiper2', {
            slidesPerView: 1,
            speed:300,
            autoplay : {
                delay:3000
            },
            loop: true,
            pagination: {
                el: '.swiper-pagination2',
                clickable: true
            }
        });

        $(".tab-box-hide").hide();

        $(".buybtns li").click(function () {
            $(this).addClass("on").siblings().removeClass();
        });

        $(".select-price .p2  i").click(function () {
            $(this).toggleClass("on");
        });



        selectNum._init();
        Tab._init();
    };

    var initScroll = function (){
        window.scrollAnimate('#evt_container', [
               {dom: '.chri-w-r',x:50, y:0,duration:1000,delay:600}
              ,{dom: '.chri-men',x:0, y:0,duration:500,delay:200}
              ,{dom: '.chri-w-l',x:-50, y:0,duration:800,delay:400}
              ,{dom: '.chri-word',x:0, y:100,duration:800,delay:800}
        ])
    };



    var selectNum = {
        num:0,
        price:0,
        add:function (ele) {
            var self = this;
            ele.find(".add").click(function () {
                self.num =ele.find(".num").val();
                self.price =ele.find(".price").data('price');
                if(self.num>=50){
                    return;
                }else{
                    self.num++;
                }
                ele.find(".num").val(self.num);
                ele.find(".num-span").html(self.num);
                self.count(ele,self.price,self.num);
            });

        },
        reduce:function (ele) {
            var self = this;
            ele.find(".reduce").click(function () {
                self.num =ele.find(".num").val();
                self.price =ele.find(".price").data('price');
                if(self.num<=1){
                    return;
                }else{
                    self.num--;
                }
                ele.find(".num").val(self.num);
                ele.find(".num-span").html(self.num);
                self.count(ele,self.price,self.num);
            });
        },
        count:function (ele,price,num) {
            var totalPrice = price * num;
            ele.find(".price em").text(totalPrice);
        },
        _init:function () {
            $(".num").val(1);
            var self = this;
            $(".tab-box").each(function () {
                this.price =$(this).find(".price").data('price');
                $(this).find(".price em").text(this.price);
                self.add($(this));
                self.reduce($(this));
            });
        }
    };


    var Tab = {
        _init:function () {
            $('.tab-top li').click(function () {
                $(this).removeClass("on").siblings().addClass('on');
                var idx = $(this).index();
                $(".tab-box").eq(idx).fadeIn(0).siblings(".tab-box").fadeOut(0);
                console.log(idx);
                if(idx == 1){
                    $(".sec-1").addClass('on');
                }else{
                    $(".sec-1").removeClass('on');
                }
            });



        }
    };





})();

/*判断手机横竖屏状态：*/
!+(function () {

    function hengshuping() {
        if (window.orientation == 180 || window.orientation == 0) {
            window.location.reload();
        }
        if (window.orientation == 90 || window.orientation == -90) {
            window.location.reload();
        }
    }
    window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);
})();