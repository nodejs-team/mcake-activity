var makeCards = {
    num:0,
    text:null,
    LetterIndex:0,
    cardArr:[],
    textArr:[
        '美景随风而至，<br>幸福踏月而来。'
        ,'花好中秋情意浓，<br>千里共赏好光景。'
        ,'月到中秋分外明，<br>人团家圆爱情甜。'
        ,'与你共赏中秋月，<br>是最浪漫的事情。'
        ,'千里试问平安否？<br>且把思念遥相寄。'
    ],
    writeTxt:function () {
        $(".swiper-slide.swiper-slide-active").find(".text").fadeOut(0);
        $(".swiper-slide.swiper-slide-active").find("textarea").fadeIn(50);
        $(".swiper-slide.swiper-slide-active").find("samp").fadeIn(50);

        var lens=0;
        $(".swiper-slide.swiper-slide-active").find("textarea").bind('input propertychange',function(){
            lens=get_length($(this).val());
            var lastStr = parseInt(50-lens);

            if(lastStr<=0){
                lastStr=0
            }
            $(".swiper-slide.swiper-slide-active").find(".words samp").html("还可以输入<span>"+lastStr+"</span>个字");
        });


    },
    changeTxt:function () {
        $(".swiper-slide.swiper-slide-active").find("textarea").fadeOut(0);
        $(".swiper-slide.swiper-slide-active").find("samp").fadeOut(0);
        $(".swiper-slide.swiper-slide-active").find(".text").fadeIn(50);

        if(this.num<4){
            this.num++;
        }else{
            this.num=0
        }
        $(".swiper-slide.swiper-slide-active").find(".text").html(this.textArr[this.num]);
    },

    /*编辑贺卡*/
    editCard:function () {
        $(".cards-end").fadeOut(500);
    },
    /*生成贺卡*/
    getCard:function (callback) {
        var self = this;
        var areaVal= $(".swiper-slide.swiper-slide-active").find("textarea").val();
        var textVal= $(".swiper-slide.swiper-slide-active").find(".text").html();
        var wxid= $(".swiper-slide.swiper-slide-active").find(".wxid").html();

        if($(".swiper-slide.swiper-slide-active").find("textarea").is(':visible') && areaVal !== ""){
            self.text = areaVal;
            self.cardArr[4]= 1;
            $(".cards-end .text,.openLetter .text").addClass("myWrite");

        }else{
            self.text = textVal;
            $(".cards-end .text,.openLetter .text").removeClass("myWrite");
            self.cardArr[4]= 0;
        }
        self.cardArr[0]=self.text;
        self.cardArr[1]= wxid;
        self.cardArr[2]= self.LetterIndex;
        self.cardArr[3]= self.LetterIndex;

        $(".cards-end .text").html(self.cardArr[0]);
        $(".cards-end .wxid").html(self.cardArr[1]);
        $(".cards-end .card-o").html('<img src="http://edm.mcake.com/fangli/2018-wap/zhongqiu-H5/images/card-'+self.cardArr[2]+'.png">');
        $(".cards-end .cardsBgs").css({
            'background':'url(http://edm.mcake.com/fangli/2018-wap/zhongqiu-H5/images/cardBg-'+self.cardArr[2]+'.jpg)',
            'background-size': '100%'
        });

        $(".openLetter").fadeOut(0);
        /*合成贺卡*/
        setTimeout(function () {
            $(".cards-end").fadeIn(300);
            $(".Letter-bg").fadeIn(500);
        },500);


        callback && callback.call();
    },
    /*分享贺卡*/
    share:function () {
        $(".share").fadeIn(50);
        $(".share .zhidao").click(function () {
            $(".share").fadeOut(50);
        });

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
        /*生成贺卡*/
        $(".card-ok").click(function () {
            self.getCard(card_click);
        });
        /*重新编辑贺卡*/
        $(".btn-back").click(function () {
            self.editCard();
        });

        /*重新编辑贺卡*/
        $(".btn-send").click(function () {
            self.share();
        });



        $(".card-tips .zhidao").click(function () {
            $(".card-tips").fadeOut(50);
        });

    },
    init:function () {
        var self = this;
        self.Events();
        var cardsBg = new Swiper('.cardsBg', {
            loop:true,
            effect : 'fade',
            autoplay: false
        });
        var Letter = new Swiper('.LetterSwiper', {
            loop:true,
            autoplay: false,
            pagination: {
                el: '.swiper-pagination',
            },
            on: {
                slideChangeTransitionEnd: function(){
                    var index = this.realIndex;
                    cardsBg.slideTo(index+1,1000, false);
                    self.LetterIndex = index+1;

                }
            }
        });




    }
};

//makeCards.init();



function get_length(str) {
    var char_length = 0;
    for (var i = 0; i < str.length; i++){
        var son_char = str.charAt(i);
        //如果是汉字，长度大于2，其他任何字符（包括￥等特殊字符，长度均为1）另外：根据需求规则，限制n个字，一个字=2个字符
        encodeURI(son_char).length > 2 ? char_length += 1 : char_length += 0.5;
    }
    return char_length;
}



