var src='video4.mp4';
var select_type1 = null;
var select_type2 = null;
var select_type3 = null;
var select_type4 = null;
var select_type5 = null;
var select_type6 = null;
var time1_end = 35.52-0.5;
var time1_start = 25.72+0.5;
var time1_show = 24;   //选择按钮出现

var time2_end = 57.72-0.5;
var time2_start = 48.52+0.5;
var time2_show = 47;

var time3_end = 85.76-0.5;
var time3_start = 69.76+0.5;
var time3_show = 69;

var time4_end = 109.6-0.5;
var time4_start = 99+0.5;
var time4_show = 98;

var time5_end = 136.8-0.5;
var time5_start = 127.2+0.5;
var time5_show = 126;

var time6_end = 167.56-0.5;
var time6_start = 150.16+0.5;
var time6_show = 149;
var videoPlayer = null;
var video =document.getElementById("video");
var startbtn =document.getElementById("startbtn");
var replaybtn =document.getElementById("replaybtn");
var sharebtn =document.getElementById("sharebtn");
var btn1 =document.getElementById("btn1");
var btn2 =document.getElementById("btn2");
var btn3 =document.getElementById("btn3");
var btn4 =document.getElementById("btn4");
var btn5 =document.getElementById("btn5");
var btn6 =document.getElementById("btn6");
var btn7 =document.getElementById("btn7");
var btn8 =document.getElementById("btn8");
var btn9 =document.getElementById("btn9");
var btn10 =document.getElementById("btn10");
var btn11 =document.getElementById("btn11");
var btn12 =document.getElementById("btn12");
var btns =document.getElementById("btns");
var sharemask =document.getElementById("sharemask");
var music =document.getElementById("music");
function createPlayer() {
    videoPlayer=new MMD.VideoPlayer(
        {
            videoElement:document.getElementById('video'),//[必填],video元素;
            src:src,//[必填],video src;
            loop:false,//[可选],是否循环,默认false,true为循环;
            muted:false,//[可选],是否静音,默认false,IOS下只有IOS10生效,安卓生效;
            poster:'',//[可选],video默认图片;
            tryMultipleVideoPlayAtTheSameTime:false,//[可选],尝试同时播放多个视频,默认false;
            timesParam:[
                {name:'time1_end',time:time1_end},
                {name:'time1_show',time:time1_show},

                {name:'time2_end',time:time2_end},
                {name:'time2_show',time:time2_show},

                {name:'time3_end',time:time3_end},
                {name:'time3_show',time:time3_show},

                {name:'time4_end',time:time4_end},
                {name:'time4_show',time:time4_show},
                {name:'time5_end',time:time5_end},
                {name:'time5_show',time:time5_show},
                {name:'time6_end',time:time6_end},
                {name:'time6_show',time:time6_show},

            ],//[可选],video currenttime时间点;
            onTimes:function(name){
                if(!select_type1&&name==='time1_show'){
                    // video.volume = 0;
                    btn1.style.display = "block";
                    btn2.style.display = "block";
                }
                if(!select_type1&&name==='time1_end'){
                    btn1.style.display = "block";
                    btn2.style.display = "block";
                    videoPlayer.currentTimeAndPlay = time1_start;


                    console.log("循环1:"+select_type1);
                    console.log(1111111111111);

                }
                if(!select_type2&&name==='time2_show'){
                    // video.volume = 0;
                    btn3.style.display = "block";
                    btn4.style.display = "block";
                }
                if(!select_type2&&name==='time2_end'){

                    btn3.style.display = "block";
                    btn4.style.display = "block";

                    console.log("循环2");
                    videoPlayer.currentTimeAndPlay = time2_start;
                }
                if(!select_type3&&name==='time3_show'){
                    // video.volume = 0;
                    btn5.style.display = "block";
                    btn6.style.display = "block";
                }
                if(!select_type3&&name==='time3_end'){

                    btn5.style.display = "block";
                    btn6.style.display = "block";

                    console.log("循环3");
                    videoPlayer.currentTimeAndPlay = time3_start;
                }
                if(!select_type4&&name==='time4_show'){
                    // video.volume = 0;
                    btn7.style.display = "block";
                    btn8.style.display = "block";
                }
                if(!select_type4&&name==='time4_end'){

                    btn7.style.display = "block";
                    btn8.style.display = "block";

                    console.log("循环4");
                    videoPlayer.currentTimeAndPlay = time4_start;
                }
                if(!select_type5&&name==='time5_show'){
                    // video.volume = 0;
                    btn9.style.display = "block";
                    btn10.style.display = "block";
                }
                if(!select_type5&&name==='time5_end'){

                    btn9.style.display = "block";
                    btn10.style.display = "block";

                    console.log("循环5");
                    videoPlayer.currentTimeAndPlay = time5_start;
                }
                if(!select_type6&&name==='time6_show'){
                    // video.volume = 0;
                    btn11.style.display = "block";
                    btn12.style.display = "block";
                }
                if(!select_type6&&name==='time6_end'){

                    btn11.style.display = "block";
                    btn12.style.display = "block";

                    console.log("循环6");
                    videoPlayer.currentTimeAndPlay = time6_start;
                }
                console.log(name)
                switch (name)
                {
                    case 'firstPoint':
                        break;
                }
            },//[可选],video currenttime回调;
            onStart:function(){
                console.log('video start');
            },//[可选],video第一个画面出现回调;
            onEnd:function(){
                console.log('video end');
            }//[可选],video播放完成回调;
        }
    );

}
createPlayer();
startbtn.addEventListener(
    "click",
    function(event){
        document.getElementById('splash').style.display = 'none';
        document.getElementById('startbtn').style.display = 'none';
        videoPlayer.play();
    }
)
addlistners();
function isIphoneX(){
    return /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)
}
function isIphone(){
    return /iphone/gi.test(navigator.userAgent)
}
var is_weixin = (function(){return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1})
if(is_weixin){
    document.getElementById("video").setAttribute("x5-video-player-type","h5")
    document.getElementById("video").setAttribute("x5-video-player-fullscreen","true")
}
function hengshuping(){
    if(window.orientation==180||window.orientation==0){
        // alert("竖屏状态！")
        var tipmask =document.getElementById("tipmask");
        tipmask.style.display = "none";
    }
    if(window.orientation==90||window.orientation==-90){
        // alert("横屏状态！")
        var tipmask =document.getElementById("tipmask");
        tipmask.style.display = "block";
        document.getElementById("video").style.width = "100%"
    }
}
hengshuping();
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);

