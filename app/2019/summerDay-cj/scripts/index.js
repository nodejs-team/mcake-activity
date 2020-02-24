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

        new Price('.js_price1',{
            add:'.add',
            reduce:'.reduce'
        },[0,0,0,0],0.9);

        $(".floater").fadeIn(100);

    }





})();




!(function () {
    var $zpaward = $(".zhuanpan-award"),
        $award = $(".award");


    function choujiang(data) {  /* n<=$item的length */
        this.$DialogCover = $(data.DialogCover);
        this.$DialogBox = $(data.DialogBox);
        this.$item = $(data.DialogBox).find(".box-item");
        this.$close = $(data.DialogBox).find(".closes");
        this.$wait = $(data.DialogBox).find(".go-wait");
        this._Init(data.n,data.arr);
    }
    choujiang.prototype={
        DialogTipShow:function (n,arr) {
            $award.find("span").text(arr[n].price);
          /*  $award.find("b").text(arr[n].price);*/
            $award.find(".text").html(arr[n].name);
            $zpaward.find(".award-1").show(0); /*实物赠品*/

           /* if(n==10){
                $zpaward.find(".award-1").hide(0); /!*实物赠品*!/
                $zpaward.find(".award-2").show(0); /!*蛋糕券*!/
            }
            else{
                $zpaward.find(".award-1").show(0); /!*实物赠品*!/
                $zpaward.find(".award-2").hide(0)
            }*/
            this.$DialogCover.delay(1000).fadeIn(500);
            this.$DialogBox.delay(1000).fadeIn(500);
            $zpaward.delay(1000).fadeIn(300);



        },
        DialogTipHide:function () {
            this.$DialogCover.fadeOut(20);
            this.$DialogBox.fadeOut(20);
        },
        _Init:function (n,arr) {
            var self = this;
            self.DialogTipShow(n,arr);
            this.$close.click(function () {
                self.DialogTipHide();
            });
            this.$wait.click(function () {
                self.DialogTipHide();
            });
        }
    };
    window.choujiang = choujiang;
})();





