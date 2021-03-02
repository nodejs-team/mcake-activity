(function () {
    function sliding(callback, duration){
        /*妯℃嫙setTimeout*/
        var starttime = Date.now();
        function animate(timestamp){
            var runtime = timestamp - starttime;
            if(runtime<duration){
                requestAnimationFrame(function(){
                    animate(Date.now())
                })
            } else {
                callback();
            }
        }
        requestAnimationFrame(function(){
            animate(Date.now());
        })
    }

    function initSnow(){
        /*http://thecodeplayer.com/walkthrough/html5-canvas-snow-effect*/
        var W = window.innerWidth;
        var H = window.innerHeight;
        var canvas = document.getElementById('snow');
        canvas.width = W;
        canvas.height = H;
        var ctx = canvas.getContext("2d");

        var mp = 30;
        var particles = [];
        for(var i = 0; i < mp; i++){
            particles.push({
                x: Math.random()*W,
                y: Math.random()*H,
                r: Math.random()*4+1,
                d: Math.random()*mp
            })
        }
        function draw()
        {
            ctx.clearRect(0, 0, W, H);
            ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
            ctx.beginPath();
            for(var i = 0; i < mp; i++){
                var p = particles[i];
                ctx.moveTo(p.x, p.y);
                ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
            }
            ctx.fill();
            update();
            /* requestAnimationFrame(draw);*/
            sliding(draw, 10);
        }
        var angle = 0;
        function update()
        {
            angle += 0.01;
            for(var i = 0; i < mp; i++)
            {
                var p = particles[i];

                p.y += 0.5*Math.cos(angle+p.d) + 0.5 + p.r/2;
                p.x += Math.sin(angle);

                if(p.x > W+5 || p.x < -5 || p.y > H)
                {
                    if(i%3 > 0) /*66.67% of the flakes*/
                    {
                        particles[i] = {x: Math.random()*W, y: -10, r: p.r, d: p.d};
                    }
                    else
                    {

                        if(Math.sin(angle) > 0)
                        {

                            particles[i] = {x: -5, y: Math.random()*H, r: p.r, d: p.d};
                        }
                        else
                        {

                            particles[i] = {x: W+5, y: Math.random()*H, r: p.r, d: p.d};
                        }
                    }
                }
            }
        }

        /*animation loop
        setInterval(draw, 20);*/
        draw();
    }


    initSnow();
})();