var per = 0;

var inter = setInterval(function () {
    per++;

    if(per<100){
        document.getElementById("percent").innerHTML = per+"%";
    }else{
        clearInterval(inter);

        document.getElementById("percent").innerHTML = "100%";
        document.getElementById("startbtn").style.display = "block";
        console.log(videoPlayer.isVideoCanAutoPlay);
        // //false时,则需要通过用户点击才能播放视频;
        // if(videoPlayer.isVideoCanAutoPlay)
        // {
        //     document.getElementById('splash').style.display = 'none';
        //     document.getElementById('startbtn').style.display = 'none';
        //     videoPlayer.play();
        // }

    }

},40)

var lastimg =document.getElementById("lastimg");
var back =document.getElementById("back");
if(isIphoneX()){
    var path = "imgs/";
}else{
    var path = "imgs/andr/";
}
var random = (Math.floor(Math.random()*6));
var answer = [];


// var jumpbtn =document.getElementById("jumpbtn");
if(isIphoneX()){
    lastimg.style.width = "95%";
    lastimg.style.margin = "1% auto";
    btns.style.backgroundSize = "69%";
    document.getElementById("percent").style.left = "-80%";
}
video.onended = function(){
    video.style.display = "none";
    back.style.display = "block";

    console.log("end");
};
// jumpbtn.addEventListener(
//     "touchstart",
//     function(event){
//
//         video.style.display = "none";
//         back.style.display = "block";
//
//         console.log("jump");
//
//     }
// )
// startbtn.style.display = "block";

replaybtn.addEventListener(
    "click",
    function(event){

        answer.slice(0,answer.length);
        select_type1 = null;
        select_type2 = null;
        select_type3 = null;
        select_type4 = null;
        select_type5 = null;
        select_type6 = null;

        var videobox =document.getElementById("videobox").cloneNode(true);
        document.body.removeChild(document.getElementById("videobox"));
        document.body.appendChild(videobox);
        createPlayer();
        addlistners();

        document.getElementById("video").style.display = "block";
        videoPlayer.play();
        // document.getElementById("video").play();
        back.style.display = "none";

        // video.addEventListener('timeupdate', function (e) {
        //     console.log(video.currentTime) // 当前播放的进度
        //
        // })
        // lastimg.src = path+(Math.floor(Math.random()*12)+1)+".jpg";

    }
)
sharebtn.addEventListener(
    "touchstart",
    function(event){

        sharemask.style.display = "block";

    }
)
sharemask.addEventListener(
    "touchstart",
    function(event){

        sharemask.style.display = "none";

    }
)
var musicon = true;
music.addEventListener(
    "touchstart",
    function(event){
        if(musicon){
            video.muted = true;
            musicon= false;
            music.style.background = "url('imgs/music_off.png') no-repeat center";
            music.style.backgroundSize = "100%";

        }else{
            video.muted = false;
            musicon= true;
            music.style.background = "url('imgs/music_on.png') no-repeat center";
            music.style.backgroundSize = "100%";
        }

    }
)
document.addEventListener(
    'touchmove',
    function(event){
        event.preventDefault();
    },
    { passive: false }
);
// update();



