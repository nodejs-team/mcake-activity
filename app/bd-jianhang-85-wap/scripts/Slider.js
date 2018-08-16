;(function(){

        function Slider(container, opts){
            this.$outer = $(container);

            this.$inner = this.$outer.children();
            this.$prev = $(opts.prev);
            this.$next = $(opts.next);
            this.$els = this.$inner.children();
            this.total = this.$els.length;
            this.w = this.$els.outerWidth(true);
            this.timer = null;
            this.isSliding = false;
            this.autoplay = opts.autoplay || false;
            this.slideEnd = opts.slideEnd || function(ix){};
            this.init();
        }
        var proto = Slider.prototype;
        proto.init = function(){
            var self = this;
            var $last = this.$els.eq(this.total-1);
            if(this.total<6){
                $last = this.$els.clone().appendTo(this.$inner).eq(this.total-1);
                this.total *= 2;
            }

            this.$outer.find("ul").width(this.$els.width()*(this.total+1));
            $last.prependTo(this.$inner);

            this.$inner.css('marginLeft', -this.w);

            this.$prev.on('click', function(){
                self.prev();
            })
            this.$next.on('click', function(){
                self.next();
            })
            this.$outer.on('mouseenter', function(){
                clearTimeout(self.timer);
            })
            this.$outer.on('mouseleave', function(){
                self.auto();
            })
            this.auto();
        }
        proto.prev = function(){
            if(this.isSliding) return;
            this.isSliding = true;
            var self = this;
            this.$inner.animate({
                marginLeft: 0
            }, 500, function(){
                self.$inner.children().eq(self.total-1).prependTo(self.$inner);
                self.$inner.css('marginLeft', -self.w);
                self.isSliding = false;
            })
        }
        proto.next = function(){

            if(this.isSliding) return;
            this.isSliding = true;
            var self = this;
            this.$inner.animate({
                marginLeft: -this.w*2
            }, 500, function(){
                self.$inner.children().eq(0).appendTo(self.$inner);
                self.$inner.css('marginLeft', -self.w);
                self.isSliding = false;
            })
        }
        proto.auto = function(){
            if(!this.autoplay) return;
            var self = this;
            function delay(){
                self.timer = setTimeout(function(){
                    self.next();
                    delay();
                }, 5000)
            }
            delay();
        }





     /*价格计算*/
    function refreshNumber(ix){}
    function initNum2() {
        var dis=0.85;
        var items = [];
        $(".products li").each(function(i,el){
            var ponds = $(el).attr('data-pond');
            var ids = $(el).attr('data-price');
            var postId = $(el).attr('data-postid');

            var $nowPrice = $(this).find('.now-price'),
                $oldPrice = $(this).find('.old-price');

            if(ponds){
                items.push({
                    ponds: ponds.split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")}),
                    ix: 0,
                    ids: ids.split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")}),
                    postId: postId.split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")})
                })
            }

            var index = i;
            var currentItem = items[index];

            /*
             *蛋糕磅数加
             */
            $(this).find(".plus").on('click', function(){
                var ix = ++currentItem.ix;
                if(ix>=currentItem.ponds.length-1){
                    ix =currentItem.ix = currentItem.ponds.length-1;
                }

                $(this).parents("li").find("input").val(currentItem.ponds[ix]);
                $(this).parents("li").find(".postid").data("postid", currentItem.postId[ix]);
                $nowPrice.text((currentItem.ids[ix]*dis).toFixed(1));
                $oldPrice.text(currentItem.ids[ix]);
            });
            /*
             *蛋糕磅数减少
             */
            $(this).find(".minus").on('click', function(){
                var ix = --currentItem.ix;
                if(ix<=0){
                    ix=currentItem.ix = 0;
                }

                $(this).parents("li").find("input").val(currentItem.ponds[ix]);
                $(this).parents("li").find(".postid").data("postid", currentItem.postId[ix]);
                $nowPrice.text((currentItem.ids[ix]*dis).toFixed(1));
                $oldPrice.text(currentItem.ids[ix]);
            });


            return function(ix){
                currentItem = items[ix];

                /*$input.val(currentItem.ponds[currentItem.ix]).attr('data-postID', currentItem.ids[currentItem.ix]);

                $nowPrice.text((currentItem.price[currentItem.ix]*dis).toFixed(1));
                $oldPrice.text(currentItem.price[currentItem.ix]);*/

            }


        });
    };



        new Slider('.slideOuter1',{
            prev: '.prev1',
            next: '.next1',
            autoplay: true
        });



    refreshNumber = initNum2();

        new Slider('.slideOuter2',{
            prev: '.prev2',
            next: '.next2',
            autoplay: true,
            slideEnd: function(ix){
                refreshNumber(ix);
            }
        });

    })();