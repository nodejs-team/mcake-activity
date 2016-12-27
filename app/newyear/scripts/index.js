;(function(){
    function supportCSS3(style){
        var htmlStyle = document.documentElement.style
        if(style in htmlStyle){
            return true;
        }
        return false
    }
    function initScroll(){
        window.scrollAnimate('#evt_container', [
            {dom: '.p1', x:50, y:-50}
            ,{dom: '.p2_img', x:-300, y:300}
            ,{dom: '.p2', x:300, y:0}
            ,{dom: '.p2_photo', x:300, y:300}
            ,{dom: '.p2_fork', x:-300, y:300}
            ,{dom: '.p3', x:0, y:0}
            ,{dom: '.p3_fork', x:-300, y:0}
            ,{dom: '.p3_img', x:300, y:300}
            ,{dom: '.p4_img', x:-300, y:-100}
            ,{dom: '.p4', x:300, y:0}
            ,{dom: '.p4_fork', x:0, y:0}
            ,{dom: '.p5_img', x:300, y:300}
            ,{dom: '.p5_fork', x:-100, y:300}
            ,{dom: '.p5', x:-100, y:300}
            ,{dom: '.p5_photo', x:300, y:200}
        ])
    }
    function initMask(){
        if(supportCSS3('-webkit-mask-image')){

        } else {
            $('.top_text .slideMask').hide();
            $('.top_text .slideText').show();
        }
    }
    function fixImageSrc(res){
        var imgs = document.getElementsByTagName('img');
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
        var loader = new Loader('images/'), domLoad = document.getElementById('evt_loading');
        domLoad.style.display = 'block';
        loader.addGroup('preload', resData);
        loader.on('progress', function(groupName, ix, len){
            domLoad.innerHTML = parseInt(ix/len*100) + '%';
        })
        loader.on('complete', function(groupName){
            fixImageSrc(loader.getAll());
            domLoad.style.display = 'none';
            document.getElementById('evt_content').style.display = 'block';
            initMask();
            initScroll();
        });
        loader.loadGroup('preload');
    }
    startLoading();
})()