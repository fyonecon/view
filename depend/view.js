/*框架自带公共函数*/

// 框架依赖的其他js文件，注意这里是框架依赖的，最先载入的依赖文件。
const map_cache = new Map(); // 设置页面键-值对缓存
const view = {
    "log": function (txt) { // 日志打印统一函数
        if (txt === 0 || txt === "0") {}else {if (!txt){txt = "空txt";} }
        config.debug === true ? console.log(txt): "";
    },
    "write_htm": function (file_path, by_id, call_func) {  // 注射文件 | 写入htm
        $.ajax({ // 利用ajax的get请求获取文本内容
            url: file_path + "?" + config.page_time,
            async: true,
            success: function (data) {
                let div = document.createElement("div");
                div.innerHTML = data;
                document.getElementById(by_id).appendChild(div); // 将模块渲染入主文件

                try {
                    call_func(true);
                }catch (e) {
                    view.log("可选回调函数没有设置。");
                }
            },
            error: function (error) {
                console.log("缺失模块htm文件=" + error);
                try {
                    call_func(false);
                }catch (e) {
                    view.log("可选回调函数没有设置。");
                }
            }
        });

    },
    "write_js": function (js_src_array, call_func) { // 写入外部js
        if (js_src_array.constructor !== Array){
            view.log("js_src_array不是数组。");
            return;
        }
        let had_onload = 0;
        let head = document.head || document.getElementsByTagName("head")[0];
        for (let i=0; i<js_src_array.length; i++){
            let script = document.createElement("script");
            script.setAttribute("class", "write-js");
            script.setAttribute("src", js_src_array[i]+ "?" + config.page_time);
            head.appendChild(script);
            script.onload = function () {
                had_onload++;
                if (had_onload === js_src_array.length) {
                    try {
                        call_func(true);
                    }catch (e) {
                        view.log("可选回调函数没有设置。");
                    }
                }
            };
        }
    },
    "write_css": function (css_src_array, call_func) { // 写入外部js
        if (css_src_array.constructor !== Array){
            view.log("css_src_array不是数组。");
            return;
        }
        let had_onload = 0;
        let head = document.head || document.getElementsByTagName("head")[0];
        for (let i=0; i<css_src_array.length; i++){
            let link = document.createElement("link");

            link.setAttribute("id", "depend-css");
            link.setAttribute("href",css_src_array[i] + "?" + config.page_time);
            link.setAttribute("rel", "stylesheet");
            head.appendChild(link);

            had_onload++;

            if (had_onload === css_src_array.length) {
                try {
                    call_func(true);
                }catch (e) {
                    view.log("可选回调函数没有设置。");
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
            return ""; // 没有匹配的键即返回""
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
        if(cval!= "") {
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

        return [state, msg, content];
    },
    "get_cache": function (_key) {

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
        content = [_key, has];

        return [state, msg, content];
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
    "time": function() {
        let m_time = new Date().getTime();
        let s_time = Math.floor(m_time/1000);

        return [s_time, m_time];
    },
    "date": function() {
        let now = new Date();

        let year = now.getFullYear();       //年
        let month = now.getMonth() + 1;     //月
        let day = now.getDate();            //日
        let hh = now.getHours();            //时
        let mm = now.getMinutes();          //分
        let ss = now.getSeconds();          //秒

        if(month < 10){
            month = "0"+month;
        }
        if(day < 10){
            day = "0"+day;
        }
        if(hh < 10){
            hh = "0"+hh;
        }
        if (mm < 10){
            mm = "0"+mm;
        }
        if (ss < 10){
            ss = "0"+ss;
        }

        let order_date = year + "" + month + "" + day;
        let date = year + "-" + month + "-" + day;
        let time = date+" "+hh+":"+mm+":"+ss;

        return [order_date, date, time];
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
            return null;
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
    "request_post": function (api, map_data, call_func) {
        let request = {};
        let request_text = "";
        let test_data = [api, map_data, call_func];

        // 开始-Fetch-请求数据
        // const post_api = config.api_url + "admin/login_check";
        // const map_body = new Map([ // 要提交数据
        //      ["login_token", login_token],
        // ]);

        let map = map_data;
        let body = "";
        for (let [k, v] of map) { body += k+"="+v+"&"; } // 拼装数据，限制2MB最佳
        let post_api = api;
        fetch(post_api, {
            method: "post",     // get/post
            mode: "cors",       // same-origin/no-cors/cors
            cache: "no-cache",
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            body: body,         // 格式要求：body:"key1=val1&key2=val2"；get方法不需要body
        }).then(function (response){
            if (response.status === 200){return response;}
        }).then(function (data) {
            return data.text();
        }).then(function(text){
            // 统一格式转换
            let back = null;
            let res = null;
            if (typeof text === "string"){
                back = text;
                try {
                    res = JSON.parse(text);
                }catch (e) {
                    res = text;
                }
            }else if (typeof text === "object"){
                back = JSON.stringify(text);
                res = text;
            }else {console.log("Unknown Typeof = " + typeof text); back = text;}
            // view.log("①Typeof：\n" + typeof text + "\n②Api_data：\n" + back);

            request = {
                "request_status": true,
                "request_back": res,
                "request_text": back,
            };
            request_text = back;

            call_func(request, test_data, request_text);

        }).catch(function(error){
            let error_info = "▲ Fetch遇到错误：" + error +" ▲";
            console.log("%c"+error_info, "color:red;font-weight:bold;font-size:18px;");

            request = {
                "request_status": false,
                "request_back": "",
            };
            request_text = error_info;

            call_func(request, test_data, error_info);

        });
        // 结束-Fetch

    },
    "request_get": function (api, map_data, call_func) {
        let request = {};
        let request_text = "";
        let test_data = [api, map_data, call_func];

        // 开始-Fetch-请求数据
        // const post_api = config.api_url + "admin/login_check";
        // const map_body = new Map([ // 要提交数据
        //      ["login_token", login_token],
        // ]);

        let tag = "&";
        if (api.indexOf("?") === -1){
            tag = "?";
        }

        let map = map_data;
        let body = "";
        for (let [k, v] of map) { body += k+"="+v+"&"; } // 拼装数据，限制2MB最佳
        let post_api = api + tag + body;
        fetch(post_api, {
            method: "get",      // get/post
            mode: "cors",       // same-origin/no-cors/cors
            cache: "no-cache",
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
        }).then(function (response){
            if (response.status === 200){return response;}
        }).then(function (data) {
            return data.text();
        }).then(function(text){
            // 统一格式转换
            let back = null;
            let res = null;
            if (typeof text === "string"){
                back = text;
                try {
                    res = JSON.parse(text);
                }catch (e) {
                    res = text;
                }
            }else if (typeof text === "object"){
                back = JSON.stringify(text);
                res = text;
            }else {console.log("Unknown Typeof = " + typeof text); back = text;}
            // view.log("①Typeof：\n" + typeof text + "\n②Api_data：\n" + back);

            request = {
                "request_status": true,
                "request_back": res,
                "request_text": back,
            };
            request_text = back;

            call_func(request, test_data, request_text);

        }).catch(function(error){
            let error_info = "▲ Fetch遇到错误：" + error +" ▲";
            console.log("%c"+error_info, "color:red;font-weight:bold;font-size:18px;");

            request = {
                "request_status": false,
                "request_back": "",
            };
            request_text = error_info;

            call_func(request, test_data, error_info);

        });
        // 结束-Fetch

    },


};

