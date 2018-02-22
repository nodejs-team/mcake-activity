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


        new Slider('.slideOuter',{
            prev: '.prev',
            next: '.next',
            autoplay: true
        });

    })();