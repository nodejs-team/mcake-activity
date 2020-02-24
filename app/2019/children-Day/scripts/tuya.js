/**
 * Created by wty  on 2017/9/15.
 * QQ:759743719
 */
(function (w,$) {
      function tuya(opt) {
          this.configs=Object.assign({
              canvas:"mycanvas",
              color:["#4e4e4e","#839b3c","#f4da3c","#a3252a","#547aaa","#ae1180"],
              colorBox:"#colorBox",
              raduis:"#raduis",
              prev:"prev",
              reset:"reset",
              finish:"finish",
              Base64ck:function (data) {}
          },opt);
          this.canvas=document.getElementById(this.configs.canvas);
          this.colorBox=$(this.configs.colorBox);
          this.raduis=$(this.configs.raduis);
          this.prev=document.getElementById(this.configs.prev);
          this.resetBtn=document.getElementById(this.configs.reset);
          this.finish=document.getElementById(this.configs.finish);
          this.ctx=this.canvas.getContext("2d");
          this.drawDataArr=[];
          this.lineWidth=3;
          this.lineColor= this.configs.color[0];
          this.drawStep=0;
          this.init();
      }
    tuya.prototype={
          init:function () {
              this.canvas.width=$("#board-img").width()-34;
              this.canvas.height=$("#board-img").height()-34;
              this.ctx.fillStyle = "#fff8e6";
              this.ctx.fillRect (0, 0, this.canvas.width, this.canvas.height);
              this.firstDraw=this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height)
              this.drawDataArr.push(this.firstDraw);
              this.createListener();
          },
        createListener:function () {
              var self=this;
            this.canvas.addEventListener('touchstart', function(e){
                var p = self.getTouchPos(e);
                self.ctx.beginPath();
                self.ctx.moveTo(p.x, p.y);
            })
            this.canvas.addEventListener('touchmove', function (e) {
                e.preventDefault();
                window.requestAnimationFrame(function () {
                    var p = self.getTouchPos(e);
                    self.freeLine(p);
                });
            })
            this.canvas.addEventListener("touchend",function (e) {
                self.drawDataArr.push(self.ctx.getImageData(0, 0, self.canvas.width, self.canvas.height));
                self.drawStep += 1;

            })
            this.prev.addEventListener("touchstart",function () {
                if(self.drawStep>0){
                    self.reDo(--self.drawStep);
                    self.drawDataArr.pop();
                   /* console.log(self.drawStep)
                    console.log(self.drawDataArr)*/
                }
            });
            this.resetBtn.addEventListener("touchstart",function () {
                  self.reset();
                  self.drawDataArr=[];
                  self.drawDataArr.push(self.firstDraw);
                  self.drawStep=0;
            })
            this.finish.addEventListener("touchstart",function () {
                var imgdata = self.canvas.toDataURL(this.imgType);
                return self.configs.Base64ck(imgdata);
            });
            $(this.configs.raduis).find(".item").click(function () {
                var index=$(this).index();
                $(this).addClass("active").siblings().removeClass("active");
                switch(index)
                {
                    case 0:
                        self.lineWidth = 5;
                        break;
                    case 1:
                        self.lineWidth = 3;
                        break;
                    case 2:
                        self.lineWidth = 1;
                        break;
                }
            })
            $(this.configs.colorBox).find(".item").click(function () {
                var index=$(this).index();
                $(this).addClass("active").siblings().removeClass("active");
                self.lineColor = self.configs.color[index];
            })


        },
        getTouchPos: function(e){ // 获得触摸点的相对位置
            var rect = e.target.getBoundingClientRect();
            var p = { // 相对坐标
                x: e.touches[0].clientX - rect.left,
                y: e.touches[0].clientY - rect.top
            };
            return p;
        },
        freeLine:function (pos) {
            this.ctx.lineWidth = this.lineWidth;
            this.ctx.strokeStyle=this.lineColor;
            this.ctx.lineTo(pos.x, pos.y);
            this.ctx.stroke();
        },
        reDo:function (index) {
            this.reset();
            this.ctx.putImageData(this.drawDataArr[index],  0,  0)
        },
        reset: function(){ // 重置 canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // 先清空
        },
      }
      window.tuya=tuya;
})(window,Zepto)