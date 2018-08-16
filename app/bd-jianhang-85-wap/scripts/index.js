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


    var discount = 0.85;
    //初始化折扣价
    function initDisprice() {
        $('.pro-list li').each(function () {
            var val= $(this).find('.price').text()-0;

            $(this).find(".dis-price").html(val*discount);
        })

    }

    function initNum1() {
        var items = [];
        $(".pro-list li").each(function(i,el){
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

            var num = 1;
            var totalPrice = 0;

            /*判断是否有折扣*/
            function isDiscount(total,mix,discount) {
                if(total>=mix){
                    total = total * discount;
                    return total.toFixed(1);
                }
                return total;
            }

            /*
             *蛋糕磅数加
             */
            $(this).find(".plus").on('click', function(){

                var ix = ++currentItem.ix;

                if(ix>=currentItem.ponds.length-1){
                    ix =currentItem.ix = currentItem.ponds.length-1;
                }

                /*是否有折扣*/
                totalPrice = currentItem.ids[ix]*num; /*总价格*/
                totalPrice = isDiscount(totalPrice,198,discount); /*满足条件折扣*/


                $(this).parents("li").find(".bang").html(currentItem.ponds[ix]+' / ￥'+currentItem.ids[ix]);

                $(this).parents("li").find(".postid").data("postid", currentItem.postId[ix]);
                $(this).parents("li").find(".price").html(currentItem.ids[ix]*num);
                $(this).parents("li").find(".dis-price").html(totalPrice);


            });
            /*
             *蛋糕磅数减少
             */
            $(this).find(".minus").on('click', function(){
                var ix = --currentItem.ix;
                if(ix<=0){
                    ix=currentItem.ix = 0;
                }

                /*是否有折扣*/
                totalPrice = currentItem.ids[ix]*num; /*总价格*/
                totalPrice = isDiscount(totalPrice,198,discount); /*满足条件折扣*/

                $(this).parents("li").find(".bang").html(currentItem.ponds[ix]+' / ￥'+currentItem.ids[ix]);
                $(this).parents("li").find(".postid").data("postid", currentItem.postId[ix]);
                $(this).parents("li").find(".price").html(currentItem.ids[ix]*num);
                $(this).parents("li").find(".dis-price").html(totalPrice);
            });


            /*数量加*/
            $(this).find(".add").on('click', function(){
                num++;
                var ix = currentItem.ix;

                if(num>=50){
                    num=50;
                }

                /*是否有折扣*/
                totalPrice = currentItem.ids[ix]*num; /*总价格*/
                totalPrice = isDiscount(totalPrice,198,discount); /*满足条件折扣*/

                $(this).parents("li").find(".num").html(num);
                $(this).parents("li").find(".postid").data("postid", currentItem.postId[ix]);
                $(this).parents("li").find(".price").html(currentItem.ids[ix]*num);
                $(this).parents("li").find(".dis-price").html(totalPrice);



            });

            /*数量减*/
            $(this).find(".jian").on('click', function(){
                num--;
                if(num<=1){
                    num = 1;
                }
                var ix = currentItem.ix;

                /*是否有折扣*/
                totalPrice = currentItem.ids[ix]*num; /*总价格*/
                totalPrice = isDiscount(totalPrice,198,discount); /*满足条件折扣*/

                $(this).parents("li").find(".num").html(num);
                $(this).parents("li").find(".postid").data("postid", currentItem.postId[ix]);
                $(this).parents("li").find(".price").html(currentItem.ids[ix]*num);
                $(this).parents("li").find(".dis-price").html(totalPrice);


            });


            /*初始化*/

            /*是否有折扣*/
            totalPrice = currentItem.ids[0]; /*总价格*/
            totalPrice = isDiscount(totalPrice,198,discount); /*满足条件折扣*/
            $(this).find(".bang").html(currentItem.ponds[0]+' / ￥'+currentItem.ids[0]);
            $(this).find(".dis-price").html(totalPrice);
            $(this).find(".price").html(currentItem.ids[0]*num);
            $(this).find(".postid").data("postid", currentItem.postId[0]);

            var self = $(this);

            $(this).find(".buybtn").click(function () {
                var postId = self.find(".postid").data("postid");
                var totalPrice = self.find(".dis-price").text();
                goBuy(postId,totalPrice);

                //alert(postId)
            });


        });
    };




    var loadComplete = function () {
        initDisprice();
        initNum1();

        var start = false;
        var time = null;
        $(".buy-btn.on").click(function () {
            if(!start){
                start = true;
                $(".tips").stop().fadeIn(200);
                time = setTimeout(function () {
                    start = false;
                    $(".tips").fadeOut(10);
                },3000);
            }else{
                start = false;
                clearTimeout(time);
                $(".tips").stop().fadeOut(10);
            }

        });



    }

})();