;(function(){
    function initScroll(){
        var scrollItems = [
            {$dom: $('.p1-hand'), x:300, y:-300, delay:500}
            ,{$dom: $('.p1-title'), x:300, y:300, delay:1500}
            ,{$dom: $('.p1-cheese'), x:-300, y:300, delay:1000}
            ,{$dom: $('.p1-small'), x:300, y:300, delay:2000}
            ,{$dom: $('.p3-cat-con'), x:300, y:300}
            ,{$dom: $('.p3-cheese'), x:-300, y:300}
            ,{$dom: $('.p3-cream'), x:300, y:300}
        ];
        scrollItems.forEach(function(item){
            item.top = item.$dom.offset().top;
            item.isShow = false;
            $.Velocity.hook(item.$dom, 'opacity', 0);
            $.Velocity.hook(item.$dom, 'translateX', item.x+'px');
            $.Velocity.hook(item.$dom, 'translateY', item.y+'px');
        })
        scrollAnimate('#wapWrap', scrollItems)
    }

    function initMovieClip(res){
        new MovieClip(document.getElementById('cata'), res['cata_png'].data, {
            "frameRate":10,
            "frames":[
                {"x":434,"y":1611,"w":420,"h":402,"offX":0,"offY":404,"sourceW":432,"sourceH":812, duration:3},
                {"x":0,"y":0,"w":420,"h":804,"offX":0,"offY":0,"sourceW":432,"sourceH":812},
                {"x":0,"y":806,"w":419,"h":803,"offX":0,"offY":0,"sourceW":432,"sourceH":812},
                {"x":421,"y":806,"w":419,"h":803,"offX":0,"offY":0,"sourceW":432,"sourceH":812},
                {"x":422,"y":0,"w":420,"h":581,"offX":0,"offY":209,"sourceW":432,"sourceH":812},
                {"x":842,"y":583,"w":424,"h":474,"offX":0,"offY":319,"sourceW":432,"sourceH":812},
                {"x":0,"y":1611,"w":432,"h":433,"offX":0,"offY":379,"sourceW":432,"sourceH":812},
                {"x":844,"y":0,"w":432,"h":446,"offX":0,"offY":366,"sourceW":432,"sourceH":812}
            ]}, {repeatCount:1}).play();
        new MovieClip(document.getElementById('catb'), res['catb_png'].data, {
            "frameRate":10,
            "frames":[
                {"x":0,"y":441,"w":426,"h":439,"offX":11,"offY":7,"sourceW":444,"sourceH":446, duration:10},
                {"x":428,"y":0,"w":423,"h":439,"offX":11,"offY":7,"sourceW":444,"sourceH":446},
                {"x":0,"y":441,"w":426,"h":439,"offX":11,"offY":7,"sourceW":444,"sourceH":446, duration:10},
                {"x":0,"y":0,"w":426,"h":439,"offX":11,"offY":7,"sourceW":444,"sourceH":446, duration:20}
            ]}).play();
        new MovieClip(document.getElementById('catc'), res['catc_png'].data, {
            "frameRate":10,
            "frames":[
                {"x":0,"y":292,"w":270,"h":288,"offX":5,"offY":7,"sourceW":286,"sourceH":298, duration:10},
                {"x":0,"y":0,"w":272,"h":290,"offX":5,"offY":5,"sourceW":286,"sourceH":298, duration:20}
            ]}).play();
        new MovieClip(document.getElementById('catd'), res['catd_png'].data, {
            "frameRate":10,
            "frames":[
                {"x":1349,"y":857,"w":531,"h":425,"offX":156,"offY":21,"sourceW":750,"sourceH":494, duration:2},
                {"x":0,"y":461,"w":687,"h":427,"offX":0,"offY":19,"sourceW":750,"sourceH":494},
                {"x":1364,"y":0,"w":661,"h":428,"offX":39,"offY":36,"sourceW":750,"sourceH":494},
                {"x":689,"y":461,"w":658,"h":425,"offX":29,"offY":21,"sourceW":750,"sourceH":494},
                {"x":1364,"y":430,"w":665,"h":425,"offX":22,"offY":21,"sourceW":750,"sourceH":494},
                {"x":682,"y":0,"w":680,"h":459,"offX":7,"offY":21,"sourceW":750,"sourceH":494},
                {"x":0,"y":0,"w":680,"h":459,"offX":7,"offY":21,"sourceW":750,"sourceH":494, duration:15}
            ]}).play();
        new MovieClip(document.getElementById('cate'), res['cate_png'].data, {
            "frameRate":10,
            "frames":[
                {"x":129,"y":0,"w":127,"h":232,"offX":3,"offY":6,"sourceW":141,"sourceH":249, duration:5},
                {"x":0,"y":238,"w":127,"h":232,"offX":3,"offY":6,"sourceW":141,"sourceH":249},
                {"x":129,"y":234,"w":127,"h":229,"offX":3,"offY":6,"sourceW":141,"sourceH":249},
                {"x":0,"y":0,"w":127,"h":236,"offX":3,"offY":6,"sourceW":141,"sourceH":249, duration:3},
                {"x":258,"y":0,"w":127,"h":229,"offX":3,"offY":6,"sourceW":141,"sourceH":249, duration:2},
                {"x":129,"y":0,"w":127,"h":232,"offX":3,"offY":6,"sourceW":141,"sourceH":249, duration:15}
            ]}).play();
    }

    function initNumBtn(){
        var $input = $('.btn-num');
        $input.each(function(ix, input){
            var $el = $(this);
            var min = $el.attr('data-min') || 0;
            var max = $el.attr('data-max') || 10;
            var $minu = $el.siblings('.btn-minus');
            var $plus = $el.siblings('.btn-plus');
            $el.on('input', function(){
                var val = parseInt(this.value);
                if(!val){
                    this.value = min;
                } else if(val>max){
                    this.value = max;
                } else {
                    this.value = val;
                }
            });
            $minu.on('click', function(){
                var val = parseInt($el.val());
                if(val>min){
                    $el.val(--val);
                }
            });
            $plus.on('click', function(){
                var val = parseInt($el.val());
                if(val<max){
                    $el.val(++val);
                }
            })
        })
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

    //解决微信长按不能识别二维码
    function initQRCode(qrcode) {
        var $img = $(qrcode.data);
        $img.css({
            position:'absolute',
            width:'4.29rem',
            top:'17.96rem',
            left:'2.75rem',
            'z-index':'999',
            opacity:0
        })
        $('.wrap').append($img);
    }

    function startLoading(){
        var loader = new Loader('images/'), domLoad = document.getElementById('loading');
        domLoad.style.display = 'block';
        loader.addGroup('preload', resData);
        loader.on('progress', function(groupName, ix, len){
            domLoad.innerHTML = parseInt(ix/len*100) + '%';
        })
        loader.on('complete', function(groupName){
            fixImageSrc(loader.getAll());
            domLoad.parentNode.removeChild(domLoad);
            document.getElementById('wapWrap').style.display = 'block';
            initMovieClip(loader.getAll());
            initScroll();
            initNumBtn();
            initQRCode(loader.get('p2-code_png'));
        });
        loader.loadGroup('preload');
    }
    startLoading();
})();