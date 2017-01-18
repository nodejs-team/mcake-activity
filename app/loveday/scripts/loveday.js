;(function(){

    //设计稿中的尺寸对应到当前页面的尺寸
    function pixelConvert(x){
        return window.lib.flexible.rem2px(x * 10 / 750)
    }

    var $win = $(window)
        ,winHeight = $win.height()
        ,winWidth = $win.width()
        ,movieClipEnd = false
        ,resLoaded = false
        ,sec1Height
        ,sec2Height
        ,scrollPercent = 0.3


    function initDomByScreenView(){
        var sec1MinHeight = pixelConvert(1300)
            ,sec2MinHeight = pixelConvert(1834);
        sec1Height = sec1MinHeight<winHeight ? winHeight : sec1MinHeight;
        sec2Height = sec2MinHeight<winHeight ? winHeight : sec2MinHeight;
        $('.sec1').css({
            height: sec1Height
        })
        $('.sec2').css({
            height: sec2Height,
            top: sec1Height
        })
    }

    function initScroll(){
        var sec1 = $('.sec1')
            ,sec2 = $('.sec2')
        $('#evt_content').height(sec1Height+sec2Height);
        scrollAnimate.on('scroll', function(slTop){
            sec1.css('transform', 'translate(0,'+slTop*(1-scrollPercent)+'px)')
        })
    }

    function initFlower(){
        $('#flower').show();
        var items = [
            {dom: $('.f1'), top:pixelConvert(140), left:pixelConvert(80)}
            ,{dom: $('.f2'), top:pixelConvert(87),  left:pixelConvert(546)}
            ,{dom: $('.f3'), top:pixelConvert(250), left:pixelConvert(506)}
            ,{dom: $('.f4'), top:pixelConvert(361), left:pixelConvert(38)}
            ,{dom: $('.f5'), top:pixelConvert(397), left:pixelConvert(178)}
            ,{dom: $('.f6'), top:pixelConvert(370), left:pixelConvert(674)}
            ,{dom: $('.f7'), top:pixelConvert(465), left:pixelConvert(715)}
            ,{dom: $('.f8'), top:pixelConvert(562), left:pixelConvert(16)}
            ,{dom: $('.f9'), top:pixelConvert(713), left:pixelConvert(364)}
            ,{dom: $('.f10'), top:pixelConvert(702), left:pixelConvert(643)}
            ,{dom: $('.f11'), top:pixelConvert(825), left:pixelConvert(-60)}
            ,{dom: $('.f12'), top:pixelConvert(881), left:pixelConvert(594)}
        ];
        items.forEach(function(item){
            item.density = Math.random() * 12;
            item.width = item.dom.width();
            item.height = item.dom.height();
        })
        function draw(){
            items.forEach(function(item){
                item.dom.css({
                    top: item.top,
                    left: item.left
                })
            })
            update();
            requestAnimationFrame(draw);
        }
        var angle = 0;
        function update(){
            angle += 0.01;
            items.forEach(function(item){
                item.top += 0.5*Math.cos(angle+item.density) + 2;
                item.left += Math.sin(angle);
                if(item.left > winWidth+item.width || item.left < -item.width){
                    if(Math.sin(angle)>0){
                        item.left = -item.width;
                    } else {
                        item.left = winWidth+5;
                    }
                }
                if(item.top > winHeight+item.height){
                    item.top = -item.height;
                }
            })
        }
        draw();
    }

    function hideLoadingComplete(){
        $('.rule').show();
        // $('.rtitle').on('click', function(){
        //     $('.rule').toggle();
        // })
        initScroll();
        scrollAnimate('#evt_wrap', [
            {dom: '.text1', x: 0, y: -300}
            ,{dom: '.text2', x: 0, y: -300}
            ,{dom: '.img1', x: 0, y: -300, delay:500}
            ,{dom: '.img2', x: 0, y: -300, delay:500}
            ,{dom: '.sec1 .area', x: 0, y: -300, delay: 1000}
            ,{dom: '.sec2 .area', x: 0, y: -300, delay: 1000}
        ])
    }

    function initPage(){
        $('#evt_wrap').show();
        initFlower();
    }

    function hideLoading(){
        if(movieClipEnd && resLoaded){
            initPage();
            $('#evt_loading .title').fadeOut();
            $('#evt_loading .spin').fadeOut();
            // $('#sidaiLeft').fadeOut();
            $('#sidaiLeft').fadeOut(function(){
                $('#evt_loading .bg-left').animate({
                    left: pixelConvert(-375)
                }, 500)
                $('#evt_loading .bg-right').animate({
                    right: pixelConvert(-375)
                }, 500, function(){
                    $('#evt_loading').hide();
                })
                setTimeout(hideLoadingComplete, 500)
            });
        }
    }

    function startMovieClip(img){
        var data = [
            {"x":0,"y":485,"w":235,"h":104,"offX":20,"offY":17,"sourceW":270,"sourceH":350, duration:5}
            ,{"x":238,"y":471,"w":235,"h":118,"offX":20,"offY":25,"sourceW":270,"sourceH":350, duration:1}
            ,{"x":0,"y":304,"w":236,"h":179,"offX":19,"offY":27,"sourceW":270,"sourceH":350, duration:2}
            ,{"x":243,"y":251,"w":235,"h":218,"offX":20,"offY":29,"sourceW":270,"sourceH":350}
            ,{"x":243,"y":0,"w":235,"h":249,"offX":20,"offY":29,"sourceW":270,"sourceH":350}
            ,{"x":0,"y":0,"w":241,"h":302,"offX":14,"offY":26,"sourceW":270,"sourceH":350, duration:3}
        ];
        // new MovieClip($('#sidaiLeft canvas').get(0), img, data).play(1);
        new MovieClip($('#sidaiLeft canvas').get(0), img, data).play(1).on('stop', function(){
            movieClipEnd = true;
            hideLoading();
        })
    }

    function fixImageSrc(container, res){
        container = container || document;
        var imgs = container.getElementsByTagName('img');
        for(var i=0,len=imgs.length; i<len; i++){
            var img = imgs[i];
            var dataSrc = img.getAttribute('src-fix');
            var data = res[dataSrc];
            if(dataSrc && data){
                img.setAttribute('src', data.url);
            }
        }
    }

    function startLoading(){
        var loader = new Loader('images/');
        loader.addGroup('pre', preData);
        loader.addGroup('res', resData);
        var $spin = $('#evt_loading .spin');
        loader.on('progress', function(groupName, ix, len){
            if(groupName=='res'){
                $spin.html(parseInt(ix/len*100) + '%');
            }
        });
        loader.on('complete', function(groupName){
            if(groupName=='pre'){
                fixImageSrc(document.getElementById('evt_loading'), loader.getAll())
                $('#evt_loading').show();
                loader.loadGroup('res');
                startMovieClip(loader.get('sidai_png').data)
            } else {
                fixImageSrc(document.getElementById('evt_content'), loader.getAll())
                fixImageSrc(document.getElementById('flower'), loader.getAll())
                resLoaded = true;
                hideLoading();
            }
        })
        loader.loadGroup('pre')
    }

    initDomByScreenView();
    startLoading();
})()