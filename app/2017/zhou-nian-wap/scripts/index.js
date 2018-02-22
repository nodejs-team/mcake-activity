;(function () {
  function fixImageSrc(res) {
    var imgs = document.getElementsByTagName('img');
    for (var i = 0, len = imgs.length; i < len; i++) {
      var img = imgs[i];
      var dataSrc = img.getAttribute('src-fix');
      var data = res[dataSrc];
      if (dataSrc && data) {
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


  var initScroll = function (){
    window.scrollAnimate('#evt_container', [
      {dom: '.cake',x:300, y:-180,duration:600,delay:0}

    ])
  };

  var loader;

  function startLoading() {
    loader = new Loader('images/');
    var domLoad = document.getElementById('evt_loading');
    domLoad.style.display = 'block';
    loader.addGroup('preload', resData);
    loader.on('progress', function (groupName, ix, len) {
      domLoad.innerHTML = parseInt(ix / len * 100) + '%';
    });
    loader.on('complete', function (groupName) {
      fixImageSrc(loader.getAll());
      domLoad.style.display = 'none';
      document.getElementById('evt_content').style.display = 'block';
      loadComplete();
    });
    loader.loadGroup('preload');
  }

  startLoading();


  var loadComplete = function () {


    var swiper = new Swiper('.swiper-container', {
        slidesPerGroup:1,
        slidesPerView: 4,
        loop: true,
        freeModeMomentum:true,
        spaceBetween : 20,
        initialSlide: 0,
        autoplay: false  /*5000*/

    });

      haoli.init();
      Select();
      lastTime.init(__END_DATE__,onEnd);
      miaosha();
   // initScroll();
  }


  /**秒杀*/
  function miaosha(ms) {
      /*1立即秒杀  2即将秒杀  0秒杀结束*/
      var state=0;
      $(".miaosha li").each(function () {
          state=$(this).data("state");
          if(state==0){
              $(this).find(".ms-sq").fadeIn(200);
          }else if(state==1){
              $(this).find(".ms-start").fadeIn(500);
              $(this).find(".txt").text("立即秒杀");
              $(this).find(".ms-cover").css({
                  opacity:0.5
              });

          }else if(state==2){
              $(this).find(".ms-cover").css({
                  opacity:0.75
              });
              $(this).find(".ms-start").show(0);
              $(this).find(".txt").text("即将秒杀");
          }
      });

      $(".miaosha-wait .swiper-slide").each(function () {
          state=$(this).data("state");
          $(this).find(".cover").css({
              opacity:0.5
          });
          if(state==0){
              $(this).find(".cover").css({
                  opacity:0.75
              });
              $(this).find(".text span").text('秒杀结束');
          }else if(state==2){
              $(this).find(".text span").text('即将秒杀');
          }
      });
  }

  /**六重好礼*/

  var haoli = {
      bg:0,
      index:0,
      $haoli:$("#sec-haoli"),
      $haoliItem:$("#sec-haoli li").not(".link"),
      $Dialogbg:$(".Dialogbg-rules"),
      $Dialog:$(".Dialog-rules"),
      $rules:$(".rules"),
      $closes:$(".closes"),
      Dialog:function (ele) {
          var self = this;
          this.$Dialogbg.fadeIn(300);
          this.$Dialog.fadeIn(300);
          var str = ele.find(".txtHtml").html();
          this.$rules.html(str);

      },
      init:function () {
          var self = this;


          this.$haoliItem.click(function () {
              self.Dialog($(this));
          });

        /*关闭*/
          this.$closes.click(function () {
              self.$Dialogbg.fadeOut(300);
              self.$Dialog.fadeOut(300);
              self.$rules.empty();
          });
          this.$Dialogbg.click(function () {
              self.$Dialogbg.fadeOut(300);
              self.$Dialog.fadeOut(300);
              self.$rules.empty();
          });

      }
  };




  /*倒计时*/
    var lastTime = {
        targetTimes:0,
        time:0,
        timer:null,
        init:function (data,onEnd) {
            this.targetTimes = new Date(data).getTime();
            this.start(onEnd);

        },
        Htmls:function (day,hours,minites,seconds) {
            if(day<=0){
                $(".dayout").hide();
            }

            $(".day").html(day);
            $(".hours").html(hours);
            $(".minites").html(minites);
            $(".seconds").html(seconds);

        },
        calculate:function () {
            this.time = parseInt((this.targetTimes - new Date().getTime())/1000);

            if(this.time == 0){
                this.end(onEnd);
            } else if(this.time < 0){
                return this.stop();
            }
            var day = Math.floor(this.time / (60 * 60 * 24));
            var hours = Math.floor((this.time-day*24*60*60) / (60 * 60 ));

            var minites = Math.floor(this.time / 60 % 60);
            var seconds = this.time % 60;
            /* console.log(this.time / (60 * 60 * 24));*/
            this.Htmls(day,hours,minites,seconds);
        },
        start:function (onEnd) {
            var self = this;
            this.timer = setInterval(function () {
                self.calculate(onEnd);
            }, 1000);
        },
        end:function (onEnd) {
            typeof onEnd === 'function' && onEnd();
        },
        stop:function () {
            clearInterval(this.timer);

        }
    }



   function Select() {
        $(".products .pro-li").each(function(){
            var self = $(this);
            $(this).find(".selects-l").on("change",function(){
                self.find(".price").text($("option:selected",this).data("price"));
                self.find(".postid").data("postid",$("option:selected",this).data("postid"));
            });

        });

    }


})();