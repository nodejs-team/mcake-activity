// 倒计时
function setNumber(hours, minites, seconds) {
    hours = hours.toString();
    minites = minites.toString();
    seconds = seconds.toString();

    return '<span class="flip hour">' +
        '            <span><img src="https://act.mcake.com/fangli/2019/wap/qixi/images/' + hours.charAt(0) + '.png"/></span>' +
        '            <span><img src="https://act.mcake.com/fangli/2019/wap/qixi/images/' + hours.charAt(1) + '.png"/></span>' +
        '          </span>' +
        '          <span class="flip minite">' +
        '            <span><img src="https://act.mcake.com/fangli/2019/wap/qixi/images/' + minites.charAt(0) + '.png"/></span>' +
        '            <span><img src="https://act.mcake.com/fangli/2019/wap/qixi/images/' + minites.charAt(1) + '.png"/></span>' +
        '          </span>' +
        '          <span class="flip second">' +
        '            <span><img src="https://act.mcake.com/fangli/2019/wap/qixi/images/' + seconds.charAt(0) + '.png"/></span>' +
        '            <span><img src="https://act.mcake.com/fangli/2019/wap/qixi/images/' + seconds.charAt(1) + '.png"/></span>' +
        '          </span>';
}


function padZero(n) {

    return n < 10 ? "0" + n : n
}

function countDown(date, onChange, onEnd) {
    var targetTimes = new Date(date).getTime();
    var timer = null;

    function calculate() {
        var times = parseInt((targetTimes - new Date().getTime()) / 1000);
        if (times < 0) return stop();
        var hours = Math.floor(times / (60 * 60 ));
        var minites = Math.floor(times / 60 % 60);
        var seconds = times % 60;
        /*alert(minites)*/
        typeof onChange === 'function' && onChange(padZero(hours), padZero(minites), padZero(seconds));

    }

    function start() {
        calculate();
        timer = setInterval(calculate, 1000);
    }

    function stop() {
        clearInterval(timer);
        typeof onEnd === 'function' && onEnd();
    }

    return {
        start: start,
        stop: stop
    }

}

/*__END_DATE__ = '2019-7-12 18:00:00';*/
/*获取某天的某时*/
var myDate = new Date();
var newDate = myDate.getFullYear() + '/' + (myDate.getMonth()+1) + '/' + myDate.getDate() + ' 11:00:00';
__END_DATE__ = new Date(newDate).getTime();


if(myDate.getHours() >=10){
    var fliper = document.getElementById("count_fliper");
    countDown(__END_DATE__, function (hours, minites, seconds) {
        fliper.innerHTML = setNumber(hours, minites, seconds);
    },function () {
        $(".btn-n").addClass("end").html("<span>已结束</span>");
    }).start();
}


