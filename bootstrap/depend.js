/*主入口js，下面一般不要做修改。**/
/*2019/9/12/9:55*/
/*
*版本版权：v3.5.2（2023-03-07）；Apache2.0。
* */
"use strict";

// 原生依赖
const index_load = {
    "index_js": [
        "routes/route.js", // 路由文件
        "common/page_init.js", // 解析完路由后的操作
        "common/page_safe.js", // 用户全局安全校验
    ],
};

// 检测白名单url
function depend_url(){
    let check_url = app_url.check_url;
    let the_host = window.location.host;
    let the_refer = document.referrer;
    // view.log(["参数1：", the_host, the_refer]);

    // 开关
    let the_url = "";
    switch (check_url) {
        case "refer":
            the_url = the_refer.slice(0, 60);
            break;
        case "host":
            the_url = "//"+the_host; // 用主域名代替refer，前缀必须//开头
            the_url = the_url.split("/")[2];
            break;
        case "any":
            the_url = "";
            break;
        default:
            the_url = "";
            break;
    }

    //
    try {
        let jump_site = app_url.jump_url;
        let white_urls = app_url.white_url;

        if (the_url){
            view.log("url安全检测已开启 >>> ");
            // 校验refer
            let has = 0;
            for (let j=0; j<white_urls.length; j++){
                let the_white_url = white_urls[j];
                if (view.string_include_string(the_url, the_white_url) !== -1){ // 处在白名单
                    has = j +1;
                    view.log(["白名单"+check_url+" = " + the_white_url, the_url]);
                    break;
                }else {
                    // view.log([j, the_white_url, the_url]);
                    continue;
                }
            }
            // 不符合则跳到目标url
            if (jump_site && has<1){
                window.location.replace(jump_site + "#refer-error="+encodeURI(the_url));
            }else {
                depend_pages();
            }
        }else {
            view.log(["url为空时跳过url校验，危险模式运行中 >>> ", the_url]);
            depend_pages();
        }

    }catch (e) {
        view.log([the_host, the_refer, 'url参数报错']);
        console.error(e);
    }
}

