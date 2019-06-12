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

        $(".pro-list li").each(function () {
            var self = $(this);
            var num = self.find(".num_n").text()-0;


            /*循环所有的attribute*/
            $(this).each(function() {
                var thisele = $(this);
                console.log(thisele);
                $.each(this.attributes, function() {
                    if(this.specified) {
                        var attrs = thisele.attr(this.name);
                        if(this.name =='class'){
                            return;
                        }else{
                            self.find('.go-buy').attr(this.name,attrs);
                        }
                    }
                });
            });
            $(this).find('.go-buy').attr("data-num",num);



            $(this).find(".m_left").click(function () {
                if(num>1){
                    num--;
                }else{
                    num=1;
                }
                self.find(".num_n").text(num);
                $(this).parents("li").find('.go-buy').attr("data-num",num);
               // counts($(this));
            });
            $(this).find(".m_right").click(function () {
                if(num<50){
                    num++;
                }else{
                    num=50;
                }
                self.find(".num_n").text(num);
                $(this).parents("li").find('.go-buy').attr("data-num",num);
            });
        });

        new Price('.js_price2',{
            add:'.add',
            reduce:'.reduce'
        },[0,0,0,0],1);

       /* initScroll();*/
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

             ,{dom: '.sec-0 .hy-title',x:0, y:50,duration:500,delay:400}
             ,{dom: '.row1 .cake',x:100, y:50,duration:500,delay:400}
             ,{dom: '.row1 .price',x:0, y:50,duration:500,delay:400}

            ,{dom: '.row2 .cake',x:-100, y:50,duration:500,delay:400}
            ,{dom: '.row2 .price',x:0, y:50,duration:500,delay:400}

            ,{dom: '.row3 .cake',x:100, y:50,duration:500,delay:400}
            ,{dom: '.row3 .price',x:0, y:50,duration:500,delay:400}

            ,{dom: '.row4 .cake',x:-100, y:50,duration:500,delay:400}
            ,{dom: '.row4 .price',x:0, y:50,duration:500,delay:400}


        ])
    };


})();

;(function () {
    function choujiang(data) {  /* n<=$item的length */
        this.$DialogCover = $(data.DialogCover);
        this.$DialogBox = $(data.DialogBox);
        this.$item = $(data.DialogBox).find(".box-item");
        this.$close = $(data.DialogBox).find(".closes");
        this.$wait = $(data.DialogBox).find(".go-wait");
        this._Init(data.n,data.arr);
    }
    choujiang.prototype={
        DialogTipShow:function (n,arr) {
            this.$DialogCover.fadeIn(500);
            this.$DialogBox.fadeIn(500);
            this.$DialogBox.find(".jp-leve").html(arr[n].leve);
            this.$DialogBox.find(".jp-name").html(arr[n].name);
            this.$DialogBox.find(".jp-price").html(arr[n].price);
            this.$DialogBox.find(".txt").html(arr[n].txt);
            this.$DialogBox.find(".jp").css({"background":"url('https://act.mcake.com/fangli/2019/wap/38jie-wap/images/jiang-"+arr[n].imgNum+".png') center","background-size":"cover"});
        },
        DialogTipHide:function () {
            this.$DialogCover.fadeOut(20);
            this.$DialogBox.fadeOut(20);
        },
        _Init:function (n,arr) {
            var self = this;
            self.DialogTipShow(n,arr);
            this.$close.click(function () {
                self.DialogTipHide();
            });
            this.$wait.click(function () {
                self.DialogTipHide();
            });
        }
    };
    window.choujiang = choujiang;
})();
