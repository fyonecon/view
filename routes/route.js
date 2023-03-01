/*页面和模块信息配置*/
/*路由注册（白名单）*/

"use strict";

// 1. 所有页面公用js、css文件，全局有效
// 2. 注册全局组件
const page_static_file = {
    "js": [
        "static/js/page_all.js", // 自定义的全局调用函数
        "static/js/swiper-bundle.min.js",

        // 可选，这些资源推荐在各自的路由下按需配置
        //"parts/nav/nav.js",
        //"parts/foot/foot.js",


    ],
    "css": [
        "bootstrap/plugins.css",
        "static/font-awesome-4.7.0/css/font-awesome.min.css",
        "static/css/page_all.css",

        // 可选，这些资源推荐在各自的路由下按需配置
        //"parts/nav/nav.css",
        //"parts/foot/foot.css",

    ],
};


// pages模块页面白名单配置
const pages = [
    // 开始-其他页面模块
    { // 页面模块-404
        "route"     : "404",  // url中#route=xxx，便于定位页面
        "file_path" : "pages/404/404.html", // 实际文件路径+文件名，为了方便起见，文件后缀统一用“htm”
        "title"     : "404 - 页面没找到",  // 页面title
        "file"      : [  // 本页面需要引入的局部资源文件
            {
                "js": [
                    "pages/404/404.js",  // 模块页面js，模块中有效
                ],
                "css": [
                    "pages/404/404.css?",  // 模块页面css，模块中有效
                ],
            },
        ],
    },
    { // 页面模块
        "route"     : "login",
        "file_path" : "pages/login/login.html",
        "title"     : "请登录..." + " - " +app_name,
        "file"      : [
            {
                "js": [
                    "pages/login/login.js",
                ],
                "css": [
                    "pages/login/login.css",
                ],
            },
        ],
    }, //

    { // 页面模块
        "route"     : "home",
        "file_path" : "pages/home/home.html",
        "title"     :  "简洁主页" + " - " +app_name,
        "file"      : [
            {
                "js": [
                    "pages/home/home.js",
                ],
                "css": [
                    "pages/home/home.css",
                ],
            },
        ],
    }, //

    { // 页面模块
        "route"     : "search",
        "file_path" : "pages/search/search.html",
        "title"     :  "搜索辅助跳转" + " - " +app_name,
        "file"      : [
            {
                "js": [
                    "pages/search/search.js",
                ],
                "css": [
                    "pages/search/search.css",
                ],
            },
        ],
    }, //

    { // 页面模块
        "route"     : "hei123",
        "file_path" : "pages/hei123/hei123.html",
        "title"     :  "私密学习网址导航" + " - " +app_name,
        "file"      : [
            {
                "js": [
                    "pages/hei123/hei123.js",
                ],
                "css": [
                    "pages/hei123/hei123.css",
                ],
            },
        ],
    }, //


    //
];

