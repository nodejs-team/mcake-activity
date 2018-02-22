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

    function px2rem(d) {
        var val = parseFloat(d) * 10 / 750;
        if (typeof d === 'string' && d.match(/px$/)) {
          val += 'rem';
        }
        return val;
    }

    function rem2px(d) {
        var val = parseFloat(d) * 750 / 10;
        if (typeof d === 'string' && d.match(/rem$/)) {
          val += 'px';
        }
        return val;
    }

    $(function () {
      var swiper = new Swiper('.swiper-container', {
        pagination: '.pagination',
        loop: true
      });
    });
})();