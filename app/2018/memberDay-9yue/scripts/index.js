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



   /*推荐列表选择磅数*/
    function  Select() {
        var discount = 0.85;
        var price = 0;
        var postid = 0;
        var totalPrice = 0;
        $(".product .pro-li").each(function(){
            var self = $(this);

            $(this).find(".selects-l").on("change",function(){
                price= self.find("option:selected",this).data("price");
                postid = self.find("option:selected",this).data("postid");
                console.log(price);
                totalPrice = price*discount;
                totalPrice = parseFloat(totalPrice.toFixed(2));
                self.find(".pro-price").text(totalPrice);
                self.find(".old-price").text(price);
                self.find(".postid").data("postid",postid);
            });

            /*初始化*/
            price=  $(this).find("option:selected",this).data("price");
            postid =  $(this).find("option:selected",this).data("postid");
            $(this).find(".pro-price").html(price*discount);
            $(this).find(".old-price").html(price);

        });
        //$(".selects-l").val("200克");

    }





    var loadComplete = function () {
        $(".floater").fadeIn(100);
      // Select();
        new Price('.js_price1',{
            add:'.add',
            reduce:'.reduce'
        },[0,60,0,0]);

        new Price('.js_price3',{
            add:'.add',
            reduce:'.reduce'
        },[0,0,0,0]);

        new Price('.js_price2',{
            add:'.add',
            reduce:'.reduce'
        },[20,50,80,0],1);

        $(".xs_num .reduce").hover(function () {
            $(this).addClass("on");
        },function () {
            $(this).removeClass("on");
        });
        $(".xs_num .add").hover(function () {
            $(this).addClass("on");
        },function () {
            $(this).removeClass("on");
        });




        initScroll();
    }
    var initScroll = function (){
        window.scrollAnimate('#evt_container', [
            {dom: '.banner-1',x:-50, y:-50,duration:500,delay:400}
            ,{dom: '.banner-2',x:50, y:-50,duration:500,delay:400}
            ,{dom: '.banner-3',x:-50, y:50,duration:500,delay:600}
            ,{dom: '.banner-4',x:50, y:50,duration:500,delay:600}
            ,{dom: '.banner-t',x:0, y:100,duration:500,delay:200}
            ,{dom: '.sec-0 .quanyi',x:0, y:50,duration:500,delay:200}
            ,{dom: '.sec-0 .hongbao',x:0, y:50,duration:500,delay:400}

             ,{dom: '.sec-main .hy-title',x:0, y:50,duration:500,delay:400}
             ,{dom: '.row1 .cake',x:100, y:50,duration:500,delay:400}
             ,{dom: '.row1 .price',x:0, y:50,duration:500,delay:400}

            ,{dom: '.row2 .cake',x:-100, y:50,duration:500,delay:400}
            ,{dom: '.row2 .price',x:0, y:50,duration:500,delay:400}

            ,{dom: '.row3 .cake',x:100, y:50,duration:500,delay:400}
            ,{dom: '.row3 .price',x:0, y:50,duration:500,delay:400}

            ,{dom: '.row4 .cake',x:-100, y:50,duration:500,delay:400}
            ,{dom: '.row4 .price',x:0, y:50,duration:500,delay:400}

            ,{dom: '.row5 .cake',x:100, y:50,duration:500,delay:400}
            ,{dom: '.row5 .price',x:0, y:50,duration:500,delay:400}


        ])
    };


})();