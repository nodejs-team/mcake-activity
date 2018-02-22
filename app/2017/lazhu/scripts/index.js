/**
 * Created by shimily on 2017/10/12.
 */

+!(function () {
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

    function formatResData(objConfig) {
        if( !( typeof objConfig === 'object') ) return [];
        if( objConfig instanceof Array) return objConfig;
        var frames = [];
        for( var i in objConfig ){
            objConfig[i].key = i;
            frames.push(objConfig[i]);
        }
        return frames.sort(function (a, b) {
            return parseInt(a.key.replace(/^[^\d]+/, "")) - parseInt(b.key.replace(/^[^\d]+/, ""));
        });
    }


    var loader;

    function startLoading(){
        loader = new Loader('images/');
        //var domLoad = document.getElementById('evt_loading');

        loader.addGroup('preload', resData);

        loader.on('complete', function(groupName){
            fixImageSrc(loader.getAll());

            loadComplete();
        });
        loader.loadGroup('preload');
    }
    startLoading();


    var loadComplete = function () {


    };



})(window);
