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
            var str = $(".loads img").data("imsrc");
            $("#evt_loads img").attr("src",str);

            domLoad.style.display = 'none';
            document.getElementById('evt_loads').style.display = 'block';
            setTimeout(function () {
                document.getElementById('evt_loads').style.display = 'none';
                document.getElementById('evt_content').style.display = 'block';
                loadComplete();
            },8000);

        });
        loader.loadGroup('preload');
    }
    startLoading();


    var Price = {
        num:$(".num").html(),
        price:$(".new-pirce").data("price"),
        oldprice:$(".old-pirce").data("oldprice"),
        count:function () {

            var totalPrice = this.price * this.num;
            var totaloldPrice = this.oldprice * this.num;
            $(".new-pirce span").html(totalPrice);
            $(".old-pirce s").html(totaloldPrice);
        },
        add:function () {
            if(this.num<50){
                this.num++;
            }
            $(".num").html(this.num);
            $(".numVal").val(this.num);
            this.count();
        },
        mins:function () {
            this.num--;
            if(this.num<=1){
                this.num=1;
            }
            $(".num").html(this.num);
            $(".numVal").val(this.num);
            this.count();
        },
        _init:function () {
            var self = this;
            $(".numVal").val(this.num);
            $(".mins").click(function () {
                self.mins();
            });
            $(".add").click(function () {
                self.add();
            });
        }
    }

    var animates = {
        guitou:function () {

            var mcConfig = {
                "guitou-1":{"x":1068,"y":0,"w":524,"h":296,"offX":120,"offY":140,"sourceW":750,"sourceH":580,"duration":5},
                "guitou-2":{"x":534,"y":306,"w":524,"h":296,"offX":120,"offY":140,"sourceW":750,"sourceH":580,"duration":5},
                "guitou-3":{"x":0,"y":612,"w":524,"h":296,"offX":120,"offY":140,"sourceW":750,"sourceH":580,"duration":5},
                "guitou-4":{"x":534,"y":0,"w":524,"h":296,"offX":120,"offY":140,"sourceW":750,"sourceH":580,"duration":5},
                "guitou-5":{"x":0,"y":306,"w":524,"h":296,"offX":120,"offY":140,"sourceW":750,"sourceH":580,"duration":5},
                "guitou-6":{"x":0,"y":0,"w":524,"h":296,"offX":120,"offY":140,"sourceW":750,"sourceH":580,"duration":5}
            };

            new MovieClip('guitou', loader.get('guitou_png').data,formatResData(mcConfig)).play();
        },

        s:function () {
            var mcConfig = {
                "s-1":{"x":83,"y":0,"w":73,"h":71,"offX":5,"offY":5,"sourceW":84,"sourceH":83,"duration":12,"duration":5},
                "s-2":{"x":0,"y":0,"w":73,"h":71,"offX":5,"offY":5,"sourceW":84,"sourceH":83,"duration":12,"duration":5}
            };

            new MovieClip('s', loader.get('s_png').data,formatResData(mcConfig)).play();
        },

        huaA:function () {

            var mcConfig = {
                "hua-1":{"x":0,"y":270,"w":141,"h":125,"offX":15,"offY":10,"sourceW":173,"sourceH":146,"duration":8},
                "hua-2":{"x":151,"y":0,"w":141,"h":125,"offX":15,"offY":10,"sourceW":173,"sourceH":146,"duration":8},
                "hua-3":{"x":0,"y":135,"w":141,"h":125,"offX":15,"offY":10,"sourceW":173,"sourceH":146,"duration":8},
                "hua-4":{"x":0,"y":0,"w":141,"h":125,"offX":15,"offY":10,"sourceW":173,"sourceH":146,"duration":8}
            };

            new MovieClip('huaA', loader.get('huaA_png').data,formatResData(mcConfig)).play();
        },
        huaB:function () {

            var mcConfig = {
                "huab-4":{"x":0,"y":264,"w":146,"h":122,"offX":18,"offY":28,"sourceW":180,"sourceH":163,"duration":8},
                "huab-1":{"x":156,"y":0,"w":146,"h":122,"offX":18,"offY":28,"sourceW":180,"sourceH":163,"duration":8},
                "huab-2":{"x":0,"y":132,"w":146,"h":122,"offX":18,"offY":28,"sourceW":180,"sourceH":163,"duration":8},
                "huab-3":{"x":0,"y":0,"w":146,"h":122,"offX":18,"offY":28,"sourceW":180,"sourceH":163,"duration":8}
            };

            new MovieClip('huaB', loader.get('huaB_png').data,formatResData(mcConfig)).play();
        }
        ,
        cake:function () {

            var mcConfig = {
                "cake-1":{"x":371,"y":0,"w":367,"h":395,"offX":42,"offY":58,"sourceW":440,"sourceH":472,"duration":16},
                "cake-2":{"x":0,"y":447,"w":361,"h":343,"offX":42,"offY":110,"sourceW":440,"sourceH":472,"duration":16},
                "cake-3":{"x":0,"y":0,"w":361,"h":437,"offX":42,"offY":16,"sourceW":440,"sourceH":472,"duration":16},
                "cake-4":{"x":371,"y":405,"w":361,"h":343,"offX":42,"offY":110,"sourceW":440,"sourceH":472,"duration":16}
            };

            new MovieClip('cake', loader.get('cake_png').data,formatResData(mcConfig)).play();
        }

    }

    
    var loadComplete = function () {
        animates.guitou();
        animates.s();
        animates.huaA();
        animates.huaB();
        animates.cake();

        Price._init();

        $(".numbtn").hover(function () {
            $(this).fadeTo("fast",0.5);
        },function () {
            $(this).fadeTo("fast",1);
        });


        $(".floadMen").hover(function () {
            $(this).addClass("hover");
        },function () {
            $(this).removeClass("hover");
        });

        var on = false;
        $(".huangou").click(function () {
            if(on){
                $(this).addClass("on");
            }else{
                $(this).removeClass("on");
            }
            on=!on;
        });


    }

    var initScroll = function (){
        window.scrollAnimate('#evt_container', [
             {dom: '.banner-title',x:100, y:0,duration:500,delay:200}

        ])
    };






})();