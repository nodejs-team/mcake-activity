(function(){

    $(function(){
        var player = videojs('topic_player',{}, function() {
            var self = this;
            var _isPlay = false;

           /* this.play(); 加载播放*/
            this.on('ended', function() {});

            $("#vjs-ctrl").on("click", function(){
                alert(_isPlay)
                _isPlay = !_isPlay;
                if( _isPlay ){
                    self.play();
                    $(this).addClass('video-pause');
                } else {
                    self.pause();
                    $(this).removeClass('video-pause');
                }
            });
        });





    });

})();