/*页面和模块信息配置*/


// 所有页面公用js、css文件，全局有效
const page_public_file = {
    "js": [
        file_url + "depend/assist.js?" + page_time,  // 帮助框架可以在多种苛刻条件下正常使用
        file_url + "public/js/vue.min.js?" + page_time,  // vue.js框架，实现双向绑定
        file_url + "public/js/all.js?" + page_time,
        /*以下加入你自己的js*/

        file_url + "pages/common/foot/foot.js?" + page_time,  // foot

    ],
    "css": [
        file_url + "public/css/all.css?" + page_time,
        file_url + "public/css/animate.min.css?" + page_time,
        /*以下加入你自己的css*/

        file_url + "pages/common/foot/foot.css?" + page_time,  // foot

    ],
};


// pages模块页面白名单配置
const pages = [
    // 开始-其他页面模块
    { // 页面模块-404
        "route"     : "404",  // url中#route=xxx，便于定位页面
        "file_path" : page_url + "404/404.htm", // 实际文件路径+文件名，为了方便起见，文件后缀统一用“htm”
        "title"     : "404-页面没找到",  // 页面title
        "file"      : [  // 本页面需要引入的局部资源文件
            {
                "js": [
                    file_url + "pages/404/404.js?" + page_time,  // 模块页面js，模块中有效
                ],
                "css": [
                    file_url + "pages/404/404.css?" + page_time,  // 模块页面css，模块中有效
                ],
            },
        ],
    },
    { // 页面模块-home
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

    // 开始-模块范本
    { // 页面模块-vue
        "route"     : "vue",
        "file_path" : page_url + "vue/vue.htm",
        "title"     : "测试vue.js双向绑定",
        "file"      : [
            {
                "js": [
                    file_url + "pages/vue/vue-js.js?" + page_time,
                ],
                "css": [
                    file_url + "pages/vue/vue-css.css?" + page_time,
                ],
            },
        ],
    },
    { // 页面模块-test
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
