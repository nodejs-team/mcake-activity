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
        var loader = new Loader('images/'), domSpin = document.getElementById('evt_spin'), domLoad = document.getElementById('evt_loading');
        loader.addGroup('preload', resData);
        loader.on('progress', function(groupName, ix, len){
            domSpin.innerHTML = parseInt(ix/len*100) + '%';
        })
        loader.on('complete', function(groupName){
            fixImageSrc(loader.getAll());
            domLoad.style.display = 'none';
            document.getElementById('evt_container').style.display = 'block';
           correctPNG($('#evt_container').get(0));
            loadComplete();

        });
        loader.loadGroup('preload');
    }
    startLoading();

    function loadComplete() {
        var swiper1 = new Swiper('.swiper1', {
            grabCursor: true,
            slidesPerView:3,
            slidesPerGroup : 3,
            autoplay : 3000,
            loop:true,
            paginationClickable: true
        });
        
        $(".swiper-cake").hover(function () {
            swiper1.stopAutoplay();
        },function () {
            swiper1.startAutoplay();
        });

        $('.arrow-left').on('click', function(e){
            e.preventDefault()
            swiper1.swipePrev()
        })
        $('.arrow-right').on('click', function(e){
            e.preventDefault()
            swiper1.swipeNext()
        })

        initNum();
    }
    
    
    function initNum() {


        $(".swiper-container  .pro-li").each(function () {
            var self = $(this);
            var ponds = $(this).attr('data-pond');
            var ids = $(this).attr('data-postID');
            var pondsInit= 0;
            var idsInit= 0;
            pondsInit = ponds.split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")});
            idsInit = ids.split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")})



            /*初始化*/
            $(this).find(".num").html(pondsInit[0]);
            $(this).find(".postID").val(idsInit[0]);

            var num = 0;
            var len = pondsInit.length;
            //var currentItem = items[0];
            /*数量减少*/
            $(this).find('.num-minus').click(function () {
                --num;
                if(num <= 0){
                    num=0;
                   // ix = currentItem.ix = currentItem.ponds.length-1;
                }
                self.find(".num").html(pondsInit[num]);
                self.find(".postID").val(idsInit[num]);

            });

            /*数量增加*/

            $(this).find('.num-add').click(function () {
                ++num;
                if(num >= len){
                    num = len-1;
                }
                self.find(".num").html(pondsInit[num]);
                self.find(".postID").val(idsInit[num]);

            });



        });
    }


})()