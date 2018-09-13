/**
 * Created by shimily on 2018/5/1.
 */

!(function () {
    /*px转成rem的方法*/
    function px2rem(d) {
        var val = parseFloat(d) * 10 / 750;
        if (typeof d === 'string' && d.match(/px$/)) {
            val += 'rem';
        }
        return val;
    }
    window.px2rem = px2rem;


    /*移动端通用
     *判断手机横竖屏状态
     * 翻转屏幕自动刷新页面
     */
    function hengshuping() {
        if (window.orientation == 180 || window.orientation == 0) {
            window.location.reload();/*竖屏状态*/
        }
        if (window.orientation == 90 || window.orientation == -90) {
            window.location.reload(); /*横屏状态*/
        }
    }
    window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);

    /*
     *领券提示弹窗
     */
    function lingquan(ele1,ele2,ele3) {
        this.$ele1 = $(ele1);
        this.$ele2 = $(ele2);
        this.$ele3 = $(ele3);
        this._Init();
    }
    lingquan.prototype={
        DialogShow:function () {
            this.$ele1.fadeIn(500);
            this.$ele3.fadeIn(500);
        },
        DialogHide:function () {
            this.$ele1.fadeOut(20);
            this.$ele2.fadeOut(20);
        },
        _Init:function () {
            var self = this;
            this.$ele1.click(function () {
                self.DialogHide();
            });
            this.$ele3.click(function () {
                self.DialogHide();
            });
        }
    };

    window.lingquan = lingquan;
    /*实例化： new lingquan('.Dialog-share-cover','.Dialog-share');*/


    /*
     *手机端弹窗提示
    */
    function DialogTip(DialogCover,DialogBox,n) {  /* n<=$item的length */
        this.$DialogCover = $(DialogCover);
        this.$DialogBox = $(DialogBox);
        this.$item = $(DialogBox).find(".box-item");
        this.$close = $(DialogBox).find(".closes");
        this.$wait = $(DialogBox).find(".go-wait");
        this._Init(n);
    }
    DialogTip.prototype={
        DialogTipShow:function (n) {
            this.$DialogCover.fadeIn(500);
            this.$DialogBox.fadeIn(500);
            this.$item.fadeIn(500);
            this.$item.eq(n).fadeIn(300).siblings().not(".closes").hide();
        },
        DialogTipHide:function () {
            this.$DialogCover.fadeOut(20);
            this.$DialogBox.fadeOut(20);
            this.$item.fadeOut(20);
        },
        _Init:function (n) {
            var self = this;
            self.DialogTipShow(n);
            this.$close.click(function () {
                self.DialogTipHide();
            });
            this.$wait.click(function () {
                self.DialogTipHide();
            });
        }
    };
    window.DialogTip = DialogTip;
   /*实例化 new DialogTip(".Dialogbg-tip",".Dialog-tip",1);  n<=$item的length */




    
   /*
    *分享提示弹窗
   */
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
   /*实例化： new ShareFriend('.Dialog-share-cover','.Dialog-share');*/




})();



