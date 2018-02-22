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
    function startLoading(){
        var loader = new Loader('images/'), domLoad = document.getElementById('evt_loading');
        loader.addGroup('preload', resData);
        loader.on('progress', function(groupName, ix, len){
            domLoad.innerHTML = parseInt(ix/len*100) + '%';
        })
        loader.on('complete', function(groupName){
            // $('#evt_container').append('<a class="evt_float" href="javascript:;"><img src="http://edm.mcake.com/weifengwang/common/no.jpg" alt="" src-fix="float_png"></a>')
            fixImageSrc(loader.getAll());
            domLoad.style.display = 'none';
            document.getElementById('evt_container').style.display = 'block';
            scrollAnimate('#evt_container');
            // correctPNG($('#evt_container').get(0));
        });
        loader.loadGroup('preload');
    }
    startLoading();
})()