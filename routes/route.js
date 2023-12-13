/*页面和模块信息配置*/
/*路由注册（白名单）*/

"use strict";

// 1. 所有页面公用js、css文件，全局有效
// 2. 注册全局组件
const page_public_file = {
    "js": [
        "static/js/page_all.js", // 自定义的全局调用函数
        //"static/layui/layui.js", // 文档：https://www.layui.com/doc/
    ],
    "css": [
        // "static/font-awesome-4.7.0/css/font-awesome.min.css",
        "static/css/page_all.css",
        //"static/layui/css/layui.css",
    ],
};


// pages模块页面白名单配置
const pages = [
    // 开始-必要路由
    { // 页面模块-默认
        "route"     : "",
        "file_path" : "pages/home/home.view",
        "title"     : app_name,
        "file"      : [
            {
                "js": [
                    "pages/home/home_kw.js",
                    "pages/home/home_search.js",
                    "pages/home/home.js",
                ],
                "css": [
                    "pages/home/home.css",
                ],
            },
        ],
    }, //
    { // 页面模块-404
        "route"     : "404",  // url中#route=xxx，便于定位页面
        "file_path" : "pages/404/404.view", // 实际文件路径+文件名，为了方便起见，文件后缀统一用“htm”
        "title"     : "页面404 - 页面没找到路由地址",  // 页面title
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
        "file_path" : "pages/login/login.view",
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
    // 结束-必要路由

    { // 页面模块
        "route"     : "home-help",
        "file_path" : "pages/home/help/help.view",
        "title"     :  "使用帮助" + " - " +app_name,
        "file"      : [
            {
                "js": [
                    "pages/home/help/help.js",
                ],
                "css": [
                    "pages/home/help/help.css",
                ],
            },
        ],
    }, //
    { // 页面模块
        "route"     : "search",
        "file_path" : "pages/search/search.view",
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
        "route"     : "tools",
        "file_path" : "pages/tools/tools.html",
        "title"     :  "工具" + " - " +app_name,
        "file"      : [
            {
                "js": [
                    "pages/tools/tools.js",
                ],
                "css": [
                    "pages/tools/tools.css",
                ],
            },
        ],
    }, //
    { // 页面模块
        "route"     : "note",
        "file_path" : "pages/note/note.html",
        "title"     :  "记事本" + " - " +app_name,
        "file"      : [
            {
                "js": [
                    "pages/note/note.js",
                ],
                "css": [
                    "pages/note/note.css",
                ],
            },
        ],
    }, //



    //
];

