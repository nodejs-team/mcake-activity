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
        var loader = new Loader('images/');
        var domLoad = document.getElementById('evt_loading');
        domLoad.style.display = 'block';
        loader.addGroup('preload', resData);
        loader.on('progress', function(groupName, ix, len){
            domLoad.innerHTML = parseInt(ix/len*100) + '%';
        });
        loader.on('complete', function(groupName){
            fixImageSrc(loader.getAll());
            domLoad.style.display = 'none';
            document.getElementById('evt_content').style.display = 'block';
            loadComplete();
        });
        loader.loadGroup('preload');
    }
    startLoading();

    var loadComplete = function () {


        $(".cakes.prolist dd:not('.onlyOne')").each(function () {
            var self = this;
            $(this).find('.m-btn').click(function () {
                $(".go-car").hide(0).siblings().show(0);
                SelectShow(self,[0,0,0,0],0.85,true,1,0);
            });
        });

        $(".cakes.prolist dd.onlyOne").each(function () {
            var self = this;
            $(this).find('.m-btn').click(function () {
                $(".go-car").hide(0).siblings().show(0);
                SelectShow(self,[0,0,0,0],0.85,true,0,0);
            });
        });



        $(".go-buy,.s-closes").click(function () {
            SelectHide();
        });

     /*   $(".floater").fadeIn(100);*/

    }





})();