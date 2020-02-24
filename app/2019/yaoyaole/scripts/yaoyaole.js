//运动事件监听
if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion',deviceMotionHandler,false);
}

/*获取加速度信息
通过监听上一步获取到的x, y, z 值在一定时间范围内的变化率，进行设备是否有进行晃动的判断。
而为了防止正常移动的误判，需要给该变化率设置一个合适的临界值。
*/
var SHAKE_THRESHOLD = 7000;  /*临界值4000*/
var last_update = 0;
var x, y, z, last_x = 0, last_y = 0, last_z = 0;
function deviceMotionHandler(eventData) {
    var acceleration =eventData.accelerationIncludingGravity;
    var curTime = new Date().getTime();
    if ((curTime-last_update)> 10) {
        var diffTime = curTime -last_update;
        last_update = curTime;
        x = acceleration.x;
        y = acceleration.y;
        z = acceleration.z;
        var speed = Math.abs(x +y + z - last_x - last_y - last_z) / diffTime * 10000;
        console.log(speed);
        var rand = Math.ceil(Math.random()*4)-1;
        if (speed > SHAKE_THRESHOLD) {
            //alert("你中奖啦！");  // Do something

            $(".qian li").eq(rand).addClass("drop");
        }
        last_x = x;
        last_y = y;
        last_z = z;
    }
}


