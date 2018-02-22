;(function(){

    function getEl(id){
        return document.querySelector(id);
    }

    var loader;

    function startLoading(){
      var spin = getEl('#scene_spin');
      var progress = getEl("#scene_progress");
      var ptext = getEl(".progress-text");
      var pline = getEl(".progress-line");
      var startLoadTime = +new Date;

        loader = new Loader('images/');
        loader.addGroup('preload', resData);
        loader.on('progress', function(groupName, loaded, total){
          spin.innerHTML = Math.floor(loaded/total*100) + "";
          progress.style.transform = "translate3d("+ ((loaded/total*100)-100) +"%,0,0)";
          progress.style.transitionDuration = ".2s";
        });
        loader.on('complete', function(groupName){
          var timeout = 1000;
          var loadTime = +new Date - startLoadTime;
          if( loadTime < 300 ){
            progress.style.transitionDuration = "1s";
            timeout = 1500;
          }
          setTimeout(function(){
            pline.style.transform = "translate3d(100%,0,0)";
            ptext.style.transform = "translate3d(100%,0,0)";
            spin.style.transform = "translate3d(100%,0,0)";

            setTimeout(function(){
              getEl('#scene_loading').style.display = "none";
              getEl('#root').style.display = 'block';
              loadComplete();
            }, 400);
          }, timeout);
        });
        loader.loadGroup('preload');
    }
    startLoading();

    
    var loadComplete = function () {
      var container = new Element({
        className: "swiper-container"
      });

      var page = new Page({
        className: "swiper-wrapper"
      });

      var swiper;

      page.on("addToPage", function () {
        swiper = new Swiper(container.el, {
          speed: 1200,
          parallax: true
        });

      });

      page.on("leftClick", function(){
        swiper.slidePrev();
      });

      page.on("rightClick", function(){
        swiper.slideNext();
      });

      container.addChild(page).renderTo(document.getElementById("root"));
    }

    window.loader = loader;

})();