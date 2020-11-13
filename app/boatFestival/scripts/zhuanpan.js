/**
 * Created by shimily on 2017/9/29.
 */

+!(function () {

  var $pan = $("#pan"),
      n=3,
      circle = 360*n,
      angle = [23,70,115,160,205,250,291,338];  /*对应的旋转角度*/

  /*获奖*/

  var rotation = function (award){
    /*var ang = circle-(award * angle);*/
    var ang = circle+angle[award];
    $pan.rotate({
      animateTo:-ang,
      callback:function () {
       /* awardFun(award);*/
      }
    });
  };
  /*转盘抽奖*/
  // $start.click(function () {
  //   rotation(award,angle);
  // });



//rotation(award,angle)
  window.rotation = rotation;





})(window);
