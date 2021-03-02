/**  wap端做动画
 new MovieClip(canvasID, imgObject, clipArray).play();
 */

/**
 * Example
 var imgClip = new Image();
 new MovieClip('candle', imgClip, [
    {"x":0,"y":0,"w":245,"h":128,"offX":0,"offY":0,"sourceW":245,"sourceH":128, duration:2},
    {"x":0,"y":130,"w":245,"h":128,"offX":0,"offY":0,"sourceW":245,"sourceH":128, duration:2},
    {"x":0,"y":260,"w":245,"h":128,"offX":0,"offY":0,"sourceW":245,"sourceH":128, duration:2},
    {"x":247,"y":130,"w":245,"h":128,"offX":0,"offY":0,"sourceW":245,"sourceH":128, duration:2},
    {"x":247,"y":0,"w":245,"h":128,"offX":0,"offY":0,"sourceW":245,"sourceH":128, duration:2}
 ]).play();
 */

/**
 * Example2
 var imgArray = [new Image(),new Image(),new Image()]
 new MovieClip('candle', null, [
    {img: imgArray[0], duration:2},
    {img: imgArray[1], duration:2},
    {img: imgArray[2], duration:2}
 ]).play();
 */

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
        this.frames = frames;
        this.frameRate = opts.frameRate || 10;
        this.img = img;
        this.repeatCount = opts.repeatCount || 0;
        this.stopFrame = opts.stopFrame || 0;   //代表最后停留帧,first代表第一帧,last代表最后一帧;
        this.currentCount = 0;
        this.currentFrame = 0;
        this.ticker = new Ticker(this.frameRate);
        if(this.img){
            this.drawImage = this.drawBySprite;
        } else {
            this.drawImage = this.drawByImage;
        }
        PubSub.call(this);
    }
    MovieClip.prototype = Object.create(PubSub.prototype);
    MovieClip.prototype.constructor = MovieClip;
    var proto = MovieClip.prototype;
    proto.play = function(repeatCount){
        if(repeatCount){
            this.repeatCount = repeatCount;
        }
        this.ticker.start();
        return this;
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
        this.trigger('stop');
    }
    proto.setFrame = function(num){
        if(num>this.frames.length-1) num = 0;
        if(num<0) num = this.frames.length-1;
        this.drawImage(this.frames[num]);
        this.currentFrame = num;
    }
    proto.drawBySprite = function(frame){
        this.ctx.clearRect(0,0,this.width, this.height);
        this.ctx.drawImage(this.img, frame.x, frame.y, frame.w, frame.h, frame.offX || 0, frame.offY || 0, frame.w, frame.h);
    }
    proto.drawByImage = function(frame){
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
    var TempMovieClip = MovieClip;

    var CanvasMovieClip = function(canvas, img, frames, options){
        TempMovieClip.apply(this, arguments);
        this.ctx = canvas.getContext('2d');
        this.width = parseInt(canvas.width);
        this.height = parseInt(canvas.height);
        this.setFrame(this.currentFrame);
        this.initEvent();
    }
    CanvasMovieClip.prototype = Object.create(TempMovieClip.prototype);
    CanvasMovieClip.prototype.constructor = CanvasMovieClip;

    var DivMovieClip = function(container, img, frames, options){
        TempMovieClip.apply(this, arguments);
        this.el = document.createElement('div');
        container.appendChild(this.el);
        if(img){
            this.el.style.backgroundImage = 'url('+img.src+')';
        }
        this.setFrame(this.currentFrame);
        this.initEvent();
    }
    DivMovieClip.prototype = Object.create(TempMovieClip.prototype);
    DivMovieClip.prototype.constructor = DivMovieClip;
    var proto = DivMovieClip.prototype;
    proto.drawBySprite = function(frame){
        Object.assign(this.el.style, {
            width: frame.w+'px',
            height: frame.h+'px',
            backgroundPosition: '-'+frame.x+'px -'+frame.y+'px',
            margin: frame.offY+'px 0 0 '+frame.offX+'px'
        })
    }
    proto.drawByImage = function(frame){
        Object.assign(this.el.style, {
            width: frame.w+'px',
            height: frame.h+'px',
            backgroundImage: frame.img.src,
            margin: frame.offY+'px 0 0 '+frame.offX+'px'
        })
    }



    MovieClip = function(canvas, img, frames, options){
        canvas = typeof canvas === 'string' ? document.getElementById(canvas) : canvas;
        if(canvas.tagName.toLowerCase() === 'canvas'){
            return new CanvasMovieClip(canvas, img, frames, options);
        } else {
            return new DivMovieClip(canvas, img, frames, options);
        }
    }
    MovieClip.CanvasMovieClip = CanvasMovieClip;
    MovieClip.DivMovieClip = DivMovieClip;
    global.MovieClip = MovieClip;

})(window, window.MovieClip)