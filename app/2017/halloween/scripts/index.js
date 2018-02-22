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
    function loadLoading(){
        loader.on('complete', function(groupName){
            if(groupName == 'loading'){

            }
        })
        loader.loadGroup('loading');
    }
    var loader = new Loader('images/');
    loader.addGroup('loading', loadingData)
        .addGroup('preload', preloadData);
    loadLoading();
})()