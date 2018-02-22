/**
 * Created by mcake on 2017/6/1.
 */

(function(window){
  "use strict";

  function getWindowWidth(){
    return window.innerWidth || document.documentElement.clientWidth;
  }

  var Page = Element.extend({
    initialize: function () {
      Page.superclass.initialize.apply(this, arguments);
      this.addChild(new Scene1({
        className: "swiper-slide scene scene1"
      }));
      this.addChild(new Scene2({
        className: "swiper-slide scene scene2"
      }));
      this.addChild(new Scene3({
        className: "swiper-slide scene scene3"
      }));
      this.addChild(new Scene4({
        className: "swiper-slide scene scene4"
      }));
      this.addChild(new Scene5({
        className: "swiper-slide scene scene5"
      }));
      this.addChild(new Scene6({
        className: "swiper-slide scene scene6"
      }));
      this.addChild(new Scene7({
        className: "swiper-slide scene scene7"
      }));
      this.addChild(new Scene8({
        className: "swiper-slide scene scene8"
      }));
      this.addChild(new Scene9({
        className: "swiper-slide scene scene9"
      }));

      this.on("addToPage", function () {
        this.initEvents();
      }, this);
    },

    initEvents: function () {
      var self = this;
      var $el = $(this.el);

      $el.on("click", function(e){
        var itemW = getWindowWidth()/2;
        var pageX = e.pageX;
        if( pageX > 0 && pageX <= itemW ){
          self.emit("leftClick");
        }
        else if( pageX > itemW ){
          self.emit("rightClick");
        }
      });
    }
  });

  window.Page = Page;

})(window);