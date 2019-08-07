/**
 * Created by shimily on 2017/9/29.
 */

+!(function () {

  var $pan = $("#pan"),
      $start = $("#zp-start"),
      $zhuanpanCover = $(".zhuanpan-cover"),
      $zhuanpan = $(".zhuanpan"),
      $zpaward = $(".zhuanpan-award"),
      $award = $(".award"),
      $zpcenter = $(".zhuanpan-center"),
      n=10,
      circle = 360*n,
     /* arr = [0,[1,'小食券'],[3,'小食券'],4,[5,'蛋糕券'],[10,'蛋糕券']];*/
      arr = [[10,'蛋糕'],['恭喜你获得<br><span>韩流行李箱</span><br><b>价值1398元</b>'],[10,'蛋糕'],['恭喜你获得<br><span>韩流行李箱</span><br><b>价值1398元</b>'],['恭喜你获得一个<br><span>MCAKE定制帆布袋</span>'],['恭喜你获得一个<br><span>时尚水杯</span><br><b>价值299元</b>']],
      angle = [30,90,150,210,270,330];  /*对应的旋转角度*/
  /*获奖*/
  var awardFun =function (aw) {

    $award.find("span").text(arr[aw][0]);
    $award.find("b").text(arr[aw][1]);
    $award.find(".text").html(arr[aw][0]);

    if(aw==0 ||aw==2){
      $zpaward.find(".award-2").show(0); /*蛋糕券*/
    }else if(aw==1 ||aw==3){
      $zpaward.find(".award-1").show(0); /*实物赠品*/
    }
    else if(aw==4){
      $zpaward.find(".award-1").show(0); /*实物赠品*/
    }
    else{
      $zpaward.find(".award-1").show(0); /*实物赠品*/
    }


    $zhuanpanCover.fadeIn(300);
    $zhuanpan.fadeIn(300);
    $zpaward.fadeIn(300);
   /* $zpcenter.fadeOut(300);*/
  };
  var rotation = function (award){

    /*var ang = circle-(award * angle);*/
    var ang = circle+angle[award];

    $pan.rotate({
      animateTo:-ang,
      callback:function () {
        awardFun(award);
      }
    });
  };
  /*转盘抽奖*/
  // $start.click(function () {
  //   rotation(award,angle);
  // });

  function zhuanpan() {
    $zhuanpanCover.fadeIn(200);
    $zhuanpan.fadeIn(300);
    $zpaward.fadeOut(300);
    /*$zpcenter.fadeIn(300);*/

  }

  function jiangpin() {
    $zhuanpanCover.fadeIn(200);
    $zhuanpan.fadeIn(300);
    $zpaward.fadeIn(300);
    awardFun(award);
  }


   /*关闭*/
  $(".closes").click(function () {
    $zhuanpanCover.fadeOut(300);
    $zhuanpan.fadeOut(300);
    /*$pan.rotate(0);转盘复原*/

  });

  $zhuanpanCover.click(function () {
    $zhuanpanCover.fadeOut(200);
    $zhuanpan.fadeOut(300);
    /*$pan.rotate(0);转盘复原*/
  });


//rotation(award,angle)
  window.rotation = rotation;
  window.jiangpin = jiangpin;
  window.zhuanpan = zhuanpan;




})(window);
