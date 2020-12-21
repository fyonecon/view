/*框架自带公共函数。解密https://www.sojson.com/jscodeconfusion.html*/

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
        name = cookie_prefix + name;
        if (!time){
            time = 1*24*60*60*1000; // 默认1天
        }
        let exp = new Date();
        exp.setTime(exp.getTime() + time);
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
    },
    "get_cookie": function (name) {
        name = cookie_prefix + name;
        let arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg)){
            return unescape(arr[2]);
        } else{
            return "";
        }
    },
    "del_cookie": function (name) {
        name = cookie_prefix + name;
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
        return Math.floor((new Date()).getTime()/1000);
    }, // 秒时间戳，s
    "time_ms": function(){
        return (new Date()).getTime();
    }, // 毫秒时间戳，ms
    "get_date": function () {
        let t = new Date();

        let seconds = t.getSeconds(); if (seconds<10){seconds = "0"+seconds;}
        let minutes = t.getMinutes(); if (minutes<10){minutes = "0"+minutes;}
        let hour = t.getHours(); if (hour<10){hour = "0"+hour;}
        let day = t.getDate(); if (day<10){day = "0"+day;}
        let month = t.getMonth() + 1; if (month<10){month = "0"+month;}
        let year = t.getFullYear();
        let week = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"][t.getDay()]; // 周
        let calender = {
            'calender': function () { // 获取农历
                //定义全局变量
                let CalendarData=new Array(100);
                let madd=new Array(12);
                let tgString="甲乙丙丁戊己庚辛壬癸";
                let dzString="子丑寅卯辰巳午未申酉戌亥";
                let numString="一二三四五六七八九十";
                let monString="正二三四五六七八九十冬腊";
                let weekString="日一二三四五六";
                let sx="鼠牛虎兔龙蛇马羊猴鸡狗猪";
                let cYear,cMonth,cDay,TheDate;
                CalendarData = new Array(0xA4B,0x5164B,0x6A5,0x6D4,0x415B5,0x2B6,0x957,0x2092F,0x497,0x60C96,0xD4A,0xEA5,0x50DA9,0x5AD,0x2B6,0x3126E, 0x92E,0x7192D,0xC95,0xD4A,0x61B4A,0xB55,0x56A,0x4155B, 0x25D,0x92D,0x2192B,0xA95,0x71695,0x6CA,0xB55,0x50AB5,0x4DA,0xA5B,0x30A57,0x52B,0x8152A,0xE95,0x6AA,0x615AA,0xAB5,0x4B6,0x414AE,0xA57,0x526,0x31D26,0xD95,0x70B55,0x56A,0x96D,0x5095D,0x4AD,0xA4D,0x41A4D,0xD25,0x81AA5,0xB54,0xB6A,0x612DA,0x95B,0x49B,0x41497,0xA4B,0xA164B, 0x6A5,0x6D4,0x615B4,0xAB6,0x957,0x5092F,0x497,0x64B, 0x30D4A,0xEA5,0x80D65,0x5AC,0xAB6,0x5126D,0x92E,0xC96,0x41A95,0xD4A,0xDA5,0x20B55,0x56A,0x7155B,0x25D,0x92D,0x5192B,0xA95,0xB4A,0x416AA,0xAD5,0x90AB5,0x4BA,0xA5B, 0x60A57,0x52B,0xA93,0x40E95);
                madd[0]=0;
                madd[1]=31;
                madd[2]=59;
                madd[3]=90;
                madd[4]=120;
                madd[5]=151;
                madd[6]=181;
                madd[7]=212;
                madd[8]=243;
                madd[9]=273;
                madd[10]=304;
                madd[11]=334;

                function showCal(){
                    let D=new Date();
                    let yy=D.getFullYear();
                    let mm=D.getMonth()+1;
                    let dd=D.getDate();
                    let ww=D.getDay();
                    let ss=parseInt(D.getTime()/1000);
                    if (yy<100) yy="19"+yy;
                    return GetLunarDay(yy,mm,dd);
                }
                function GetBit(m,n){
                    return (m>>n)&1;
                }
                //农历转换
                function e2c(){
                    TheDate= (arguments.length!=3) ? new Date() : new Date(arguments[0],arguments[1],arguments[2]);
                    let total,m,n,k;
                    let isEnd=false;
                    let tmp=TheDate.getYear();
                    if(tmp<1900){
                        tmp+=1900;
                    }
                    total=(tmp-1921)*365+Math.floor((tmp-1921)/4)+madd[TheDate.getMonth()]+TheDate.getDate()-38;

                    if(TheDate.getYear()%4==0&&TheDate.getMonth()>1) {
                        total++;
                    }
                    for(m=0;;m++){
                        k=(CalendarData[m]<0xfff)?11:12;
                        for(n=k;n>=0;n--){
                            if(total<=29+GetBit(CalendarData[m],n)){
                                isEnd=true; break;
                            }
                            total=total-29-GetBit(CalendarData[m],n);
                        }
                        if(isEnd) break;
                    }
                    cYear=1921 + m;
                    cMonth=k-n+1;
                    cDay=total;
                    if(k==12){
                        if(cMonth==Math.floor(CalendarData[m]/0x10000)+1){
                            cMonth=1-cMonth;
                        }
                        if(cMonth>Math.floor(CalendarData[m]/0x10000)+1){
                            cMonth--;
                        }
                    }
                }
                function GetcDateString(){
                    let tmp="";
                    if(cMonth<1){
                        tmp+="(闰)";
                        tmp+=monString.charAt(-cMonth-1);
                    }else{
                        tmp+=monString.charAt(cMonth-1);
                    }
                    tmp+="月";
                    tmp+=(cDay<11)?"初":((cDay<20)?"十":((cDay<30)?"廿":"三十"));
                    if (cDay%10!=0||cDay==10){
                        tmp+=numString.charAt((cDay-1)%10);
                    }
                    return tmp;
                }
                function GetLunarDay(solarYear,solarMonth,solarDay){
                    //solarYear = solarYear<1900?(1900+solarYear):solarYear;
                    if(solarYear<1921 || solarYear>2020){
                        return "";
                    }else{
                        solarMonth = (parseInt(solarMonth)>0) ? (solarMonth-1) : 11;
                        e2c(solarYear,solarMonth,solarDay);
                        return GetcDateString();
                    }
                }

                return showCal();
            },
        };

        return [
            year+""+month+""+day+""+hour+""+minutes+""+seconds, // 0
            year+"-"+month+"-"+day+" "+hour+":"+minutes+":"+seconds, // 1
            year, // 2
            month+""+day, // 3
            month+"-"+day, // 4
            month+"/"+day, // 5
            hour+""+minutes+""+seconds, // 6
            hour+":"+minutes+":"+seconds, // 7
            week, // 8
            calender.calender(), // 农历 // 9
        ];

    },
    "alert_txt": function (txt, timeout, clear) { // 文字提醒弹窗，会遮挡页面操作。(文字，超时时间，清除所有提示<仅限不为long时>)
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
        $("body").append(div);

        if (!timeout || timeout < 200 || timeout > 60*60*1000){ // 默认
            timeout = 2000;
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
    "notice_txt": function (txt, timeout) { // 临时重要通知专用，不会遮挡页面操作
        let that = this;

        // notice_txt层级形态显示
        let notice_txt_index = that.get_cache("notice_txt_index")*1;
        if (!notice_txt_index){
            notice_txt_index = 7000000;
        }else {
            notice_txt_index = notice_txt_index + 10;
        }
        that.set_cache("notice_txt_index", notice_txt_index);

        let class_name = "notice_txt_" + notice_txt_index;
        that.log(["notice_txt", txt, timeout, notice_txt_index, class_name]);

        // 制作容器盒子
        if (!$(".notice_txt-box").length){
            $("body").append('<div class="notice_txt-box"></div>');
        }

        // 渲染
        let div = '<div class="notice_txt-li '+class_name+'" style="display: none;"><div class="notice_txt-show">'+txt+'</div><div class="notice_txt-close click" onclick="$(this).parent().slideUp(400);setTimeout(function(){$(this).parent().remove();}, 400);">x</div></div>';
        $(".notice_txt-box").prepend(div);
        $("." + class_name).slideDown(400);

        // 清除
        if (!timeout || timeout < 200){ // 默认
            timeout = 2000;
        }else if (timeout > 1*60*1000){
            timeout = 1*60*1000;
        }
        setTimeout(function () {
            $("." + class_name).slideUp(400);
            setTimeout(function () {
                $("." + class_name).remove();
            }, 400);
        }, timeout);

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
    "string_include_string": function (big_string, small_string) { // 判断大字符串是否包含小字符串
        let that = this;
        that.log([big_string, small_string]);

        let index = big_string.indexOf(small_string);
        if ( index !== -1){ // 包含该字符串
            return index;
        }else {
            return "";
        }
    },

};

