



var imgSrc = '';
var imgNull = 'data:image/png;base64,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';



function loadImg(){
    var $elImg = $('.main').find("img"),
        len = $elImg.length,
        count = 0;
    for(var i = 0; i < len; i++){
        (function(i){
            var img = new Image(),
                url = $elImg.eq(i).data('src');

            if(!url) {
                return;
            }
            img.src = url;

            if(img.complete){
                count++;

                var persont = parseInt(count / len * 100);
                $("#loading").html(persont+"%");
                if(persont == 100){
                    $("#loading").fadeOut(0);
                    $(".main").fadeIn(0);
                }
                $elImg.eq(i).attr('src', url);
                if(count == len){  //加载完成
                    drawCanvas();
                }
            } else {
                img.onload = function(){
                    count++;

                    var persont = parseInt(count / len * 100);
                    $("#loading").html(persont+"%");
                    if(persont == 100){
                        $("#loading").fadeOut(0);
                        $(".main").fadeIn(0);
                    }

                    $elImg.eq(i).attr('src', url);
                    if(count == len){ //加载完成
                        drawCanvas();
                    }
                }
            }
        })(i);
    }
}

window.onload = function () {
    loadImg();
};


$(".saveImg").click(function () {
    $(".downImg-cover,.downImg-wrap").fadeIn(200);

});

$(".downImg-close,.downImg-wrap").click(function () {
    $(".downImg-cover,.downImg-wrap").fadeOut(50);
});
$(".down-img").click(function () {
    return false;
});
