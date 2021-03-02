(function(){
       function ShareFriend(ele1,ele2) {
        this.$ele1 = $(ele1);
        this.$ele2 = $(ele2);
        this._Init();
    }
    ShareFriend.prototype={
        DialogShow:function () {
            this.$ele1.fadeIn(500);
            this.$ele2.fadeIn(500);
        },
        DialogHide:function () {
            this.$ele1.fadeOut(20);
            this.$ele2.fadeOut(20);
        },
        _Init:function () {
            var self = this;
            self.DialogShow();
            this.$ele1.click(function () {
                self.DialogHide();
            });
            this.$ele2.click(function () {
                self.DialogHide();
            });
        }
    };

   window.ShareFriend = ShareFriend;
})();