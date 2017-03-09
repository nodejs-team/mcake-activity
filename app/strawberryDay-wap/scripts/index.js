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
    var loader;
    function startLoading(){
        var  domLoad = document.getElementById('evt_loading');
        loader = new Loader('images/');
        domLoad.style.display = 'block';
        loader.addGroup('preload', resData);
        loader.on('progress', function(groupName, ix, len){
            domLoad.innerHTML = parseInt(ix/len*100) + '%';
        })
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
        animtion.caomei_a();
        animtion.caomei_b();
        animtion.caomei_c();
        animtion.monster_b();
        animtion.monster_c();
        animtion.monster_d();
        animtion.monster_e();
    }

    var animtion = {
        caomei_a:function () {
            //图片配置
            var mcConfig = [
                "caomei_a_00018":{"x":2145,"y":1013,"w":427,"h":503,"offX":37,"offY":23,"sourceW":476,"sourceH":526,"duration":1},
            "caomei_a_00019":{"x":0,"y":1514,"w":427,"h":502,"offX":37,"offY":24,"sourceW":476,"sourceH":526,"duration":1},
            "caomei_a_00020":{"x":858,"y":1014,"w":427,"h":502,"offX":37,"offY":24,"sourceW":476,"sourceH":526,"duration":1},
            "caomei_a_00021":{"x":3003,"y":1517,"w":427,"h":501,"offX":37,"offY":25,"sourceW":476,"sourceH":526,"duration":1},
            "caomei_a_00022":{"x":2574,"y":1517,"w":427,"h":501,"offX":37,"offY":25,"sourceW":476,"sourceH":526,"duration":1},
            "caomei_a_00023":{"x":2145,"y":1518,"w":427,"h":500,"offX":37,"offY":26,"sourceW":476,"sourceH":526,"duration":1},
            "caomei_a_00024":{"x":1716,"y":1518,"w":427,"h":500,"offX":37,"offY":26,"sourceW":476,"sourceH":526,"duration":1},
            "caomei_a_00025":{"x":0,"y":0,"w":433,"h":500,"offX":31,"offY":26,"sourceW":476,"sourceH":526,"duration":1},
            "caomei_a_00026":{"x":2145,"y":2020,"w":427,"h":500,"offX":37,"offY":26,"sourceW":476,"sourceH":526,"duration":1},
            "caomei_a_00027":{"x":1716,"y":2020,"w":427,"h":500,"offX":37,"offY":26,"sourceW":476,"sourceH":526,"duration":1},
            "caomei_a_00028":{"x":858,"y":1518,"w":427,"h":501,"offX":37,"offY":25,"sourceW":476,"sourceH":526,"duration":1},
            "caomei_a_00029":{"x":3432,"y":1517,"w":427,"h":501,"offX":37,"offY":25,"sourceW":476,"sourceH":526,"duration":1},
            "caomei_a_00030":{"x":435,"y":0,"w":431,"h":502,"offX":33,"offY":24,"sourceW":476,"sourceH":526,"duration":1},
            "caomei_a_00031":{"x":2574,"y":1013,"w":427,"h":502,"offX":37,"offY":24,"sourceW":476,"sourceH":526,"duration":1},
            "caomei_a_00032":{"x":429,"y":1516,"w":427,"h":502,"offX":37,"offY":24,"sourceW":476,"sourceH":526,"duration":1},
            "caomei_a_00033":{"x":429,"y":1011,"w":427,"h":503,"offX":37,"offY":23,"sourceW":476,"sourceH":526,"duration":1},
            "caomei_a_00034":{"x":0,"y":1009,"w":427,"h":503,"offX":37,"offY":23,"sourceW":476,"sourceH":526,"duration":1},
            "caomei_a_00035":{"x":2574,"y":507,"w":427,"h":504,"offX":37,"offY":22,"sourceW":476,"sourceH":526,"duration":1},
            "caomei_a_00036":{"x":2145,"y":507,"w":427,"h":504,"offX":37,"offY":22,"sourceW":476,"sourceH":526,"duration":1},
            "caomei_a_00037":{"x":0,"y":502,"w":427,"h":505,"offX":37,"offY":21,"sourceW":476,"sourceH":526,"duration":1},
            "caomei_a_00038":{"x":3442,"y":0,"w":427,"h":505,"offX":37,"offY":21,"sourceW":476,"sourceH":526,"duration":1},
            "caomei_a_00039":{"x":3013,"y":0,"w":427,"h":505,"offX":37,"offY":21,"sourceW":476,"sourceH":526,"duration":1},
            "caomei_a_00040":{"x":2584,"y":0,"w":427,"h":505,"offX":37,"offY":21,"sourceW":476,"sourceH":526,"duration":1},
            "caomei_a_00041":{"x":2155,"y":0,"w":427,"h":505,"offX":37,"offY":21,"sourceW":476,"sourceH":526,"duration":1},
            "caomei_a_00042":{"x":1287,"y":507,"w":427,"h":504,"offX":37,"offY":22,"sourceW":476,"sourceH":526,"duration":1},
            "caomei_a_00043":{"x":3432,"y":507,"w":427,"h":504,"offX":37,"offY":22,"sourceW":476,"sourceH":526,"duration":1},
            "caomei_a_00044":{"x":1287,"y":1013,"w":427,"h":503,"offX":37,"offY":23,"sourceW":476,"sourceH":526,"duration":1},
            "caomei_a_00045":{"x":3432,"y":1013,"w":427,"h":502,"offX":37,"offY":24,"sourceW":476,"sourceH":526,"duration":1},
            "caomei_a_00046":{"x":3003,"y":1013,"w":427,"h":502,"offX":37,"offY":24,"sourceW":476,"sourceH":526,"duration":1},
            "caomei_a_00047":{"x":1287,"y":1518,"w":427,"h":501,"offX":37,"offY":25,"sourceW":476,"sourceH":526,"duration":1},
            "caomei_a_00048":{"x":2574,"y":2020,"w":427,"h":500,"offX":37,"offY":26,"sourceW":476,"sourceH":526,"duration":1},
            "caomei_a_00049":{"x":429,"y":2020,"w":427,"h":500,"offX":37,"offY":26,"sourceW":476,"sourceH":526,"duration":1},
            "caomei_a_00000":{"x":0,"y":2018,"w":427,"h":500,"offX":37,"offY":26,"sourceW":476,"sourceH":526,"duration":1},
            "caomei_a_00001":{"x":1287,"y":2021,"w":427,"h":490,"offX":37,"offY":25,"sourceW":476,"sourceH":526,"duration":1},
            "caomei_a_00002":{"x":0,"y":2520,"w":427,"h":487,"offX":37,"offY":25,"sourceW":476,"sourceH":526,"duration":1},
            "caomei_a_00003":{"x":3003,"y":2515,"w":427,"h":487,"offX":37,"offY":24,"sourceW":476,"sourceH":526,"duration":1},
            "caomei_a_00004":{"x":858,"y":2514,"w":427,"h":488,"offX":37,"offY":24,"sourceW":476,"sourceH":526,"duration":1},
            "caomei_a_00005":{"x":3432,"y":2512,"w":427,"h":490,"offX":37,"offY":23,"sourceW":476,"sourceH":526,"duration":1},
            "caomei_a_00006":{"x":1287,"y":2513,"w":427,"h":488,"offX":37,"offY":23,"sourceW":476,"sourceH":526,"duration":1},
            "caomei_a_00007":{"x":858,"y":2021,"w":427,"h":491,"offX":37,"offY":22,"sourceW":476,"sourceH":526,"duration":1},
            "caomei_a_00008":{"x":3432,"y":2020,"w":428,"h":490,"offX":36,"offY":22,"sourceW":476,"sourceH":526,"duration":1},
            "caomei_a_00009":{"x":3003,"y":2020,"w":427,"h":493,"offX":37,"offY":21,"sourceW":476,"sourceH":526,"duration":1},
            "caomei_a_00010":{"x":1726,"y":0,"w":427,"h":505,"offX":37,"offY":21,"sourceW":476,"sourceH":526,"duration":1},
            "caomei_a_00011":{"x":1297,"y":0,"w":427,"h":505,"offX":37,"offY":21,"sourceW":476,"sourceH":526,"duration":1},
            "caomei_a_00012":{"x":868,"y":0,"w":427,"h":505,"offX":37,"offY":21,"sourceW":476,"sourceH":526,"duration":1},
            "caomei_a_00013":{"x":858,"y":507,"w":427,"h":505,"offX":37,"offY":21,"sourceW":476,"sourceH":526,"duration":1},
            "caomei_a_00014":{"x":429,"y":504,"w":427,"h":505,"offX":37,"offY":21,"sourceW":476,"sourceH":526,"duration":1},
            "caomei_a_00015":{"x":1716,"y":507,"w":427,"h":504,"offX":37,"offY":22,"sourceW":476,"sourceH":526,"duration":1},
            "caomei_a_00016":{"x":3003,"y":507,"w":427,"h":504,"offX":37,"offY":22,"sourceW":476,"sourceH":526,"duration":1},
            "caomei_a_00017":{"x":1716,"y":1013,"w":427,"h":503,"offX":37,"offY":23,"sourceW":476,"sourceH":526,"duration":1}
            ];
            // MovieClip 可以通过duration控制两张图片轮播的速度。duration:0.2*10=2
            new MovieClip('caomei_a', loader.get('caomei_a_png').data, mcConfig).play();
        },
        caomei_b:function () {
            //图片配置
            var mcConfig = [
            {"x":759,"y":1051,"w":241,"h":346,"offX":53,"offY":61,"sourceW":332,"sourceH":455,"duration":1},
            {"x":515,"y":1029,"w":242,"h":350,"offX":47,"offY":58,"sourceW":332,"sourceH":455,"duration":1},
            {"x":0,"y":698,"w":243,"h":353,"offX":41,"offY":55,"sourceW":332,"sourceH":455,"duration":1},
            {"x":1799,"y":359,"w":244,"h":355,"offX":35,"offY":53,"sourceW":332,"sourceH":455,"duration":1},
            {"x":513,"y":0,"w":250,"h":358,"offX":29,"offY":50,"sourceW":332,"sourceH":455,"duration":1},
            {"x":0,"y":0,"w":253,"h":355,"offX":27,"offY":54,"sourceW":332,"sourceH":455,"duration":1},
            {"x":255,"y":0,"w":256,"h":350,"offX":24,"offY":59,"sourceW":332,"sourceH":455,"duration":1},
            {"x":765,"y":0,"w":258,"h":346,"offX":21,"offY":63,"sourceW":332,"sourceH":455,"duration":1},
            {"x":1284,"y":0,"w":260,"h":341,"offX":19,"offY":68,"sourceW":332,"sourceH":455,"duration":1},
            {"x":1535,"y":351,"w":262,"h":336,"offX":17,"offY":73,"sourceW":332,"sourceH":455,"duration":1},
            {"x":525,"y":688,"w":256,"h":339,"offX":22,"offY":70,"sourceW":332,"sourceH":455,"duration":1},
            {"x":783,"y":707,"w":250,"h":342,"offX":28,"offY":67,"sourceW":332,"sourceH":455,"duration":1},
            {"x":1002,"y":1051,"w":243,"h":343,"offX":35,"offY":66,"sourceW":332,"sourceH":455,"duration":1},
            {"x":1243,"y":1402,"w":241,"h":344,"offX":43,"offY":65,"sourceW":332,"sourceH":455,"duration":1},
            {"x":1486,"y":1742,"w":238,"h":342,"offX":51,"offY":66,"sourceW":332,"sourceH":455,"duration":1},
            {"x":1726,"y":1759,"w":234,"h":329,"offX":60,"offY":79,"sourceW":332,"sourceH":455,"duration":1},
            {"x":967,"y":2065,"w":234,"h":324,"offX":66,"offY":84,"sourceW":332,"sourceH":455,"duration":1},
            {"x":0,"y":1751,"w":239,"h":323,"offX":70,"offY":85,"sourceW":332,"sourceH":455,"duration":1},
            {"x":723,"y":1748,"w":242,"h":320,"offX":75,"offY":87,"sourceW":332,"sourceH":455,"duration":1},
            {"x":970,"y":1745,"w":244,"h":318,"offX":80,"offY":89,"sourceW":332,"sourceH":455,"duration":1},
            {"x":1216,"y":1748,"w":242,"h":320,"offX":74,"offY":87,"sourceW":332,"sourceH":455,"duration":1},
            {"x":525,"y":360,"w":238,"h":322,"offX":69,"offY":86,"sourceW":332,"sourceH":455,"duration":1},
            {"x":723,"y":2070,"w":233,"h":322,"offX":64,"offY":86,"sourceW":332,"sourceH":455,"duration":1},
            {"x":1035,"y":707,"w":236,"h":333,"offX":56,"offY":75,"sourceW":332,"sourceH":455,"duration":1},
            {"x":482,"y":1730,"w":239,"h":346,"offX":47,"offY":62,"sourceW":332,"sourceH":455,"duration":1},
            {"x":241,"y":1392,"w":239,"h":347,"offX":47,"offY":62,"sourceW":332,"sourceH":455,"duration":1},
            {"x":488,"y":1381,"w":239,"h":347,"offX":47,"offY":62,"sourceW":332,"sourceH":455,"duration":1},
            {"x":1763,"y":1062,"w":239,"h":347,"offX":47,"offY":62,"sourceW":332,"sourceH":455,"duration":1},
            {"x":1247,"y":1053,"w":239,"h":347,"offX":47,"offY":62,"sourceW":332,"sourceH":455,"duration":1},
            {"x":0,"y":1053,"w":239,"h":347,"offX":47,"offY":62,"sourceW":332,"sourceH":455,"duration":1},
            {"x":245,"y":1040,"w":241,"h":350,"offX":43,"offY":59,"sourceW":332,"sourceH":455,"duration":1},
            {"x":1273,"y":699,"w":243,"h":352,"offX":39,"offY":57,"sourceW":332,"sourceH":455,"duration":1},
            {"x":1535,"y":689,"w":243,"h":355,"offX":36,"offY":54,"sourceW":332,"sourceH":455,"duration":1},
            {"x":1801,"y":0,"w":243,"h":357,"offX":33,"offY":52,"sourceW":332,"sourceH":455,"duration":1},
            {"x":1025,"y":347,"w":246,"h":358,"offX":29,"offY":50,"sourceW":332,"sourceH":455,"duration":1},
            {"x":1284,"y":343,"w":249,"h":354,"offX":27,"offY":54,"sourceW":332,"sourceH":455,"duration":1},
            {"x":1546,"y":0,"w":253,"h":349,"offX":24,"offY":59,"sourceW":332,"sourceH":455,"duration":1},
            {"x":1025,"y":0,"w":257,"h":345,"offX":21,"offY":63,"sourceW":332,"sourceH":455,"duration":1},
            {"x":0,"y":357,"w":259,"h":339,"offX":19,"offY":68,"sourceW":332,"sourceH":455,"duration":1},
            {"x":261,"y":360,"w":262,"h":334,"offX":17,"offY":73,"sourceW":332,"sourceH":455,"duration":1},
            {"x":765,"y":348,"w":258,"h":338,"offX":21,"offY":69,"sourceW":332,"sourceH":455,"duration":1},
            {"x":261,"y":696,"w":252,"h":342,"offX":27,"offY":66,"sourceW":332,"sourceH":455,"duration":1},
            {"x":1780,"y":716,"w":247,"h":344,"offX":33,"offY":64,"sourceW":332,"sourceH":455,"duration":1},
            {"x":1518,"y":1046,"w":243,"h":345,"offX":39,"offY":63,"sourceW":332,"sourceH":455,"duration":1},
            {"x":1729,"y":1411,"w":239,"h":346,"offX":47,"offY":62,"sourceW":332,"sourceH":455,"duration":1},
            {"x":1002,"y":1396,"w":239,"h":347,"offX":47,"offY":62,"sourceW":332,"sourceH":455,"duration":1},
            {"x":1488,"y":1393,"w":239,"h":347,"offX":47,"offY":62,"sourceW":332,"sourceH":455,"duration":1},
            {"x":0,"y":1402,"w":239,"h":347,"offX":47,"offY":62,"sourceW":332,"sourceH":455,"duration":1},
            {"x":729,"y":1399,"w":239,"h":347,"offX":47,"offY":62,"sourceW":332,"sourceH":455,"duration":1},
            {"x":241,"y":1741,"w":239,"h":343,"offX":60,"offY":64,"sourceW":332,"sourceH":455,"duration":1}
            ];
            // MovieClip 可以通过duration控制两张图片轮播的速度。duration:0.2*10=2
            new MovieClip('caomei_b', loader.get('caomei_b_png').data, mcConfig).play();
        },
        caomei_c:function () {
            //图片配置
            var mcConfig = [
                "caomei_b_1":{"x":1063,"y":0,"w":517,"h":505,"offX":59,"offY":31,"sourceW":599,"sourceH":567,"duration":10},
            "caomei_b_2":{"x":0,"y":507,"w":490,"h":505,"offX":86,"offY":31,"sourceW":599,"sourceH":567,"duration":2},
            "caomei_b_3":{"x":0,"y":0,"w":542,"h":505,"offX":34,"offY":31,"sourceW":599,"sourceH":567,"duration":2},
            "caomei_b_4":{"x":492,"y":507,"w":490,"h":505,"offX":86,"offY":31,"sourceW":599,"sourceH":567,"duration":2},
            "caomei_b_5":{"x":544,"y":0,"w":517,"h":505,"offX":59,"offY":31,"sourceW":599,"sourceH":567,"duration":45}
            ];
            // MovieClip 可以通过duration控制两张图片轮播的速度。duration:0.2*10=2
            new MovieClip('caomei_c', loader.get('caomei_c_png').data, mcConfig).play();
        },
        monster_b:function () {
            //图片配置
            var mcConfig = [
                {"x":197,"y":118,"w":98,"h":115,"offX":3,"offY":29,"sourceW":112,"sourceH":145,"duration":5},
                {"x":99,"y":281,"w":96,"h":107,"offX":9,"offY":37,"sourceW":112,"sourceH":145,"duration":5},
                {"x":99,"y":143,"w":96,"h":136,"offX":9,"offY":8,"sourceW":112,"sourceH":145,"duration":3},
                {"x":398,"y":1,"w":97,"h":107,"offX":8,"offY":37,"sourceW":112,"sourceH":145,"duration":1},
                {"x":197,"y":1,"w":100,"h":115,"offX":11,"offY":29,"sourceW":112,"sourceH":145,"duration":5},
                {"x":299,"y":1,"w":97,"h":107,"offX":8,"offY":37,"sourceW":112,"sourceH":145,"duration":1},
                {"x":1,"y":144,"w":96,"h":141,"offX":9,"offY":3,"sourceW":112,"sourceH":145,"duration":0},
                {"x":99,"y":1,"w":96,"h":140,"offX":9,"offY":4,"sourceW":112,"sourceH":145,"duration":0},
                {"x":1,"y":1,"w":96,"h":141,"offX":9,"offY":3,"sourceW":112,"sourceH":145,"duration":0},
                {"x":1,"y":287,"w":96,"h":140,"offX":9,"offY":4,"sourceW":112,"sourceH":145,"duration":0},
                {"x":197,"y":235,"w":96,"h":107,"offX":9,"offY":37,"sourceW":112,"sourceH":145,"duration":1}
            ];
            // MovieClip 可以通过duration控制两张图片轮播的速度。duration:0.2*10=2
            new MovieClip('monster_b', loader.get('monster_b_png').data, mcConfig).play();
        }
        ,
        monster_c:function () {
            //图片配置
            var mcConfig = [
                {"x":516,"y":158,"w":154,"h":155,"offX":19,"offY":0,"sourceW":182,"sourceH":161,"duration":10},
                {"x":842,"y":1,"w":122,"h":150,"offX":19,"offY":5,"sourceW":182,"sourceH":161,"duration":0},
                {"x":494,"y":315,"w":146,"h":155,"offX":19,"offY":0,"sourceW":182,"sourceH":161,"duration":1},
                {"x":357,"y":158,"w":157,"h":155,"offX":19,"offY":0,"sourceW":182,"sourceH":161,"duration":10},
                {"x":179,"y":315,"w":157,"h":155,"offX":19,"offY":0,"sourceW":182,"sourceH":161,"duration":0},
                {"x":357,"y":1,"w":176,"h":155,"offX":0,"offY":0,"sourceW":182,"sourceH":161,"duration":1},
                {"x":179,"y":158,"w":176,"h":155,"offX":0,"offY":0,"sourceW":182,"sourceH":161,"duration":1},
                {"x":1,"y":315,"w":176,"h":155,"offX":0,"offY":0,"sourceW":182,"sourceH":161,"duration":1},
                {"x":179,"y":1,"w":176,"h":155,"offX":0,"offY":0,"sourceW":182,"sourceH":161,"duration":1},
                {"x":1,"y":158,"w":176,"h":155,"offX":0,"offY":0,"sourceW":182,"sourceH":161,"duration":1},
                {"x":1,"y":1,"w":176,"h":155,"offX":0,"offY":0,"sourceW":182,"sourceH":161,"duration":1},
                {"x":338,"y":315,"w":154,"h":155,"offX":19,"offY":0,"sourceW":182,"sourceH":161,"duration":0},
                {"x":535,"y":1,"w":154,"h":155,"offX":19,"offY":0,"sourceW":182,"sourceH":161,"duration":0},
                {"x":691,"y":1,"w":149,"h":153,"offX":19,"offY":2,"sourceW":182,"sourceH":161,"duration":2}
            ];
            // MovieClip 可以通过duration控制两张图片轮播的速度。duration:0.2*10=2
            new MovieClip('monster_c', loader.get('monster_c_png').data, mcConfig).play();
        }
        ,
        monster_d:function () {
            //图片配置
            var mcConfig = [
                {"x":1,"y":316,"w":86,"h":104,"offX":8,"offY":6,"sourceW":131,"sourceH":110,"duration":5},
                {"x":93,"y":103,"w":86,"h":104,"offX":22,"offY":6,"sourceW":131,"sourceH":110,"duration":4},
                {"x":1,"y":210,"w":86,"h":104,"offX":13,"offY":6,"sourceW":131,"sourceH":110,"duration":0},
                {"x":93,"y":1,"w":90,"h":100,"offX":34,"offY":9,"sourceW":131,"sourceH":110,"duration":5},
                {"x":89,"y":309,"w":90,"h":97,"offX":34,"offY":12,"sourceW":131,"sourceH":110,"duration":1},
                {"x":1,"y":1,"w":90,"h":105,"offX":34,"offY":4,"sourceW":131,"sourceH":110,"duration":0},
                {"x":1,"y":108,"w":90,"h":100,"offX":34,"offY":9,"sourceW":131,"sourceH":110,"duration":10},
                {"x":89,"y":210,"w":90,"h":97,"offX":16,"offY":12,"sourceW":131,"sourceH":110,"duration":0},
                {"x":185,"y":1,"w":5,"h":5,"offX":0,"offY":0,"sourceW":131,"sourceH":110,"duration":5}
            ];
            // MovieClip 可以通过duration控制两张图片轮播的速度。duration:0.2*10=2
            new MovieClip('monster_d', loader.get('monster_d_png').data, mcConfig).play();
        }
        ,
        monster_e:function () {
            //图片配置
            var mcConfig = [
                {"x":1,"y":1,"w":113,"h":82,"offX":5,"offY":0,"sourceW":122,"sourceH":85,"duration":6},
                {"x":116,"y":1,"w":114,"h":80,"offX":5,"offY":2,"sourceW":122,"sourceH":85,"duration":1},
                {"x":116,"y":164,"w":114,"h":76,"offX":5,"offY":6,"sourceW":122,"sourceH":85,"duration":1},
                {"x":116,"y":83,"w":114,"h":79,"offX":5,"offY":3,"sourceW":122,"sourceH":85,"duration":6},
                {"x":1,"y":85,"w":113,"h":80,"offX":5,"offY":2,"sourceW":122,"sourceH":85,"duration":1},
                {"x":1,"y":167,"w":113,"h":77,"offX":5,"offY":5,"sourceW":122,"sourceH":85,"duration":1}
            ];
            // MovieClip 可以通过duration控制两张图片轮播的速度。duration:0.2*10=2
            new MovieClip('monster_e', loader.get('monster_e_png').data, mcConfig).play();
        }
    }
})()