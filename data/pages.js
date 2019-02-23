/*页面和模块信息配置*/


// 页面公用js、css文件
const page_public_file = {
    "js": [
        file_url + "public/js/all.js?" + page_time,

        file_url + "pages/common/foot/foot.js?" + page_time,  // foot

    ],
    "css": [
        file_url + "public/css/all.css?" + page_time,
        file_url + "public/css/animate.min.css?" + page_time,

        file_url + "pages/common/foot/foot.css?" + page_time,  // foot

    ],
};


// pages页面模块白名单配置
const pages = [

    // 开始-其他页面模块

    { // 页面-home
        "route"     : "home",
        "file_path" : page_url + "home/home.htm",
        "title"     : "主页",
        "file"      : [
            {
                "js": [
                    file_url + "pages/home/home.js?" + page_time,
                ],
                "css": [
                    file_url + "pages/home/home.css?" + page_time,
                ],
            },
        ],
    },

    // 结束-其他页面模块

    // 开始-模块范本，不需要做修改。
    { // 页面-404
        "route"     : "404",  // url中#route=xxx，便于定位页面
        "file_path" : page_url + "404/404.htm", // 实际文件路径+文件名，为了方便起见，文件后缀统一用“htm”
        "title"     : "404-页面没找到",  // 页面title
        "file"      : [  // 本页面需要引入的局部资源文件
            {
                "js": [
                    file_url + "pages/404/404.js?" + page_time,
                ],
                "css": [
                    file_url + "pages/404/404.css?" + page_time,
                ],
            },
        ],
    },
    { // 页面-vue
        "route"     : "vue",
        "file_path" : page_url + "vue/vue.htm",
        "title"     : "测试vue.js双向绑定",
        "file"      : [
            {
                "js": [
                    file_url + "pages/vue/vue.min.js?" + page_time,  // vue.js框架
                    file_url + "pages/vue/vue-js.js?" + page_time,
                ],
                "css": [
                    file_url + "pages/vue/vue-css.css?" + page_time,
                ],
            },
        ],
    },
    { // 页面-vue
        "route"     : "test",
        "file_path" : page_url + "test/test.htm",
        "title"     : "测试test",
        "file"      : [
            {
                "js": [
                    file_url + "pages/test/test.js?" + page_time,
                ],
                "css": [
                    file_url + "pages/test/test.css?" + page_time,
                ],
            },
        ],
    },
    // 结束-模块范本

];
