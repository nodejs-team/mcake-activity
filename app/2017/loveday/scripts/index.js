;(function(){
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
    function initScroll(){
        window.scrollAnimate('#evt_container', [
            {dom: '.img1', x:-200, y:0}
            ,{dom: '.text1', x:200, y:-200}
            ,{dom: '.area1', x:200, y:200}
            ,{dom: '.img2', x:200, y:0}
            ,{dom: '.text2', x:-200, y:200}
            ,{dom: '.img3', x:-200, y:0}
            ,{dom: '.text3', x:200, y:200}
        ])
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
            initScroll();
        });
        loader.loadGroup('preload');
    }
    startLoading();
})()