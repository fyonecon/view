/*框架自带公共函数*/

// 框架依赖的其他js文件，注意这里是框架依赖的，最先载入的依赖文件。
const map_cache = new Map(); // 设置页面键-值对缓存
let view = {
    "log": function (txt) { // 日志打印统一函数
        if (txt === 0 || txt === "0") {}else {if (!txt){txt = "空txt，-log";} }
        debug === true ? console.log(JSON.stringify(txt)): "";
    },
    "error": function (txt) { // 日志打印统一函数
        console.error(JSON.stringify(txt));
    },
    "write_htm": function (file_path, by_id, call_func) {  // 注射文件 | 写入htm
        let that = this;
        $.ajax({ // 利用ajax的get请求获取文本内容
            url: file_path + "?" + page_time,
            async: true,
            success: function (data) {
                let div = document.createElement("div");
                div.classList.add("part-div");
                div.classList.add("clear");
                div.classList.add("part-div-" + that.js_rand(100000000, 9999999999));
                div.setAttribute("data-view", that.js_rand(100000000, 9999999999));
                div.innerHTML = data;
                document.getElementById(by_id).appendChild(div); // 将模块渲染入主文件

                try {
                    call_func(true);
                }catch (e) {
                    that.log("可选回调函数没有设置。");
                }
            },
            error: function (error) {
                console.log("缺失模块htm文件=" + error);
                try {
                    call_func(false);
                }catch (e) {
                    that.log("可选回调函数没有设置。");
                }
            }
        });

    },
    "write_js": function (js_src_array, call_func) { // 写入外部js
        let that = this;
        if (js_src_array.constructor !== Array){
            that.log("js_src_array不是数组。");
            return;
        }
        let had_onload = 0;
        let head = document.head || document.getElementsByTagName("head")[0];
        for (let i=0; i<js_src_array.length; i++){
            let script = document.createElement("script");
            script.setAttribute("class", "write-js");
            script.setAttribute("src", js_src_array[i]);
            head.appendChild(script);
            script.onload = function () {
                had_onload++;
                if (had_onload === js_src_array.length) {
                    try {
                        call_func(true);
                    }catch (e) {
                        that.log("可选回调函数没有设置。");
                    }
                }
            };
        }
    },
    "write_css": function (css_src_array, call_func) { // 写入外部js
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
    "get_url_param": function (url, key) { // 获取url中的参数
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
    "class_write_html": function (only_class_name, html) { // 根据唯一class写入html
        document.getElementsByClassName(only_class_name)[0].innerHTML = html;
    },
    "id_write_html": function (id_name, html) { // 根据唯一id写入html
        document.getElementById(id_name).innerHTML = html;
    },
    "set_cookie": function (name, value, time) {
        if (!time){
            time = 1*24*60*60*1000; // 默认1天
        }
        let exp = new Date();
        exp.setTime(exp.getTime() + time);
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
    },
    "get_cookie": function (name) {
        let arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg)){
            return unescape(arr[2]);
        } else{
            return "";
        }
    },
    "del_cookie": function (name) {
        let exp = new Date();
        exp.setTime(exp.getTime() - 1);
        let cval=getCookie(name);
        if(cval!=null) {
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
        }
    },
    "base64_encode": function (string) {
        return btoa(string);
    },
    "base64_decode": function (string) {
        return atob(string);
    },
    "md5": function (string) {
        return hex_md5(string);
    },
    "set_cache": function (_key, _value) { // key-value对 存入系统内存，页面关闭即key-value消失
        let that = this;

        let state = 0;
        let msg = "";
        let content = [];

        // 校验是否已经存在key
        const cache = new Map(map_cache);
        let has = cache.get(_key);
        if (has || has === 0) {
            state = 2;
            msg = "update-cache";
        }else {
            state = 1;
            msg = "insert-cache";
        }

        const items = [
            [_key, _value],
        ];
        content = items;

        items.forEach(
            ([key, value]) => map_cache.set(key, value)
        );

        that.log([state, msg, content]);
    },
    "get_cache": function (_key) {
        let that = this;

        let state = 0;
        let msg = "";
        let content = [];

        const cache = new Map(map_cache);

        let has = cache.get(_key);
        if (has || has === 0) {
            state = 1;
            msg = "has-cache";
        }else {
            state = 0;
            msg = "null-cache";
        }
        content = [_key, has, state, msg];

        that.log(content);

        return has;
    },
    "string_to_json": function (string) { // 将string转化为json，注意，里面所有key的引号为双引号，否则浏览器会报错。
        let json;
        let back = string;

        if(typeof back === "string"){
            json = JSON.parse(back);
        } else {
            json = back;
        }

        return json;
    },
    "json_to_string": function (json) { // 将json转化为string
        let string;
        let back = json;

        if(typeof back === "object"){
            string = JSON.stringify(back);
        } else {
            string = back;
        }

        return string;
    },
    "post": function (api, json_data, call_func, call_data) { // 由于存在异步操作，所以设置回调函数。
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
    "get": function (api, call_func, call_data) {
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
    "timestamp": function() {
        return new Date().getTime();
    },
    "js_rand": function (min, max) { // [min, max]
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
    "set_data": function (key, value){
        localStorage.setItem(key,value);
        if (localStorage.getItem(key)){
            return true;
        }else {
            return false;
        }
    },
    "get_data": function (key, test) {
        if (test || test === 0){
            console.log("注意，你使用了get_data函数。。");
            return false;
        }
        let value = localStorage.getItem(key);
        if (value){
            return value;
        }else {
            return "";
        }
    },
    "del_data": function (key) {
        let del = localStorage.removeItem(key);
        if (del){
            return true;
        }else {
            return false;
        }
    },
    "clear_data": function () {
        let clear = localStorage.clear();
        if (clear){
            return true;
        }else {
            return false;
        }
    },
    "time": function () {
        return new Date();
    }, // 时间戳
    "time_ms": function(){
        return (new Date()).getTime();
    }, // 时间戳
    "get_date": function () {
        let t=new Date();
        let seconds = t.getSeconds(); if (seconds<10){seconds = "0"+seconds;}
        let minutes = t.getMinutes(); if (minutes<10){seconds = "0"+minutes;}
        let hour = t.getHours(); if (hour<10){hour = "0"+hour;}
        let day = t.getDate(); if (day<10){day = "0"+day;}
        let month = t.getMonth() + 1; if (month<10){month = "0"+month;}
        let year = t.getFullYear();

        return [
            year+""+month+""+day+""+hour+""+minutes+""+seconds,
            year+"-"+month+"-"+day+" "+hour+":"+minutes+":"+seconds,
        ];
    },
    "alert_txt": function (txt, timeout, clear) { // 文字提醒弹窗。(文字，超时时间，清除所有提示<仅限不为long时>)
        let that = this;

        // alert_txt层级形态显示
        let alert_txt_index = that.get_cache("alert_txt_index")*1;
        if (!alert_txt_index){
            alert_txt_index = 8000000;
        }else {
            alert_txt_index = alert_txt_index + 10;
        }
        that.set_cache("alert_txt_index", alert_txt_index);

        that.log(["alert_txt", txt, timeout, clear, alert_txt_index]);
        let class_name = "alert_txt_" + alert_txt_index;

        let div = '<div class="'+class_name+' div-alert_txt select-none" style="z-index:'+alert_txt_index+';">' +
            '   <div class="div-alert_txt-text" style="z-index:'+ (alert_txt_index + 800000) +';">'+ txt +'</div>' +
            '   <div class="div-alert_txt-bg" style="z-index:'+ (alert_txt_index + 700000)  +';"></div>' +
            '   <div class="clear"></div>' +
            '</div>';
        $(".depend").append(div);

        if (!timeout || timeout < 200 || timeout > 60*60*1000){ // 默认
            timeout = 2500;
            setTimeout(function () {
                $("." + class_name).remove();
            }, timeout);
        }else if (timeout === "long"){ // 一直显示
            that.log("使用long参数值，则会一直显示");
        }else{
            setTimeout(function () {
                $("." + class_name).remove();
                if (clear === "clear" || clear === "remove"){ // 清除所有提示框
                    that.log("清除所有提示框，clear=" + clear);
                    $(".div-alert_txt").remove();
                }
            }, timeout);
        }
    },
    "check_phone": function (phone) {
        let that = this;
        let reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/; //验证规则
        let res = reg.test(phone); // true、false
        if(res === false){
            view.log("不是手机号：" + phone);
            return false;
        }else {
            view.log("是手机号：" + phone);
            return true;
        }
    },
    "voice": function (read_txt, volume, loop) { // 自动语音朗读文字
        let that = this;
        that.log(["voice", read_txt, volume, loop]);

        if (!volume*1){ // 默认半音量
            volume = 0.5;
        }else if (volume<0 || volume > 1) {
            volume = 1;
        }

        if (!loop){ // 默认关闭循环
            loop = false;
        }

        that.write_js([file_url + "static/js/mplayer.js"], function () {
            // 文字生成语音源
            let make_mp3 = "https://tts.baidu.com/text2audio?cuid=baike&lan=zh&ctp=1&spd=3&pdt=301&vol=9&rate=32&per=0&tex=" + encodeURI(read_txt);

            // 文档https://github.com/haima16/MPlayer
            let player = new MPlayer(make_mp3, {
                loop: loop, // 循环 true or false
                volume: volume, // 音量 [0, 1]
                auto: true,
                index: 1,
                analyser: {
                    size: 1024,
                }
            });
            player.onload = function() {
                let the = this;
                that.log("=开始播放=");
                the.play();
            };
            player.onended = function() {
                let the = this;
                that.log("=播放完成=");
            };
        });
    },


};

