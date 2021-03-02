
    /*开始红包雨*/
    function hobYU(callBack) {
        var _top = $(window).height() - 150;
        $(".hongbao-wrapper i").remove();
        $('.hongbao-wrapper').fadeIn();
        var h_con = 0,
            speed = 320,/*下红包个数200*/
            isPc;
        var HONGBAO = setInterval(function() {
            var _r = ['90%', '95%', '98%', '99%'];
            var _w = ['5', '30', '80', '90','70'];
            var _src = ['1','2', '3'];
            $(window).width() > 800 ? isPc = 0 : isPc = 1;

            /* var HTML_i = $('<i style="background-size:' + _r[parseInt(Math.random() * 4)] + ';top:' + -200+'px; left:' + (parseInt(Math.random() * 20) - isPc) * 20 + '%"><b>+1</b></i>');*/

            var max = 90;
            var min = 3;
            var random = Math.random()*(max-min)+min;

            var HTML_i = $('<i class="hb" style="background: url(https://act.mcake.com/fangli/2020/wap/38jie/images/flower-'+_src[parseInt(Math.random() * 3)]+'.png) center no-repeat;  background-size:' +_r[parseInt(Math.random() * 4)] + ';top:' + -200+'px; left:' +  random + '%"><b></b></i>');



            $('.hongbao-wrapper').append(HTML_i);
            var _left = HTML_i.offset().left;

            HTML_i.animate({
                'top': _top,/*红包雨的整体高度*/
                'left': _left
            }, 5000, 'linear',function(){
                $(this).fadeOut(100);
            });   /*红包雨的速度 原来是8000*/

            /*倒计时*/

            var xc = 1000/ speed;
            $('.time').html(10 - parseInt(h_con / xc) + 's');  /*1000/speed(320)=3.125*/

            if (h_con === 32) {   /* 10*3.125 =31.25*/
                clearTimeout(HONGBAO);
                /*var _x =  $("body",parent.document).find('.hob-inlet-02').offset().left - $(window).scrollLeft() + 60,
                 _y =  $("body",parent.document).find('.hob-inlet-02').offset().top - $(window).scrollTop() + 50;
                 */

                $('.hongbao-wrapper').addClass('rotate').animate({
                    'width': 0,
                    'height': 0,
                    'top': '50%',
                    'left': '50%',
                    'opacity': 0
                }, 500);
                $('.hongbao-wrapper *').addClass('rotate').animate({
                    'width': 0,
                    'height': 0,
                    'top': '50%',
                    'left': '50%',
                    'opacity': 0
                });

                /*红包雨结束*/
                callBack && callBack();
                /*显示抽奖结果*/


            } else {
                h_con++;
            }
        }, speed);  /*下红包的个数*/
    }


    $(document).on("click","i.hb",function(){
        $(this).addClass('gethb');
        $(this).find("b").text("+1");
        var len = $("i.gethb").length;
        $(".flower-num").text(len);
        console.log(len);
        if(len<=10){
            $(".mod-body").fadeOut(0);
            $(".flower-1").fadeIn(100);
            $(".quan-1").fadeIn(0);
        }else{
            $(".mod-body").fadeOut(0);
            $(".flower-2").fadeIn(100);
            $(".quan-2").fadeIn(0);
        }
    });