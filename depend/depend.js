/*主入口js，下面一般不要做修改。**/
/*https://www.sojson.com/aaencode.html*/

let time_start  = 0;  // ms。开始载入外部文件的时间戳
let time_loaded = 0;  // ms。框架载入完成的时间戳
let time_error  = 0;  // ms。框架出错的时间戳

// 原生依赖
const index_load = {
    "index_js": [
        "depend/com-ajax.js",
        "config/pages.js",
        "depend/md5.js",
        // 以上两个文件不需要更改位置

    ],
};

// 所有页面公用js、css文件，全局有效
const page_public_file = {
    "js": [
        "depend/assist.js",  // 帮助框架可以在多种苛刻条件下正常使用
        "public/js/vue.min.js",  // vue.js框架，实现双向绑定
        "public/js/all.js",
    ],
    "css": [
        "public/css/all.css",
        "public/css/animate.min.css",
    ],
};

// 浏览器环境检查，主要检测是否支持ES6语法
(function () {
    try{
        let check = 1;
        new Promise(function(resolve, reject) {
            if (check === 1){
                check++;
                resolve();
            } else {
                check--;
                reject();
            }
        }).then(function () {
            const map = new Map([
                ["check", check],
            ]);
            map.get("check");
            console.log("ES6 Supported.");
        });

    }catch (e) {
        alert("该古老的浏览器不支持ES6语法。");
        window.location.replace("help-es6.html");
    }
})();

// 监听url是否发生变化，确保页面跳转成功
(function () {
    let url = window.location.href;
    window.onhashchange = function () {
        let now_url = window.location.href;
        if (url !== now_url){
            window.location.reload();
        }else {
            console.log("跳过url变化检测。");
        }
    };
})();

// 加载框架模块文件
(function () {

    let depend = {  // 依赖函数
        "getThisUrlParam": function (url, key) {  // 获取url中的参数
            let url_str = "";
            if(!url){
                url_str = window.location.href;
            }else {
                url_str = url;
            }
            // 正则匹配url中的参数，如果存在键，则返回键的值，如果不存在则返回null
            let regExp = new RegExp("([?]|&|#)" + key + "=([^&|^#]*)(&|$|#)");
            let result = url_str.match(regExp);
            if (result) {
                return decodeURIComponent(result[2]); // 转义还原参数
            } else {
                return null;
            }
        },
        "page_file": function (pages_index) {  // 添加页面js、css资源文件

            if (pages_index === null){
                console.log("pages参数好像未定义，pages.js数组参数找不到,页面和框架数据将不能渲染");

                setTimeout(function () {
                    window.location.replace(route_default);
                }, 1000);

                //window.location.replace(route_404);  // 则进入默认页
                return;
            }

            let head = document.head || document.getElementsByTagName("head")[0];
            let file = pages[pages_index].file[0];
            let had_onload = 0;

            for (let i=0; i<file.css.length; i++){
                let link = document.createElement('link');
                link.setAttribute("href", file_url + file.css[i] +"?"+ page_time);
                link.setAttribute("rel", "stylesheet");
                head.appendChild(link);
            }
            for (let i=0; i<file.js.length; i++){

                let script = document.createElement("script");
                script.setAttribute("src", file_url + file.js[i] +"?"+ page_time);
                head.appendChild(script);

                script.onload = function () {
                    had_onload++;
                    if (had_onload === file.js.length) {
                        depend.page_all_js_has();
                    }
                };

            }

        },
        "page_all_js_has": function () {  // 页面全部js加载完执行
            try {
                console.log("View Framework is Running.");

                time_loaded = Math.floor((new Date()).getTime());

                let head = document.head || document.getElementsByTagName("head")[0];
                let script = document.createElement("script");
                script.setAttribute("src", file_url + "config/page_loaded.js?"+page_time);
                head.appendChild(script);

                start_this_page();

                document.getElementById("loading-div").classList.add("hide");
                console.log("Files Cache_time = "+cache_time +"s");
            }catch (e) {
                console.log("start_this_page()" + "页面起始模块函数未定义，但是此函数可忽略。");
            }
        },

    };

    let page_name = "";     // 拉取哪个html文件块
    let _file = "";         // 真实文件路径+文件名
    let pages_index = null; // 页面资源索引

    time_start = Math.floor((new Date()).getTime());

    // 首先导入pages.js文件
    let head = document.head || document.getElementsByTagName("head")[0];
    let onload = 0;
    for (let i=0; i<index_load.index_js.length; i++){
        let pages_script = document.createElement("script");
        pages_script.setAttribute("src", file_url + index_load.index_js[i]+"?" + page_time);
        head.appendChild(pages_script);

        pages_script.onload = function () {
            onload++;
            if (onload === index_load.index_js.length) {
                // 公共js加载完成后开始加载页面js

                new Promise(function(resolve, reject) {

                    new Promise(function(_resolve, _reject) {  // 处理页面路由
                        page_name = depend.getThisUrlParam("", "route");
                        for (let i=0; i<pages.length; i++){ // 获取真正文件路径名
                            if (pages[i].route === page_name){
                                _file = page_url + "pages/" + pages[i].file_path + "?"+page_time;
                                document.getElementsByTagName("title")[0].innerHTML = pages[i].title;
                                pages_index = i;
                            }
                        }
                        setTimeout(function () {
                            if (pages_index === null){
                                console.log("页面没有正确路由#route=xxx，将进入默认页面。");
                                time_error = Math.floor((new Date()).getTime());
                                setTimeout(function () {
                                    window.location.replace(route_default);  // 则进入默认页
                                },0);
                                _resolve();
                            }else{
                                _resolve();
                            }
                        },20);
                    }).then(function () {

                        $.ajax({ // 利用ajax的get请求获取文本内容
                            url: _file,
                            async: true,
                            success: function (data) {
                                let div = document.createElement("div");
                                div.innerHTML = data;
                                document.getElementById("depend").appendChild(div); // 将模块渲染入主文件

                                resolve();
                            },
                            error: function (error) {
                                console.log("缺失模块html文件=" + error);
                                console.log("1.非同源政策限制模块文件的拉取；2.本应用需要服务器环境（网络环境）；3.htm组件文件404。");
                                time_error = Math.floor((new Date()).getTime());
                                setTimeout(function () {
                                    window.location.replace("help-htm.html");
                                },1000);

                                reject();
                            }
                        });

                    });

                }).then(function () {

                    let head = document.head || document.getElementsByTagName("head")[0];
                    let had_onload = 0;

                    // 页面渲染完毕，开始执行公共css、js引入
                    for (let i=0; i<page_public_file.css.length; i++){
                        let link = document.createElement('link');
                        link.setAttribute("href", file_url + page_public_file.css[i] + "?" + page_time);
                        link.setAttribute("rel", "stylesheet");
                        head.appendChild(link);
                    }
                    for (let i=0; i<page_public_file.js.length; i++){
                        let script = document.createElement("script");
                        script.setAttribute("src", file_url + page_public_file.js[i] + "?" + page_time);
                        head.appendChild(script);

                        script.onload = function () {
                            had_onload++;
                            if (had_onload === page_public_file.js.length) {
                                // 公共js加载完成后开始加载页面js
                                depend.page_file(pages_index);
                            }
                        };

                    }
                });
                //

            }
        };

    }


})();