// 加载框架模块文件
function depend_pages(){
    const depend = {  // 依赖函数
        get_url_param: function (url, key) { // 获取url中的参数
            let url_str = "";
            if(!url){url_str = window.location.href;}else {url_str = url;}
            let regExp = new RegExp("([?]|&|#)" + key + "=([^&|^#]*)(&|$|#)");
            let result = url_str.match(regExp);
            if (result) {
                return decodeURIComponent(result[2]); // 转义还原参数
            } else {
                return "";
            }
        },
        load_route: function () { // 处理路由
            let page_name = "";     // 拉取哪个html文件块
            let _file = "";         // 真实文件路径+文件名
            let pages_index = null; // 页面资源索引
            let head = document.head || document.getElementsByTagName("head")[0];

            // 匹配路由名
            let p1 = new Promise((resolve, reject) => {
                page_name = depend.get_url_param("", "route");
                for (let i=0; i<pages.length; i++){ // 获取真正文件路径名
                    if (pages[i].route === page_name){
                        _file = cdn_page_file + "" + pages[i].file_path + "?"+page_time;
                        view.title(pages[i].title);
                        pages_index = i;
                        resolve('找到值');
                    }else if (pages.length-1 === i) { // 全部扫描完
                        resolve('未找到值');
                    }
                }
            });

            // 处理路由页面名
            let p2 = new Promise((resolve, reject) => {
                if (page_name === ""){ // 空路由或是默认路由
                    resolve('进入默认页');
                }else {
                    if (pages_index === null){ // 未匹配路由
                        console.error("页面没有正确路由?route=xxx，将进入默认页面。");
                        time_error = Math.floor((new Date()).getTime());
                        window.location.replace(route_404);  // 则进入404页
                        resolve('未匹配');
                    }else{
                        resolve('已匹配');
                    }
                }
            });

            // route公共css
            for (let i=0; i<page_static_file.css.length; i++){
                let link = document.createElement('link');
                link.setAttribute("href", cdn_page_file + page_static_file.css[i] + "?" + page_time);
                link.setAttribute("rel", "stylesheet");
                head.appendChild(link);
            }

            // route公共js
            let route_js_all = [];
            for (let i=0; i<page_static_file.js.length; i++){
                let the_p = new Promise((resolve, reject) => {
                    let script = document.createElement("script");
                    script.setAttribute("src", cdn_page_file + page_static_file.js[i] + "?" + page_time);
                    head.appendChild(script);
                    script.onload = function () {resolve(i); };
                });
                route_js_all.push(the_p);
            }

            // page对应路由的资源文件，路由index匹配完才能执行
            let page_file = pages[pages_index].file[0];

            // page css（不需要异步）
            for (let i=0; i<page_file.css.length; i++){
                let link = document.createElement('link');
                link.setAttribute("href", cdn_page_file + page_file.css[i] +"?"+ page_time);
                link.setAttribute("rel", "stylesheet");
                head.appendChild(link);
            }

            // page html
            let view_cache = view.js_rand(1000000000000, 99999999999999);
            let p3 = new Promise((resolve, reject) =>{
                $.ajax({ // 利用ajax的get请求获取文本内容
                    url: _file,
                    async: true,
                    success: function (data) {
                        let div = document.createElement("div");
                        div.classList.add("route-page");
                        div.classList.add("page-div");
                        div.classList.add("clear");
                        div.setAttribute("id", "route-page");
                        div.setAttribute("data-view", ""+view_cache);
                        div.classList.add("page-div-" + view_cache);
                        div.innerHTML = data;

                        let depend = document.getElementById("depend");
                        depend.classList.add("depend-div-" + view_cache);
                        depend.setAttribute("data-view", ""+view_cache);

                        depend.appendChild(div); // 将模块渲染入主文件

                        resolve('文本已请求');
                    },
                    error: function (error) {
                        console.error("缺失模块html文件=" + error);
                        console.error("1.非同源政策限制模块文件的拉取；2.本应用需要服务器环境（网络环境）；3.htm组件文件404。");
                        time_error = Math.floor((new Date()).getTime());

                        view.alert_txt("缺失模块html文件！<br/>网页载入终止。", "long");

                        reject('缺失模块html文件');
                    }
                });
            });

            // 渲染最后页面的资源
            Promise.all([p1, p2, p3, route_js_all]).then((result) => {
                depend.load_page(head, page_file, pages_index);
            }).catch((error) => {
                console.error(error);
            });

        },
        load_page: function (head, page_file, pages_index){ // 处理最后的page js文件
            // page js（必须异步）
            let page_js_all = [];
            for (let i=0; i<page_file.js.length; i++){
                let the_p = new Promise((resolve, reject) => {
                    let script = document.createElement("script");
                    script.setAttribute("src", cdn_page_file + page_file.js[i] +"?"+ page_time);
                    head.appendChild(script);
                    script.onload = function () {resolve(i); };
                });
                page_js_all.push(the_p);
            }
            // 渲染最后页面的资源
            Promise.all(page_js_all).then((result) => {
                depend.all_files_loaded();
            }).catch((error) => {
                console.error(error);
            });
        },
        all_files_loaded: function () {  // 页面全部html、css、js加载完后执行
            view.log("Files Cache_time = "+page_time +"s");
            let route = depend.get_url_param("", "route");
            time_loaded = Math.floor((new Date()).getTime());
            let view_loaded_time = time_loaded - time_start;

            try { // 初始化页面所有路由文件后，负责框架事件
                frame_loaded([
                    view_loaded_time
                ], route);
            }catch (e) {
                console.error(e);
                console.log("=error=page_loaded=");
            }
            try { // 初始化page页面的开始函数，负责page事件
                page_init([
                    view_loaded_time,
                    "框架解析完成，用时"+view_loaded_time+"ms", "开始执行"+route+"页面数据>>",
                    cdn_page_file,
                    cdn_depend_file,
                ], route);
            }catch (e) {
                console.error("错误提示：情况1：【可忽略】must_safe_check()" + "页面起始模块函数未定义，但是此函数可忽略。情况2：must_safe_check()函数缺失，请参考如下报错：");
                console.error(e);
            }
        },

    };

    // 校验文件引入参数是否已经存在，不存在就不需要解析框架
    if( typeof time_start === "undefined" || typeof cdn_page_file === "undefined" || typeof cdn_page_file === "undefined" || typeof page_time === "undefined" ){
        console.error("参数未定义：%s，框架产生了异步时差，需要决解框架Bug。5s秒后将重试网页。", [time_start, cdn_page_file, cdn_page_file, page_time]);
        setTimeout(function () {
            window.location.reload();
        }, 5000);
    }else{
        // 引入原生依赖
        let head = document.head || document.getElementsByTagName("head")[0];
        let js_all = [];
        for (let i=0; i<index_load.index_js.length; i++){
            let the_p = new Promise((resolve, reject) => {
                let pages_script = document.createElement("script");
                pages_script.setAttribute("src", cdn_page_file + index_load.index_js[i]+"?" + page_time);
                head.appendChild(pages_script);
                pages_script.onload = function () {resolve(i); };
            });
            js_all.push(the_p);
        }

        Promise.all(js_all).then((result) => {
            depend.load_route();
        }).catch((error) => {
            console.error(error);
        });

    }
}


// 监听url是否发生变化，确保页面跳转成功
(function () {
    let url = window.location.href;
    window.onhashchange = function () {
        let now_url = window.location.href;
        // 只获取和对比#号之前的网址
        let index1 = url.lastIndexOf("\#");
        if (index1>0){
            url = url.substring(0, index1);
        }
        let index2 = now_url.lastIndexOf("\#");
        if (index2>0){
            now_url = now_url.substring(0, index2);
        }
        if (url && url !== now_url){
            // console.log(["url不同：", url, now_url]);
            window.location.reload();
        }else {
            console.log(["跳过url变化检测（只对比#号之前的）：", url, now_url]);
        }
    };
})();

// 入口
(function (){
    if (block_wechat && view.is_weixin()){
        view.alert_txt("本网站禁止在微信中打开。<br/>请使用外部浏览器。", "long");
    }else {
        depend_url();
    }
})();
