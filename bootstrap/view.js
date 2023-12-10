/*框架自带公共函数。解密https://www.sojson.com/jscodeconfusion.html*/
"use strict";

// 框架依赖的其他js文件，注意这里是框架依赖的，最先载入的依赖文件。
const map_cache = new Map(); // 设置页面键-值对缓存
let lang_eq = 0; // 翻译的数组的下标
const view = {
    log: function (txt, info) { // 日志打印统一函数
        if (txt === 0 || txt === "0") {}else {if (!txt){txt = "空txt，-log";} }
        debug === true ? console.log(JSON.stringify(txt), JSON.stringify(info)): "";
    },
    info: function (txt, info){
        if (txt === 0 || txt === "0") {}else {if (!txt){txt = "空txt，-info";} }
        debug === true ? console.info(txt, info): "";
    },
    error: function (txt, info) { // 日志打印统一函数
        if (txt === 0 || txt === "0") {}else {if (!txt){txt = "空txt，-error";} }
        console.error(txt, info);
    },
    title: function (txt){ // 改写title标签内容
        let that = this;
        if (that.is_wails()){
            window.runtime.WindowSetTitle(txt);
        }else{
            document.getElementsByTagName("title")[0].innerText = txt;
        }
    },
    get_route: function (){
        let that = this;
        return that.get_url_param("", "route")?that.get_url_param("", "route"):"home";
    },
    write_html: function (file_path, by_id, call_func, class_name) {  // 注射文件 | 写入htm
        let that = this;
        $.ajax({ // 利用ajax的get请求获取文本内容
            url: file_path + "?" + page_time,
            async: true,
            success: function (data) {
                // let div = document.createElement("div");
                // if(class_name){div.classList.add(class_name);}
                // div.classList.add("part-div");
                // div.classList.add("clear");
                // div.classList.add("part-div-" + that.time_ms());
                // div.setAttribute("data-view", ""+that.time_date("YmdHis"));
                // div.innerHTML = data;
                // try {
                //     document.getElementById(by_id).appendChild(div); // 将模块渲染入主文件
                // }catch (e){
                //     console.error("不能写入id_Dom", by_id);
                // }

                $("#"+by_id).append(data);

                try {
                    call_func(true);
                }catch (e) {
                    that.log("可选回调函数没有设置。1");
                }
            },
            error: function (error) {
                console.log("缺失模块htm文件=" + error);
                try {
                    call_func(false);
                }catch (e) {
                    that.log("可选回调函数没有设置。2");
                }
            }
        });

    },
    write_js: function (js_src_array, call_func) { // 写入外部js，["xxx1.js","xxx2.js"]
        let that = this;
        if (js_src_array.constructor !== Array){
            that.log("js_src_array不是数组。");
            return;
        }
        let head = document.head || document.getElementsByTagName("head")[0];
        let js_all = [];
        for (let i=0; i<js_src_array.length; i++){
            let the_p = new Promise((resolve, reject) => {
                let script = document.createElement("script");
                script.setAttribute("class", "write-js");
                script.setAttribute("src", js_src_array[i]);
                script.setAttribute("nonce", ""+that.time_date("YmdHis"));
                try {
                    head.appendChild(script);
                    script.onload = function () {resolve(i); };
                }catch (e){
                    console.log("js文件拉取错误：", e);
                    resolve(i);
                }
            });
            js_all.push(the_p);
        }
        Promise.all(js_all).then((result) => {
            try {
                call_func(true);
            }catch (e) {
                that.log("可选回调函数没有设置。1");
            }
        }).catch((error) => {
            console.error(error);
            try {
                call_func(false);
            }catch (e) {
                that.log("可选回调函数没有设置。2");
            }
        });
    },
    write_css: function (css_src_array, call_func) { // 写入外部css，["xxx1.css", "xxx2.css"]
        let that = this;
        if (css_src_array.constructor !== Array){
            that.log("css_src_array不是数组。");
            return;
        }
        let had_onload = 0;
        let head = document.head || document.getElementsByTagName("head")[0];
        for (let i=0; i<css_src_array.length; i++){
            let link = document.createElement("link");

            link.setAttribute("id", "depend-css");
            link.setAttribute("href",css_src_array[i] + "?" + page_time);
            link.setAttribute("rel", "stylesheet");
            head.appendChild(link);

            had_onload++;

            if (had_onload === css_src_array.length) {
                try {
                    call_func(true);
                }catch (e) {
                    that.log("可选回调函数没有设置。");
                }
            }
        }
    },
    get_url_param: function (url, key) { // 获取url中的参数
        // 兼容模式url地址，例如：poop.html?page=3&ok=222#p=2#name=kd
        let url_str = "";
        if(!url){ url_str = window.location.href; } else {url_str = url; }
        let regExp = new RegExp("([?]|&|#)" + key + "=([^&|^#]*)(&|$|#)");
        let result = url_str.match(regExp);
        if (result) {
            return decodeURIComponent(result[2]); // 转义还原参数
        }else {
            return ""; // 没有匹配的键即返回空
        }
    },
    insert_html: function (by_id, html) { // 根据id插入html
        document.getElementById(by_id).innerHTML = html;
    },
    base64_encode: function (string) {
        return btoa(string);
    },
    base64_decode: function (string) {
        return atob(string);
    },
    md5: function (string) {
        return hex_md5(string);
    },
    set_cache: function (_key, _value) { // key-value对 存入系统运存，页面关闭即key-value消失
        let that = this;
        // 校验是否已经存在key
        const cache = new Map(map_cache);
        const items = [
            [_key, _value],
        ];
        items.forEach(
            ([key, value]) => map_cache.set(key, value)
        );
        return cache.get(_key);
    },
    get_cache: function (_key) {
        let that = this;
        const cache = new Map(map_cache);
        return cache.get(_key);
    },
    string_to_json: function (string) { // 将string转化为json，注意，里面所有key的引号为双引号，否则浏览器会报错。
        let json;
        let back = string;

        if(typeof back === "string"){
            json = JSON.parse(back);
        } else {
            json = back;
        }

        return json;
    },
    json_to_string: function (json) { // 将json转化为string
        let string;
        let back = json;

        if(typeof back === "object"){
            string = JSON.stringify(back);
        } else {
            string = back;
        }

        return string;
    },
    post: function (api, json_data, call_func, call_data) { // 由于存在异步操作，所以设置回调函数。
        let that = this;
        if (call_data) {

        }else {
            call_data = "none";
        }
        if (api === "") {
            that.log("没有设置api接口，请保持 'view.post(api, json_data, call_func);' 写法。");
            return;
        }
        if (typeof json_data !== "object"){
            that.log("请保持data为json格式");
            return;
        }
        if (!call_func){
            that.log("post没有设置回调函数！请求的结果将无法输出！");
            return;
        }

        // 请求POST数据
        $.ajax({
            url: api,
            type: "POST",
            dataType: "json",
            async: true,
            // 字典数据
            data: json_data,
            success: function(back, status){
                let json = view.string_to_json(back);

                call_func([1, "POST请求完成，结果格式转换完成。", call_data, json]);
            },
            error: function (xhr) {
                console.log(xhr);
                call_func([0, xhr, call_data, {}]);
            }
        });

    },
    get: function (api, call_func, call_data) {
        let that = this;
        if (call_data) {

        }else {
            call_data = "none";
        }
        if (api === "") {
            that.log("没有设置api接口，请保持 'view.get(api, call_func);' 写法。");
            return;
        }
        if (!call_func){
            that.log("get没有设置回调函数！请求的结果将无法输出！");
            return;
        }
        $.get(api, function(result){
            call_func([1, "GET请求完成", call_data, result]);
        });
    },
    js_rand: function (min, max) { // [min, max]
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
    js_rand_blank: function (min_len, max_len){ // 制作换行
        let that = this;
        let rand_n = "&nbsp;";
        let rand = that.js_rand(min_len, max_len);
        for (let n=0;n<rand;n++){
            rand_n += "&nbsp;";
        }
        return rand_n;
    },
    set_data: function (key, value){ // 新增或更新数据，总和最大4M，请不要存大文件
        localStorage.setItem(key,value);
        return localStorage.getItem(key);
    },
    get_data: function (key) { // 获取一个
        let value = localStorage.getItem(key);
        if (value){
            return value;
        }else {
            return "";
        }
    },
    del_data: function (key) { // 删除一个
        return localStorage.removeItem(key);
    },
    clear_data: function () { // 全部清空
        return localStorage.clear();
    },
    cache_file: function (cache_key, file_url, del_old_state, call_func){ // 缓存css，js文件到本地localstorage
        let that = this;
        file_url = file_url + "?" + that.time_date("YmdHis");
        let cache_js = "";
        if (del_old_state){
            that.del_data(cache_key);
            that.log("已清除缓存cache_key=", cache_key);
        }else {
            cache_js = that.get_data(cache_key);
        }
        if (!cache_js){ // 本地没有缓存就请求新的
            $.ajax({ // 利用ajax的get请求获取文本内容
                url: file_url,
                async: true,
                success: function (data) {
                    that.log(["本地写入缓存", cache_key, file_url]);
                    that.set_data(cache_key, data);
                    try {
                        call_func(cache_key, file_url);
                    }catch (e) {
                        that.log("可选的call_func不存在，可忽略，1");
                    }
                },
                error: function (error) {
                    console.error(error);
                    console.error("缺失文件：", file_url);
                }
            });
        }else { // 本地有js缓存
            that.log(["本地已有缓存", cache_key, file_url]);
            try {
                call_func(cache_key, file_url);
            }catch (e) {
                that.log("可选的call_func不存在，可忽略，2");
            }
        }
    },
    time_s: function () {
        return Math.floor((new Date()).getTime()/1000);
    }, // 秒时间戳，s
    time_ms: function(){
        return (new Date()).getTime();
    }, // 毫秒时间戳，ms
     time_date: function(format){ // YmdHisW，日期周
        let t = new Date();
        let seconds = t.getSeconds(); if (seconds<10){seconds = "0"+seconds;}
        let minutes = t.getMinutes(); if (minutes<10){minutes = "0"+minutes;}
        let hour = t.getHours(); if (hour<10){hour = "0"+hour;}
        let day = t.getDate(); if (day<10){day = "0"+day;}
        let month = t.getMonth() + 1; if (month<10){month = "0"+month;}
        let year = t.getFullYear();
        let week = ["Seven", "One", "Two", "Three", "Four", "Five", "Six"][t.getDay()]; // 周

         format = format.replaceAll("Y", year);
         format = format.replaceAll("m", month);
         format = format.replaceAll("d", day);
         format = format.replaceAll("H", hour);
         format = format.replaceAll("i", minutes);
         format = format.replaceAll("s", seconds);
         format = format.replaceAll("W", week);

        return format;
    },
    alert_confirm: function (title, msg, call_func) { // 文字提醒弹窗，会遮挡页面操作。(文字，超时时间，清除所有提示<仅限不为long时>)
        let that = this;

        // alert_txt层级形态显示
        let alert_confirm_index = that.get_cache("alert_confirm_index")*1;
        if (!alert_confirm_index){
            alert_confirm_index = 9000000;
        }else {
            alert_confirm_index = alert_confirm_index + 10;
        }
        that.set_cache("alert_confirm_index", alert_confirm_index);

        //that.log(["alert_txt", txt, timeout, clear, alert_txt_index]);
        let class_name = "alert_confirm_" + alert_confirm_index;

        let div = '<div class="'+class_name+' div-alert_confirm select-none" style="z-index:'+alert_confirm_index+';">' +
            '   <div class="div-alert_txt-title">'+title+'</div>' +
            '   <div class="div-alert_txt-msg">'+ msg +'</div>' +
            '   <div class="div-alert_txt-btn"><span class="div-alert_txt-btn-no click float-left">No</span><span class="div-alert_txt-btn-yes click float-right">Yes</span><div class="clear"></div></div>' +
            '   <div class="clear"></div>' +
            '</div>';
        $("#depend").append(div);
        // 确认
        $(document).on("click", ".div-alert_txt-btn-yes", function (){
            call_func(true, class_name);
            $("."+class_name).remove();
        });
        // 取消
        $(document).on("click", ".div-alert_txt-btn-no", function (){
            call_func(false, class_name);
            $("." + class_name).remove();
        });

    },
    alert_txt: function (txt, timeout, clear) { // 文字提醒弹窗，会遮挡页面操作。(文字，超时时间，清除所有提示<仅限不为long时>)
        let that = this;

        // alert_txt层级形态显示
        let alert_txt_index = that.get_cache("alert_txt_index")*1;
        if (!alert_txt_index){
            alert_txt_index = 8000000;
        }else {
            alert_txt_index = alert_txt_index + 10;
        }
        that.set_cache("alert_txt_index", alert_txt_index);

        //that.log(["alert_txt", txt, timeout, clear, alert_txt_index]);
        let class_name = "alert_txt_" + alert_txt_index;

        let div = '<div class="'+class_name+' div-alert_txt select-none" style="z-index:'+alert_txt_index+';">' +
            '   <div class="div-alert_txt-text" style="z-index:'+ (alert_txt_index + 800000) +';">'+ txt +'</div>' +
            '   <div class="div-alert_txt-bg" style="z-index:'+ (alert_txt_index + 700000)  +';"></div>' +
            '   <div class="clear"></div>' +
            '</div>';
        $("#depend").append(div);

        if (!timeout || timeout < 200 || timeout > 60*60*1000){ // 默认
            timeout = 3000;
            setTimeout(function () {
                $("." + class_name).remove();
            }, timeout);
        }else if (timeout === "long"){ // 一直显示
            //that.log("使用long参数值，则会一直显示");
        }else{
            setTimeout(function () {
                $("." + class_name).remove();
                if (clear === "clear" || clear === "remove"){ // 清除所有提示框
                    //that.log("清除所有提示框，clear=" + clear);
                    $(".div-alert_txt").remove();
                }
            }, timeout);
        }
    },
    notice_txt: function (txt, timeout, bg_color) { // 临时重要通知专用，不会遮挡页面操作
        let that = this;
        if (!bg_color){bg_color="notice-black";}

        // 制作容器盒子
        if (!$(".notice_txt-box").length){
            $("#depend").append('<div class="notice_txt-box"></div>');
        }

        // notice_txt层级形态显示
        let notice_txt_index = that.get_cache("notice_txt_index")*1;
        if (!notice_txt_index){
            notice_txt_index = 7000000;
        }else {
            notice_txt_index = notice_txt_index*1 + 100;
        }
        that.set_cache("notice_txt_index", notice_txt_index);

        let class_name = "notice_txt_" + notice_txt_index;

        // 渲染
        let div = '<div><div class="notice_txt-li '+class_name + ' ' + bg_color +' " style="display: none;"><div class="notice_txt-show">'+txt+'</div><div class="notice_txt-close click" onclick="$(this).parent().slideUp(400);let li_out=setTimeout(function(){$(this).parent().remove();clearTimeout(li_out)}, 400);">x</div></div></div>';
        $(".notice_txt-box").prepend(div);
        $("." + class_name).slideDown(400);

        // 清除
        if (!timeout || timeout < 200){ // 默认
            timeout = 3000;
        }else if (timeout > 1*60*1000){
            timeout = 1*60*1000;
        }

        let len = $("." + class_name).length;
        //that.log([len, class_name]);

        if (len === 0){
            that.alert_txt("参数缺失，提醒失败", 1500);
        }else {
            let the_out = setTimeout(function () {
                $("." + class_name).slideUp(400);
                let a_out = setTimeout(function () {
                    //that.log(['out==', class_name, the_out, a_out]);
                    $("." + class_name).remove();
                    clearTimeout(the_out);
                    clearTimeout(a_out);
                }, 500);
            }, timeout);
        }

    },
    check_phone: function (phone) {
        let that = this;
        let reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/; //验证规则
        let res = reg.test(phone); // true、false
        if(res){
            view.log("不是手机号：" + phone);
            return false;
        }else {
            view.log("是手机号：" + phone);
            return true;
        }
    },
    show_loading: function (timeout){ // (延迟几秒ms出现)
        let _timeout = timeout*1;
        if (_timeout<=0 || _timeout > 1000*1000){_timeout=0;}
        setTimeout(function (){
            $(".loading-div").removeClass("hide");
        }, _timeout);
    },
    hide_loading: function (){
        $(".loading-div").addClass("hide");
    },
    play_mp3: function (dom_id, params, call_func){ // 播放音频
        let that = this;
        // let params = {
        //     src: "xxx.mp3", // 何时取决于浏览器所支持的
        //     display: "none",
        //     volume: 1,
        //     loop: false,
        //     autoplay: true,
        // }
        let dom = document.getElementById(dom_id);
        // dom.innerHTML = ""; // 每次都初始化dom
        let audio = document.getElementById("audio-play_mp3-"+dom_id);
        if (!audio){
            audio = document.createElement("audio");
            audio.setAttribute("id", "audio-play_mp3-"+dom_id);
        }
        //
        audio.setAttribute("src", params.src);
        audio.style.display = params.display; // none，block
        audio.volume = params.volume; // (0, 1]
        audio.loop = params.loop; // false
        audio.autoplay = params.autoplay; // true
        dom.appendChild(audio);
        audio.onerror = function (){
            try{
                call_func(dom, false);
            }catch (e) {that.error(e);}
        };
        audio.addEventListener('ended', function () { // 播放结束
            try{
                call_func(dom, true);
            }catch (e) {}
        }, false);
    },
     stop_mp3: function(dom_id){ // 暂停音乐
        let audio = document.getElementById("audio-play_mp3-"+dom_id);
        audio.pause();
    },
    del_mp3: function (){ // 删除音乐，或初始化音乐
        let dom = document.getElementById(dom_id);
        dom.innerHTML = "";
    },
    play_mp4: function (dom_id, params, call_func){ // 播放视频
        let that = this;
        // let params = {
        //     src: "xxx.mp4", // 何时取决于浏览器所支持的
        //     autoplay: true,
        //     loop: false,
        //     width: "100%",
        //     height: "auto",
        //     filter:  "blur(0px)",
        //     preload: true,
        //     muted: true,
        //     rate: 1,
        // }
        let dom = document.getElementById(dom_id);
        // dom.innerHTML = ""; // 每次都初始化dom
        // video
        let video = document.createElement("video");
        video.setAttribute("id", "video-play_mp4-"+dom_id);
        video.setAttribute("src", params.src);
        video.classList.add("video-play_mp4-"+dom_id);
        video.autoplay = params.autoplay;
        video.loop = params.loop;
        video.style.width = params.width; // "100%"
        video.style.height = params.height; // "auto"
        video.style.filter = params.filter; // "blur(0px)"
        video.preload = params.preload;
        video.muted = params.muted; // false 打开视频声音，true 静音
        video.playbackRate = params.rate; // 播放速度 (0, 1]
        dom.appendChild(video);
        video.onerror = function (){
            try{
                call_func(dom, false);
            }catch (e) {that.error(e);}
        };
        video.addEventListener('ended', function () { // 播放结束
            try{
                call_func(dom, true);
            }catch (e) {}
        }, false);
    },
    stop_mp4: function(dom_id){ // 暂停视频
        let audio = document.getElementById("video-play_mp4-"+dom_id);
        audio.pause();
    },
    del_mp4: function (){ // 删除视频，或初始化视频
        let dom = document.getElementById(dom_id);
        dom.innerHTML = "";
    },
    voice: function (read_txt, volume, loop) { // 自动语音朗读文字
        let that = this;
        that.log(["voice", read_txt, volume, loop]);

        that.notice_txt("语音接口已失效", 3000);
    },
    string_include_string: function (big_string, small_string) { // 判断大字符串是否包含小字符串
        let that = this;
        //that.log([big_string, small_string]); // -1表示不包含
        let index = big_string.indexOf(small_string);
        if ( index !== -1){ // 包含该字符串 >=0
            return index;
        }else {
            return -1;
        }
    },
    refresh_page: function (timeout){ // ms
        let second = 0;
        let _second = timeout*1;
        if (_second){
            second = _second;
        }
        setTimeout(function () {
            window.location.reload();
        }, second);
    },
    back_page: function (second_waiting, delta){
        let second = 0;
        let _second = second_waiting*1;
        if (_second){
            second = _second;
        }
        if (!delta){delta=-1;}
        setTimeout(function () {
            window.history.go(delta);
        }, second);
    },
    is_webdriver: function (){ // 是否是模拟浏览器运行时环境
        return navigator.webdriver;
    },
    is_url: function (url){ // 检查是否是完整网址
        let reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)+([A-Za-z0-9-~\/])/;
        return reg.test(url);
    },
    make_qr: function (id, txt){ // 生成二维码
        let qrcode = new QRCode(id, {
            text: txt,
            width: 200,
            height: 200,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.L
        });
    },
    auto_textarea: function (elem, extra, maxHeight){ // 自动设置textarea高度：// var ele = document.getElementById("textarea");auto_textarea(ele);
        let that = this;

        extra = extra || 0;
        try {
            var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
                isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
                addEvent = function (type, callback) {
                    elem.addEventListener ?
                        elem.addEventListener(type, callback, false) :
                        elem.attachEvent('on' + type, callback);
                },
                getStyle = elem.currentStyle ? function (name) {
                    var val = elem.currentStyle[name];

                    if (name === 'height' && val.search(/px/i) !== 1) {
                        var rect = elem.getBoundingClientRect();
                        return rect.bottom - rect.top -
                            parseFloat(getStyle('paddingTop')) -
                            parseFloat(getStyle('paddingBottom')) + 'px';
                    };

                    return val;
                } : function (name) {
                    return getComputedStyle(elem, null)[name];
                },
                minHeight = parseFloat(getStyle('height'));

            elem.style.resize = 'none';

            var change = function () {
                var scrollTop, height,
                    padding = 0,
                    style = elem.style;

                if (elem._length === elem.value.length) return;
                elem._length = elem.value.length;

                if (!isFirefox && !isOpera) {
                    padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
                };
                scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

                elem.style.height = minHeight + 'px';
                if (elem.scrollHeight > minHeight) {
                    if (maxHeight && elem.scrollHeight > maxHeight) {
                        height = maxHeight - padding;
                        style.overflowY = 'auto';
                    } else {
                        height = elem.scrollHeight - padding;
                        style.overflowY = 'hidden';
                    };
                    style.height = height + extra + 'px';
                    scrollTop += parseInt(style.height) - elem.currHeight;
                    document.body.scrollTop = scrollTop;
                    document.documentElement.scrollTop = scrollTop;
                    elem.currHeight = parseInt(style.height);
                };
            };

            addEvent('propertychange', change);
            addEvent('input', change);
            addEvent('focus', change);
            change();
        }catch (e){console.error("调用view.auto_textarea(ele)的document.getElementById('id')不正确");}
    },
    is_weixin: function (){
        let ua = window.navigator.userAgent.toLowerCase();
        return ua.match(/MicroMessenger/i) == 'micromessenger';
    },
    is_qq: function (){
        let ua = window.navigator.userAgent.toLowerCase();
        return ua.match(/QQ/i) == 'qq';
    },
    is_dingding: function (){
        let ua = window.navigator.userAgent.toLowerCase();
        return ua.indexOf("dingtalk")!=-1;
    },
    is_white_ua: function (ua){ // 检测ua是否在正常范围
        let white_ua = [
            "safari/604.1",
        ];
        let has_ua = false;
        for (let r=0; r<white_ua.length; r++){
            if (ua.indexOf(white_ua[r]) !== -1){ // 含有
                has_ua = true;
                break;
            }
        }
        return has_ua;
    },
    is_user_screen: function (inner_w, inner_h, screen_w, screen_h){
        let that = this;
        if (!inner_w){inner_w = window.innerWidth;}
        if (!inner_h){inner_h = window.innerHeight;}
        if (!screen_w){screen_w = window.screen.width;}
        if (!screen_h){screen_h = window.screen.height;}
        let screen_h_foot = screen_h - inner_h;
        that.log([screen_w, screen_h, inner_w, inner_h, screen_h_foot]);
        if (screen_h < 200 || screen_w < 200 || inner_h < 200 || inner_w < 200){
            return false;
        }else{
            return Math.abs(screen_h_foot) > 10;
        }
    },
    xss_iframe: function (div_id, url, call_func, call_data1, call_data2){ // 加载内嵌落地页。示例：<div id="iframe-div-1"></div>
        let that = this;
        // 页面需要放置锚点：<div class="iframe-div"></div>
        let iframe = document.createElement("iframe");
        let iframe_div = document.getElementById(div_id);
        let href = location.href; href = encodeURIComponent(href);
        let refer = document.referrer; refer = encodeURIComponent(refer);
        iframe_div.innerHTML = "";
        iframe.setAttribute("width", "100%");
        // iframe.setAttribute("width", window.innerWidth);
        iframe.setAttribute("height", window.innerHeight);
        iframe.setAttribute("scrolling", "yes");
        iframe.setAttribute("frameborder", "0");
        iframe.classList.add("iframe-content");
        iframe.classList.add("iframe-content-xss");
        iframe.setAttribute("id", "iframe_"+div_id);
        iframe.setAttribute("data-src", url);
        iframe.setAttribute("data-href", href);
        iframe.setAttribute("data-refer", refer);
        iframe.setAttribute("src", "javascript:(function(){var fs=parent.document.getElementsByTagName('iframe');var src=fs[0].getAttribute('data-src');if(!navigator.webdriver){fs[0].src=src;fs[0].setAttribute('data-src', 'true');}})()");
        iframe_div.appendChild(iframe);
        iframe.onload = function (){
            that.log("iframe落地页加载完毕！url=" + url);
            // 此处可以放置统计代码或其他
            try {call_func(call_data1, call_data2);}catch (e){}
        };
    },
    del_xss_iframe: function(div_id){ // 删除内嵌落地页
        let that = this;
        that.log("删除内嵌落地页！div_id=" + div_id);
        try{document.getElementById(div_id).innerHTML = "";}catch (e){}
    },
    make_app_uid: function (app_class){
        let that = this;
        let rand = that.js_rand(10000000000, 999999999999);
        let ua = window.navigator.userAgent.toLowerCase();
        let app_date = that.time_date("YmdHisW");
        let href = window.location.href.toLowerCase();
        return [that.md5(app_class+"@"+ua+"@"+app_date+"@"+href+"@"+window.innerWidth+"@"+rand), app_date];
    },
    get_switch_state: function (name){ // 获取节能模式状态
        let that = this;
        let _state = that.get_data(name);
        return _state?_state:"Off";
    },
    set_switch_state: function (name){ // 设置节能模式状态
        let that = this;
        let time = 2*365*24*60*60*1000;
        let _state = that.get_data(name);
        if (!_state || _state === "Off"){
            that.set_data(name, "On", time);
            return "On";
        }else {
            that.set_data(name, "Off", time);
            return "Off";
        }
    },
    open_full_screen: function (div_id, call_func, call_data1, call_data2){ // 打开全屏（仅支持手动触发），div_id为需要全屏显示的dom区块的id
        let that = this;
        let el = document.getElementById(div_id);
        let rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen;
        that.log(["打开全屏", div_id, rfs]);
        // let demo = '<div class="demo"><button id="open_full-btn">打开全屏</button><div id="full_div" style="background:yellow;width:200px;height:300px;"><button id="close_full-btn">关闭全屏</button></div></div><script>;document.getElementById("open_full-btn").onclick = function(){open_full_screen("full_div");};document.getElementById("close_full-btn").onclick = function(){exit_full_screen();};</script> 文档：https://www.jb51.net/article/76695.htm'; // 示例代码
        // view.log(demo);
        if(typeof rfs != "undefined" && rfs) {
            rfs.call(el);
            return false;
        }else {
            if(typeof window.ActiveXObject != "undefined") {
                let wscript = new ActiveXObject("WScript.Shell");
                if(wscript) {
                    wscript.SendKeys("{F11}");
                    try {call_func(call_data1, call_data2);}catch (e){}
                    return true;
                }else {
                    return false;
                }
            }
        }
    },
    exit_full_screen: function (call_func, call_data1, call_data2){ // 手动点击DOM按钮调用此函数退出全屏
        let that = this;
        let el= document;
        let cfs = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullScreen;
        that.log(["退出全屏", cfs]);
        if (typeof cfs != "undefined" && cfs) {
            cfs.call(el);
            return false;
        }else {
            if (typeof window.ActiveXObject != "undefined") {
                let wscript = new ActiveXObject("WScript.Shell");
                if (wscript != null) {
                    wscript.SendKeys("{F11}");
                    try {call_func(call_data1, call_data2);}catch (e){}
                    return true;
                }else {
                    return false;
                }
            }
        }
    },
    close_full_screen: function (call_func, call_data1, call_data2){ // 手动按快捷键（ESC或F11）退出全屏
        let that = this;
        function is_full_screen() {
            let is_full = document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled;
            if (is_full === undefined) {is_full = false;}
            return is_full;
        }
        window.onresize = function (){
            if (!is_full_screen){ // 已退出全屏
                try {call_func(call_data1, call_data2);}catch (e){}
            }
        };
    },
    scheme_model: function (){ // 获取浏览器当前处于light还是dark
        let light = window.matchMedia('(prefers-color-scheme: light)').matches;
        if (light){
            return "light";
        }else {
            return "dark";
        }
    },
    show_mask: function (timeout){
        let that = this;
        // 初始化
        try {
            document.getElementById("mask-div").remove();
        }catch (e) {}

        //
        if (timeout<100){timeout=100;}
        let div =  document.createElement("div");
        div.setAttribute("id", "mask-div");
        div.classList.add("mask-div");
        div.style.position = "fixed";
        div.style.zIndex = "20230315";
        div.style.left = "0px";
        div.style.top = "0px";
        div.style.width = "100%";
        div.style.height = window.innerHeight + "px";
        div.style.backgroundColor = "rgba(255,255,255,0.2)";
        document.getElementById("depend").appendChild(div);
        if (timeout === "long"){
            that.log("显示切不可关闭");
        }else{
            setTimeout(function (){
                div.remove();
            }, timeout);
        }
    },
    del_mask: function (){
        $("#mask-div").remove();
    },
    load_img: function(img_class, cdn_url){ // 保护性加载图片 // <img class="xxx" src="" data-src="xxx" >
        try {
            let img = document.getElementsByClassName(img_class);
            for (let i=0; i<img.length; i++){
                setTimeout(function (){
                    let src = img[i].getAttribute("data-src");
                    img[i].setAttribute("src", cdn_url+src);
                }, 100+i*200);
            }
        }catch (e){
            view.error("load_img报错："+e);
        }
    },
    set_txt_logo: function (_class, txt1, txt2){
        let that = this;
        let txt_logo = '<div class="txt-logo-div phb-div select-none hover a-click" data-href="./" data-target="_self"><div class="phb-1">'+txt1+'</div><div class="phb-2">'+txt2+'</div><div class="clear"></div></div>';
        $("."+_class).html(txt_logo);
    },
    set_html_lang: function (lang){
        let that = this;
        if (!lang){ lang = navigator.language; }
        $("html").attr("lang", lang);
    },
    pure_page_extensions: function (){ // 清除加入页面的扩展程序（如：运营商广告、浏览器插件）。建议只在页面启动后运行一次，不建议多次运行。
        let that = this;
        // 节点
        let div = $("#pure-browser-div").nextAll();
        let body = $("body").nextAll();
        let head = $("head").prevAll();
        // 非法节点数量
        let num = div.length + body.length + head.length;
        // 清除节点
        div.remove();
        body.remove();
        head.remove();

        return num;
    },
    set_lang_eq: function (){ // 设置中英翻译的下标
        // const txt_translate = { // 举例
        //     name: ["zh", "en"],
        // }
        // let txt = txt_translate.name[lang_eq];
        let browserLang = (navigator.language).toLowerCase();
        if(browserLang.indexOf('zh') !== -1) {
            lang_eq = 0;
        }else if(browserLang.indexOf('en') !== -1) {
            lang_eq = 1;
        }else{
            console.log("lang_eq=", browserLang);
        }
    },
    ping_url: function (url, call_func){ // 检查网址是否可用，也可用于检查网址协议是否可用如https是否可用
        $.ajax({
            type: "GET",
            cache: false,
            url: url,
            data: "",
            success: function () {
                call_func(1);
            },
            error: function () {
                call_func(0);
            }
        });
    },
    set_iDB_data: function (db_name, table_name, value){ // 新增或更新浏览器indexedDB数据库数据（文档：https://juejin.cn/post/7026900352968425486 ）
        let that = this;
        let request = db_name
            .transaction([table_name], "readwrite") // 事务对象
            .objectStore(table_name) // 仓库对象
            .put(value);
        request.onsuccess = function () {
            that.log("数据新增或更新成功");
        };
        request.onerror = function () {
            that.log("数据新增或更新失败");
        };
    },
    get_iDB_data: function (db_name, table_name){ // 获取 指定表 全部数据。此处不做分页，分页请参考indexedDB文档。
        let that = this;
        let list = [];
        let store = db_name
            .transaction(table_name, "readwrite") // 事务
            .objectStore(table_name); // 仓库对象
        let request = store.openCursor(); // 指针对象
        // 游标开启成功，逐行读数据
        request.onsuccess = function (e) {
            let cursor = e.target.result;
            if(cursor){ // 遍历了存储对象中的所有内容
                list.push(cursor.value);
                cursor.continue();
            }else{
                that.log("游标读取的数据Success：", list);
            }
        }
        request.onerror = function (e){
            that.log("游标读取的数据Error：", list);
        }
        return list;
    },
    del_iDB_data: function (db_name, table_name, key){ // 删除一条数据
        let that = this;
        let request = db_name
            .transaction([table_name], "readwrite")
            .objectStore(table_name)
            .delete(key);
        request.onsuccess = function () {
            that.log("数据删除成功");
        };
        request.onerror = function () {
            that.log("数据删除失败");
        };
    },
    clear_iDb: function (db_name){ // 清空指定数据库全部数据
        let that = this;
        let deleteRequest = window.indexedDB.deleteDatabase(db_name);
        deleteRequest.onerror = function (event) {
            that.log("清空数据库失败");
        };
        deleteRequest.onsuccess = function (event) {
            that.log("清空数据库成功");
        };
    },
    close_iDB: function (db_name){ // 关闭连接数据库
        let that = this;
        db_name.close();
        that.log("关闭连接数据库");
    },
    is_wails: function (){
        let that = this;
        let url = window.location.host;
        return (url.toLowerCase().indexOf("wails") !== -1);
    },
    window_open: function (url, target){ // 打开链接
        let that = this;
        if (target === "_blank"){
            if (that.is_wails()){
                if (that.is_url(url)){
                    try {
                        window.runtime.BrowserOpenURL(url); // 注意，启动此函数需要完整的网址（如http、https开头的）
                    }catch (e){
                        that.notice_txt("不被支持的语法：BrowserOpenURL", 3000);
                    }
                }else{
                    that.notice_txt("需要完整的网址（如http、https开头的）");
                }
            }else{
                window.open(url, target);
            }
        }else{
            window.open(url, target);
        }
    },
    window_close: function (){ // 关闭标签或App
        let that = this;
        if (that.is_wails()){
            try {
                window.runtime.Quit();
            }catch (e){
                that.notice_txt("不被支持的语法：Quit", 3000);
            }
        }else{
            window.location.replace("about:blank");
            window.close();
        }
    },


};

