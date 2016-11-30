;(function(){
    function Ticker(frameRate){
        this.lastTime = 0;
        this.frameDuration = 1000 / frameRate;
        this.timer = null;
        PubSub.call(this);
    }
    Ticker.prototype = Object.create(PubSub.prototype);
    Ticker.prototype.constructor = Ticker;
    Ticker.prototype.start = function(){
        var self = this;
        this.lastTime = Date.now();
        this.timer = requestAnimationFrame(function(){
            var now = Date.now();
            self.timer = requestAnimationFrame(arguments.callee);
            if(now-self.lastTime>=self.frameDuration) {self.trigger('tick'); self.lastTime = now;}
        })
    }
    Ticker.prototype.stop = function(){
        cancelAnimationFrame(this.timer);
    }
    function MovieClip(el, img, frameData, options){
        this.el = typeof el == 'string' ? document.getElementById(el) : el;
    }
    var proto = MovieClip.prototype;
    proto.play = function(){}
    proto.pause = function(){}
    proto.next = function(){}
    proto.prev = function(){}
    proto.stop = function(){}
    proto.setFrame = function(num){}
    proto.initEvent = function(){}
})()