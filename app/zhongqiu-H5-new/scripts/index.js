;(function(){


    var cards = {
        num:0,
        textArr:[
            '美景随风而至，<br>幸福踏月而来。'
            ,'花好中秋情意浓，<br>千里共赏好光景。'
            ,'月到中秋分外明，<br>人团家圆爱情甜。'
            ,'与你共赏中秋月，<br>是最浪漫的事情。'
            ,'千里试问平安否？<br>且把思念遥相寄。'
        ],
        writeTxt:function () {
            $(".swiper-slide.swiper-slide-active").find(".text").fadeOut(50);
            $(".swiper-slide.swiper-slide-active").find("textarea").fadeIn(50);
            $(".swiper-slide.swiper-slide-active").find(".tips").fadeIn(50);
        },
        changeTxt:function () {
            $(".swiper-slide.swiper-slide-active").find(".text").fadeIn(50);
            $(".swiper-slide.swiper-slide-active").find("textarea").fadeOut(50);
            $(".swiper-slide.swiper-slide-active").find(".tips").fadeOut(50);
            if(this.num<4){
                this.num++;
            }else{
                this.num=0
            }
            $(".swiper-slide.swiper-slide-active").find(".text").html(this.textArr[this.num]);
        },
        getCard:function () {

        },
        share:function () {

        },
        Events:function () {
            var self = this;
            /*写祝福*/
            $(".btn-write").click(function () {
                self.writeTxt();
            });
            /*换一句*/
            $(".btn-cheng").click(function () {
                self.changeTxt();
            });
        },
        init:function () {
            var self = this;
            var swiper = new Swiper('.LetterSwiper', {
                loop:true,
                pagination: {
                    el: '.swiper-pagination',
                }
            });
            self.Events();
        }
    }

    cards.init();





   /*$(".LetterSwiper").click(function () {
       swiper.slideNext();
   });

   $(".textarea").click(function () {
       return false;
   });*/










})();