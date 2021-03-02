$(function() {
    /*下红包雨*/

    function hobYU() {
        var _top = $(document).height() + 300;

        $('.hongbao-wrapper').fadeIn();
        var h_con = 0,
            speed = 200,/*下红包个数*/
            isPc;
        var HONGBAO = setInterval(function() {
            var _r = ['70%', '80%', '90%', '100%'];
            var _w = ['5', '30', '80', '90','70'];
            $(window).width() > 800 ? isPc = 0 : isPc = 1;

           /* var HTML_i = $('<i style="background-size:' + _r[parseInt(Math.random() * 4)] + ';top:' + -200+'px; left:' + (parseInt(Math.random() * 20) - isPc) * 20 + '%"><b>+1</b></i>');*/

          var HTML_i = $('<i class="hb" style="background-size:' + _r[parseInt(Math.random() * 4)] + ';top:' + -200+'px; left:' +  (parseInt(Math.random() * 20) - isPc) * 20 + '%"><b></b></i>');


            $('.hongbao-wrapper').append(HTML_i);
            var _left = HTML_i.offset().left + 100;

            HTML_i.animate({
                'top': _top,/*红包雨的整体高度*/
                'left': _left
            }, 8000, 'linear');   /*红包雨的速度*/

            /*倒计时*/
           // $('.hob-cd').html(10 - parseInt(h_con / 20) + 's');   /*100除以20等于5分钟*/

          $('.hob-cd').html(20 - parseInt(h_con / 5) + 's');


            if (h_con === 100) {
                clearTimeout(HONGBAO);
                var _x =  $("body",parent.document).find('.hob-inlet-02').offset().left - $(window).scrollLeft() + 60,
                    _y =  $("body",parent.document).find('.hob-inlet-02').offset().top - $(window).scrollTop() + 50;
                $('.hongbao-wrapper').addClass('rotate').animate({
                    'width': 0,
                    'height': 0,
                    'top': _y,
                    'left': _x,
                    'opacity': 0
                }, 500);
                $('.hongbao-wrapper *').addClass('rotate').animate({
                    'width': 0,
                    'height': 0,
                    'top': _y,
                    'left': _x,
                    'opacity': 0
                });

                /*红包雨结束*/
                $('.hongbao-wrapper').fadeOut(100);
                $("body",parent.document).find(".hob-inlet").fadeOut(10);
                $(".modal,.shade").fadeIn(200);
            } else {
                h_con++;
            }
        }, speed);  /*下红包的个数*/
    }




    var _hob = $('.hongbao-wrapper');
    var _forget = $('.for-get-now');



    /*关闭红包雨,暂时不用*/
    $('.hob-close').click(function(event) {
        var _x = $('.hob-inlet-02').offset().left - $(window).scrollLeft() + 60,
            _y = $('.hob-inlet-02').offset().top - $(window).scrollTop() + 50;
        $('.hongbao-wrapper').addClass('rotate').animate({
            'width': 0,
            'height': 0,
            'top': _y,
            'left': _x,
            'opacity': 0
        }, 500);
        $('.hongbao-wrapper *').addClass('rotate').animate({
            'width': 0,
            'height': 0,
            'top': _y,
            'left': _x,
            'opacity': 0
        }, 500, function() {
            $('.hongbao-wrapper').hide();
        });
        $(".hob-inlet").fadeOut();

        return false
    });

    window.hobYU=hobYU;

   /* _forget.click(function(event) {
        _hob.fadeOut();
        modal.show('#hobCoupon');
    });
*/

    /*开始抢红包*/
    /*$(".hob-inlet-01").click(function () {
        hobYU();

    });*/
    /*点击抢红包*/
   /* $(document).on("click","i",function(){
        $(this).addClass('gethb');
        $(this).find("b").text("+8元");
        var self = $(this);
        setTimeout(function () {
            self.hide();
        },200);
    });*/

    /*使用红包*/
    $(".go-use").click(function () {
        $("body",parent.document).find('.hongbaoCj').fadeOut();
      $(".modal,.shade").fadeOut(10);
      /*scrollTopAni("#zhekou");*/
      return false;
    });

    /*关闭红包*/
    $(".mod-close").click(function () {
        $("body",parent.document).find(".hob-inlet").fadeOut();
        $(".modal,.shade").fadeOut(10);
        //console.log($("body",parent.document).find('.hongbaoCj'));
        $("body",parent.document).find('.hongbaoCj').fadeOut();
        return false;
    });
});