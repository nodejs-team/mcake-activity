/**
 * Created by mcake on 2017/6/1.
 */

(function(window){
  "use strict";
  
  function ImgElement(src, attrs) {
    if( typeof src === "string" ){
      return '<img src="'+ loader.get(src).url +'" width="'+ (attrs ? Math.round(attrs.width/750*100) + "%" : "auto") +'"/>';
    } else {
      return '';
    }
  }

  window.ImgElement = ImgElement;
})(window);