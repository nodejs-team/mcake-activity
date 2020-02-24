var countdown=59;
function settime(obj) {
    if (countdown == 0) {
        obj.removeAttribute("disabled");
        obj.value="获取验证码";
        countdown = 59;
        return;
    } else {
        obj.setAttribute("disabled", true);
        obj.value="(" + countdown + "s)重新获取";
        countdown--;
    }
    setTimeout(function() {settime(obj) },1000)
}

;(function(){
    /*弹窗：领取红包*/
    var Dialog = {
        $DialogBg:$(".Dialog-bg"),
        $Dialog:$(".Dialog"),
        $closeX:$(".Dialog").find(".closeX"),
        DialogShow:function () {
            var that = Dialog;
            that.$DialogBg.fadeIn(200);
            that.$Dialog.fadeIn(200);
        },
        DialogHide:function () {
            var that = Dialog;
            that.$DialogBg.fadeOut(0);
            that.$Dialog.fadeOut(0);
        },
        _init:function () {
            var self = this;
            this.$closeX.click(function () {
                self.DialogHide();
            });

        }
    };

    window.DialogShow = Dialog.DialogShow;
    window.DialogHide = Dialog.DialogHide;

    Dialog._init();

})();