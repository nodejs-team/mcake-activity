var userAgent = navigator.userAgent;
var isWeixin = userAgent.match(/MicroMessenger/) ? true : false;

//获得http url参数
var getQueryString = function (name) {
    if (name && name != '') {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURIComponent(r[2]);
        return null;
    } //end if
    else return null;
} //end func


if (isWeixin && getQueryString("type") == "weimeiti") {
    // 配置监控 tar.init，需在 wx.config 之前完成 
    // 监测方提供授权，不需要开发方提供微信用户信息 
    tar.init({
        tar_debug: false, //选填，debug 模式：值为 true 开启、 false 为关闭，默认开启。    
        tar_token: " b583b0a128793e39bfec0997b211c759",// 必填，监测系统分配给此次监测活动的 token    
        tar_tid: "136817", // 必填，监测系统分配给此次监测活动的 id    
        tar_scope: "snsapi_base", // 默认隐性授权，如需显性授权，改为 snsapi_userinfo 
        tar_appid: "wxe512506924dfd7b6", // 监测方提供 
    });
    // 如果需要获取 openid 或判断监测授权是否完成，调用以下方法
    tar.ready(function (tar_oid) {
        //授权并上报访问数据完成  
        //tar_oid 是监测授权拿到的 openid 
        console.log("监测授权拿到的openid为： " + tar_oid);
    })

    var hrefs = window.location.href.split('?');
    var link1 = hrefs[0].substr(0, hrefs[0].lastIndexOf('/') + 1);
    var link2 = link1;
    if (ibase.getQueryString("type") == "weimeiti"){
		link2 = link1+"?type=weimeiti";
    }
    console.log("分享链接："+link2);
    console.log("分享图片："+link1 + 'resource/share.jpg');
    wx.ready(function () {
        var shareData64 = {
            title: "至IN中国风，竟然来自紫禁城", //必填,分享标题    
            desc: "快来一探究竟，你不知道的中国风", //选填,分享描述    
            imgUrl: link1 + 'resource/share.jpg', //选填,分享图链接    
            link: link2, //必填,支持直接填写 location.href    
            success: function () {
                // 用户确认分享后执行的回调函数    
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数    
            }
        };
        wx.onMenuShareAppMessage(tar.shapeShareAppMessage(shareData64));
        wx.onMenuShareTimeline(tar.shapeShareTimeline(shareData64));
    });
}