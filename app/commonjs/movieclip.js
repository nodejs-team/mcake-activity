;(function(global, PubSub){
    if(typeof PubSub==='undefined') return alert('MovieClip依赖pubsub模块'),null;

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
        this.timer = requestAnimationFrame(function tick(){
            var now = Date.now();
            self.timer = requestAnimationFrame(tick);
            if(now-self.lastTime>=self.frameDuration) {self.trigger('tick'); self.lastTime = now;}
        })
    }
    Ticker.prototype.stop = function(){
        cancelAnimationFrame(this.timer);
    }
    function MovieClip(canvas, img, frames, options){
        var opts = options || {};
        canvas = typeof canvas === 'string' ? document.getElementById(canvas) : canvas;
        this.ctx = canvas.getContext('2d');
        this.width = parseInt(canvas.width);
        this.height = parseInt(canvas.height);
        this.frames = frames;
        this.frameRate = opts.frameRate || 10;
        this.img = img;
        this.repeatCount = opts.repeatCount || 0;
        this.stopFrame = opts.stopFrame || 0;   //代表最后停留帧,first代表第一帧,last代表最后一帧;
        this.currentCount = 0;
        this.currentFrame = 0;
        this.ticker = new Ticker(this.frameRate);
        if(this.img){
            this.drawImage = this.drawImageBySprite;
        } else {
            this.drawImage = this.drawImageByImage;
        }
        this.setFrame(this.currentFrame);
        this.initEvent();
    }
    var proto = MovieClip.prototype;
    proto.play = function(repeatCount){
        this.repeatCount = repeatCount;
        this.ticker.start();
    }
    proto.pause = function(){
        this.ticker.stop();
    }
    proto.next = function(){
        this.setFrame(this.currentFrame+1);
    }
    proto.prev = function(){
        this.setFrame(this.currentFrame-1);
    }
    proto.stop = function(){
        this.ticker.stop();
        this.setFrame(this.stopFrame==='first' ? 0 : this.frames.length-1);
        this.currentCount = 0;
    }
    proto.setFrame = function(num){
        if(num>this.frames.length-1) num = 0;
        if(num<0) num = this.frames.length-1;
        this.drawImage(this.frames[num]);
        this.currentFrame = num;
    }
    proto.drawImageBySprite = function(frame){
        this.ctx.clearRect(0,0,this.width, this.height);
        this.ctx.drawImage(this.img, frame.x, frame.y, frame.w, frame.h, frame.offX || 0, frame.offY || 0, frame.w, frame.h);
    }
    proto.drawImageByImage = function(frame){
        this.ctx.clearRect(0,0,this.width, this.height);
        this.ctx.drawImage(frame.img, frame.offX || 0, frame.offY || 0);
    }
    proto.initEvent = function(){
        var self = this, tickCount = null;
        this.ticker.on('tick', function(){
            var dur = self.frames[self.currentFrame].duration;
            if(typeof tickCount === 'number'){
                tickCount--;
            } else if(!dur || dur<=1){
                tickCount = 0;
            } else {
                tickCount = dur - 1;
            }
            if(tickCount===0){
                tickCount = null;
                self.next();
                if(self.currentFrame==0){
                    self.currentCount++;
                }
                if(self.repeatCount!= 0 && self.currentCount==self.repeatCount){
                    self.stop();
                }
            }
        })
    }
    global.MovieClip = MovieClip;

})(window, window.PubSub)



;(function(global, MovieClip){
    var CanvasMovieClip = MovieClip;
    var DivMovieClip = function(canvas, img, frames, options){
        CanvasMovieClip.apply(this, arguments);
    }
    DivMovieClip.prototype = CanvasMovieClip.prototype;
    DivMovieClip.constructor = DivMovieClip;
    var proto = DivMovieClip.prototype;



    MovieClip = function(canvas, img, frames, options){
        canvas = typeof canvas === 'string' ? document.getElementById(canvas) : canvas;
        if(canvas.tagName === 'canvas'){
            return new CanvasMovieClip(canvas, img, frames, options);
        } else {
            return new DivMovieClip(canvas, img, frames, options);
        }
    }
    MovieClip.CanvasMovieClip = CanvasMovieClip;
    MovieClip.DivMovieClip = DivMovieClip;
    global.MovieClip = MovieClip;

})(window, window.MovieClip)