;(function(){

    function publicShow(ele) {
        $(".public-Dialogbg,.public-Dialog").fadeIn(500);
    }

    function publicHide() {
        $(".public-Dialogbg,.public-Dialog").fadeOut(0);
    }
    $(".public-Dialogbg,.d-close").click(function () {
        publicHide();
    });



    window.publicShow = publicShow;
    window.publicHide = publicHide;
})();