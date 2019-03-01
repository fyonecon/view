/*自定义配置页面的一些全局参数*/

/*
* 1）页面生命周期（index.html--config.js--框架解析index.js--公共all.js/css文件--执行wifi广告劫持严重和清除--pages.htm--pages.js--page_loaded.js）。
* 2）不依赖于node但需依赖服务端环境，或者依赖CDN环境。
* */

const debug = true;                     // 调试模式

const cookie_prefix   = "view_";        // cookie前缀

const route_404       = "#route=404";   // 404
const route_default   = "#route=home";  // 页面进入默认页

const file_url        = "";           // 资源文件CDN主域名（js、css、img、font等资源文件）
const page_url        = "pages/";     // htm文件的服务器地址，因为使用了ajax请求，不能直接请求本地文件，可以全部放在CDN里面
const page_time       = Math.floor((new Date()).getTime()/100000)*100;  // 页面时间戳：100秒为资源单位，100秒（文件缓存周期）后刷新页面浏览器会改变资源文件的缓存

const api_url         = "//xxx.com/public/index.php/";  // api主地址


// 框架依赖的其他js文件，注意这里是框架依赖的，最先载入的依赖文件。
const index_load = {
    "index_js": [
        "depend/com-ajax.js",
        "data/pages.js",
        "data/md5.js",
        // 以上两个文件不需要更改位置

    ],
};


// 框架自带公共函数
const map_cache = new Map(); // 设置页面键-值对缓存
let view = {
    "log": function (txt) { // 日志打印统一函数
        if (txt === 0 || txt === "0") {}else {if (!txt){txt = "空txt";} }
        debug === true ? console.log(txt): "";
    },
    "write_htm": function (file_path, by_id, call_func) {  // 注射文件 | 写入htm
        $.ajax({ // 利用ajax的get请求获取文本内容
            url: file_path,
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
            script.setAttribute("src", js_src_array[i]);
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
    "get_url_param": function (url, key) { // 获取url中的参数
        // 兼容模式url地址，例如：poop.html?page=3&ok=222#p=2#name=kd
        let url_str = "";
        if(!url){ url_str = window.location.href; } else {url_str = url; }
        let regExp = new RegExp("([?]|&|#)" + key + "=([^&|^#]*)(&|$|#)");
        let result = url_str.match(regExp);
        if (result) {
            return decodeURIComponent(result[2]); // 转义还原参数
        }else {
            return null; // 没有匹配的键即返回null
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
            return null;
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
    "post": function (api, json_data, call_func, call_data) { // 由于存在异步操作，所以设置回调函数。
        if (call_data === "") {
            call_data = "none";
        }
        if (api === "") {
            view.log("没有设置api接口，请保持 'view.post(api, json_data, call_func);' 写法。");
            return;
        }
        if (typeof json_data !== "object"){
            view.log("请保持data为json格式");
            return;
        }
        if (!call_func){
            view.log("post没有设置回调函数！请求的结果将无法输出！");
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

                let json = data = "";
                if(typeof back === "string"){
                    json = JSON.parse(back);
                    data = back;
                } else {
                    json = back;
                    data = JSON.stringify(back)
                }

                call_func([1, "POST请求完成，结果格式转换完成。", call_data, json]);
            },
            error: function (xhr) {
                console.log(xhr);
                call_func([0, xhr, call_data, {}]);
            }
        });

    },
    "get": function (api, call_func, call_data) {
        if (call_data === "") {
            call_data = "none";
        }
        if (api === "") {
            view.log("没有设置api接口，请保持 'view.get(api, call_func);' 写法。");
            return;
        }
        if (!call_func){
            view.log("get没有设置回调函数！请求的结果将无法输出！");
            return;
        }

        $.get(api, function(result){
            call_func([1, "GET请求完成", call_data, result]);
        });
    }


};



