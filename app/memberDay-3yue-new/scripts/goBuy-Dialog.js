/*弹窗购买蛋糕*/
;(function () {

    var $DialogBg = $(".Dialogbg-Select");
    var $Dialog = $(".Dialog-Select");
    var $close = $Dialog.find(".s-closes");
    var $bangshu = $Dialog.find(".s-bangshu");

    /*
     * disArr: 满减
     * defaultPond：1  默认显示第2磅
     * dis：1 几折优惠
     * isShowNum：true 是否显示加减按钮
     * double：false  是否享受第二件半价
     * */

    function goBuy(els, opts, disArr, defaultPond, dis, isShowNum, double) {
        this.$els = $(els);
        this.$add = $(opts.add);
        this.$reduce = $(opts.reduce);
        this.disArr = disArr || [];
        /*磅数立减*/
        this.defaultPond = defaultPond || 1;
        /*默认显示第几磅*/
        this.dis = dis || 1;
        /*折扣*/
        this.isShowNum = isShowNum || true;
        /*是否显示加减按钮*/
        this.double = double || false;
        /*折扣*/

        this._init();
    }

    goBuy.prototype = {
        strArr: [],
        num: 1,
        max: 50,
        oldPrice: 0,
        totalPrice: 0,
        newPrice: 0,
        ponds: [],
        price: [],
        postid: [],
        discount: 0,
        nameArr: [],
        attrArr: [],
        /*磅数选择*/
        bsSelect:function (ele) {
            var self = this;

            ele.hover(function () {
                ele.addClass('hover').siblings().removeClass('hover');
            },function () {
                ele.removeClass('hover');
            });
            ele.click(function () {
                ele.addClass('cur').siblings().removeClass('cur');
                self.bsCounts($(this));
            });
        },
        /*磅数选择结算*/
        bsCounts:function (ele) {
            var self = this;
            self.price = ele.data('price');

            self.num = ele.parents(".price").find('.num').text()-0;


            self.totalPrice = (self.price * self.num).toFixed(2);
            self.discount = self.disFun(self.totalPrice); /*计算折扣*/
            self.newPrice = ((self.totalPrice - self.discount) * self.dis).toFixed(2);

            ele.parents(".price").find('.old-price').html(self.totalPrice);
            ele.parents(".price").find('.now-price').html(self.newPrice);
        },
        /*初始化默认值*/
        bsInit:function (ele) {
            var self = this;
            /*****************获取所有data属性值**********************************************/
            var eleCur = ele;
            var nameArr = [];
            var attrArr = [];
            eleCur.each(function (i) {
                var thisele = $(this);
                $.each(this.attributes, function () {
                    if (this.specified) {
                        var attrs = thisele.attr(this.name);
                        if (this.name == 'class') {
                            return;
                        } else {
                            self.strArr[this.name] = attrs;
                            nameArr.push(this.name);
                            attrArr.push(attrs);
                        }
                    }
                });

            });

            this.ponds = self.strArr['data-pond'].split(',').map(function (str) {
                return str.replace(/(^\s*)|(\s*$)/g, "")
            });
            this.price = self.strArr['data-price'].split(',').map(function (str) {
                return str.replace(/(^\s*)|(\s*$)/g, "")
            });

            ele.find('.price_p li').each(function (i) {
                for (var j = 0; j < nameArr.length; j++) {
                    $(this).attr(nameArr[j], attrArr[j].split(',')[i]);
                    $(this).find("span").html(self.ponds[i]);
                }
            });


            var price = ele.find('.price_p li.cur').data('price').toFixed(2);

            self.discount = self.disFun(price); /*计算折扣*/
            var newPrice = ((price - self.discount) * self.dis).toFixed(2);
            ele.find('.old-price').html(price);
            ele.find('.now-price').html(newPrice);

        },
        add: function (ele) {
            var self = this;
            self.num = ele.parents(".num-box").find('.num').text() - 0;

            if (self.num < self.max) {
                self.num++;
            }
            ele.siblings('.num').text(self.num);
            self.counts(self.oldPrice, self.num);

        },
        reduce: function (ele) {
            var self = this;
            self.num = ele.parents(".num-box").find('.num').text() - 0;
            if (self.num > 1) {
                self.num--;
            }
            ele.siblings('.num').text(self.num);
            self.counts(self.oldPrice, self.num);
        },
        /*弹窗磅数选择*/
        selectPond: function (ele) {
            var self = this;
            var nameArr = [];
            var attrArr = [];
            $bangshu.find("li").each(function (i) {
                for (var j = 0; j < self.attrArr.length; j++) {
                    self.setAttr($(this), j, i);
                }

                $(this).click(function () {
                    self.oldPrice = $(this).attr("data-price");
                    $(this).each(function () {
                        var thisele = $(this);

                        $.each(this.attributes, function () {
                            if (this.specified) {
                                var attrs = thisele.attr(this.name);
                                if (this.name == 'class') {
                                    return;
                                } else {

                                    nameArr.push(this.name);
                                    attrArr.push(attrs);

                                }
                            }
                        });

                    });
                    for (var j = 0; j < nameArr.length; j++) {
                        $Dialog.find('.go-buy,.go-car').attr(nameArr[j], attrArr[j].split(',')[0]);
                    }

                    self.counts(self.oldPrice, self.num);
                    $(this).addClass("on").siblings().removeClass("on");
                });
            });

        },
        /*挂载所有的data属性值*/
        setAttr: function (ele, j, i) {
            var self = this;
            /*给按钮设置属性值**/
            ele.attr(self.nameArr[j], self.attrArr[j].split(',')[i]);
        },
        /*立减计算*/
        disFun: function (totalPrice) {
            if (totalPrice >= 198 && totalPrice < 298) {
                this.discount = this.disArr[0];
            } else if (totalPrice >= 298 && totalPrice < 428) {
                this.discount = this.disArr[1];
            } else if (totalPrice >= 428 && totalPrice < 728) {
                this.discount = this.disArr[2];
            } else if (totalPrice >= 728) {
                this.discount = this.disArr[3];
            } else {
                this.discount = 0;
            }

            return this.discount;
        },

        counts: function (price, num) {
            var self = this;
            $Dialog.find('.go-buy,.go-car').attr("data-num", num);

            self.totalPrice = (price * num).toFixed(2);

            this.discount = this.disFun(self.totalPrice);


            if (self.double) { /*第二件半价*/
                var ix = parseInt(self.num / 2);
                /*向下取整*/
                self.newPrice = self.totalPrice - self.oldPrice / 2 * ix;
            } else {
                self.newPrice = ((self.totalPrice - self.discount) * self.dis).toFixed(2);
            }


            if (self.newPrice == self.totalPrice) {  /*不享受任何优惠*/
                $Dialog.find(".old-p").fadeOut(0);
            } else {
                $Dialog.find(".old-p").fadeIn(0);
            }

            $Dialog.find(".s-old-price").html(self.totalPrice);
            $Dialog.find(".s-new-price").html(self.newPrice);

        },
        /*循环磅数*/
        pondEach: function (ponds) {
            var len = ponds.length;
            var self = this;
            for (var i = 0; i < len; i++) {
                var str = '';
                if (ponds.length == 1) { /*只有1个磅数*/
                    str = '<li class="on">' + ponds[i] + '</li>';
                }
                else if (i == this.defaultPond) {
                    str = '<li class="on">' + ponds[i] + '</li>';
                } else {
                    str += '<li>' + ponds[i] + '</li>';
                }
                $bangshu.find("ul").append(str);
            }
        },
        showDialog: function () {
            $DialogBg.fadeIn();
            $Dialog.fadeIn();
            this.pondEach(this.ponds);
            this.selectPond();

        },
        close: function () {
            var self = this;
            self.num = 1;
            $DialogBg.fadeOut(100);
            $Dialog.fadeOut(100, function () {
                $bangshu.find("ul").empty();
                $(this).find(".num").html(self.num);
            });

        },
        /*初始化弹窗里的默认值*/
        initialize: function (ele) {
            /*初始化数据*/
            var self = this;
            /*是否显示价格加减*/
            if (!self.isShowNum) {
                $Dialog.find(".s-num").fadeOut(0);
            }


            /*循环所有的attribute*/
            var eleCur = ele;
            var nameArr = [];
            var attrArr = [];
            eleCur.each(function (i) {
                var thisele = $(this);
                $.each(this.attributes, function () {
                    if (this.specified) {
                        var attrs = thisele.attr(this.name);
                        if (this.name == 'class') {
                            return;
                        } else {
                            self.strArr[this.name] = attrs;
                            nameArr.push(this.name);
                            attrArr.push(attrs);
                        }
                    }
                });

            });

            this.nameArr = nameArr;
            this.attrArr = attrArr;

            this.ponds = self.strArr['data-pond'].split(',').map(function (str) {
                return str.replace(/(^\s*)|(\s*$)/g, "")
            });
            this.price = self.strArr['data-price'].split(',').map(function (str) {
                return str.replace(/(^\s*)|(\s*$)/g, "")
            });


            for (var j = 0; j < nameArr.length; j++) {
                if (attrArr[j].split(',').length == 1) {
                    $Dialog.find('.go-buy,.go-car').attr(nameArr[j], attrArr[j].split(',')[0]);
                    this.oldPrice = this.price[0];
                    /*初始化时候的价格*/
                    self.counts(this.price[0], self.num);
                } else {
                    $Dialog.find('.go-buy,.go-car').attr(nameArr[j], attrArr[j].split(',')[this.defaultPond]);
                    this.oldPrice = this.price[this.defaultPond];
                    self.counts(this.price[this.defaultPond], self.num);
                }
            }


            self.showDialog();

        },
        _init: function () {
            /*事件*/
            var self = this;

            this.$els.each(function () {
                self.bsInit($(this));
            });

            this.$els.find('.price_p li').each(function () {
                self.bsSelect($(this));
            });

            /*点击弹窗出现*/
            self.$els.find(".js_price").click(function () {
               // self.initialize($(this).parent());
            });

            this.$add.click(function () {
                self.add($(this));
            });
            this.$reduce.click(function () {
                self.reduce($(this));
            });

            $close.click(function () {
                self.close();
            });
            $DialogBg.click(function () {
                self.close();
            });

            $Dialog.find(".go-car,.go-buy").click(function () {
                self.close();
            });

        }
    }


    new goBuy('.js_proItem', {
        add: '.plus',
        reduce: '.minus'
    }, [20, 40, 60, 80], 1, 1, true, false);

    /* new goBuy('.js_proItem',{
     add:'.plus',
     reduce:'.minus'
     },[20,40,60,0]);*/

    /* new goBuy('.js_proItem2',{
     add:'.plus',
     reduce:'.minus'
     },true,0,[20,40,60,80],0.8,0);*/

})();


