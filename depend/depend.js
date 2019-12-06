/*主入口js，下面一般不要做修改。**/
/*https://www.sojson.com/aaencode.html*/
/*2019/9/12/9:55_2019/12/06/9:46*/

// 原生依赖
const depend_load_file = {
    "index_js": [
        "depend/com-jq.js",
        "depend/com-vue.js",
        "config/pages.js",
        "depend/md5.js",
        // 以上文件不需要更改位置

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
        "get_url_param": function (url, key) {  // 获取url中的参数
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
        "pages_load_file": function (pages_index) {  // 添加页面js、css资源文件

            if (pages_index === null){
                console.log("pages参数好像未定义，pages.js数组参数找不到,页面和框架数据将不能渲染");

                setTimeout(function () {
                    window.location.replace(config.route_default);
                }, 1000);

                //window.location.replace(route_404);  // 则进入默认页
                return;
            }

            let head = document.head || document.getElementsByTagName("head")[0];
            let file = pages_load_file.pages_model_file[pages_index].file[0];
            let had_onload = 0;

            for (let i=0; i<file.css.length; i++){
                let link = document.createElement('link');
                link.setAttribute("href", config.file_url + file.css[i] +"?"+ config.page_time);
                link.setAttribute("rel", "stylesheet");
                head.appendChild(link);
            }
            for (let i=0; i<file.js.length; i++){

                let script = document.createElement("script");
                script.setAttribute("src", config.file_url + file.js[i] +"?"+ config.page_time);
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
            view.log("View Framework is Running.");
            view.log("Files Cache_time = "+config.cache_time +"s");
            document.getElementById("loading-div").classList.add("hide");
            time_loaded = Math.floor((new Date()).getTime());
            let view_loaded_time = time_loaded - time_start;
            try {

                let head = document.head || document.getElementsByTagName("head")[0];
                let script = document.createElement("script");
                script.setAttribute("src", config.file_url + "config/page_loaded.js?"+config.page_time);
                head.appendChild(script);

                let page = depend.get_url_param("", "route");

                page_data_init([view_loaded_time, "框架解析完成，用时"+view_loaded_time+"ms", "开始执行"+page+"页面数据>>"]);

            }catch (e) {
                console.log("page_data_init()" + "页面起始模块函数未定义，但是此函数可忽略。");
            }
        },

    };

    // 校验文件引入参数是否已经存在，不存在就不需要解析框架
    if( typeof time_start === "undefined" || typeof config.file_url === "undefined" || typeof config.page_url === "undefined" || typeof config.page_time === "undefined" ){
        console.log("参数未定义：%s，框架产生了异步时差，需要决解框架Bug。5s秒后将重试网页。", [time_start, config.file_url, config.page_url, config.page_time]);
        setTimeout(function () {
            window.location.reload();
        }, 5000);
    }else{

        /*开始-解析文件*/
        let page_name = "";     // 拉取哪个html文件块
        let _file = "";         // 真实文件路径+文件名
        let pages_index = null; // 页面资源索引

        // 首先导入pages.js文件
        let head = document.head || document.getElementsByTagName("head")[0];
        let onload = 0;
        for (let i=0; i<depend_load_file.index_js.length; i++){
            let pages_script = document.createElement("script");
            pages_script.setAttribute("charset", "UTF-8");
            pages_script.setAttribute("type", "text/javascript");
            pages_script.setAttribute("src", config.file_url + depend_load_file.index_js[i]+"?" + config.page_time);
            head.appendChild(pages_script);

            pages_script.onload = function () {
                onload++;
                if (onload === depend_load_file.index_js.length) {
                    // 公共js加载完成后开始加载页面js

                    new Promise(function(resolve, reject) {

                        new Promise(function(_resolve, _reject) {  // 处理页面路由
                            page_name = depend.get_url_param("", "route");
                            for (let i=0; i<pages_load_file.pages_model_file.length; i++){ // 获取真正文件路径名
                                if (pages_load_file.pages_model_file[i].route === page_name){
                                    _file = config.page_url + "pages/" + pages_load_file.pages_model_file[i].file_path + "?"+config.page_time;
                                    document.getElementsByTagName("title")[0].innerHTML = pages_load_file.pages_model_file[i].title;
                                    pages_index = i;
                                }
                            }
                            setTimeout(function () {
                                if (pages_index === null){
                                    console.log("页面没有正确路由#route=xxx，将进入默认页面。");
                                    time_error = Math.floor((new Date()).getTime());
                                    setTimeout(function () {
                                        window.location.replace(config.route_default);  // 则进入默认页
                                    },0);
                                    _resolve();
                                }else{
                                    _resolve();
                                }
                            },20);
                        }).then(function () {

                            // 开始-Fetch-请求数据
                            let post_api = _file;
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

                                // 其他res
                                let div = document.createElement("div");
                                div.innerHTML = res;
                                document.getElementById("depend").appendChild(div); // 将模块渲染入主文件

                                resolve();

                            }).catch(function(error){
                                let error_info = "▲ Fetch遇到错误：" + error +" ▲";
                                console.log("%c"+error_info, "color:red;font-weight:bold;font-size:18px;");

                                // 其他
                                console.log("缺失模块html文件=" + error);
                                console.log("1.非同源政策限制模块文件的拉取；2.本应用需要服务器环境（网络环境）；3.htm组件文件404。");
                                time_error = Math.floor((new Date()).getTime());
                                setTimeout(function () {
                                    window.location.replace("help-htm.html");
                                },1000);

                                reject();

                            });
                            // 结束-Fetch

                        });

                    }).then(function () {

                        let had_onload = 0;

                        // 页面渲染完毕，开始执行公共css、js引入
                        for (let i=0; i<pages_load_file.pages_public_file.css.length; i++){
                            let link = document.createElement('link');
                            link.setAttribute("href", config.file_url + pages_load_file.pages_public_file.css[i] + "?" + config.page_time);
                            link.setAttribute("rel", "stylesheet");
                            head.appendChild(link);
                        }
                        for (let i=0; i<pages_load_file.pages_public_file.js.length; i++){
                            let script = document.createElement("script");
                            script.setAttribute("src", config.file_url + pages_load_file.pages_public_file.js[i] + "?" + config.page_time);
                            head.appendChild(script);

                            script.onload = function () {
                                had_onload++;
                                if (had_onload === pages_load_file.pages_public_file.js.length) {
                                    // 公共js加载完成后开始加载页面js
                                    depend.pages_load_file(pages_index);
                                }
                            };

                        }
                    });
                    //

                }
            };

        }
        /*结束-解析文件*/

    }

})();



