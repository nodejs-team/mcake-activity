var SHAKE_THRESHOLD = 3000;
var last_update = 0;
var x = y = z = last_x = last_y = last_z = 0;
function init() {
    if (window.DeviceMotionEvent) {

        window.addEventListener('devicemotion', deviceMotionHandler, false);

    } else {
        alert('not support mobile event');
    }
}

var media = document.getElementById("musicBox");
function deviceMotionHandler(eventData) {
    console.log(11111);
    var acceleration = eventData.accelerationIncludingGravity;
    var curTime = new Date().getTime();
    if ((curTime - last_update) > 100) {
        var diffTime = curTime - last_update;
        last_update = curTime;
        x = acceleration.x;
        y = acceleration.y;
        z = acceleration.z;
        var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
            console.log(speed);
        if (speed > SHAKE_THRESHOLD) {
            alert("摇动了");
            /*media.setAttribute("src", "../music/christmas.mp3");
            media.load();
            media.play();*/
        }
        last_x = x;
        last_y = y;
        last_z = z;
    }
}