function addlistners(){
    video = document.getElementById("video");
    btn1.addEventListener("touchstart",function () {
        videoPlayer.currentTimeAndPlay=time1_end;
        select_type1 = 1;
        console.log("touch:"+select_type1);
        btn1.style.display = "none";
        btn2.style.display = "none";
        answer.push(select_type1);
        //video.onclick = null;
    })
    btn2.addEventListener("touchstart",function () {
        videoPlayer.currentTimeAndPlay=time1_end;
        select_type1 = 2;
        btn1.style.display = "none";
        btn2.style.display = "none";
        answer.push(select_type1);
        //video.onclick = null;
    })
    btn3.addEventListener("touchstart",function () {
        videoPlayer.currentTimeAndPlay=time2_end;
        select_type2 = 3;
        btn3.style.display = "none";
        btn4.style.display = "none";
        answer.push(select_type2);
        //video.onclick = null;
    })
    btn4.addEventListener("touchstart",function () {
        videoPlayer.currentTimeAndPlay=time2_end;
        select_type2 = 4;
        btn3.style.display = "none";
        btn4.style.display = "none";
        answer.push(select_type2);
        //video.onclick = null;
    })
    btn5.addEventListener("touchstart",function () {
        videoPlayer.currentTimeAndPlay=time3_end;
        select_type3 = 5;
        btn5.style.display = "none";
        btn6.style.display = "none";
        answer.push(select_type3);
        //video.onclick = null;
    })
    btn6.addEventListener("touchstart",function () {
        videoPlayer.currentTimeAndPlay=time3_end;
        select_type3 = 6;
        btn5.style.display = "none";
        btn6.style.display = "none";
        answer.push(select_type3);
        //video.onclick = null;
    })
    btn7.addEventListener("touchstart",function () {
        videoPlayer.currentTimeAndPlay=time4_end;
        select_type4 = 7;
        btn7.style.display = "none";
        btn8.style.display = "none";
        answer.push(select_type4);
        //video.onclick = null;
    })
    btn8.addEventListener("touchstart",function () {
        videoPlayer.currentTimeAndPlay=time4_end;
        select_type4 = 8;
        btn7.style.display = "none";
        btn8.style.display = "none";
        answer.push(select_type4);
        //video.onclick = null;
    })
    btn9.addEventListener("touchstart",function () {
        videoPlayer.currentTimeAndPlay=time5_end;
        select_type5 = 9;
        btn9.style.display = "none";
        btn10.style.display = "none";
        answer.push(select_type5);
        //video.onclick = null;
    })
    btn10.addEventListener("touchstart",function () {
        videoPlayer.currentTimeAndPlay=time5_end;
        select_type5 = 10;
        btn9.style.display = "none";
        btn10.style.display = "none";
        answer.push(select_type5);
        //video.onclick = null;
    })
    btn11.addEventListener("touchstart",function () {
        videoPlayer.currentTimeAndPlay=time6_end;
        select_type6 = 11;
        btn11.style.display = "none";
        btn12.style.display = "none";
        answer.push(select_type6);

        lastimg.src = path+answer[random]+".jpg";

        //video.onclick = null;
    })
    btn12.addEventListener("touchstart",function () {
        videoPlayer.currentTimeAndPlay=time6_end;
        select_type6 = 12;
        btn11.style.display = "none";
        btn12.style.display = "none";
        answer.push(select_type6);

        lastimg.src = path+answer[random]+".jpg";

        //video.onclick = null;
    })
}

// video.addEventListener('timeupdate', function (e) {
//     console.log(video.currentTime) // 当前播放的进度
//
// })
// function update() {
//     requestAnimationFrame(update);
//
// }

