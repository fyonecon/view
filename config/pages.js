/*页面和模块信息配置*/

// pages模块页面白名单配置
const pages = [
    // 开始-其他页面模块
    { // 页面模块-404
        "route"     : "404",  // url中#route=xxx，便于定位页面
        "file_path" : "404/404.htm", // 实际文件路径+文件名，为了方便起见，文件后缀统一用“htm”
        "title"     : "404-页面没找到",  // 页面title
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
    { // 页面模块-home
        "route"     : "home",
        "file_path" : "home/home.htm",
        "title"     : "主页",
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
    },
    // 结束-其他页面模块

    // 开始-模块范本
    { // 页面模块-vue
        "route"     : "vue",
        "file_path" : "vue/vue.htm",
        "title"     : "测试vue.js双向绑定",
        "file"      : [
            {
                "js": [
                    "pages/vue/vue-js.js",
                ],
                "css": [
                    "pages/vue/vue-css.css",
                ],
            },
        ],
    },
    { // 页面模块-test
        "route"     : "test",
        "file_path" : "test/test.htm",
        "title"     : "测试test",
        "file"      : [
            {
                "js": [
                    "pages/test/test.js",
                ],
                "css": [
                    "pages/test/test.css?",
                ],
            },
        ],
    },
    // 结束-模块范本

];
