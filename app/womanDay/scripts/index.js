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
      {dom: '.sec2-p1', x:-400, y:-200}
      ,{dom: '.sec2-p1-text', x:200, y:0, delay: 600}
      ,{dom: '.sec2-p2', x:200, y:200, delay: 1200}
      ,{dom: '.sec2-p2-text', x:-200, y:0, delay: 500}
      ,{dom: '.sec2-p3', x:0, y:200}
      ,{dom: '.sec2-p3-text', x:0, y:-200}
      ,{dom: '.sec-weight-select', x:0, y:-200, delay: 1000}
      ,{dom: '.sec2-price', x:0, y:200, delay: 1000}
    ])
  }

  function Wselect(dom) {
    this.dom = $(dom);
    this.wbox = this.dom.find(">span");
    this.wtext = this.wbox.find(">span em");
    this.dropDown = this.dom.find(">ul");
    this.isShown = false;
    this.value = "";
    this.price = "";
    this.pubSub = new PubSub();
    var defaultValue = this.dom.attr("data-defaultValue");
    var defaultPrice = this.dom.attr("data-defaultPrice");
    if( defaultValue != null || defaultValue != undefined ){
        this.setValue(defaultValue);
    }
    if( defaultPrice != null || defaultPrice != undefined ){
      this.setPrice(defaultPrice);
    }
    this.setItemHighlight();
    this.bindEvents();
  }

  Wselect.prototype =  {
    show: function () {
        this.isShown = true;
        this.dropDown.show();
    },
    hide: function () {
        this.isShown = false;
        this.dropDown.hide();
    },
    setValue: function (value) {
        this.value = value;
        this.wtext.text(value);
    },
    setPrice: function (price) {
      this.price = price;
    },
    getValue: function () {
      return this.value;
    },
    getPrice: function () {
      return this.price;
    },
    change: function (handler) {
      this.pubSub.on("change", handler);
    },
    setItemHighlight: function () {
      this.dropDown.find(">li").each(function (i, domItem) {
         var item = $(domItem);
         if( item.attr("data-value") == this.value ){
             item.addClass("selected");
             return false;
         }
      }.bind(this));
    },
    bindEvents: function () {
        var self = this;
      this.wbox.on("click", function (e) {
        e.stopPropagation();
        if( this.isShown ){
            this.hide();
        } else {
            this.show();
        }
      }.bind(this));

      this.dropDown.on("click", "li", function (e) {
        var $this = $(this);
        var value = $this.attr("data-value");
        if( value != self.value ) {
          self.setValue(value);
          self.setPrice($this.attr("data-price"));
          $this.addClass("selected").siblings().removeClass("selected");
          self.pubSub.trigger("change", self.getValue(), self.getPrice());
        }
      });

      $(document).on("click", function () {
        this.hide();
      }.bind(this));

      setTimeout(function(){
        self.pubSub.trigger("change", self.getValue(), self.getPrice());
      });
    }
  };

  $.fn.wselect = function (method) {
      var params = [].slice.call(arguments, 1);
      var chain;
      var context = this.each(function (i, dom) {
        var instance = $.data(dom, "modal.wselect");
        if( !instance ){
            $.data(dom, "modal.wselect", instance = new Wselect(dom));
        }
        if( method ) {
          chain = instance[method].apply(instance, params);
        }
    });

      return chain !== undefined ? chain : context;
  };

  var loader;

  function initApp() {
    var Jprice = $("#J_w_price");
    var JpriceImg = $("#J_price_img");
    var assets = loader.getAll();
    $(".w-select-wrap").wselect("change", function (value, price) {
      price = Number(price);
      Jprice.text(price);
      JpriceImg.attr("src", assets["price-"+ (price + 48) +"_png"].url);
    });
  }

    function startLoading(){
        var domLoad = document.getElementById('evt_loading');
        loader = new Loader('images/');
        domLoad.style.display = 'block';
        loader.addGroup('preload', resData);
        loader.on('progress', function(groupName, ix, len){
            domLoad.innerHTML = parseInt(ix/len*100) + '%';
        });
        loader.on('complete', function(groupName){
            fixImageSrc(loader.getAll());
            domLoad.style.display = 'none';
            document.getElementById('evt_content').style.display = 'block';
            initScroll();
            initApp();
        });
        loader.loadGroup('preload');
    }
    startLoading();
})();