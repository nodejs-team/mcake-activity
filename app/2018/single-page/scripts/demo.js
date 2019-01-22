;(function(){
    $(".citys li").click(function () {
        alert(0)
        $(this).addClass("on").siblings().removeClass("on");
    });

})();